import React from "react"
import { Link } from "react-router-dom"
import styles from '../css/navbar.module.css';
const Navbar = () =>{

    return (
        <nav className ={styles.nav_wrapper}>
            <div className={styles.container}>
                <Link to={"/"} className ={styles['nav_wrapper--text']}>Ogrimmar post </Link>
       
            </div>
            <div className={styles.underline}></div>
        </nav>
    )
}

export default Navbar