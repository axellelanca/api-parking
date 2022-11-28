import React from 'react';
export const SingleUser = (props) => {
    return(
        <div className="singleuser">
            <p>{props.firstname}</p>
            <p>{props.lastname}</p>
            <p>{props.email}</p>
            <p>{props.spot}</p>
        </div>
    )
}