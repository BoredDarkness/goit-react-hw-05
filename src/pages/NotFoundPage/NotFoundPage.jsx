import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404. Page not found</h1>
      <Link to="/" className={styles.link}>
        Back to main page
      </Link>
    </div>
  );
}

export default NotFoundPage;
