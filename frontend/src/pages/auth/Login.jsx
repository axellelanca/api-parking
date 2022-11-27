import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";
import { Input } from '../../components/form/Input';
import './Auth.css';
import {SubmitBtn} from "../../components/form/SubmitBtn";

export const Login = () => {

    const [userInfos,setUserInfo] = useState({email : "", password  : ""})

    const HandleChangeEvent = (e) =>{
        const {value, name} = e.target;
        setUserInfo((prevValue) => {
            if (name === "email") {
                return {
                    email : value,
                    password : prevValue.password,
                }; 
            } else if(name === "password") {
                return {
                    email : prevValue.email,
                    password : value,
                }
            }
        })
    }

    const loginHandler = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: userInfos.email,
                password: userInfos.password
            })
        })
            .then(res => {
            if(res.status === 422){
                throw new Error('Validation failed.');
            }
            if(res.status !== 200 && res.status !== 201) {
                console.log('Error!');
                throw new Error('Could not authenticate you!');
            }
            return res.json();
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            })
    };


    return(
        <section id="wrapper">
            <div className="logSection sectionLogin">
                <h2>Login</h2>
                <form
                    onSubmit={loginHandler}
                >
                    <Input
                        id="email"
                        label="Your E-mail"
                        type="email"
                        control="input"
                        name="email"
                    />
                    <Input
                        id="password"
                        label="Your Password"
                        type="password"
                        control="input"
                        name="password"
                    />
                    <SubmitBtn
                        id="submit"
                        name="Login"
                        type="submit"
                    />
                </form>
                <p>Don't have account ? <Link to="/signup">Sign up here</Link></p>
            </div>
            <div className="logSection">
                <h1>Welcome in Park</h1>
                <p>You must be connected to use our application</p>
            </div>
        </section>
    )
}