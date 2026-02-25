import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [followsList, setFollowsList] = useState(null);
  const [followersList, setFollowersList] = useState(null);
  const [othersList, setOthersList] = useState(null)
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{
        followsList,
        setFollowsList,
        loading,
        setLoading,
        followersList,
        setFollowersList,
        othersList,
        setOthersList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
