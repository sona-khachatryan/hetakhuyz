import { useEffect, useState } from 'react'
import "./adminpanel.style.scss"
import AdminLogin from './adminlogin/AdminLogin'
import AdminContents from './admincontents/AdminContents'
import axios from './interceptor.js'
import { NavLink } from 'react-router-dom'

const AdminPanel = () => {
    const [data,setData] = useState({login:"",password:""})
    const [adminPanel,setAdminPanel] = useState(false)
    const [isTrue,setIsTrue] = useState(false)

    function handleChange({value,name}){
        setData({...data,[name]:value})
    }

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      
      if(accessToken != undefined || refreshToken != undefined ){
        axios.get('/admin/authMe').then(({data}) => {
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
          setAdminPanel(true)
        })

      }
    }, [])
    
    function handleClick (){
        axios.post('/admin/login',{
            email: data.login,
            password: data.password
          },

          )
          .then(({data}) => {
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            setAdminPanel(true)
          })
          .catch(function (error) {
            console.log(error)
            setIsTrue(true)
          })
        
    }

    return (
    <div className='admin_panel_container'>
        <div className='admin_panel_logo'>
            <NavLink to="/"><img src="/img/Hetaxuyz LOGO.png" alt="Հետախույզ լրատվական լոգո" /></NavLink>
            <hr/>
        </div>
        {!adminPanel?
        <AdminLogin isTrue={isTrue} handleClick={handleClick} handleChange={handleChange} data={data}/>
        :<AdminContents/>}
    </div>
  )
}

export default AdminPanel