import "./adminlogin.style.scss"
import {useState} from "react";

const AdminLogin = ({isTrue,handleClick,handleChange,data}) => {
    const [disabled, setDisabled] = useState(true);
  return (
      <div className='admin_panel_login'>
          <h2>Մուտք գործել</h2>
          <form className='admin_panel_inputs' onSubmit={handleClick}>
              <div>
                  <label>Մուտքանուն</label>
                  <input onChange={({target})=>handleChange(target)} value={data.login}  type="text"  name='login' />
                  {isTrue && <p>Սխալ մուտքանուն</p>}
              </div>
              <div>
                  <label>Գաղտնաբառ</label>
                  <input  autoComplete='on' onChange={({target})=>handleChange(target)} value={data.password} type="password" name='password'/>
                  {isTrue && <p>Սխալ գաղտնաբառ</p>}
              </div>
              <div className='admin_panel_checkbox'>
                  <div>
                      <input type="checkbox" name=""/>
                      <span>Հիշել ինձ</span>
                  </div>
                  <div>
                      <p>Մոռացե՞լ եք գաղտնաբառը</p>
                  </div>
              </div>
              <button type='submit'>Մուտք</button>
          </form>
      </div>
  )
}

export default AdminLogin