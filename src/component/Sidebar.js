import React from "react";

const Sidebar = () => {
  return (
    <div className="sticky sx:hidden top-0 h-30 max-h-screen bg-customGreen px-4">
      <div className="p-4 flex flex-col items-center">
        <img
          src={require("../assets/images/logo.png")}
          alt="Company Logo"
          className="w-20 h-20 mb-2"
        />
        <button
          className="bg-green-800 text-white py-1.5 px-4 rounded transition-all duration-300"
        >
          <img
            src="https://img.icons8.com/ios/50/000000/add-user-group-man-man--v2.png"
            alt="logo"
            className="w-6 h-6 filter invert grayscale"
          />
          CUSTOMERS
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
