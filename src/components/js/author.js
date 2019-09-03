import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from '../css/author.module.css';

function Author(props) {
    const authorId = props.match.params.id
    const [data, setData] = useState([]);
    const [picture, setPicture] = useState()


    useEffect(() => {
        axios.post("http://localhost:8080/api/collections/get/author?token=c252c1524e3ea41df06cf4d0f473ea,&filter[_id]=" + authorId)

            .then(res => {
                let response = res.data.entries;
                console.log(response[0])
                setData(response[0]);
                setPicture(response[0].photo.path)

            })
            .catch(err => {
                console.log(err);
            })
            return () => {
                console.log('unmount')
              }
               
    }, [authorId]);


        return(
          
         <div className={styles.container}>
            <div className={styles.container__left}></div>
            <div className={styles.container__pargement}>
                <div className={styles["container__author--header"]}>
                    <h1 className={styles["container__author--text"]}>{data.name}</h1>
                </div>
                <div className={styles["container__author--body"]}>
                    <div className={styles["container__author--left"]}>
                        <img src={"http://localhost:8080/"+picture} alt="" />
                    </div>
                    <div className={styles["container__author--right"]}>
                        <p className={styles["container__author--description"]}>
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.container__right}></div>
        </div>
          
          
        )
}

export default Author