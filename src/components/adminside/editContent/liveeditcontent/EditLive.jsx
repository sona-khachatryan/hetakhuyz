import {useState, useEffect, useContext} from 'react'
import './liveeditcontent.style.scss'
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import { address } from '../../../../repetitiveVariables/variables'
import axios from '../../interceptor'
import {SelectedValueContext} from "../../adminSideContent/AdminSideContent.jsx";

const EditLive = () => {
    const [dataId,setDataId] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const selectedStates = useContext(SelectedValueContext);
    const [selectedNewsType] = selectedStates.newsType

    useEffect(() => {
        console.log(selectedNewsType)
    }, []);

  useEffect(()=>{
    (async () => {
      try {
        const {data} = await axios.get(`${address}/live/getAll`)
        Array.isArray(data) && setDataId(data.find((data)=> data.id === +id))
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  function handleDelete(){
    (async () => {
      try {
        const {data} = await axios.delete(`${address}/live/delete/${id}`);
          console.log('deleted live');
          navigate('/new-admin/edit');
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const handleEdit = () => {
      navigate(`/new-admin/edit/${id}/edit-content`, {state: {title: 'Ուղիղ եթեր', id: 'live'}})
  }

  return (
      <div className='live_edit_content_container'>
          {/*<NavLink to={`/new-admin/edit/${id}/edit-content`}>*/}
          <button onClick={handleEdit}>Խմբագրել</button>
          {/*</NavLink> */}
          <iframe src={dataId && dataId.url}></iframe>
          <h2>{dataId && dataId.title}</h2>
          <button onClick={handleDelete}>Ջնջել եթերը</button>
      </div>
  )
}

export default EditLive