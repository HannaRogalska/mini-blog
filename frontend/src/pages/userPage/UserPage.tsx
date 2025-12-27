import styles from "./UserPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/index";
import { fetchPosts } from "../../store/postSlice";

const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams<{ username: string }>();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome, {username}!</h1>
        <h2>Add New Post</h2>
        <form className={styles.addPostForm}>
          <input type="text" placeholder="Title" required />
          <textarea placeholder="New post" required />
          <button type="submit">Add Post</button>
        </form>

        <h2>Your Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post._id} className={styles.postItem}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.logoutButton}>Logout</button>
      </div>
    </div>
  );
};

export default UserPage;
