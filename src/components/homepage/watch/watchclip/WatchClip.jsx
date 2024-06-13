import "./watchclip.style.scss"
import { address} from '../../../../repetitiveVariables/variables'


const WatchClip = ({data:{img,title}}) => {
  return (
    <div className="watch_clip_container">
        <div>
          <img src="./img/fluentvideo.png" alt="" />
          <p>Հոլովակ</p>
        </div>
        <img src={address+"/"+img} alt="Լրատվական նկար"/>
        <h3>{title}</h3>
    </div>
  )
}

export default WatchClip