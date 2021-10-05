import React from 'react'
import "./Landingpage.css"
import { Link } from 'react-router-dom' 

export default function Landingpage() {
    return (
        <div className="background">
            <div className="landingpage_container">
            <h1 className="landingpage_heading">JobEasy</h1>
            <p className="landingpage_content">Simpler way to apply for jobs</p>
            <div className="landingpage_btns">
                <Link to="/signup">
                    <button className="landingpage_btn">Sign up</button>
                </Link>
                <Link to="/login">
                    <button className="landingpage_btn">Login</button>
                </Link>
            </div>
        </div>
        </div>
    )
}
