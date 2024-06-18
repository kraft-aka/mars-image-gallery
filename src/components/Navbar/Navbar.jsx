import React from 'react'
import styles from './Navbar.module.css'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <nav className={styles.navbar}>
      <h4 className={styles['navbar-logo']} onClick={scrollToTop}>MIG</h4>
      <ul className={styles['navbar-items']}>
        <li className={styles['navbar-item']}> <Link>About</Link> </li>
        <li className={styles['navbar-item']}> <button onClick={() => navigate(-1)} >Go Back</button> </li>
        <li className={styles['navbar-item']}> <button onClick={scrollToTop} >To the Top</button> </li>
        <li className={styles['navbar-item']}> <button onClick={() => navigate(-1)} >Next Page</button> </li>
      </ul>
    </nav>
  )
}

export default Navbar