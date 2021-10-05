import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Topbar from '../../components/topbar/Topbar';
import './profile.css'

export default function Profile() {
    const { username } = useParams();
    // const url = 'http://localhost:3001';
    const url = 'https://jobeasyapi.herokuapp.com';
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // fetch user by name
        const fetchUserByName = async () => {
            const user = await axios.get(`${url}/users/profile/find/?username=${username}`);
            setUserData(user.data.other);
        }
        fetchUserByName();
    }, [username])
    // console.log(userData)

    return (
        <div>
            <Topbar />
            <div className="profile_container">
                <div className="profile_main">
                    <img src={userData.profilePicture} alt="profilePicture" />
                    <p className="profile_name">{userData.username}</p>
                    <p className="profile_email">{userData.email}</p>
                    <p className="profile_email">{`LinkedIn: ${(userData.linkedIn!=="")?userData.linkedIn:"not updated"}`}</p>
                    <p className="profile_email">{`Github: ${(userData.github!=="")?userData.github:"not updated"}`}</p>
                </div>
            </div>
        </div>
    )
}
