import React from 'react'
import './home.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../../components/topbar/Topbar'
import Recruiter from '../../components/recruiter/Recruiter'
import Student from '../../components/student/Student'

export default function Home() {
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");
    // const url = 'http://localhost:3001';
    const url = 'https://jobeasyapi.herokuapp.com';
    const userURL = `${url}/users/${userId}`;

    useEffect(() => {
        // get logged in user id
        const fetchData = async() => {
            const response = await axios(userURL);
            const data = await response;
            setData(data.data.other);
        };
        fetchData();
    }, [userURL]);

    return (
        <div>
            <Topbar />
            {
                data.isRecruiter
                ? <Recruiter data={data} />
                : <Student data={data} />
            }
        </div>
    )
}
