import React, { useState, useEffect } from 'react';
import styles from '../css/home.module.css';
import axios from "axios";

function Home (){
    const [data, setData] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:8080/api/collections/get/post?token=c252c1524e3ea41df06cf4d0f473ea")
        .then(res => {
            let response = res.data.entries
          setData(response);
          console.log (response)
        })
        .catch(err => {
            console.log(err);
        })
    
        return () => {
            
        }
    }, []);
   
    return(
        <div className={styles.container}>
            <div className={styles.container__left}></div>
            <div className={styles.container__middle}>
               {
                 data.map(post =>{
                     return (
                        <div className={styles.container__post}>
                    <div className={styles['container__post--header']}>
                        <h2 className={styles['container__post--title']}>{post.title}</h2>
                        <span className={styles['container__post--mark']}>|</span>
                        <p className={styles['container__post--date']}>{post.date}</p>
                        <span className={styles['container__post--mark']}>|</span>
                        <p className={styles['container__post--date']}>{post.author[0].display}</p>
                    </div>
                    <div className={styles['container__post--text']}>
                        <p className={styles['container__post--info']}>{post.body}</p>
                    </div>
                    <div className={styles['container__post--read']}>
                        <button className={styles['container__post--button']}>Read</button>
                    </div>
                </div>
                     )
                 })
               }
            </div>
            <div className={styles.container__right}></div>
        </div>
    )
}

export default Home;