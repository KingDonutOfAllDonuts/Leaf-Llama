import React from "react";

const Sidebar = ({ children, isOpen, toggleSideBar }) => {
  return (
    <>
      <div
        className={`flex flex-col fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-[1100] transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        {children}
      </div>
      <div
        className={`fixed inset-0 bg-black z-[1099] transition-opacity duration-300  ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSideBar}
      />
    </>
  );
};

export default Sidebar;
