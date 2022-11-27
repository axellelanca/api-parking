import React from 'react';

export const SubmitBtn = (props:any):any => {
    return (
        <button
            id={props.id}
            type={props.type}
        >
            {props.name}
        </button>
    )
}
