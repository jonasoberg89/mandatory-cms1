import React, { useState, useEffect } from 'react';
import styles from '../css/home.module.css';
import axios from "axios";
import { Link } from "react-router-dom"
import MarkdownIt from "markdown-it";

function Home(props) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios
        .get("http://localhost:8080/api/collections/get/post?token=c252c1524e3ea41df06cf4d0f473ea&sort[date]")
            .then(res => {
                let response = res.data.entries
                setData(response);
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);



    return (
        <div className={styles.container}>
            <div className={styles.container__left}></div>
            <div className={styles.container__middle}>
                {
                    data.map(post => {
                        return (
                            <div key={post._id} className={styles.container__post}>
                                <div className={styles['container__post--header']}>
                                    <h2 className={styles['container__post--title']}>
                                        <Link to={"/post/" + post._id}>{post.title}</Link>
                                    </h2>
                                    <span className={styles['container__post--mark']}>|</span>
                                    <p className={styles['container__post--date']}>{post.date}</p>
                                    <span className={styles['container__post--mark']}>|</span>
                                    <p className={styles['container__post--author']}>
                                        <Link to={"/author/" + post.author[0]._id}>
                                            {post.author[0].display}
                                        </Link></p>
                                </div>
                                <div className={styles['container__post--text']}>
                                  <div className={styles['container__post--picture']}></div>
                                </div>
                                <div className={styles['container__post--read']}>
                                    <Link to={"/post/" + post._id}>
                                        <button className={styles['container__post--button']}>Read</button>
                                    </Link>
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