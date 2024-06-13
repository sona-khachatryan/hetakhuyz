import React from 'react'
import './todaynews.style.scss'
import Slider from './carouselslider/Slider'
import { dates } from '../../../repetitiveVariables/variables'

const Todaynews = () => {
  const date = new Date()
 
  return (
    <div className='today_news_container'>
        <div className='today_news_top'>
          <h2>Օրվա Նորություններ</h2>
          <p>{`${dates["0"+(date.getMonth()+1)]} ${date.getDate()},${date.getFullYear()}`}</p>
        </div>
        <Slider/>
    </div>
  )
}

export default Todaynews