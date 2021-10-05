import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Jobs from '../jobs/Jobs';
import './student.css'

export default function Student({ data }) {
    const [jobs, setJobs] = useState([]);
    // const url = 'http://localhost:3001';
    const url = 'https://jobeasyapi.herokuapp.com';
    const postsURL = `${url}/posts/all`;

    useEffect(() => {
        // get all job posts
        const fetchData = async() => {
            const response = await axios(postsURL);
            const data = await response;
            setJobs(data.data);
        };
        fetchData();
    }, [postsURL]);

    return (
        <div className="student_container">
            <h3 className="student_welcome">Welcome {data.username}!</h3>
            <p className="posted_heading">Posted Jobs:</p>
            {
                jobs.map(job=>(
                    <Jobs key={job._id} job={job} isRecruiter={data.isRecruiter} userId={data._id}/>
                ))
            }
        </div>
    )
}
