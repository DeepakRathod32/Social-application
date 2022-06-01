import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';

const FriendsList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>No friends found</div>
      )}

      { friends && friends.map( friend => {
          return (
            <div key={`friend-${friend._id}`}>
            <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
              <div className={styles.friendsImg}>
                  <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='friends'/>
              </div>
              <div className={styles.friendName}>{friend.to_user.email}</div>
            </Link>
        </div>
          )
      }) }
    </div>
  );
};

export default FriendsList;
