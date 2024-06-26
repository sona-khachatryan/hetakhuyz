import './addNewSectionForm.style.scss';
import {useState} from 'react';

function AddNewSectionForm({onClose, onSubmit, title}) {

    const [sectionTitleInputValue, setSectionTitleInputValue] = useState();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(sectionTitleInputValue);
    }
    return (
        <div className='add_new_section_form_container' id='ansf_container' onClick={onClose}>
            <div className='ansf_content'>
                <p>
                    Ավելացնել նոր {title}
                </p>
                <form onSubmit={handleOnSubmit}>
                    <div className='ansf_input-container'>
                        <label>Անվանում</label>
                        <input
                            id='newSection'
                            type='text'
                            value={sectionTitleInputValue}
                            onChange={(e) => setSectionTitleInputValue(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Ավելացնել</button>
                </form>

                <div className='close_btn' id='close_btn' onClick={onClose}>x</div>
            </div>
        </div>
    );
}

export default AddNewSectionForm;