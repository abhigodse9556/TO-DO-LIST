import React from 'react';

export default function Textfiled({ label, type, placeholder, value, onChange, voiceButton }) {
  return (
    <div className="relative flex flex-col w-full">
      {label && (
        <label className="block mb-1 text-[#F4EEFF] font-bold text-2xl m-2">
          {label}
        </label>
      )}
      <div className="flex items-center md:w-[70vw] mx-3 md:mx-0">
        <input
          type={type}
          placeholder={placeholder}
          className="border-2 m-2 p-1 bg-[#F4EEFF] text-[#424874] w-full md:font-bold"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {voiceButton}
      </div>
    </div>
  );
}
