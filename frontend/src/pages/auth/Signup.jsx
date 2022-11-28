import React, {Fragment,useState} from 'react';
import { Link } from "react-router-dom";
import {Input} from "../../components/form/Input";
import {SubmitBtn} from "../../components/form/SubmitBtn";
import {Header} from "../../components/Header/Header";
import './Auth.css';


export const SignUp = () => {
    const [userInfos, setUserInfo] = useState({fName : "", lName : "", email : "", password :""})

    const HandleChangeEvent = (e) =>{
        const {value, name} = e.target;
        
        setUserInfo({
            ...userInfos,      
            [name]: value,
            })
    }

    const signUpHandler = (e, authData) => {
        console.log(`${userInfos.fName} ${userInfos.lName} ${userInfos.email} ${userInfos.password}`)
        e.preventDefault();

        fetch('/auth/signup',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Replace with form data
                firstName: authData.fName,
                lastName: authData.lName,
                password: authData.password,
                email: authData.email,
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
                onSubmit={e => signUpHandler(e, userInfos)}
            >
                <Input
                    id="fName"
                    label="Your first name"
                    type="text"
                    control="input"
                    name="fName"
                    value={userInfos.fName}
                    handler={HandleChangeEvent}
                    
                />
                <Input
                    id="lName"
                    label="Your last name"
                    type="text"
                    control="input"
                    name="lName"
                    value={userInfos.lName}
                    handler={HandleChangeEvent}
                />
                <Input
                    id="email"
                    label="Your E-mail"
                    type="email"
                    control="input"
                    name="email"
                    value={userInfos.email}
                    handler={HandleChangeEvent}
                />
                <Input
                    id="password"
                    label="Your Password"
                    type="password"
                    control="input"
                    name="password"
                    value={userInfos.password}
                    handler={HandleChangeEvent}
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
