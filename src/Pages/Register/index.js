import React from "react"

const Register = () => {
    // const navigate = useNavigate();
    return (
        <div role="main">
            <div class="content-section">
                <form action="" method="POST">

                    <fieldset class="form-group">
                        <legend class="border-bottom mb-4">Register to play</legend>
                        <div class="form-group">
                            <label>Username</label>
                            <input
                                type="username"
                                className="form-control mt-1"
                                placeholder="Enter username"
                            />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Confirm password"
                            />
                        </div>
                        <div class="form-group">
                            <button type="submit" className="btn btn-primary" role="button" data-testid="submit-btn">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div class="border-top pt-3">
                <small class="text-muted">
                    Already have an account? <a href='/login' class="ml-2">Sign In</a>
                </small>
            </div>

        </div>
    )
};

export default Register;
