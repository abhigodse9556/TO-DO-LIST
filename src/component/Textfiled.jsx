import React from 'react';

export default function Textfiled(props) {
  return (
    <div>
      {props.label && <label className="block mb-1">{props.label}</label>}
      <input 
        type={props.type} 
        placeholder={props.placeholder} 
        className='border-2 m-2 p-1' 
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)} 
      />
    </div>
  );
}
