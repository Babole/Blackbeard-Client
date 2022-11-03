import React from "react"
import { useNavigate } from "react-router-dom";
const Error = () => {

    const navigate = useNavigate()

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Hmmm... seems like you're a bit lost</h2>
                <div className='scoreboard-btn scoreboard-text' style={{ width: '5rem' }} onClick={() => { navigate('/home') }}>Home</div>
            </div>
        </div>
    )
};

export default Error;