import React from "react";
import "../style/authHero.scss";
import Tag from "../../shared/components/ui/tag/Tag";
import Heading from "../../shared/components/ui/heading/Heading";
import Description from "../../shared/components/ui/description/Description";

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
