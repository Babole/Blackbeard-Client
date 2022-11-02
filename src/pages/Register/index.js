import {React, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(false)
    },[])

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
            
            // const resp = await fetch("http://0.0.0.0:5001/login", options);
            const resp = await fetch("https://black-beard-island.herokuapp.com/login", options);
            if (resp.status === 201){
                alert("Username already exist, please choose a different username")
            } else {
                // const resp = await fetch("http://0.0.0.0:5001/register", options);
                const resp = await fetch("https://black-beard-island.herokuapp.com/register", options);
                console.log(resp.status)

                if (resp.status === 201){
                    alert("Register success! Enjoy the game")
                    // Skip login page -> grab token from login API -> redirect user to home
                    const resp = await fetch("https://black-beard-island.herokuapp.com/login", options)
                    const data = resp.json()
                    data.then((data) => {
                        sessionStorage.setItem("token", data.token)
                    })
                    sessionStorage.setItem("username", username)
                    navigate("/home")
                }
            }

        } catch(err){
            console.log(err)
        }
        
    }

    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
        <div className="menu-img-reg" role="main">
            {loading? <h2>Loading ...</h2> :
            <>
            <div className="content-section container-reg"
               style={{paddingBottom: '1.3rem'}} 
            >
                <form action="" method="POST" onSubmit={handleRegister} >
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
                        <div className="form-group" style={{margin: '0.5rem 0rem'}}>
                            <button type="submit" className="btn btn-primary" data-testid="submit-btn">Submit</button>
                        </div>
                        <div>
                        <small className="text-muted" data-testid="redirect-btn"
                        style={{display: 'flex', gap:'1rem', margin: '1rem 0rem'}}>
                            Already have an account? <small className="signInUp-redirect" onClick={() => {navigate('/')}}style={{marginLeft: '1rem'}}>Sign In</small>

                        </small>
                </div>
                </form>
                
            </div>

            </>
            }
        </div>
        </div>
    )
};

export default Register;
