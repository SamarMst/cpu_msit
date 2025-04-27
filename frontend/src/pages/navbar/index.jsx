import React from 'react';

const Navbar = () => {
  return (
    <nav className=" bg-[#08C2FF] p-4 h-20 pt-3">
      <div className="max-w-4xl flex ">
        <div className="text-white text-2xl font-semibold ">
            <button className="bg-white text-blue-500 rounded-full p-2 mr-2 ml-3"><a href="https://msit-conseil.fr/"><img src="/images/logo.jpg" alt="Logo" className=" h-9 rounded-2xl  px-4" /></a>
              
            </button>
        </div>
        <label className="text-2xl font-bold text-blue-50 font-berkshire-swash pt-2">MSIT Conseil</label>
      </div>
    </nav>
  );
};

export default Navbar;
