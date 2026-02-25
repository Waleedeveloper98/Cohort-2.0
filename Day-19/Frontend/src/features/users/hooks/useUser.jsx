import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import {
  follow,
  getFollowers,
  getFollows,
  getOthers,
} from "../services/user.api";

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
    console.log(response);
    setFollowsList(response.myFollows);
  };

  const handleGetFollowers = async () => {
    const response = await getFollowers();
    console.log(response);
    setFollowersList(response.myFollowers);
  };
  const handleOtherUsers = async () => {
    const response = await getOthers();
    console.log(response);
    setOthersList(response.others);
  };

  const handleFollowUser = async (username) => {
    try {
      await follow(username);
      await handleGetFollows();
      await handleOtherUsers();
    } catch (error) {
      console.log(error.response?.data);
    }
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
    othersList,
    handleFollowUser,
  };
};

export default useUser;
