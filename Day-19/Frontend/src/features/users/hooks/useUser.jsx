import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { getFollowers, getFollows, getOthers } from "../services/user.api";

const useUser = () => {
  const context = useContext(UserContext);
  const {
    followsList,
    setFollowsList,
    loading,
    setLoading,
    followersList,
    setFollowersList,
    othersList,
    setOthersList,
  } = context;

  const handleGetFollows = async () => {
    const response = await getFollows();
    console.log(response)
    setFollowsList(response.myFollows);
};

const handleGetFollowers = async () => {
    const response = await getFollowers();
    console.log(response)
    setFollowersList(response.myFollowers);
  };
  const handleOtherUsers = async () => {
    const response = await getOthers();
    console.log(response);
    setOthersList(response.others);
  };

  useEffect(() => {
    handleGetFollows();
    handleOtherUsers();
    handleGetFollowers();
  }, []);

  return {
    followsList,
    followersList,
    loading,
    othersList
  };
};

export default useUser;
