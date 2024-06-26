import './editContent.style.scss';
import {useContext, useEffect, useState} from 'react';
import AdminSideDropdowns from "../adminSideDropdowns/AdminSideDropdowns.jsx";
import {getDataToEdit} from "../../../api/fetchData.js";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import EditContentList from "./EditContentList.jsx";
import {Outlet, useLocation} from "react-router-dom";

function EditContentMain(props) {
    const selectedStates = useContext(SelectedValueContext);
    const [selectedSection] = selectedStates.section;
    const [selectedSubsection] = selectedStates.subsection;
    const [selectedNewsType] = selectedStates.newsType;
    const [newsToEdit, setNewsToEdit] = useState([]);

    const {pathname} = useLocation();

    useEffect(() => {
        setNewsToEdit([]);
    }, [pathname]);

    useEffect( () => {
       getDataToEdit(selectedSection, selectedSubsection, selectedNewsType).then(res => setNewsToEdit(res));
    }, [selectedSection.title, selectedSubsection.title, selectedNewsType.title]);

    return (
        <div>
            {pathname.endsWith('edit') 
                ?
                    <>
                        <AdminSideDropdowns/>
                        <EditContentList newsList={newsToEdit}/>
                    </>
                :
                    <Outlet/>
            }
        </div>
    );
}

export default EditContentMain;