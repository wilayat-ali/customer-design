import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCustomersFromAPI,
  removeCustomer,
  updateCustomer,
} from "./store/reducers/customerSlice";
import Swal from "sweetalert2";
import EditDialog from "./component/modals/EditCustomer";
import CreateCustomer from "./component/modals/CreateCustomer";
import Sidebar from "./component/Sidebar";
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [customerData, setCustomerData] = useState("");
  const customers = useSelector((state) => state.customers.list);
  const dispatch = useDispatch();
  console.log(customers);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=1");
        const data = await response.json();
        dispatch(updateCustomersFromAPI(data.data)); // Dispatch action to update Redux store
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Handle delete functionality
  const handleDelete = async (id) => {
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

  const handleEdit = (customer) => {
    console.log(customer);
    setCustomerData(customer);
    setShowModal(true);
    // Dispatch action to update customer
    dispatch(updateCustomer(customer));
  };
  const handleNewCustomer = () => {
    setAddCustomerModal(true);
  };

  if (!customers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EditDialog
        showModal={showModal}
        setShowModal={setShowModal}
        customerData={customerData}
      />
      <CreateCustomer
        addCustomerModal={addCustomerModal}
        setAddCustomerModal={setAddCustomerModal}
      />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full">
          <div>
            <h1 className="text-2xl flex justify-center items-center font-bold  w-full h-24 md:h-32 p-6 pl-2">
              Customers
            </h1>
            
            <div className="p-4 bg-gray-200">
              <button
                className="bg-gradient-to-l from-customGreen to-lightGreen hover:bg-green-700 text-white py-1.5 px-4 rounded transition-all duration-300"
                onClick={() => handleNewCustomer()}
              >
                <span className="mr-4">+</span>New Customer
              </button>
            </div>
          </div>
          <div className="w-full h-screen p-4 bg-gray-200">
            <div className="flex justify-between px-2 py-2 rounded-lg bg-green-200">
              <div className=""></div>
              <div className="w-1/8 md:w-1/6">Customer ID</div>
              <div className="w-1/8 md:w-1/6">Customer Name</div>
              <div className="w-1/4 md:w-1/5">Email</div>
              <div className="w-1/10 md:w-1/8 flex justify-center"></div>
            </div>
            <div className="py-2 flex justify-between flex-col">
              {customers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="flex justify-between items-center mb-4 bg-white py-4 rounded-lg "
                >
                  <div className="pl-2">
                    <img
                      src={customer.avatar}
                      alt={customer.first_name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="w-1/12 md:w-1/8">
                    {(index + 1).toString().padStart(3, "0")}
                  </div>
                  <div className="w-1/8 md:w-1/6 text-xs text-green-500">
                    {customer.first_name}
                  </div>
                  <div className="w-1/4 md:w-1/5 text-sm flex justify-left">
                    {customer.email}
                  </div>
                  <div className="w-1/10 md:w-1/8 flex justify-between pr-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-6 mr-2 rounded"
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

export default App;
