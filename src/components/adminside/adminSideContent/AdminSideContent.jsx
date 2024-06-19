import './adminSideContent.style.scss';
import {useEffect, useState} from "react";
import {Link, useNavigate, useLocation, Outlet} from "react-router-dom";

function AdminSideContent(props) {
    const [activeHeading, setActiveHeading] = useState();
    
    const navigate = useNavigate();
    const {pathname} = useLocation();
    
    useEffect(()=> {
        navigate('/new-admin/add');
    },[])

    useEffect(() => {
        if(pathname.includes('add')) {
            setActiveHeading('add');
        } else if (pathname.includes('edit')) {
            setActiveHeading('edit');
        }
    }, [pathname]);
    

    return (
        <div className='adminSideContent container'>
            <div className='asc_menu'>
                <Link to='/new-admin/edit'>
                    <p className={activeHeading === 'edit' ? 'asc_activeHeading' : ''}>
                        Խմբագրել
                    </p>
                </Link>
                <Link to='/new-admin/add'>
                    <p className={activeHeading === 'add' ? 'asc_activeHeading' : ''}>
                        Ավելացնել
                    </p>
                </Link>
            </div>
            <div className='asc-content'>
                <div className='asc_long-heading'>
                    {pathname.includes('add')
                        ?
                        'Ավելացնել նոր նյութ'
                        :
                        'Խմբագրել նյութը'
                    }
                </div>
                <Outlet/> 
            </div>
        </div>
    );
}

export default AdminSideContent;