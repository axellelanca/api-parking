import React, {Fragment} from 'react';
import {Header} from "../../components/Header/Header";

export const ParkingApp = (props:any) => {

    const getSpots = () => {
        fetch('http://localhost:8080/feed/posts', {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then(res => {
                if(res.status !== 200) {
                    throw new Error('Failed to fetch posts.');
                }
                return res.json();
            })
            .then(resData => {

            })
    }

    return(
        <Fragment>
            <Header/>
            <h2>Liste des places </h2>
            {}
        </Fragment>
    )
}