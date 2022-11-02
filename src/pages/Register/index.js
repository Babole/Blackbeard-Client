import {React, useState} from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()

        const registerData = {
            username: username,
            password: password
        }

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registerData)
        }
        
        try{
            
            const resp = await fetch("http://127.0.0.1:5000/login", options);
            if (resp.status === 201){
                alert("Username already exist, please choose a different username")
            } else {
                const resp = await fetch("http://127.0.0.1:5000/register", options);
                console.log(resp.status)
            }
            sessionStorage.setItem("username", username)
            alert("Register success! Head to Login Page")
            navigate("/")
        } catch(err){
            console.log(err)
        }
        
    }

    return (
        <div className="menu-img-reg" role="main">
            <div className="content-section container-reg">
                <form action="" method="POST" onSubmit={handleRegister}>
                        <h3>REGISTER</h3>
                        <div className="form-group">
                            <label aria-label="username" name="username">Username</label>
                            <input
                                type="username"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label name="password" aria-label="password" >Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            <label name="confirm_password"
                            aria-label="confirm password"
                            >Confirm Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Confirm password"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" data-testid="submit-btn">Submit</button>
                        </div>
                </form>
            <div>
                <small className="text-muted" data-testid="redirect-btn">
                    Already have an account? <a href='/' className="ml-2">Sign In</a>
                </small>
            </div>
            </div>


        </div>
    )
};

export default Register;
