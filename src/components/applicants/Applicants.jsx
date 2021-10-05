import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './applicant.css'

export default function Applicants({ applicants }) {
    const [arrayURL] = useState([]);
    const [applicantData, setApplicantData] = useState([]);

    // const url = 'http://localhost:3001';
    const url = 'https://jobeasyapi.herokuapp.com';
    applicants.map(applicantId=>(arrayURL.push(`${url}/users/${applicantId}`)))

    useEffect(() => {
        // fetching applicant details
        const fetchData = async () => {
            await Promise.all(
            arrayURL.map(async (url) => {
                const response = await axios(`${url}`)
                const res = await response;
                setApplicantData(oldArray => [...oldArray, res.data.other]);
            })
            )
        };

    fetchData();
    }, [arrayURL])

    // console.log(applicantData)

    return (
        <>
        {
            applicantData.map(applicant=>(
            <div key={applicant._id} className="applicant_details">
                <Link to={`/profile/${applicant.username}`} style={{textDecoration:'none'}} className="userprofile"> 
	                <img src={applicant.profilePicture} alt="profileImg" className="applicant_profile"/>
                    <p className="applicant_name">{applicant.username}</p>
                </Link>
            </div>
            ))
        }
        </>
    )
}
