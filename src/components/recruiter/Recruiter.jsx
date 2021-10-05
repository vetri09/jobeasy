import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Jobs from '../jobs/Jobs';
import useForm from '../../components/hooks/useForm'
import './recruiter.css'

export default function Recruiter({ data }) {
    const [postJob, setPostJob] = useState(false);
    const [jobs, setJobs] = useState([]);
    // hooks
    const { handle_change, values, handle_post, error } = useForm({initialValues: {
        jobdescription: '',
        location: '',
        company: '',
        jobtitle: '',
        userId: `${data._id}`
    }});

    // const url = 'http://localhost:3001';
    const url = 'https://jobeasyapi.herokuapp.com';
    const postsURL = `${url}/posts/jobposts/${data._id}`;

    useEffect(() => {
        // fetching recruiter posts
        const fetchData = async() => {
            const response = await axios(postsURL);
            const data = await response;
            setJobs(data.data);
        };
        fetchData();
    }, [postsURL]);

    return (
        <div className="recruiter_container">
            <h3 className="recruiter_welcome">Welcome {data.username}!</h3>
            {
                postJob
                ?
                <div className="post_job_box">
                    <div className="post_container">
                        { error && <p className="errorMessage">{error.messages}</p> }
                        <label htmlFor="jobtitle">Job Title:</label>
                        <input type="text" id="jobtitle" placeholder="Enter job title" name={"jobtitle"} onChange={handle_change} value={values.jobtitle}/>
                        <label htmlFor="company">Company:</label>
                        <input type="text" id="company" placeholder="Enter company" name={"company"} onChange={handle_change} value={values.company}/>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" placeholder="Enter location" name={"location"} onChange={handle_change} value={values.location}/>
                        <label htmlFor="jobdescription">Job Description:</label>
                        <textarea cols="20" rows="5" id="jobdescription" placeholder="Enter jobdescription" 
                        name={"jobdescription"} onChange={handle_change} value={values.jobdescription}
                        ></textarea>
                        <button className="post_job_btn" onClick={()=>{setPostJob(false)}}>Cancel</button>
                        <button className="post_job_btn" onClick={handle_post}>Post</button>
                    </div>
                </div>
                : <button className="post_job_btn" onClick={()=>{setPostJob(true)}}>Post Job</button>
            }
            <p className="posted_heading">Posted Jobs:</p>
            {
                jobs.map(job=>(
                    <Jobs key={job._id} job={job} isRecruiter={data.isRecruiter} />
                ))
            }
        </div>
    )
}
