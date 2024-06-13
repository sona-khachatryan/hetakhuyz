import { useEffect, useState } from "react"
import "./admincontents.style.scss"
import { Link, Outlet, useNavigate} from "react-router-dom"

const AdminContents = () => {
    const [active,setActive] = useState("Add new content")
    
    const navigate = useNavigate()
    useEffect(()=>{
        navigate("/admin/add")
    },[])

    function handleClick({target:{outerText}}){
        setActive(outerText)
    }

   return (
    <main className="admin_contents_container">
        <div className="admin_contents_container_left">
            <Link to="/admin/edit">
            <h2 className={active == "Edit content"?"admin_content_active":""} onClick={(e)=>handleClick(e)}>Edit content</h2>
            </Link>
            <Link to="/admin/add">
            <h2 className={active == "Add new content"?"admin_content_active":""} onClick={(e)=>handleClick(e)}>Add new content</h2>
            </Link>
       
          
        </div>
        
        <div className="admin_contents_container_right">
            <div>
                <h2>{active}</h2>
            </div>
            <Outlet/>
            </div>
    </main>
  )
}

export default AdminContents