import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { CreatePost, FriendsList, Loader } from '../components';
import { useAuth, usePosts } from '../hooks';
import {Post} from '../pages'

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => {
          return <Post post={post} key={`post-${post._id}`}/>
        })}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );

};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
