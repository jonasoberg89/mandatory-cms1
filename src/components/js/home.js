import React, { useState, useEffect } from 'react';
import styles from '../css/home.module.css';
import axios from "axios";
import { Link } from "react-router-dom"

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
    }, []);

    function stringLimit(str){
        if(str.length > 100) str = str.substring(0,100);
        return str + " ..."
    }
   
    return(
        <div className={styles.container}>
            <div className={styles.container__left}></div>
            <div className={styles.container__middle}>
               {
                 data.map(post =>{
                     return (
                        <div key={post._id} className={styles.container__post}>
                    <div className={styles['container__post--header']}>
                        <h2 className={styles['container__post--title']}>{post.title}</h2>
                        <span className={styles['container__post--mark']}>|</span>
                        <p className={styles['container__post--date']}>{post.date}</p>
                        <span className={styles['container__post--mark']}>|</span>
                        <p className={styles['container__post--author']}><Link to={"/author/"+post.author[0]._id}>{post.author[0].display}</Link></p>
                    </div>
                    <div className={styles['container__post--text']}>
                        <p className={styles['container__post--info']}>{stringLimit(post.body)}</p>
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