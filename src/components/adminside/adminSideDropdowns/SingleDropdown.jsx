import React, {useContext, useEffect, useState} from 'react';
import './adminSideDropdowns.style.scss';
import {createSections, createSubsections} from "../../../api/fetchData.js";
import AddNewSectionForm from "../addNewSectionForm/AddNewSectionForm.jsx";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
function SingleDropdown({title, options, selectedValueState}) {

    const [active, setActive] = useState(false);
    const [addNewSection, setAddNewSection] = useState(false);
    const [selectedValue, setSelectedValue] = selectedValueState;

    useEffect(() => {
        console.log(selectedValue, 'selected for', title)
    }, [selectedValue]);
    const handleCreateNewSection = (section) => {
        if(title.includes('ենթ')) {
            createSubsections(section);
        } else {
            createSections(section);
        }
    }

    const openAddNewSection = () => {
        setAddNewSection(true);
        setActive(false);
    }

    const closeAddNewSection = (e) => {
        e.stopPropagation()
        if(e.target.id === 'ansf_container' || e.target.id === 'close_btn') {
            setAddNewSection(false);
        }
    }

    const handleOptionClick = (e) => {
        setSelectedValue(e.target.innerText);
        setActive(false);
    }

    return (
        <div className="asd_custom-select-wrapper">
            <div className="asd_custom-select-box" onClick={() => setActive(!active)}>
                <p>
                    {selectedValue ? selectedValue : title}
                </p>
                <img src='/img/selectArrow.svg' className={active ? 'isActive' : ''}/>
            </div>
            <div className={`asd_custom-select-options ${active ? 'asd_select-options-active' : ''}`}>
                {/* eslint-disable-next-line react/prop-types */}
                {options?.length ?
                    options.map(option => <p key={option.id} id={option.id} onClick={handleOptionClick}>{option.title}</p>)
                    :
                    ''
                }
                {title.includes('տեսակ') ? '' : <p className='asd_add-new-section' onClick={openAddNewSection}>+ Ավելացնել</p>}
            </div>
            {addNewSection ? <AddNewSectionForm onClose={closeAddNewSection} onSubmit={handleCreateNewSection} title={title.includes('ենթ') ? 'ենթաբաժին' : 'բաժին'}/>: ''}
        </div>
    );
}

export default SingleDropdown;