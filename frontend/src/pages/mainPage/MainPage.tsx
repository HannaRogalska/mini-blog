import { Link } from "react-router-dom";

import styles from './MainPage.module.css'

const MainPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <span className={styles.logo}>MiniBlog</span>

        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Simple blogging platform</h1>
            <p>
              Share your thoughts, write posts, and manage your content in a
              clean and minimal SPA built with React and TypeScript.
            </p>
          </div>

          <div className={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
              alt="Coding workspace"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
