import React, {useEffect, useState} from 'react';
import {SingleSpot} from "../../SingleSpot/SingleSpot";
import {SingleUser} from "../../../../components/users/SingleUsers";
import './pages.css';

export const AdminPage = (props) => {
    
        const [spots, setSpots] = useState([]);
        const [allUsers, setUsers] = useState([]);

        //function pour fetch sans avoir a le faire  2 fois
       
        const getSpots = () => {
            fetch('/parking/spots', {
                headers: {
                    Authorization: 'Bearer ' + props.token  
                }
            })
                .then(res => {
                    if(res.status !== 200) {
                        throw new Error('Failed to fetch spot.');
                    }
                    return res.json();
                })
                .then(resData => {
                    console.log(resData);
                    setSpots(resData.spots);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        const getAllUsers = () => {
            fetch('/users',{
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
                .then(res => {
                    if(res.status !== 200) {
                        throw new Error('Failed to fetch spot.');
                    }
                    return res.json();
                })
                .then(data =>{
                    console.log(data.users)
                    setUsers(data.users);
                })
                .catch(err => {
                    console.log(err)
                })
        }

        useEffect(() => {
            getSpots();
            getAllUsers();
        }, []);
        
    
    
        return (
            <div>
                <h1>Admin Page</h1>
                <h2>Spots</h2>
                <section id="slotSection">
                {spots.map(spot => (
                <SingleSpot
                    key={spot._id}
                    number={spot.num}
                    floor={spot.floor}
                    available={spot.available}
                />
                )
                )}
                </section>
                <p>-----------------------------------------------------------</p>
                {allUsers.map(user => (
                <SingleUser
                    key={user._id}
                    firstname={user.firstName}
                    lastname={user.lastName}
                    email={user.email}
                    spot={user.spot}
                />
                )
                )}
            </div>
        );
}