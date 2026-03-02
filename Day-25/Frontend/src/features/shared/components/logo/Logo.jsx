import React from "react";
import { Link } from "react-router-dom";
import { AudioLines } from "lucide-react";
import "../logo/logo.scss";

const Logo = () => {
  return (
    <Link className="logo">
      <AudioLines className="icon" size={28} />
      <p>Moodify</p>
    </Link>
  );
};

export default Logo;
