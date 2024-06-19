import './adminSide.style.scss';
import React, {useEffect, useState} from 'react';
import axios from "../adminside/interceptor.js";
import {NavLink} from "react-router-dom";
import AdminSignIn from "./adminSignIn/AdminSignIn.jsx";
import AdminSideContent from "./adminSideContent/AdminSideContent.jsx";

function AdminSide(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if(!accessToken || !refreshToken){
            axios.get('/admin/authMe').then(({data}) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setIsAuthenticated(true);
            });
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768)
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='adminSide container'>
            <header className='adminSide_header'>
                <NavLink className='adminSide_logo'  to="/"><img className='adminSide_logo' src="/img/Hetaxuyz%20LOGO.svg" alt="Հետախույզ լրատվական լոգո"/></NavLink>
                {isAuthenticated ?
                    <div className='adminSide_logout-btn'>
                        {isSmallScreen ?
                            <img src='/img/Logout.svg' alt='Դուրս գալ'/>
                            :
                            'Դուրս գալ'
                        }
                    </div>
                    :
                    ''
                }
            </header>
            <main>
                {isAuthenticated ?
                    <AdminSideContent/>
                    :
                    <AdminSignIn setIsAuthenticated={setIsAuthenticated}/>
                }
            </main>
        </div>
    );
}

export default AdminSide;