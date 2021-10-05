import React from 'react'
import './signup.css'
import { Link } from 'react-router-dom' 
import useForm from '../../components/hooks/useForm'

export default function Signup() {
    // hooks
    const { handle_change, values, handle_signup, error } = useForm({initialValues: {
        email: '',
        username: '',
        password: '',
        isRecruiter:false
    }});
    return (
        <div className="background">
            <div className="signup_container">
            <div className="signup_content">
                <div className="signup_form">
                    {/* form */}
                    <h1 className="signup_heading"><Link to="/">JobEasy</Link></h1>
                    <h1>Sign up</h1>
                    { error && <p className="errorMessage">{error.messages}</p> }
                    <label htmlFor="username">Name:</label>
                    <input type="text" id="username" placeholder="Enter username" name={"username"} onChange={handle_change} value={values.username}/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter email" name={"email"} onChange={handle_change} value={values.email}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter password" name={"password"} onChange={handle_change} value={values.password}/>
                    <label htmlFor="isRecruiter"  className="input_checkbox">I'm a recruiter:
                    <input type="checkbox" id="isRecruiter" name={"isRecruiter"} onChange={handle_change} value={true} />
                    </label>
                    <button className="auth_btn" onClick={handle_signup}>Sign up</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
        </div>
    )
}
