import './contentForm.style.scss';
import {useContext, useEffect, useState} from "react";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import RichEditor from "../../adminpanel/reactquil/RichEditor.jsx";
import axios from "../interceptor.js";
import {address} from "../../../repetitiveVariables/variables.js";

function ContentForm(props) {
    const {section, subsection, newsType} = useContext(SelectedValueContext);
    const [selectedNewsType] = newsType;
    const [selectedSection] = section;
    const [selectedSubsection] = subsection;

    const [titleInputValue, setTitleInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [articleAuthorInputValue, setArticleAuthorInputValue] = useState('');
    const [photoAuthorInputValue, setPhotoAuthorInputValue] = useState('');
    const [photoInputValue, setPhotoInputValue] = useState(null);
    const [newsTextValue, setNewsTextValue] = useState('');
    const [videoLinkInputValue, setVideoLinkInputValue] = useState('');
    const [liveLinkInputValue, setLiveLinkInputValue] = useState('');

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
    const handleAddNews = async () => {
        const formData = new FormData();
        if(selectedNewsType.title === 'Ուղիղ եթեր') {
            formData.append('title', titleInputValue);
            formData.append('url', liveLinkInputValue);

            try {
                const {data} = await axios.post(
                    `${address}/live/create`,
                    formData,
                    {headers: {
                        Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                    }});
                console.log('created new live')
            } catch (error) {
                console.log(error)
                setError(true);
            }

        } else {
            formData.append('title', titleInputValue);
            formData.append('description', descriptionInputValue);
            formData.append('contentTitle', titleInputValue);
            formData.append('contentDescription', newsTextValue);
            formData.append('author', articleAuthorInputValue);
            formData.append('fileAuthor', photoAuthorInputValue);
            formData.append('countryId', selectedSection.id);
            formData.append('categoryId', selectedSubsection.id);

            if(selectedNewsType.title === 'Տեքստային') {
                formData.append('img', photoInputValue);
            } else if (selectedNewsType.title === 'Տեսանյութ') {
                formData.append('url', videoLinkInputValue);
            }

            try {
                const { data } = await axios.post(
                    `${address}/news/create`,
                    formData,
                    {headers: {
                            Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                        }})
                console.log('created')
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }


    }

    useEffect(() => {
        console.log(selectedNewsType.title === 'Տեքստային', 'inside content form');
    }, [selectedNewsType.title]);

    return (
        <div className='contentForm-container'>
            {selectedNewsType.title && selectedNewsType.title !== 'Ուղիղ եթեր'
                ?
                    <>
                        <input type='text' placeholder='Տեղադրել վերնագիրը' required={true} title='Պարտադիր դաշտ. վերնագիր'
                           value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)}/>
                        <input type='text' placeholder='Տեղադրել նկարագրությունը' required={true}
                           title='Պարտադիր դաշտ. նկարագրություն' value={descriptionInputValue}
                           onChange={(e) => setDescriptionInputValue(e.target.value)}/>
                        <input type='text' placeholder='Ո՞վ է նյութի հեղինակը' required={true}
                           title='Պարտադիր դաշտ. հեղինակ' value={articleAuthorInputValue}
                           onChange={(e) => setArticleAuthorInputValue(e.target.value)}/>
                        {selectedNewsType.title === 'Տեքստային' ?
                            <label className={photoInputValue ? 'uploaded' : ''}>
                                <img src='/img/upload.svg' alt='ներբեռնել'/>
                                {photoInputValue ? 'Լուսանկարը բեռնված է' : 'Ներբեռնել գլխավոր լուսանկար'}
                                <input type='file' required={true} title='Պարտադիր դաշտ. լուսանկար'
                                   onChange={(e) => setPhotoInputValue(e.target.files[0])}/>
                            </label>
                        : ''
                    }
                        {selectedNewsType.title === 'Տեսանյութ' ?
                            <input type='text' placeholder='Տեղադրել տեսանյութի հղումը' required={true}
                               title='Պարտադիր դաշտ. տեսանյութի հղում' value={videoLinkInputValue}
                               onChange={(e) => setVideoLinkInputValue(e.target.value)}/>

                        : ''
                    }
                        <input type='text'
                           placeholder={selectedNewsType.title === 'Տեքստային' ? 'Ո՞վ է լուսանկարի հեղինակը' : 'Ո՞վ է տեսանյութի հեղինակը'}
                           value={photoAuthorInputValue}
                           onChange={(e) => setPhotoAuthorInputValue(e.target.value)}/>
                        {error ? <p>Ձախողում. անբավարար տվյալներ</p> : <p></p>}
                        <RichEditor value={newsTextValue} setValue={setNewsTextValue} click={handleAddNews}/>
                    </>
                :
                    <>
                        {selectedNewsType.title === 'Ուղիղ եթեր'
                        ?
                            <>
                                <input type='text' placeholder='Տեղադրել վերնագիրը' required={true}
                                   title='Պարտադիր դաշտ. վերնագիր'
                                   value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)}/>
                                <input type='text'
                                   placeholder='Տեղադրել ուղիղ միացման հղումը'
                                   required={true}
                                   title='Պարտադիր դաշտ. ուղիղ միացման հղում'
                                   value={liveLinkInputValue}
                                   onChange={(e) => setLiveLinkInputValue(e.target.value)}/>
                                <button onClick={handleAddNews}>Ավելացնել</button>
                            </>
                        : ''}
                    </>
            }
        </div>
    );
}

export default ContentForm;