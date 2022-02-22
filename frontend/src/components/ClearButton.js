import React from "react";
import Button from 'react-bootstrap/Button'

function SubmitButton({ onClear }) {
    return (
        <div>
            <Button onClick={onClear} style={{backgroundColor: '#232D4B', borderColor: '#232D4B'}} >Clear</Button>
        </div>
    );
}

export default SubmitButton;