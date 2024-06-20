import React, {useContext, useEffect, useState} from 'react';
import './adminSideDropdowns.style.scss';
import SingleDropdown from "./SingleDropdown.jsx";
import {getSections, getSubsections} from "../../../api/fetchData.js";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import {contentTypeData} from "../../../repetitiveVariables/variables.js";

function AdminSideDropdowns(props) {

    const [sections, setSections] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const selectStates = useContext(SelectedValueContext);

    useEffect(() => {
        getSections().then(res => setSections(res));
        getSubsections().then(res => setSubSections(res));
    }, []);
  
    return (
        <div className='adminSideDropdowns container'>
            <SingleDropdown title={'Ընտրել բաժինը'} options={sections} selectedValueState={selectStates.section}/>
            <SingleDropdown title={'Ընտրել ենթաբաժինը'} options={subSections} selectedValueState={selectStates.subsection}/>
            <SingleDropdown title={'Ընտրել տեսակը'} options={contentTypeData} selectedValueState={selectStates.newsType}/>
        </div>
    );
}

export default AdminSideDropdowns;