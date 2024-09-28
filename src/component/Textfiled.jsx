import React from 'react';

export default function Textfiled(props) {
  return (
    <div>
      {props.label && <label className="block mb-1 text-[#F4EEFF] font-bold text-2xl m-2">{props.label}</label>}
      <input 
        type={props.type} 
        placeholder={props.placeholder} 
        className='border-2 m-2 p-1 bg-[#F4EEFF] text-[#424874] w-[70vw] md:font-bold' 
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)} 
      />
    </div>
  );
}
