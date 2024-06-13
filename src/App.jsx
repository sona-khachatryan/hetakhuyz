import './app.style.scss'
import { Route, Routes,useLocation} from 'react-router-dom'
import { useEffect } from 'react'
import { scrollTop } from './repetitiveVariables/variables'
import Header from './components/header/Header'
import Main from './components/homepage/main/Main'
import Footer from './components/footer/Footer'
import Armenia from './components/sections/armenia/Armenia'
import Region from './components/sections/region/Region'
import ErrorPage from './components/errorpage/ErrorPage'
import Subsection from './components/sections/subsection/Subsection'
import SinglePage from './components/blogsinglepage/SinglePage'
import Search from './components/search/Search'
import LiveStream from './components/livestream/LiveStream'
import SinglePageVideo from './components/blogsinglepage/singlepagevideo/SinglePageVideo'
import AdminPanel from './components/adminpanel/AdminPanel'
import EditContent from './components/adminpanel/editcontent/EditContent'
import AddContent from './components/adminpanel/addcontent/AddContent'
import International from './components/sections/international/International'
import SingleEditContent from './components/adminpanel/editcontent/singleeditcontent/SingleEditContent'
import EditContentFromId from './components/adminpanel/editcontentfromid/EditContentFromId'
import LiveEditContent from './components/adminpanel/editcontent/livecontent/liveeditcontent/LiveEditContent'
import LiveEditId from './components/adminpanel/editcontent/livecontent/liveeditcontentfromid/LiveEditId'
import axios from 'axios'



const App = () => {
  const {pathname} = useLocation()
  
  useEffect(() => {
    scrollTop()
  }, [pathname])


  return (
    <div className='global'>
      
    {pathname.includes("admin")?null:<Header/>}
    
    <Routes >
    <Route index element={<Main/>}/>
      <Route path='news/:id' element={<SinglePage/>}/>
      <Route path='videos/:id' element={<SinglePageVideo/>}/>

      <Route path='armenia' element = {<Armenia/>}/>
      <Route path='armenia/politics' element = {<Subsection title="Քաղաքական"/>}/>
      <Route path='armenia/legal' element = {<Subsection title="Իրավական"/>}/>
      <Route path='armenia/military' element = {<Subsection title="Ռազմական"/>}/>
      <Route path='armenia/society' element = {<Subsection title="Հասարակություն"/>}/>
      
      <Route path='region' element = {<Region/>}/>
      <Route path='region/turkey' element = {<Subsection title="Թուրքիա"/>}/>
      <Route path='region/georgia' element = {<Subsection title="Վրաստան"/>}/>
      <Route path='region/iran' element = {<Subsection title="Իրան"/>}/>
      <Route path='region/azerbaijan' element = {<Subsection title="Ադրբեջան"/>}/>
      

      <Route path='international' element = {<International/>}/>
      <Route path='live' element = {<LiveStream/>}/>
      <Route path='live/:id' element = {<LiveStream/>}/>
      <Route path='search' element = {<Search/>}/>


      <Route path='admin' element = {<AdminPanel/>}>
        <Route path='/admin/add' element = {<AddContent/>} />
        <Route path='/admin/edit' element = {<EditContent/>}>
            <Route path='/admin/edit/live/:id' element = {<LiveEditContent/>}/>
            <Route path='/admin/edit/live/:id/editcontent' element = {<LiveEditId/>}/>
            <Route path='/admin/edit/:id' element = {<SingleEditContent/>}/>
              <Route path='/admin/edit/:id/editcontent' element = {<EditContentFromId/>} />
        </Route>
      </Route>

      
    
      <Route path='*' element = {<ErrorPage/>}/>
    </Routes>
    
    {pathname.includes("admin")?null:<Footer/>}

    </div>
  )
}

export default App