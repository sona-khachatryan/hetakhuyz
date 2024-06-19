import React, {useEffect, useState} from 'react';
import './adminSideDropdowns.style.scss';
import SingleDropdown from "./SingleDropdown.jsx";
import {getSections, getSubsections} from "../../../api/fetchData.js";

function AdminSideDropdowns(props) {

    const [sections, setSections] = useState([]);
    const [subSections, setSubSections] = useState([]);

    useEffect(() => {
        getSections().then(res => setSections(res));
        getSubsections().then(res => setSubSections(res));
    }, []);
  
    return (
        <div className='adminSideDropdowns container'>
            <SingleDropdown title={'Ընտրել բաժինը'} options={sections}/>
            <SingleDropdown title={'Ընտրել ենթաբաժինը'} options={subSections}/>
            <SingleDropdown title={'Ընտրել տեսակը'}/>
        </div>
    );
}

export default AdminSideDropdowns;