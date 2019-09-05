import React, { useState, useEffect } from 'react';
import styles from '../css/home.module.css';
import axios from "axios";
import { Link } from "react-router-dom"

function Home(props) {
    const [data, setData] = useState([]);
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true);
    const [pagination, setPagi] = useState(0)
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/collections/get/post?token=d92bf97d6c592da6b09c17068ef40b&limit=4&skip=" + pagination)
            .then(res => {
                let response = res.data.entries
                setData(response);

            })
            .catch(err => {
                console.log(err);
            })
    }, [pagination]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/collections/get/author?token=d92bf97d6c592da6b09c17068ef40b")
            .then(res => {
                let response = res.data.entries
                setAuthors(response);
                setLoading(false);
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function changeSite(arg){
        if(arg === "back" && pagination === 0)return;
        if(arg === "back") setPagi(pagination - 4);
        if(arg ==="forward" && data.length === 0)return
        if(arg ==="forward")setPagi(pagination + 4);
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <p></p>
            </div>
            <div className={styles.container__middle}>
                <div className={styles.pagination}>
                    <i onClick={()=>changeSite("back")} className="material-icons">arrow_back</i>
                    <i onClick={()=>changeSite("forward")} className="material-icons">arrow_forward</i>
                </div>
                {loading ? <div>...loading </div> :
                    data.map(post => {
                        return (
                            <div key={post._id} className={styles.container__post}>
                                <div className={styles['container__post--header']}>
                                    <h2 className={styles['container__post--title']}>
                                        <Link to={"/post/" + post._id}>{post.title}</Link>
                                    </h2>
                                    <span className={styles['container__post--mark']}>|</span>
                                    <p className={styles['container__post--date']}>{post.published_on}</p>
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
            <div className={styles.container__right}>
                <div className={styles["container__list--header"]}>
                    <h1 className={styles["container__list--text"]}> Authors</h1>
                </div>
                <div className={styles["container__list--authors"]}>
                    {loading ? <div>...loading </div> : authors.map(author => {
                        return (
                            <ul key={author._id}>
                                <li>
                                    <Link className={styles.authorlist} to={"/author/" + author._id}>{author.name}</Link>
                                </li>
                            </ul>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Home;