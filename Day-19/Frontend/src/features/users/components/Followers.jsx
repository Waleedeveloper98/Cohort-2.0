import React from "react";
import "../../users/style/follows.scss";

const Followers = ({ followersList }) => {
  return (
    <div className="follows followers">
      <h2>Followers</h2>
      <ul>
        {followersList?.length > 0 ? (
          followersList
            .filter((item) => item.status === "accept")
            .map((item) => <li key={item._id}>{item.follower}</li>)
        ) : (
          <p>Not Found</p>
        )}
      </ul>
    </div>
  );
};

export default Followers;
