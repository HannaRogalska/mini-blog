
import React, { useState} from "react";
import styles from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import { instance } from "../../api/axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await instance.post("/auth/register", {
              name,
              password,
              email,
            });
             console.log("User registered:", res.data);
            setEmail("")
            setName("")
            setPassword("")
        } catch (error) {
            console.error("Register error:", error);
            alert("Registration failed!");
        }
        
    };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />

        <button type="submit">Create account</button>

        <p>
          Do you already have an account?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
