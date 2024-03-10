import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCustomersFromAPI,
  removeCustomer,
  updateCustomer,
} from "../store/reducers/customerSlice";

import Swal from "sweetalert2";
import EditDialog from "./modals/EditCustomer"; 
import CreateCustomer from "./modals/CreateCustomer";
import Sidebar from "./Sidebar"; 

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [customerData, setCustomerData] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const customers = useSelector((state) => state.customers.list);
  const dispatch = useDispatch();

  // once fetch data from api you can comment useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=1");
        const data = await response.json();
        dispatch(updateCustomersFromAPI(data.data)); // Dispatch action to update Redux store
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Handle delete functionality
  const handleDelete = async (id) => {
    // used sweatAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          dispatch(removeCustomer(id));
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  // Handle edit functionality
  const handleEdit = (customer) => {
    setCustomerData(customer);
    setShowModal(true);
    // Dispatch action to update customer
    dispatch(updateCustomer(customer));
  };

  const SortArrow = () => {
    if (sortOrder === "asc") {
      return <span>&uarr;</span>; // Up arrow
    } else {
      return <span>&darr;</span>; // Down arrow
    }
  };

  // Handle sorting functionality
  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Sort customers based on selected field and order
  const sortedCustomers = [...customers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  //loading to wait for customers data
  if (!customers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* customer edit modal */}
      <EditDialog
        showModal={showModal}
        setShowModal={setShowModal}
        customerData={customerData}
      />
      {/* customer delete modal */}
      <CreateCustomer
        addCustomerModal={addCustomerModal}
        setAddCustomerModal={setAddCustomerModal}
      />

      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full">
          <div>
            <h1 className="text-2xl flex items-center justify-center md:justify-start font-bold  w-full h-12 md:h-32 pl-8">
              CUSTOMERS
            </h1>

            <div className="p-4 md:p-10 bg-gray-200">
              <button
                className="bg-gradient-to-l from-customGreen to-lightGreen hover:bg-green-700 text-white py-1.5 px-4 rounded transition-all duration-300"
                onClick={() => setAddCustomerModal(true)}
              >
                <span className="mr-4">+</span>New Customer
              </button>
            </div>
          </div>
          <div className="w-full h-screen p-4 md:p-10 bg-gray-200">
            <div className="flex justify-between px-2 py-2 rounded-lg bg-green-200">
              <div className="pl-2"></div>
              <div className="w-1/8 md:w-1/6" onClick={() => handleSort("id")}>
                Customer ID {sortBy === "id" && <SortArrow />}
              </div>
              <div
                className="w-1/8 md:w-1/6"
                onClick={() => handleSort("first_name")}
              >
                Customer Name {sortBy === "first_name" && <SortArrow />}
              </div>
              <div
                className="w-1/4 md:w-1/5"
                onClick={() => handleSort("email")}
              >
                Email {sortBy === "email" && <SortArrow />}
              </div>
              <div className="w-1/8 md:w-1/6"></div>
            </div>

            <div className="py-2 flex justify-between flex-col">
              {sortedCustomers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="flex justify-between items-center mb-4 bg-white py-4 rounded-lg "
                >
                  <div className="pl-2 xs:hidden">
                    <img
                      src={customer.avatar}
                      alt={customer.first_name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="w-1/12 md:w-1/8">
                    {customer.id.toString().padStart(3, "0")}
                  </div>
                  <div className="w-1/8 md:w-1/6 text-xs text-green-500">
                    {customer.first_name}
                  </div>
                  <div className="w-1/4 md:w-1/5 text-sm flex justify-left text-xs">
                    {customer.email}
                  </div>
                  <div className="w-1/10 md:w-1/8 flex  justify-between xs:flex-col  pr-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-6 md:mr-2 rounded"
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-4 rounded"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
