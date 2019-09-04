import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from '../css/post.module.css';
import MarkdownIt from "markdown-it";

function Post(props) {
    const postId = props.match.params.id
    const [data, setData] = useState([]);
    const [author, setAuthor] = useState()
    let md = new MarkdownIt();

    useEffect(() => {
        axios.post("http://localhost:8080/api/collections/get/post?token=c252c1524e3ea41df06cf4d0f473ea,&filter[_id]=" + postId)

            .then(res => {
                let response = res.data.entries;
                setData(response[0]);
                setAuthor(response[0].author[0].display)
            })
            .catch(err => {
                console.log(err);
            })
        return () => {
            console.log('unmount')
        }

    }, []);

    function handleIterate(str) {
        if (!str) return;
        let markdown = md.render(str)
        return { __html: markdown }
    }

    function render() {
        if (!data) return;
        return (

            <div className={styles.container}>
                <div className={styles.container__left}></div>

                <div className={styles.container__pargement}>
                    <div className={styles["container__post--header"]}>
                        <h1 className={styles["container__post--text"]}>{data.title}</h1>
                        <h3 className={styles["container__post--infotext"]}>{"written by: " + author}</h3>
                    </div>
                    <div className={styles["container__post--body"]}>
                        <p dangerouslySetInnerHTML={handleIterate(data.body)} className={styles["container__post--description"]}></p>
                       
                    </div>
                </div>

                <div className={styles.container__right}></div>
            </div>

        )
    }

    return (

        <div>
            {render()}
        </div>

    )
}

export default Post