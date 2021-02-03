import React from 'react';

const Button = ({ text }) => {
    return (
        <div className="btn-container">
            <div className="btn">
                {text}
            </div>
        </div>
    );
}

export default Button;