import { useEffect, useState } from "react"
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useFetchData, usePostData } from './useCustomHooks'
import { ToastContainer, toast } from 'react-toastify';

function Admin() {
  const roll_id = localStorage.getItem("roll_id")
  if (roll_id != 2) {
        return <Navigate to="/team" />;
    }
  const navigate = useNavigate();
  const [projects_list, setProjectList] = useState([])
  const [team_list, setTeamList] = useState([])
  const [projectsName, setProjectsName] = useState()
  const [assignName, setAssignName] = useState([])
  const [taskName, setTaskName] = useState([])
  const [id, setId] = useState('')
  const getProjects = async () => {
    const result = await useFetchData('project/get', 'GET')    
    if (result.status) {
      setProjectList(result.data)
    }
  }
  const getTeam = async () => {
    const token = localStorage.getItem('token')
    const result = await useFetchData('getuser', 'GET')
    if (result.status) {
      setTeamList(result.data)
    }
  }

  useEffect(() => {
    getProjects()
    getTeam()
  }, [])
  useEffect(() => {
    // console.log("Updated project", projects_list)
    // console.log("Updated project", team_list)
  }, [projects_list, team_list])

  const projectFormHandler = async (e) => {
    e.preventDefault()
    if (id) {
      const data = await usePostData('project/update', 'PUT', { id, projectsName, assignName })
      console.log("data", data);
      notification(data.message, 'success')
      setId('')
      setProjectsName('')
    }else{
      console.log("projectsName", projectsName, assignName);
      const data = await usePostData('project/create', 'POST', { projectsName, assignName })
      console.log("data", data);
      if (!data.status) {
        notification(data.message, 'error')
      }
      if (data.status) {
        notification(data.message, 'success')
      }
      
    }
    getProjects()
  }
  const projectEdit = (id) =>{
    const projectDetails = projects_list.filter((item)=>item._id == id)
    console.log("projectDetails", projectDetails);
    setId(id)
    setProjectsName(projectDetails[0].project)
    setAssignName(projectDetails[0].assignName)
    
  }
  const projectDeleteHandler = async (id) => {
    const data = await usePostData('project/delete', 'DELETE', { id })
    console.log("data", data);
    
    notification(data.message, 'success')
    getProjects()

  }

  const logOut = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("roll_id")
    notification("Successfully Logout.", 'success')
    navigate('/login')

  }
  const notification = (message, type) => toast[type](message);

  return (
    <>
      <section className="registration-form-section mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="forms">
                <div className="row">
                  <div className="col-md-6">
                    <h2>Create New Project</h2>
                  </div>
                  <div className="col-md-6 text-end">
                    <Link to='/team' className="me-3">Go To Team</Link>
                    <button onClick={logOut} className="btn btn-primary">Log Out</button>
                  </div>
                </div>
                <form onSubmit={projectFormHandler}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="project">Project Name</label>
                        <input type="text" value={projectsName} onChange={(e) => setProjectsName(e.target.value)} className="form-control" id="project" placeholder="Project Name" />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="project">Select Project Assign</label>
                        <select value={assignName.toString()} className="form-select" onChange={(e) => setAssignName(e.target.value)} aria-label="Default select example">
                          <option defaultValue>Select Assign</option>
                          {team_list.map((team, index) => (<option key={index} value={team.name}>{team.name}</option>))}
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="project">Project Task</label>
                        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="form-control" id="project" placeholder="Project Task" />
                      </div>
                    </div> */}
                    <div className="col-md-3 align-self-end">
                      <button type="submit" className="btn btn-primary">{id? 'Edit Project':'Add Project'}</button>
                    </div>
                  </div>
                </form>
                <div className="project-list">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sr. no.</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Assine</th>
                        <th scope="col" colSpan={2}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects_list.length > 0 ? (
                        projects_list.map((item, index) => (
                          <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.project}</td>
                            <td>{item.assignName}</td>
                            <td onClick={() => projectEdit(item._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                              </svg>
                            </td>
                            <td onClick={() => projectDeleteHandler(item._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                              </svg>
                            </td>
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
        <ToastContainer />
      </section>
    </>
  )
}

export default Admin
