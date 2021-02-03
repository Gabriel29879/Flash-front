import React from 'react';

const Button = ({ text, onClick }) => {
    return (
        <div className="btn-container">
            <div className="btn" onClick={onClick}>
                {text}
            </div>
        </div>
    );
}

export default Button;