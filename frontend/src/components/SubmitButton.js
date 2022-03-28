import React from "react";
import Button from 'react-bootstrap/Button'

function SubmitButton({ onClick }) {
    return (
        <div>
            <Button onClick={onClick} style={{backgroundColor: '#f55a1e', borderColor: '#f55a1e'}}>Submit</Button>
        </div>
    );
}

export default SubmitButton;