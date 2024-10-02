import React from 'react';

export default function Button(props) {
  return (
    <div>
      <button
        className={props.className}
        type={props.type || "button"}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}
