import './app.style.scss'
import { Route, Routes,useLocation} from 'react-router-dom'
import {createContext, useEffect, useState} from 'react'
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
import International from './components/sections/international/International'
import axios from 'axios'
import CalendarNewsFeed from "./components/calendar/calendarNewsFeed/CalendarNewsFeed.jsx";
import AdminSide from "./components/adminside/AdminSide.jsx";
import AddNewContent from "./components/adminside/addNewContent/AddNewContent.jsx";
import EditContentMain from "./components/adminside/editContent/EditContentMain.jsx";
import SingleNewsInEditMode from "./components/adminside/editContent/singleNewsInEditMode/SingleNewsInEditMode.jsx";
import EditSingleNewsContents
    from "./components/adminside/editContent/editSingleNewsContents/EditSingleNewsContents.jsx";
import EditLive from "./components/adminside/editContent/liveeditcontent/EditLive.jsx";
export const CalendarDateContext = createContext([]);


const App = () => {
    const {pathname} = useLocation();
    const [calendarDate, setCalendarDate] = useState([]);
  
    useEffect(() => {
        scrollTop()
    }, [pathname])


    return (
        <CalendarDateContext.Provider value={[calendarDate, setCalendarDate]}>
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
                    <Route path='calendar' element = {<CalendarNewsFeed/>}/>

                    <Route path='admin' element = {<AdminSide/>}>
                        <Route path='/admin/add' element = {<AddNewContent/>} />
                        <Route path='/admin/edit' element = {<EditContentMain/>}>
                            <Route path='/admin/edit/live/:id' element = {<EditLive/>}/>
                            <Route path='/admin/edit/:id/edit-content' element = {<EditSingleNewsContents/>}/>
                            <Route path='/admin/edit/:id' element = {<SingleNewsInEditMode/>}/>
                        </Route>
                    </Route>

                    <Route path='*' element = {<ErrorPage/>}/>
                </Routes>
    
                {pathname.includes("admin")?null:<Footer/>}

            </div>
        </CalendarDateContext.Provider>
    )
}

export default App