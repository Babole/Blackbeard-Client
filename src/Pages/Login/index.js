import {React, useState }from "react"
import httpClient from "../../httpClient";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


    const handleLogin  = async (e) => {
        e.preventDefault()
        console.log(username, password)
        sessionStorage.setItem("username", username)
        // const resp = await httpClient.post("//localhost:5000/login", {
        const resp = await axios.post("//localhost:5000/login", {
            username,
            password
        })

        console.log(resp.data)
        
    }

  return (
    <div>
       <div className="content-section">
        <form action="" method="POST" onSubmit={handleLogin}>
            
            <fieldset className="form-group">
                <legend className="border-bottom mb-4">Login to play</legend>
                <p></p>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="username"
                        className="form-control mt-1"
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </fieldset>
        </form>
    </div>

    <div className="border-top pt-3">
        <small className="text-muted">
            Don't have have an account? <a className="ml-2" href="/register">Sign Up</a>
        </small>
    </div>
    </div>
  )
};

export default Register;
