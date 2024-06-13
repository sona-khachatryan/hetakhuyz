import "./asideslice.style.scss"
import { address,handleDate } from "../../../repetitiveVariables/variables"

const AsideSlice = ({data:{createdAt,title,description,img}}) => {
  return (
    <div className="aside_slice_container">
      <hr/>
      <div>
      <div className="aside_slice_texts">
        <span>{handleDate(createdAt)}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <img src={address+"/"+img} alt="Լրատվական նկար" />
      </div>
      </div>
    </div>
  )
}

export default AsideSlice