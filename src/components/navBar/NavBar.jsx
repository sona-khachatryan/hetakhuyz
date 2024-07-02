import {useEffect, useState} from 'react'
import { NavLink, useLocation} from 'react-router-dom'
import ExchangeRates from '../header/exchangeRates/ExchangeRates'
import Calendar from "../calendar/Calendar.jsx";
import NavBarDropdowns from "./navBarDropdowns/NavBarDropdowns.jsx";
import {getSections, getSubsections} from "../../api/fetchData.js";
import "./navbar.style.scss"

const NavBar = () => {
  
    const [dropdownArmenia, setDropdownArmenia] = useState(false)
    const [dropdownRegion, setDropdownRegion] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const {pathname} = useLocation()

    const [subsections, setSubsections] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      getSections().then(res => setCountries(res.countries));
      getSubsections().then(res => setSubsections(res));
    }, []);

    useEffect(() => {
        console.log(countries, subsections)
    }, [countries, subsections]);
  
    useEffect(()=> {
        setIsOpen(false);
        setDropdownArmenia(false);
        setDropdownRegion(false);
    },[pathname])

    const handleTop = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    const openCalendar = (e) => {
        e.stopPropagation();
        setCalendarIsOpen(true);
    }

    const closeCalendar = () => {
        setCalendarIsOpen(false);
    };

    return (
        <>
            <nav>
                <div>
                    <NavLink to="/"><img className='logo' src="/img/Hetaxuyz%20LOGO.svg" alt="Հետախույզ լրատվական լոգո" /></NavLink>
                </div>

                <ul>
                    <li onMouseEnter={() => { setDropdownArmenia(true); setDropdownRegion(false)}}>
                        <NavLink to='armenia'>Հայաստան</NavLink>
                        <NavBarDropdowns isOpen={dropdownArmenia} handleTop={handleTop} options={subsections} pathname='/armenia' onClose={() => setDropdownArmenia(false)}/>
                    </li>

                    <li onMouseEnter={() => {setDropdownRegion(true); setDropdownArmenia(false)}}>
                        <NavLink to="region">Տարածաշրջան</NavLink>
                        <NavBarDropdowns isOpen={dropdownRegion} handleTop={handleTop} options={countries} pathname='/region' onClose={() => setDropdownRegion(false)}/>
                    </li>

                    <li><NavLink to="international">Միջազգային</NavLink></li>
                    <li><NavLink to="videos">Տեսադարան</NavLink></li>
                    <li><NavLink to="live">Ուղիղ եթեր</NavLink></li>
                    <li className='burger_menu'>
                        {isOpen ?
                            <img onClick={() => setIsOpen(false)} src="/img/menu-hamburger-active.svg" alt="Մենյու"/> :
                            <img onClick={() => setIsOpen(true)} src="/img/menu-hamburger.svg" alt="Մենյու"/>}
                    </li>
                    <li><NavLink to="search"><img className={pathname === "/search" ? 'search_icon_active' : ''} src='/img/search.svg'
                                                  alt='Որոնել'/></NavLink></li>
                    <li onMouseEnter={openCalendar}>
                        <img src='/img/calendar.svg' alt='Օրացույց'/>
                        {calendarIsOpen && <Calendar closeModal={closeCalendar}/>}
                    </li>
                </ul>
            </nav>
            <div className={'burger_menu_open ' + (isOpen ? "burger_menu_active" : "burger_menu_disable")}>
                <ul>
                    <li><NavLink to='armenia'>Հայաստան</NavLink></li>
                    <li><NavLink to="region">Տարածաշրջան</NavLink></li>
                    <li><NavLink to="international">Միջազգային</NavLink></li>
                    <li><NavLink to="videos">Տեսադարան</NavLink></li>
                    <li><NavLink to="live">Ուղիղ եթեր</NavLink></li>
                </ul>
                <ExchangeRates/>
            </div>
        </>  
    )
}

export default NavBar