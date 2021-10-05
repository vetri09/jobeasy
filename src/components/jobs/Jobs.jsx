import React, { useState } from 'react'
import './jobs.css'
import { format } from 'timeago.js';
import Applicants from '../applicants/Applicants';
import axios from 'axios';

export default function Jobs({job, isRecruiter, userId}) {
    const [viewDetails, setViewDetails] = useState(false);
    const [viewApplicants, setViewApplicants] = useState(false);

    // const url = 'http://localhost:3001';
    const url = 'https://jobeasyapi.herokuapp.com';

    const handle_apply = async () => {
        try {
            await axios ({
            method: 'PUT',
            url: `${url}/posts/apply/${job._id}`,
            data: {
            userId: userId
            }
            }).then(res => {
                console.log(res);
                window.location.reload(false);
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div key={job._id} className="job_container">
            <div className="job_main_content">
                <p className="job_title">{job.jobtitle}</p>
                <p className="job_company">{job.company}</p> 
                <p className="job_applicants">No. of applicants: {job.applicants.length}</p>
                <p className="job_location">{job.location} <span className="postDate">{format(job.createdAt)}</span></p>
                { viewDetails
                ?<>
                    <h4>Job Details:</h4>
                    <p>{job.jobdescription}</p>
                </>
                : null }
                { viewApplicants
                ?<>
                    <h4>Job Applicants:</h4>
                    <Applicants applicants={job.applicants}/>
                </>
                : null }
            </div>
            <div className="job_side_content">
                <button className="job_btns" onClick={()=>{ viewDetails ? setViewDetails(false) : setViewDetails(true) }}>View details</button>
                {
                    isRecruiter
                    ?
                    <button className="job_btns"
                        onClick={()=>{ viewApplicants ? setViewApplicants(false) : setViewApplicants(true) }}
                    >See applicants</button>
                    :
                    job.applicants.includes(userId)
                    ? <button className="job_btns_applied">Applied</button>
                    : <button className="job_btns" onClick={handle_apply}>Apply</button>
                }
            </div>
        </div>
    )
}
