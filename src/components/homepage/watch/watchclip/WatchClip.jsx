import "./watchclip.style.scss"
import { address} from '../../../../repetitiveVariables/variables'


const WatchClip = ({data:{img,title}}) => {
  return (
      <div className="watch_clip_container">
          <span>
              <img src="/img/camera.svg" alt=""/>
              <p>Հոլովակ</p>
          </span>
          <div className='image_container'>
              <img src={address + "/" + img} alt="Լրատվական նկար"/>
          </div>
          <h3>{title}</h3>
      </div>
  )
}

export default WatchClip