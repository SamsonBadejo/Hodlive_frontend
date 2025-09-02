import React from "react";

const Title = ({ title }) => {
  return (
    <div className="flex items-center justify-center my-10">
      <span className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#FA971E] to-[#FA971E]" />

      <h1 className="text-2xl rounded-md bg-[#FA971E] text-white font-bold text-center p-3">
        {title}
      </h1>

      <span className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-[#FA971E] to-[#FA971E]" />
    </div>
  );
};

export default Title;
