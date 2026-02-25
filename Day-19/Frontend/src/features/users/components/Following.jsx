import React from "react";
import "../../users/style/follows.scss";;

const Following = ({ followsList }) => {

  return (
    <div className="follows following">
      <h2>Following</h2>
      <ul>
        {followsList?.length > 0 ? (
          followsList
            .filter((item) => item.status === "accept")
            .map((item) => <li key={item._id}>{item.followee}</li>)
        ) : (
          <p>Not Found</p>
        )}
      </ul>
    </div>
  );
};

export default Following;
