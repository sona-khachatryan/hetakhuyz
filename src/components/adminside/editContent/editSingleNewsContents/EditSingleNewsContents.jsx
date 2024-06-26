import './editSingleNewsContents.style.scss';
import {useContext, useEffect, useState} from 'react';
import AdminSideDropdowns from "../../adminSideDropdowns/AdminSideDropdowns.jsx";
import {useLocation, useParams} from "react-router-dom";
import {SelectedValueContext} from "../../adminSideContent/AdminSideContent.jsx";
import {getSingleNewsToEdit} from "../../../../api/fetchData.js";
import ContentForm from "../../contentForm/ContentForm.jsx";

function EditSingleNewsContents(props) {

    const {id} = useParams();
    const {state} = useLocation();
    const [currentNews, setCurrentNews] = useState({});
    const selectedStates = useContext(SelectedValueContext);
    const [selectedSection, setSelectedSection] = selectedStates.section;
    const [selectedSubsection, setSelectedSubsection] = selectedStates.subsection;
    const [selectedNewsType, setSelectedNewsType] = selectedStates.newsType;

    useEffect(() => {
      getSingleNewsToEdit(setCurrentNews, setSelectedSection, setSelectedSubsection, setSelectedNewsType, id, state)
    },[])

    return (
        <div className='edit_single_news_contents'>
            <AdminSideDropdowns/>
            <ContentForm currentNews={currentNews}/>
        </div>
    );
}

export default EditSingleNewsContents;