import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFetchData, usePostData } from './useCustomHooks'
import Login from './Login';
import Admin from './Admin';

function Team() {
    const roll_id = localStorage.getItem("roll_id")
    const navigate = useNavigate();
    const [projects_list, setProjectList] = useState([])
    const [member_list, setMemberList] = useState([])
    const getProjects = async () => {
        const data = await useFetchData("project/get", 'GET')
        if (data.status) {
            setProjectList(data.data)
        }
    }
    const getMembers = async () => {
        const data = await useFetchData("getuser", 'GET')
        if (data.status) {
            setMemberList(data.data)
        }
        
    }
    useEffect(() => {
        getProjects()
        getMembers()
    }, [])
    useEffect(() => {
        // console.log("member_list", member_list);
        
    }, [projects_list, member_list])

    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("roll_id")
        navigate('/login')
    }
    return (
        <>
            <h1>Team Page</h1>
            <section className="registration-form-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="forms">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h2>Project List</h2>
                                            </div>
                                            <div className="col-md-6 text-end">
                                                {roll_id == 2 ? <Link to='/admin' className="me-3">Go To Admin</Link> : ''}
                                                <button onClick={logOut} className="btn btn-primary">Log Out</button>
                                            </div>
                                        </div>
                                        <div className="project-list">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr. no.</th>
                                                        <th scope="col">Project Name</th>
                                                        <th scope="col">Assine</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {projects_list.length > 0 ? (
                                                        projects_list.map((item, index) => (
                                                            <tr key={item._id}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{item.project}</td>
                                                                <td>{item.assignName}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h2>All Team Members List</h2>
                                        <div className="project-list">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr. no.</th>
                                                        <th scope="col">Members Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {member_list.length > 0 ? (
                                                        member_list.map((item, index) => (
                                                            <tr key={item._id}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Team
