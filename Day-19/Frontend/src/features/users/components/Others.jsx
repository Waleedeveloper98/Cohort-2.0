import "../../users/style/follows.scss";

const Others = ({ others, handleFollowUser }) => {
  return (
    <div className="others">
      <h2>Others</h2>
      <ul>
        {others?.length > 0 ? (
          others.map((user) => (
            <li key={user._id}>
              {user.username}{" "}
              <button
                onClick={() => handleFollowUser(user.username)}
                className="button"
              >
                Follow
              </button>
            </li>
          ))
        ) : (
          <p>Not Found</p>
        )}
      </ul>
    </div>
  );
};

export default Others;
