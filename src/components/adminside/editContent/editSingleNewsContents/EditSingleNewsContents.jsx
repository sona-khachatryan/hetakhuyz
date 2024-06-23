import './editSingleNewsContents.style.scss';
import React, {useContext, useEffect, useState} from 'react';
import AdminSideDropdowns from "../../adminSideDropdowns/AdminSideDropdowns.jsx";
import axios from "../../interceptor.js";
import {address} from "../../../../repetitiveVariables/variables.js";
import {useParams} from "react-router-dom";
import {SelectedValueContext} from "../../adminSideContent/AdminSideContent.jsx";
import {getSingleNewsToEdit} from "../../../../api/fetchData.js";
import ContentForm from "../../contentForm/ContentForm.jsx";

function EditSingleNewsContents(props) {

    const {id} = useParams();
    const [currentNews, setCurrentNews] = useState({});
    const selectedStates = useContext(SelectedValueContext);
    const [selectedSection, setSelectedSection] = selectedStates.section;
    const [selectedSubsection, setSelectedSubsection] = selectedStates.subsection;
    const [selectedNewsType, setSelectedNewsType] = selectedStates.newsType;

    useEffect(() => {
      getSingleNewsToEdit(setCurrentNews, setSelectedSection, setSelectedSubsection, setSelectedNewsType, id)
    },[])

    return (
        <div className='edit_single_news_contents'>
            <AdminSideDropdowns/>
            <ContentForm currentNews={currentNews}/>
        </div>
    );
}

export default EditSingleNewsContents;