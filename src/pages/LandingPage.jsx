import React from "react";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MARS-IMAGE-GALLERY</h1>
        <button className={styles.btn}>go to the gallery</button>
      </header>
      <div className={styles.bottom}></div>
    </main>
  );
};

export default LandingPage;
