import './adminSide.style.scss';
import {useEffect, useState} from 'react';
import axios from "../adminside/interceptor.js";
import {NavLink, useNavigate} from "react-router-dom";
import AdminSignIn from "./adminSignIn/AdminSignIn.jsx";
import AdminSideContent from "./adminSideContent/AdminSideContent.jsx";
import LogOutModal from "./logOutModal/LogOutModal.jsx";

function AdminSide(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState();
    const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if(accessToken !== undefined || refreshToken !== undefined){
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

    const closeLogoutModal = (e) => {
        e.stopPropagation()
        if(e.target.id === 'logout_container' || e.target.id === 'close_btn') {
            setLogoutModalIsOpen(false);
        }
    }

    const handleLogout = () => {
        setLogoutModalIsOpen(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        navigate('/admin');
        console.log('logged out')
    };

    return (
        <div className='adminSide container'>
            <header className='adminSide_header'>
                <NavLink className='adminSide_logo'  to="/"><img className='adminSide_logo' src="/img/Hetaxuyz%20LOGO.svg" alt="Հետախույզ լրատվական լոգո"/></NavLink>
                {isAuthenticated ?
                    <>
                        <div className='adminSide_logout-btn' onClick={() => setLogoutModalIsOpen(true)}>
                            {isSmallScreen ?
                                <img src='/img/Logout.svg' alt='Դուրս գալ'/>
                                :
                                'Դուրս գալ'
                            }
                        </div>
                        {logoutModalIsOpen ? <LogOutModal onClose={closeLogoutModal} handleLogout={handleLogout}/> : ''}
                    </>
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