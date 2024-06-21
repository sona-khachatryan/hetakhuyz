import './editContent.style.scss';
import React, {useContext, useEffect, useState} from 'react';
import AdminSideDropdowns from "../adminSideDropdowns/AdminSideDropdowns.jsx";
import {getAllLives, getAllNews, getDataToEdit} from "../../../api/fetchData.js";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import EditContentList from "./EditContentList.jsx";

function EditContentMain(props) {
    const selectedStates = useContext(SelectedValueContext);
    const [selectedSection] = selectedStates.section;
    const [selectedSubsection] = selectedStates.subsection;
    const [selectedNewsType] = selectedStates.newsType;
    const [newsToEdit, setNewsToEdit] = useState([]);

    useEffect(() => {
        console.log(newsToEdit, 'news to edit')
    }, [newsToEdit]);


    useEffect(() => {
       getDataToEdit(selectedSection, selectedSubsection, selectedNewsType).then(res => setNewsToEdit(res));
    }, [selectedSection.title, selectedSubsection.title, selectedNewsType.title]);



    return (
        <div>
            <AdminSideDropdowns/>
            <EditContentList newsList={newsToEdit}/>
        </div>
    );
}

export default EditContentMain;