import React from 'react';
import './Input.css';


export const Input = (props) => {
    return(
    <div className={'input'}>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        {props.control === 'input' && (
            <input
                type={props.type}
                id={props.id}
                required={props.required}
                placeholder={props.placeholder}
                name={props.name}

            />
        )}
        {props.control === 'textarea' && (
            <textarea
                id={props.id}
                rows={props.rows}
                required={props.required}
                name={props.name}
            />
            )}
    </div>
    )
};

