import React, {useContext, useEffect, useState} from 'react';
import './adminSideDropdowns.style.scss';
import SingleDropdown from "./SingleDropdown.jsx";
import {getSections, getSubsections} from "../../../api/fetchData.js";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import {contentTypeData, possibleMainSections} from "../../../repetitiveVariables/variables.js";
import {useLocation} from "react-router-dom";

function AdminSideDropdowns(props) {

    const [sections, setSections] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const [countries, setCountries] = useState([]);
    const [updateDropDowns, setUpdateDropDowns] = useState(false);

    const selectStates = useContext(SelectedValueContext);
    const [selectedMainSection] = selectStates.section;

    useEffect(() => {
        getSections().then(res => {
            console.log(res)
            setSections(res.mainSections);
            setCountries(res.countries);
        });
        getSubsections().then(res => setSubSections(res));
    }, [updateDropDowns]);
  
    return (
        <div className='adminSideDropdowns container'>
            <SingleDropdown title={'Ընտրել բաժինը'} options={sections} selectedValueState={selectStates.section} updateDropDowns={setUpdateDropDowns}/>
            <SingleDropdown title={'Ընտրել ենթաբաժինը'} options={selectedMainSection?.title === 'Հայաստան' ? subSections : selectedMainSection?.title === 'Տարածաշրջան' ? countries : ''} selectedValueState={selectStates.subsection} updateDropDowns={setUpdateDropDowns}/>
            <SingleDropdown title={'Ընտրել տեսակը'} options={contentTypeData} selectedValueState={selectStates.newsType}/>
        </div>
    );
}

export default AdminSideDropdowns;