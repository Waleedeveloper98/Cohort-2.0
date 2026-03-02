import React from "react";

const Tag = ({text}) => {
  return (
    <div className="tag">
      <div className="dot"></div>
      <p>{text}</p>
    </div>
  );
};

export default Tag;
