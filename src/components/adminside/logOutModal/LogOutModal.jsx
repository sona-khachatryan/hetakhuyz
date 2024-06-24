import React from 'react';
import './logOutModal.style.scss';
function LogOutModal({onClose, handleLogout}) {

    return (
        <div className='logout-modal_container' id='logout_container' onClick={onClose}>
            <div className='logout-modal_content'>
                <p>
                    Դուք համոզվա՞ծ եք, որ ցանկանում եք դուրս գալ
                </p>
                <button onClick={handleLogout}>Դուրս գալ</button>

                <div className='close_btn' id='close_btn' onClick={onClose}>x</div>
            </div>
        </div>
    );
}

export default LogOutModal;