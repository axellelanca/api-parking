import React from 'react';

export const SubmitBtn = (props) => {
    return (
        <button
            id={props.id}
            type={props.type}
        >
            {props.name}
        </button>
    )
}
