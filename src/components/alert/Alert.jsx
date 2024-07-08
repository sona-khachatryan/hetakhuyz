import './alert.style.scss';
import React from 'react';

function Alert({onClose, alert}) {
    return (
        <div className='alert_container' id='alert_container' onClick={onClose}>
            <div className='alert_content'>
                <p>
                    {alert}
                </p>
                <div className='close_btn' id='close_btn' onClick={onClose}>x</div>
            </div>
        </div>
    );
}

export default Alert;