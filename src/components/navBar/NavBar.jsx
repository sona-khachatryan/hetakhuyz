import {useEffect, useState} from 'react'
import "./navbar.style.scss"
import { Link, NavLink,useLocation} from 'react-router-dom'
import ExchangeRates from '../header/exchangeRates/ExchangeRates'

const NavBar = () => {
  
  const [dropdownArmenia, setDropdownArmenia] = useState(false)
  const [dropdownRegion, setDropdownRegion] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const {pathname} = useLocation()
  
  useEffect(()=>{setIsOpen(false)},[pathname])

  const handleDropdownArmenia = () => {
    setDropdownArmenia(!dropdownArmenia)
  }

  const handleDropdownRegion = () => {
    setDropdownRegion(!dropdownRegion)
  }

  const handleTop = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

  return (
    <>
    <nav>
        <div>
          <NavLink to="/"><img className='logo' src="/img/Hetaxuyz LOGO.png" alt="Հետախույզ լրատվական լոգո" /></NavLink>
        </div>
        
        <ul>
            <li onMouseEnter={handleDropdownArmenia} onMouseLeave={handleDropdownArmenia}>
              <NavLink to='armenia'>Հայաստան</NavLink>
                {dropdownArmenia && <div className="dropdown_menu">
                <div></div>
                <ul>
                  <li><Link onClick={()=>handleTop("politics")}  to={{ pathname: '/armenia', hash: '#politics' }}>Քաղաքական</Link></li>
                  <li><Link onClick={()=>handleTop('legal')} to={{ pathname: '/armenia', hash: '#legal' }}>Իրավական</Link></li>
                  <li><Link onClick={()=>handleTop('military')} to={{ pathname: '/armenia', hash: '#military' }}>Ռազմական</Link></li>
                  <li><Link onClick={()=>handleTop('society')} to={{ pathname: '/armenia', hash: '#society' }}>Հասարակություն</Link></li>
                </ul>
              </div>} 
          </li>   
            
            <li onMouseEnter={handleDropdownRegion} onMouseLeave={handleDropdownRegion}>
                <NavLink to="region">Տարածաշրջան</NavLink>
                  {dropdownRegion && <div className="dropdown_menu">
                    <div></div>
                  <ul>
                  <li><Link onClick={()=>handleTop("turkey")}  to={{ pathname: '/region', hash: '#turkey' }}>Թուրքիա</Link></li>
                  <li><Link onClick={()=>handleTop('georgia')} to={{ pathname: '/region', hash: '#georgia' }}>Վրաստան</Link></li>
                  <li><Link onClick={()=>handleTop('iran')} to={{ pathname: '/region', hash: '#iran' }}>Իրան</Link></li>
                  <li><Link onClick={()=>handleTop('azerbaijan')} to={{ pathname: '/region', hash: '#azerbaijan' }}>Ադրբեջան</Link></li>
                </ul>
                 </div>} 
            </li>
            
            <li><NavLink to="international">Միջազգային</NavLink></li>
            <li><NavLink to="live">Ուղիղ եթեր</NavLink></li>
            <li className='burger_menu'>
              {isOpen?<img onClick={()=>setIsOpen(false)} src="/img/menu-hamburger-active.png" alt="Մենյու" />:<img onClick={()=>setIsOpen(true)} src="/img/menu-hamburger.png" alt="Մենյու" />}
            </li>
            <li><NavLink to="search"><img src={pathname == "/search"?'/img/Vector.png':'/img/Vector1.png'} alt='Որոնել'/></NavLink></li>
        </ul>     
    </nav>
            <div className={'burger_menu_open '+(isOpen?"burger_menu_active":"burger_menu_disable")}>
                <ul>
                  <li><NavLink to='armenia'>Հայաստան</NavLink></li>
                  <li><NavLink to="region">Տարածաշրջան</NavLink></li>
                  <li><NavLink to="international">Միջազգային</NavLink></li>
                  <li><NavLink to="live">Ուղիղ եթեր</NavLink></li>
                </ul>
                <hr />
                <ExchangeRates/>
              </div>
    </>  
  )
}

export default NavBar