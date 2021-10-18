import React from "react";
import Button from 'react-bootstrap/Button'

function SubmitButton({ onClick }) {
    return (
        <div>
            <Button variant='success' onClick={onClick} >Submit</Button>
        </div>
    );
}

export default SubmitButton;