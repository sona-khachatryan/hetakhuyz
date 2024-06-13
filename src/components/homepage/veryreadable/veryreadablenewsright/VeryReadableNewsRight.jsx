import { address } from '../../../../repetitiveVariables/variables'
import './veryreadablenews.style.scss'

const VeryReadableNewsRight = ({data:{title = "",description = "",img,country}}) => {

  return (
    <div className='very_readable_news_container'>
        <div style={{
          backgroundImage:`url(${address+"/"+img})`
        }} className='very_readable_img'></div>
        <div className='very_readable_news_data'>
          <h3>{title}</h3>
          <p>{description}</p>
          <h4>{country?.title}</h4>
        </div>
    </div>
  )
}

export default VeryReadableNewsRight