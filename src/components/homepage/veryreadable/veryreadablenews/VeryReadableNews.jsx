import './veryreadablenews.style.scss'
import {address,handleDate} from '../../../../repetitiveVariables/variables'


const VeryReadableNews = ({data:{createdAt,title = "",description = "",img}}) => {
  return (
    <div className='readable_news'>
      <img src={address+"/"+img} alt="Լրատվական նկար"/>
        <div className='readable_news_data'>
          <span>{handleDate(createdAt)}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
    </div>
  )
}

export default VeryReadableNews