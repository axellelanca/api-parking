import React, {useEffect, useState} from 'react';
import {SingleSpot} from "../../SingleSpot/SingleSpot";

export const AdminPage = (props) => {
    
        const [spots, setSpots] = useState([]);


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

        useEffect(() => {
            getSpots();
        }, []);
        
    
    
        return (
            <div>
                <h1>Admin Page</h1>
                <h2>Spots</h2>
                
                {spots.map(spot => (
                <SingleSpot
                    key={spot._id}
                    number={spot.num}
                    floor={spot.floor}
                    available={spot.available}
                />
                )
                )}
        
            </div>
        );
}