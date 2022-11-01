import { React, useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault()
        const loginData = {
            "username": username,
            "password": password
        }
        console.log(loginData)

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        }

        try {
            // cannot use localhost on Mac
            // AND no 'https' becuase it cannot pass security check
            const resp = await fetch("http://127.0.0.1:5000/login", options);
            console.log(resp.status)
            sessionStorage.setItem("username", username)
            navigate("/home")
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="menu-img-thick" role="main">
            <div className="content-section container-login">
                <form action="" method="POST" onSubmit={handleLogin}>
                    <h3>LOGIN</h3>
                    <div className="form-group">
                        <label name="username">Username</label>
                        <input
                            type="username"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label name="password">Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" data-testid="submit-btn">Submit</button>
                    </div>
                    <div>
                        <small className="text-muted">
                            Don't have have an account? <a className="ml-2" href="/register">Sign Up</a>
                        </small>
                    </div>
                </form>
            </div>

        </div>
    )

};

export default Login;
