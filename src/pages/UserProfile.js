import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';

import styles from '../styles/settings.module.css';
import { addFriend, removeFriend, fetchUserProfile } from '../api';
import { Loader } from '../components';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      console.log(response);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message);
        return navigate('/');
      }
      console.log('ended');
      setLoading(false);
    };
    getUser();
  }, [userId, navigate]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserAFriend = () => {
    const friends = auth.user.friends;
    console.log('friends', friends);

    const friendId = friends.map((friend) => friend.to_user._id);
    const index = friendId.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      toast.success('friend removed successfully');
    } else {
      toast.error(response.message);
    }

    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      toast.success('friend added successfully');
    } else {
      toast.error(response.message);
    }

    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons.flaticon.com/png/128/2202/premium/2202112.png?token=exp=1653646656~hmac=9404007ff3cefa005033475b2ff39efe"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserAFriend() ? (
          <button
            className={` button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing Friend..' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={` button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend..' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
