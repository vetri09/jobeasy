import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import useForm from '../../components/hooks/useForm'

export default function Login() {
    // hooks
    const { handle_change, values, handle_login, error } = useForm({initialValues: {
        email:'',
        password: ''
    }})
    return (
        <div className="background">
            <div className="login_container">
            <div className="login_content">
                <div className="login_form">
                    {/* form */}
                    <h1 className="login_heading"><Link to="/">JobEasy</Link></h1>
                    <h1>Login</h1>
                    { error && <p className="errorMessage">{error.messages}</p> }
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter email" name={"email"} onChange={handle_change} value={values.email}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter password" name={"password"} onChange={handle_change} value={values.password}/>
                    <button className="auth_btn" onClick={handle_login}>Login</button>
                    <p>New Here? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
        </div>
    )
}
