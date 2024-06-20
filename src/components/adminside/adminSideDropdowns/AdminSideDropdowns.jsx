import React, {useContext, useEffect, useState} from 'react';
import './adminSideDropdowns.style.scss';
import SingleDropdown from "./SingleDropdown.jsx";
import {getSections, getSubsections} from "../../../api/fetchData.js";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import {contentTypeData} from "../../../repetitiveVariables/variables.js";

function AdminSideDropdowns(props) {

    const [sections, setSections] = useState([]);
    const [subSections, setSubSections] = useState([]);
    const [countries, setCountries] = useState([]);
    const [updateDropDowns, setUpdateDropDowns] = useState(false);
    const selectStates = useContext(SelectedValueContext);
    const [selectedMainSection] = selectStates.section;

    const possibleMainSections = ['Հայաստան', 'Տարածաշրջան', 'Միջազգային'];

    useEffect(() => {
        getSections().then(res => {
            const mainSections = [];
            const countries = [];
            res.forEach(option => {
                if(possibleMainSections.includes(option.title)) {
                    mainSections.push(option);
                } else {
                    countries.push(option);
                }
            });
            console.log(res, mainSections, 'main', countries, 'count')
            setSections(mainSections);
            setCountries(countries);
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