import './adminSideContent.style.scss';
import {createContext, useEffect, useState} from "react";
import {Link, useLocation, Outlet} from "react-router-dom";

export const SelectedValueContext = createContext({});
function AdminSideContent(props) {
    const [activeHeading, setActiveHeading] = useState();

    const selectedSectionState = useState({});
    const selectedSubsectionState = useState({});
    const selectedNewsTypeState = useState({});
    const {pathname} = useLocation();

    useEffect(() => {
        if(pathname.includes('add')) {
            setActiveHeading('add');
        } else if (pathname.includes('edit')) {
            setActiveHeading('edit');
        }
    }, [pathname]);
    

    return (
        <SelectedValueContext.Provider value={{section: selectedSectionState, subsection: selectedSubsectionState, newsType: selectedNewsTypeState}}>
            <div className='adminSideContent container'>
                <div className='asc_menu'>
                    <Link to='/admin/edit'>
                        <p className={activeHeading === 'edit' ? 'asc_activeHeading' : ''}>
                            Խմբագրել
                        </p>
                    </Link>
                    <Link to='/admin/add'>
                        <p className={activeHeading === 'add' ? 'asc_activeHeading' : ''}>
                            Ավելացնել
                        </p>
                    </Link>
                </div>
                <div className='asc-content'>
                    {pathname.includes('add') || pathname.includes('edit') ? 
                        <div className='asc_long-heading'>
                            {pathname.includes('add')
                            ?
                            'Ավելացնել նոր նյութ'
                            :
                            'Խմբագրել նյութը'
                        }
                        </div> 
                        : ''}
                    <Outlet/>
                </div>
            </div>
        </SelectedValueContext.Provider>
    );
}

export default AdminSideContent;