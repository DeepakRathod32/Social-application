import styles from '../styles/home.module.css';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Comment } from '../components';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';

const Post = ({post}) => {
    const [comment, setComment] = useState('');
    const [creatingComment, setCreatingComment] = useState(false);
    const posts = usePosts();


    const handleAddComment = async (e) => {
        // e.preventDefault();
        setComment(e.target.value);
        if(e.key === 'Enter'){
          setCreatingComment(true);
    
          const response = await createComment(comment, post._id);
          console.log('reponse comment', response.data)
    
          if(response.success){
            setComment('');
            posts.addComment(response.data.comment, post._id);
            toast.success('Comment added successfully');
          }else{
            toast.error(response.message);
          }

          setCreatingComment(false);
        }
      };

      const handlePostLikeClick = async () => {
        const response =  await toggleLike(post._id, 'Post');

        if(response.success){
          
          if(response.data.deleted){
            toast.success('Like removed successfully');
          }else{
            toast.success('Like added successfully');
          }

        }else{
          toast.error(response.message);
        }
      };

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
                  state={{ user: post.user }}
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
                <div onClick={handlePostLikeClick}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                    alt="likes-icon"
                  />
                </div>
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/13/13673.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input  
              type='text'
              placeholder="Start typing a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleAddComment}
               />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => {
                return <Comment comment={comment} key={`post-comment-${comment._id}`} />;
              })}
            </div>
          </div>
        </div>
      );
};

export default Post;