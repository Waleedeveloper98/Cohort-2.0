import "../../users/style/userpage.scss";
import Following from "../components/Following";
import Followers from "../components/Followers";
import Others from "../components/Others";
import useUser from "../hooks/useUser";

const UsersPage = () => {
  const { othersList, followsList, followersList, handleFollowUser } =
    useUser();

  return (
    <aside className="userpage">
      <Following followsList={followsList} />
      <Followers followersList={followersList} />
      <Others others={othersList} handleFollowUser={handleFollowUser} />
    </aside>
  );
};

export default UsersPage;
