import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from '../css/author.module.css';

function Author(props) {
    const authorId = props.match.params.id
    const [data, setData] = useState([]);
    const [picture, setPicture] = useState()


    useEffect(() => {
            axios.post("http://localhost:8080/api/collections/get/author?token=d92bf97d6c592da6b09c17068ef40b" + authorId)
            .then(res => {
                let response = res.data.entries;
                console.log(response[0])
                setData(response);
                setPicture(response[0].photo.path)

            })
            .catch(err => {
                console.log(err);
            })
            return () => {
                console.log('unmount')
              }
               
    }, [authorId]);
    
    function render(val){

        return (
                <div className={styles.container__pargement}>
                <div className={styles["container__author--header"]}>
                    <h1 className={styles["container__author--text"]}>{val.name}</h1>
                </div>
                <div className={styles["container__author--body"]}>
                    <div className={styles["container__author--left"]}>
                        <img src={"http://localhost:8080/"+picture} alt="" />
                    </div>
                    <div className={styles["container__author--right"]}>
                        <p className={styles["container__author--description"]}>
                            {val.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

        return(
          
         <div className={styles.container}>
            <div className={styles.container__left}></div>
                {data.map(val =>{
                   return render(val)
                })}
            <div className={styles.container__right}></div>
        </div>
          
          
        )
}

export default Author 