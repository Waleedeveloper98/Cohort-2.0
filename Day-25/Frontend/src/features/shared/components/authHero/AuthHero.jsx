import React from "react";
import "../authHero/authHero.scss";
import Tag from "./Tag";
import Heading from "./Heading";
import Description from "./Description";

const AuthHero = ({ tagText, titleText, descText }) => {
  return (
    <>
      <div className="authHero">
        {tagText && <Tag text={tagText} />}
        <Heading text={titleText} />
        <Description text={descText} />
      </div>
    </>
  );
};

export default AuthHero;
