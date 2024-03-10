import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../store/reducers/customerSlice";

export default function CreateCustomer({
  addCustomerModal,
  setAddCustomerModal,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    avatar: "",
    email: "",
    first_name: "",
    last_name: "",
  });
//   console.log(formData);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.name === "photo" ? e.target.files[0] : e.target.value,
//     });
//   };
  const handleInputChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
        setFormData({
          ...formData,
          avatar: imageUrl,
        });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log(formData);

  const handleSubmit = (e) => {
    if (formData.email.trim() === '' || formData.first_name.trim() === '') {
        alert('Please fill in the required fields (Email and First Name)');
        return;
      }
    dispatch(addCustomer(formData));
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      avatar: null,
      email: "",
      first_name: "",
      last_name: "",
    });
    setAddCustomerModal(false)
  };
  const modalRef = useRef();

  return (
    <>
      {addCustomerModal ? (
        <>
          <div className="opacity-25  fixed inset-0 z-40 bg-black"></div>
          <div
            ref={modalRef}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative mx-auto w-80">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="bg-gradient-to-l from-customGreen to-lightGreen">
                  <button
                    className="p-1 bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                  <div className="flex justify-center text-2xl text-white pb-6 mt-6">
                    Add New Customer
                  </div>
                </div>
                <form className="relative p-6 flex-auto">
                  <div className="text-center mb-4">
                    <input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      type="text"
                      className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="flex mb-2">
                  <label htmlFor="uploadImage">
                      <span className="text-lightGreen underline cursor-pointer">
                        Upload Photo
                      </span>
                      <input
                        id="uploadImage"
                        type="file"
                        className="hidden"
                        name="avatar"
                        onChange={handleInputChange}
                      />
                    </label>
                    <div>
                      <p className="text-sm ml-4 text-gray-500">
                      {formData.avatar?formData.avatar:"upload photo"}
                      </p>
                    </div>
                  </div>
                </form>
                <div className="flex items-center justify-center p-2 rounded-b">
                  <button
                    className="bg-gradient-to-l from-customGreen to-lightGreen text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
