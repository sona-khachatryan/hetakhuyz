import './todaynews.style.scss'
import Slider from './carouselslider/Slider'
import { dates } from '../../../repetitiveVariables/variables'

const Todaynews = () => {
  const date = new Date()
 
  return (
      <div className='today_news_container'>
          <div className='today_news_top'>
              <div>
                  <h3>Օրվա նորություններ</h3>
                  <hr/>
              </div>
              <p>{`${dates["0" + (date.getMonth() + 1)]} ${date.getDate()},${date.getFullYear()}`}</p>
          </div>
          <Slider/>
      </div>
  )
}

export default Todaynews