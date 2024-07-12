import React from "react";
import { RingLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <RingLoader color="blue" />
    </div>
  );
};

export default Loader;
