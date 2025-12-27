import styles from "./LoginPage.module.css";
import { useState } from "react";
import { instance } from "../api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post("/auth/login", {
        email,
        password,
      });

      dispatch(setAuth(response.data.accessToken));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
