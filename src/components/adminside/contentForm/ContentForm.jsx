import './contentForm.style.scss';
import {useContext, useEffect, useState} from "react";
import {SelectedValueContext} from "../adminSideContent/AdminSideContent.jsx";
import RichEditor from "../reactquil/RichEditor.jsx";
import axios from "../interceptor.js";
import {address} from "../../../repetitiveVariables/variables.js";
import {useLocation, useNavigate} from "react-router-dom";

const convertYoutubeLink = (link) => {
    if(link.includes('watch')) {
        return link.replace('watch?v=', 'embed/')
    } else if (link.includes('youtu.be')) {
        const id = link.split('?si')[0].split('.be/')[1];
        return `https://www.youtube.com/embed/${id}`
    } else {
        return link;
    }
}
function ContentForm({currentNews}) {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const {section, subsection, newsType} = useContext(SelectedValueContext);
    const [selectedNewsType, setSelectedNewsType] = newsType;
    const [selectedSection, setSelectedSection] = section;
    const [selectedSubsection, setSelectedSubsection] = subsection;

    const [titleInputValue, setTitleInputValue] = useState('');
    const [descriptionInputValue, setDescriptionInputValue] = useState('');
    const [articleAuthorInputValue, setArticleAuthorInputValue] = useState('');
    const [photoAuthorInputValue, setPhotoAuthorInputValue] = useState('');
    const [photoInputValue, setPhotoInputValue] = useState(null);
    const [videoInputValue, setVideoInputValue] = useState(null);
    const [newsTextValue, setNewsTextValue] = useState('');
    const [videoLinkInputValue, setVideoLinkInputValue] = useState('');
    const [liveLinkInputValue, setLiveLinkInputValue] = useState('');

    const [error, setError] = useState(false);

    const resetInputs = () => {
        setTitleInputValue('');
        setDescriptionInputValue('');
        setArticleAuthorInputValue('');
        setPhotoAuthorInputValue('');
        setPhotoInputValue('');
        setVideoInputValue('');
        setNewsTextValue('');
        setVideoLinkInputValue('');
        setLiveLinkInputValue('');
    }

    useEffect(() => {
        let timeoutId;
        if(error) {
            timeoutId = setTimeout(() => setError(false), 3000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [error]);

    useEffect(() => {
        if(pathname.includes('edit') && currentNews) {
            setTitleInputValue(currentNews?.title || '');
            if(selectedNewsType.title === 'Ուղիղ եթեր') {
                setLiveLinkInputValue(currentNews?.url || '');
            } else {
                setDescriptionInputValue(currentNews?.description || '');
                setArticleAuthorInputValue(currentNews?.newsContent?.author || '');
                setPhotoAuthorInputValue(currentNews?.newsContent?.file?.author || '');
                setPhotoInputValue(currentNews?.img || '');
                setVideoInputValue(currentNews?.newsContent?.file?.url.includes('http') ? '' : currentNews?.newsContent?.file?.url);
                setNewsTextValue(currentNews?.newsContent?.description || '');
                setVideoLinkInputValue(!currentNews?.newsContent?.file?.isImage ? currentNews?.newsContent?.file?.url : '');
            }
        } else {
            resetInputs();
        }
    }, [pathname, currentNews]);
    const handleAddNews = async () => {
        const formData = new FormData();
        if(selectedNewsType.title === 'Ուղիղ եթեր') {
            formData.append('title', titleInputValue);
            formData.append('url', convertYoutubeLink(liveLinkInputValue));

            try {
              if(pathname.includes('add')) {
                  await axios.post(
                      `${address}/live/create`,
                      formData,
                      {headers: {
                              Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                          }});
                  console.log('created new live');
              } else {
                 await axios.put(`${address}/live/edit/${currentNews.id}`,
                      formData,
                      {headers: {
                              Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                          }});
                  navigate(`/admin/edit/live/${currentNews.id}`)
              }
                setSelectedSubsection({});
                setSelectedSection({});
                setSelectedNewsType({});
                setTitleInputValue('');
                setLiveLinkInputValue('');
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
            if(currentNews?.img && typeof photoInputValue === 'string' && photoInputValue === currentNews?.img) {
                formData.append('sameImg', photoInputValue);
            } else {
                formData.append('img', photoInputValue);
            }

            if(selectedSection.title === 'Տարածաշրջան') {
                formData.append('countryId', selectedSubsection.id);
            } else {
                formData.append('countryId', selectedSection.id);
               if(selectedSubsection.id) {
                   formData.append('categoryId', selectedSubsection.id);
               }
            }

            if(selectedNewsType.title === 'Տեքստային') {
                if(typeof photoInputValue !== 'string') {
                    formData.append('fileContent', photoInputValue);
                    formData.append('middleImage', photoInputValue);
                }
            } else if (selectedNewsType.title === 'Տեսանյութ') {
                formData.append('url', convertYoutubeLink(videoLinkInputValue));
                if(videoInputValue && typeof videoInputValue !== 'string') {
                    formData.append('fileContent', videoInputValue);
                    formData.append('middleImage', videoInputValue);
                } else if (typeof photoInputValue !== 'string') {
                    formData.append('fileContent', photoInputValue);
                    formData.append('middleImage', photoInputValue);
                }
            }

            try {
               if(pathname.includes('add')) {
                   const { data } = await axios.post(
                       `${address}/news/create`,
                       formData,
                       {headers: {
                               Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                           }});
                   console.log('created');
               } else {
                   await axios.put(
                       `${address}/news/editNews/${currentNews?.id}`,
                       formData,
                       {headers: {
                               Authorization: `bearer ${localStorage.getItem('accessToken')}`,
                           }});
                   console.log('edited');
                   navigate(`/admin/edit/${currentNews.id}`)
               }
                setSelectedSubsection({});
                setSelectedSection({});
                setSelectedNewsType({});
                resetInputs();

            } catch (error) {
                console.log(error);
                setError(true);
            }
        }
    }

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
                        <label className={photoInputValue ? 'uploaded' : ''}>
                            <img src='/img/upload.svg' alt='ներբեռնել լուսանկար'/>
                            {photoInputValue ? ((typeof photoInputValue === 'string') ? photoInputValue : photoInputValue.name) : 'Ներբեռնել գլխավոր լուսանկար'}
                            <input type='file' required={true} title='Պարտադիր դաշտ. լուսանկար'
                                   onChange={(e) => setPhotoInputValue(e.target.files[0])}/>
                        </label>
                      
                        {selectedNewsType.title === 'Տեսանյութ' ?
                            <>
                                <label className={videoInputValue ? 'uploaded' : ''}>
                                    <img src='/img/upload.svg' alt='ներբեռնել տեսանյութ'/>
                                    {videoInputValue ? ((typeof videoInputValue === 'string') ? videoInputValue : videoInputValue.name) : 'Ներբեռնել տեսանյութ'}
                                    <input type='file' title='Պարտադիր դաշտ. տեսանյութ'
                                           onChange={(e) => setVideoInputValue(e.target.files[0])}/>
                                </label>
                                <p className='black-paragraph'>Կամ</p>
                                <input type='text' placeholder='Տեղադրել տեսանյութի հղումը' required={true}
                                       title='Պարտադիր դաշտ. տեսանյութի հղում' value={videoLinkInputValue}
                                       onChange={(e) => setVideoLinkInputValue(e.target.value)}/>

                            </>
                            : ''
                        }
                        <input type='text'
                               placeholder={selectedNewsType.title === 'Տեքստային' ? 'Ո՞վ է լուսանկարի հեղինակը' : 'Ո՞վ է տեսանյութի հեղինակը'}
                               value={photoAuthorInputValue}
                               onChange={(e) => setPhotoAuthorInputValue(e.target.value)}/>
                        {error ? <p>Ձախողում. անվավեր կամ անբավարար տվյալներ</p> : <p></p>}
                        <RichEditor value={newsTextValue} setValue={setNewsTextValue} click={handleAddNews} btnValue={pathname.includes('edit') ? 'Խմբագրել' : 'Ավելացնել'}/>
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
                                <button onClick={handleAddNews}>{pathname.includes('edit') ? 'Խմբագրել' : 'Ավելացնել'}</button>
                            </>
                        : ''}
                    </>
            }
        </div>
    );
}

export default ContentForm;