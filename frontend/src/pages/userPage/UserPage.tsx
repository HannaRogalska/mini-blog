import styles from "./UserPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/index";
import { fetchPosts } from "../../store/postSlice";
import { setAuth, logout } from "../../store/authSlice";
import { instance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { username } = useParams<{ username: string }>();
  const posts = useSelector((state: RootState) => state.posts.posts);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await instance.post("/posts", {
        title,
        content,
      });
      setTitle("");
      setContent("");
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Something wrong with post:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await instance.post("/auth/logout", {});
      console.log("Logged out successfully");
      dispatch(logout());
      localStorage.removeItem("accessToken");
      navigate("/")
      
    } catch (error) {
      console.error("Something wrong:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) dispatch(setAuth(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome, {username}!</h1>
        <h2>Add New Post</h2>
        <form className={styles.addPostForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="New post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
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
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;
