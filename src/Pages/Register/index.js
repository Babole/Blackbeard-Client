import React from "react"

const Register = () => {
    // const navigate = useNavigate();
  return (
    <div>
    <div className="content-section">
        <form action="" method="POST">
            
            <fieldset className="form-group">
                <legend className="border-bottom mb-4">Register to play</legend>
                <div className="form-group">
                    <label name="username">Username</label>
                    <input
                        type="username"
                        name="username"
                        className="form-control mt-1"
                        placeholder="Enter username"
                        />
                </div>
                <div className="form-group">
                    <label name="password">Password</label>
                    <input
                    type="password"
                    name="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <label name="confirm_password">Confirm Password</label>
                    <input
                    type="password"
                    name="confirm_password"
                    className="form-control mt-1"
                    placeholder="Confirm password"
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
            Already have an account? <a href='/login' className="ml-2">Sign In</a>
        </small>
    </div>

    </div>
  )
};

export default Register;
