import styles from "../styles/home.module.css"
import PropTypes from "prop-types";

import { Comment, Loader } from "../components";
import { useState, useEffect } from "react";
import { getPosts } from "../api";

const Home = () => {
  const [loading, setLoading] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if(response.success){
        setPosts(response.data.posts)
      }
      setLoading(false)
    }

    fetchPosts();
  },[]);

  if (loading) {
    return <Loader />;
  }

  // console.log(posts);
    return (
        <div className={styles.postsList}>
          {posts.map((post)=>{
            return (
              <div className={styles.postWrapper} key={post._id}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons.flaticon.com/png/128/2202/premium/2202112.png?token=exp=1653646656~hmac=9404007ff3cefa005033475b2ff39efe"
                  alt="user-pic"
                />
                <div>
                  <span className={styles.postAuthor}>{post.user.name}</span>
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
                  {
                    
                    post.comments.map( (comment) => {
                      return <Comment comment={comment}/>
                    })}
              </div>
            </div>
          </div>
            );
          })}
    </div>
    )
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default Home;
