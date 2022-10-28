import React from "react"

const Register = () => {

  return (
    <div>
       <div class="content-section">
        <form action="" method="POST">
            
            <fieldset class="form-group">
                <legend class="border-bottom mb-4">Login to play</legend>
                <p></p>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </fieldset>
        </form>
    </div>

    <div class="border-top pt-3">
        <small class="text-muted">
            Don't have have an account? <a class="ml-2" href="/register">Sign Up</a>
        </small>
    </div>
    </div>
  )
};

export default Register;
