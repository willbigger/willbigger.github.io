import React from "react";
import Button from 'react-bootstrap/Button'

function SubmitButton({ onClick }) {
    return (
        <div>
            <Button onClick={onClick} style={{backgroundColor: '#E57200', borderColor: '#E57200'}}>Submit</Button>
        </div>
    );
}

export default SubmitButton;