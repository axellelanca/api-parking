import React, {Fragment} from 'react';
import './SingleSpot.css';
import {Available} from "../../../components/Spot/Available/Available";

export const SingleSpot = (props:any) => {
    return(
        <div className="singleSpot">
            <p><span>Number</span> : {props.place}</p>
            <p><span>Floor</span>: {props.floor}</p>
            <Available
                available={props.available}
            />
        </div>
    )
}