import React, {Fragment} from 'react';
import './Available.css';

export const Available = (props) => {
    const available= true;
    return(
        <div className={props.available ? "available" : "notAvailable"}>
            {props.available ? "Available" : "Not available"}
        </div>
    )
};