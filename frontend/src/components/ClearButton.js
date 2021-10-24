import React from "react";
import Button from 'react-bootstrap/Button'

function SubmitButton({ onClear }) {
    return (
        <div>
            <Button variant='warning' onClick={onClear} >Clear</Button>
        </div>
    );
}

export default SubmitButton;