import './contentForm.style.scss';
import React, {useContext, useEffect, useState} from "react";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import RichEditor from "../../adminpanel/reactquil/RichEditor.jsx";

function ContentForm(props) {
    const {newsType} = useContext(SelectedValueContext);
    const [selectedNewsType] = newsType;

    const [titleInputValue, setTitleInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [articleAuthorInputValue, setArticleAuthorInputValue] = useState('');
    const [photoAuthorInputValue, setPhotoAuthorInputValue] = useState('');
    const [photoInputValue, setPhotoInputValue] = useState(null);
    const [newsTextValue, setNewsTextValue] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        let timeoutId;
        if(error) {
            timeoutId = setTimeout(() => setError(false), 3000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [error]);
    const handleAddNews = () => {
        console.log('clicked add news')
    }

    useEffect(() => {
        console.log(selectedNewsType === 'Տեքստային', 'inside content form');
    }, [selectedNewsType]);
    return (
        <div className='contentForm-container'>
            {selectedNewsType === 'Տեքստային'
                ?
                    <>
                        <input type='text' placeholder='Տեղադրել վերնագիրը' required={true} title='Պարտադիր դաշտ. վերնագիր' value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)}/>
                        <input type='text' placeholder='Տեղադրել նկարագրությունը' required={true} title='Պարտադիր դաշտ. նկարագրություն' value={descriptionInputValue} onChange={(e) => setDescriptionInputValue(e.target.value)}/>
                        <input type='text' placeholder='Ո՞վ է նյութի հեղինակը' required={true} title='Պարտադիր դաշտ. հեղինակ' value={articleAuthorInputValue} onChange={(e) => setArticleAuthorInputValue(e.target.value)}/>
                        <label>
                            <img src='/img/upload.svg' alt='ներբեռնել'/>
                            Ներբեռնել գլխավոր լուսանկար
                            <input type='file' required={true} title='Պարտադիր դաշտ. լուսանկար' onChange={(e) => setPhotoInputValue(e.target.files[0])}/>
                        </label>
                        <input type='text' placeholder='Ո՞վ է լուսանկարի հեղինակը' value={photoAuthorInputValue} onChange={(e) => setPhotoAuthorInputValue(e.target.value)}/>
                        {error ? <p>Ձախողում. անբավարար տվյալներ</p> : <p></p>}
                        <RichEditor value={newsTextValue} setValue={setNewsTextValue} click={handleAddNews}/>
                    </>
                :
                ''
            }

            { selectedNewsType === 'Տեսանյութ' ? <div>Տեսանյութ</div> : ''}
            { selectedNewsType === 'Ուղիղ եթեր' ? <div>Ուղիղ եթեր</div> : ''}
        </div>
    );
}

export default ContentForm;