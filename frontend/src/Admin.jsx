import { useState } from "react"

function Admin() {
  const [project, setProject] = useState()
  const projectFormHandler = async (e) => {
        e.preventDefault()
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         // "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     // Automatically converted to "username=example&password=password"
        //     // body: new URLSearchParams({ email, password }),
        //     body: JSON.stringify({ name, email, password })
        // });
        // const data = await response.json();
        console.log("data", project);
    }
  return (
    <>
      <h2>Admin page</h2>
      <section className="registration-form-section">
        <div className="container">
          <div className="row form-alignment">
            <div className="col-md-6">
              <div className="forms">
                <h2>Create New Project</h2>
                <form onSubmit={projectFormHandler}>
                  <div className="form-group mb-2">
                    <label htmlFor="project">Project Name</label>
                    <input type="text" onChange={(e) => setProject(e.target.value)} className="form-control" id="project" placeholder="Project name" />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <a href="javascript:void(0);" onClick={() => setRegiser(!isRegister)}>Already have a account.</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Admin
