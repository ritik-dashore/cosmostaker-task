import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Admin from './Admin'
function Login() {
    // const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setRegiser] = useState(true)
    const url = 'http://localhost:3000/Cosmostaker/api/login'
    const loginFormHandler = async (e) => {
        e.preventDefault()
        if (true) {
            <navigate to='/admin'>{<Admin />}</navigate>
        }

        console.log("email", password, email);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            // Automatically converted to "username=example&password=password"
            // body: new URLSearchParams({ email, password }),
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("roll_id", data.roll_id)
            navigate("/");
        }
    }

    const registrationFormHandler = async (e) => {
        e.preventDefault()
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            // Automatically converted to "username=example&password=password"
            // body: new URLSearchParams({ email, password }),
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        console.log("data", data);
    }
    return (
        <>
            {isRegister ?
                <section className="login-form-section">
                    <div className="container">
                        <div className="row justify-content-center form-alignment">
                            <div className="col-md-6">
                                <div className="forms">
                                    <h2>User Login Form</h2>
                                    <form onSubmit={loginFormHandler}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                    <a href="javascript:void(0);" onClick={() => setRegiser(!isRegister)}>Create user</a>
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
                                    <h2>User Registration  Form</h2>
                                    <form onSubmit={registrationFormHandler}>
                                        <div className="form-group">
                                            <label htmlFor="name">Email address</label>
                                            <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" />
                                            <small id="name" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                            <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Password" />
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
        </>
    )
}

export default Login
