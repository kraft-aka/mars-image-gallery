import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MARS-IMAGE-GALLERY</h1>
        <Link to="/galleryPage" className={styles.btn}>
          go to the gallery
        </Link>
      </header>
      <div className={styles.bottom}></div>
    </main>
  );
};

export default LandingPage;
