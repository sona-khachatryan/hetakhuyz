import { address,handleDate } from '../../../repetitiveVariables/variables'
import './searchslice.style.scss'

const SearchSlice = ({data:{createdAt,title,description,img}}) => {
  return (
    <div className="search_slice_container">
      <div>
        <img src={address+"/"+img} alt="Լրատվական նկար" />
      </div>
      <div>
      <div className="search_slice_texts">
        <span>{handleDate(createdAt)}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      </div>
    </div>
  )
}

export default SearchSlice