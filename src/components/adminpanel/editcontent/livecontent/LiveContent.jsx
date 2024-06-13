import {handleDate } from '../../../../repetitiveVariables/variables'
import './livecontent.style.scss'

const LiveContent = ({data}) => {

    return (
    <div className="filter_content_container">
      <div className='filter_content_img_container live_stream_edit'>
        <div></div>
        <iframe src={data.url}></iframe>
        <div>
          <p>Ուղիղ եթեր</p>
        </div>
      </div>
      <div>
      <div className="filter_slice_texts">
        <div className='filter_content_section_container'>
           <span>{handleDate(data.createdAt)}</span>
            <div>
               <p>Ուղիղ եթեր</p>
            </div>
        </div>
        <h3>{data?.title}</h3>
      </div>
      </div>
    </div>
  )
}

export default LiveContent