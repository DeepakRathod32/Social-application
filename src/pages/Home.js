import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import { Comment, CreatePost, FriendsList, Loader } from '../components';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import { useAuth } from '../hooks';

const Home = () => {
  const [loading, setLoading] = useState([]);
  const [posts, setPosts] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // console.log(posts);
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
      <CreatePost/>
        {posts.map((post) => {
          return (
              <div className={styles.postWrapper} key={post._id}>
                <div className={styles.postHeader}>
                  <div className={styles.postAvatar}>
                    <img
                      src="https://cdn-icons.flaticon.com/png/128/2202/premium/2202112.png?token=exp=1653646656~hmac=9404007ff3cefa005033475b2ff39efe"
                      alt="user-pic"
                    />
                    <div>
                      <Link
                        to={`/user/${post.user._id}`}
                        state={{user: post.user}}
                        className={styles.postAuthor}
                      >
                        {post.user.name}
                      </Link>
                      <span className={styles.postTime}>a minute ago</span>
                    </div>
                  </div>
                  <div className={styles.postContent}>{post.content}</div>

                  <div className={styles.postActions}>
                    <div className={styles.postLike}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                        alt="likes-icon"
                      />
                      <span>5</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/13/13673.png"
                        alt="comments-icon"
                      />
                      <span>2</span>
                    </div>
                  </div>
                  <div className={styles.postCommentBox}>
                    <input placeholder="Start typing a comment" />
                  </div>

                  <div className={styles.postCommentsList}>
                    {post.comments.map((comment) => {
                      return <Comment comment={comment} />;
                    })}
                  </div>
                </div>
              </div>
          );
        })}
      </div>
      {auth.user && <FriendsList/>}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
