import {NavLink, useNavigate, useParams} from 'react-router-dom'
import './singleNewsInEditMode.stle.scss';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import { useState , useEffect } from 'react'
import {address, handleDate } from '../../../../repetitiveVariables/variables'
import axios from '../../interceptor.js'


const SingleNewsInEditMode = () => {
    const [dataId,setDataId] = useState()
    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`${address}/news/getOne/${id}`);
                setDataId(data);
            } catch (error) {
                console.log(error);
            }
        })()
    },[])

    useEffect(() => {
        console.log(dataId)
    }, [dataId]);

    function handleDelete(){
        (async () => {
            try {
                const {data} = await axios.delete(`${address}/news/delete/${id}`);
                console.log('deleted');
                navigate('/new-admin/edit');
            } catch (error) {
                console.log(error);
            }
        })()
    }


    return (
        <main className="edit_single_container">
            <div className="edit_single_section">
                <NavLink to={`/new-admin/edit/${id}/edit-content`}>
                    <button>Խմբագրել</button>
                </NavLink>
                
                {
                    dataId && dataId.country.title !== 'Հայաստան' && dataId.country.title !== 'Միջազգային'
                        ?
                            <>
                                <h3>Տարածաշրջան</h3>
                                <div>
                                    <div></div>
                                </div>
                                <h3>{dataId && dataId?.country?.title}</h3>
                            </>
                        :
                            <>
                                <h3>{dataId && dataId?.country?.title}</h3>
                                {dataId?.category?.title ?
                                    <>
                                        <div>
                                            <div></div>
                                        </div>
                                        <h3>{dataId?.category?.title}</h3>
                                    </>
                                :
                                ''
                            }
                            </>
                }

            </div>
            <div className="edit_single_title">
                <h2>{dataId?.title}</h2>
                {dataId && !dataId.newsContent.file?.isImage?<iframe src={address+"/"+dataId.newsContent.file.url}></iframe> :dataId && <img src={address+"/"+dataId.newsContent.file?.url} alt="Լրատվական Նկար" />}
                <h3>Նկարի հեղինակ {dataId && dataId.newsContent.file?.author}</h3>
            </div>

            <div className="edit_single_about">
                <hr />
                <div>
                    {dataId && <h3>{handleDate(dataId.createdAt)}</h3>}
                    {/*<div></div>*/}
                    {/*<h3>երկար կարդալու</h3>*/}
                </div>
                <div className='html_content' dangerouslySetInnerHTML={{__html: dataId && dataId.newsContent.description}}></div>
            </div>
            <div className="edit_page_bottom">
                <h4>Հեղ․՝ {dataId && dataId.newsContent.author}</h4>

                <button onClick={handleDelete}>Ջնջել այս նյութը</button>
            </div>
        </main>
    )
}

export default SingleNewsInEditMode;