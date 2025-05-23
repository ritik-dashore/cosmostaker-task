import { useState } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import { useLogin, usePostData } from './useCustomHooks'
import { ToastContainer, toast } from 'react-toastify';
import Admin from './Admin'

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setRegiser] = useState(true)
    const [formsubmit, setFormsubmit] = useState(false)
    const loginFormHandler = async (e) => {
        e.preventDefault()
        setFormsubmit(true)
        if (!name && !email && !password) {
            notification("All fields are required.", 'warning')
            return
        }
        const data = await useLogin('login', 'POST', { email, password });
        console.log("data", data);
        if (!data.status) {
            notification(data.message, 'error')
        }
        if (data.status) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("roll_id", data.roll_id)
            setFormsubmit(false)
            if (data.roll_id == 2) {
                notification(data.message, 'success')
                navigate("/admin");       
            }
            if (data.roll_id == 1) {
                notification(data.message, 'success')
                navigate("/team");
            }
        }
    }

    const registrationFormHandler = async (e) => {
        try {
            e.preventDefault()
            setFormsubmit(true)
            if (!name && !email && !password) {
                notification("All fields are required.", 'warning')
                return
            }
            const data = await usePostData('registration', 'POST', { name, email, password })
                console.log("data.status", data.status);
            if (!data.status) {
                console.log("data.status", data.status);
                notification(data.message, 'error')
            }
            if (data.status) {
                console.log("data.status", data.status);
                notification(data.message, 'success')
                setFormsubmit(false)
            }
            
        } catch (err) {
            console.log(err);
            notification('Something went wrong.', 'error')
        }
        
        // console.log("data", data);
        
    }
    const notification = (message, type) => toast[type](message);
    
    return (
        <>
            {isRegister ?
                <section className="login-form-section">
                    <div className="container">
                        <div className="row justify-content-center form-alignment">
                            <div className="col-md-6">
                                <div className="forms">
                                    <h2>Member Login Form</h2>
                                    <form onSubmit={loginFormHandler}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} className="form-control" id="emailhelp" aria-describedby="emailHelp" placeholder="Enter email" />
                                            {!email && formsubmit ? <small id="emailhelp" className="form-text text-danger">This field is reuired.</small> : ''}
                                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())} className="form-control" id="password" placeholder="Password" />
                                            {!password && formsubmit ? <small id="passwordhelp" className="form-text text-danger">This field is reuired.</small> : ''}
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                    <a href="javascript:void(0);" onClick={() => setRegiser(!isRegister)}>Create Member102</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="registration-form-section">
                    <div className="container">
                        <div className="row justify-content-center form-alignment">
                            <div className="col-md-6">
                                <div className="forms">
                                    <h2>Member Registration  Form</h2>
                                    <form onSubmit={registrationFormHandler}>
                                        <div className="form-group">
                                            <label htmlFor="name">Member Name</label>
                                            <input type="text" onChange={(e) => setName(e.target.value.trim())} className="form-control" id="name" aria-describedby="namehelp" placeholder="Enter name" />
                                            {!name && formsubmit ? <small id="namehelp" className="form-text text-danger">This field is reuired.</small> : ''}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" onChange={(e) => setEmail(e.target.value.trim())} className="form-control" id="email" aria-describedby="emailhelp" placeholder="Enter email" />
                                            {!email && formsubmit ? <small id="emailhelp" className="form-text text-danger">This field is reuired.</small> : ''}
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" onChange={(e) => setPassword(e.target.value.trim())} className="form-control" id="password" aria-describedby="passwordhelp" placeholder="Enter Password" />
                                            {!password && formsubmit ? <small id="passwordhelp" className="form-text text-danger">This field is reuired.</small> : ''}
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                    <a href="javascript:void(0);" onClick={() => setRegiser(!isRegister)}>Already have a account.</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            <ToastContainer />

        </>
    )
}

export default Login
