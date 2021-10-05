import React from 'react'
import './topbar.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Topbar() {
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");
    // const url = 'http://localhost:3001';
    const url = 'https://jobeasyapi.herokuapp.com';
    const userURL = `${url}/users/${userId}`;

    useEffect(() => {
        // get the logged in user id
        const fetchData = async() => {
            const response = await axios(userURL);
            const data = await response;
            setData(data.data.other);
        };
        fetchData();
    }, [userURL]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

    return (
        <div className="topbar_container">
            <div className="topbar_left">
                <Link to={`/`} style={{textDecoration:'none'}} className="userprofile"> 
                    <h1>JobEasy</h1>
                </Link>
            </div>
            <div className="topbar_right">
                <Link to={`/profile/${data.username}`} style={{textDecoration:'none'}} className="userprofile"> 
                    <img src={data.profilePicture} alt="profilePic" className="nav_profile_pic"/>
                    <p>{data.username}</p>
                </Link>
                <Link to={`/login`} style={{textDecoration:'none'}} onClick={handleLogout}> 
                    <p className="logout_btn">logout</p>
                </Link>
            </div>
        </div>
    )
}
