import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
import {Input} from "../../components/form/Input";
import {SubmitBtn} from "../../components/form/SubmitBtn";
import {Header} from "../../components/Header/Header";
import './Auth.css';


export const SignUp = () => {

    const signUpHandler = (e, authData) => {
        e.preventDefault();

        fetch('http://localhost:8080/auth/signup',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Replace with form data
                firstName: 'Axelle',
                lastName: 'Lança',
                password: 'azerty',
                email: 'axl@gmail.com',
                role: 'user'
            })
        })
            .then(res => {
                if(res.status === 422) {
                    throw new Error("Validation failed. Make sure the email adress is correct");
                };
                if(res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Creating a user failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return(
        <Fragment>

            <Header/>
            <Link to="/login">Back to login page</Link>
            <form
                onSubmit={e => {

                }}
            >
                <Input
                    id="fName"
                    label="Your first name"
                    type="text"
                    control="input"
                />
                <Input
                    id="LName"
                    label="Your last name"
                    type="text"
                    control="input"
                />
                <Input
                    id="email"
                    label="Your E-mail"
                    type="email"
                    control="input"
                />
                <Input
                    id="password"
                    label="Your Password"
                    type="password"
                    control="input"
                />
                <SubmitBtn
                    id="submit"
                    name="Login"
                    type="submit"
                />
            </form>
        </Fragment>
    )
}
