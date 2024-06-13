import { NavLink } from 'react-router-dom'
import './footer.style.scss'
import { scrollTop } from '../../repetitiveVariables/variables'

const Footer = () => {
  return (
    <footer>
        <hr />
        <div className='footer_container'>
          <div className='footer_logo'>
            <NavLink onClick={scrollTop} to="/"><img className='logo' src="/img/Hetaxuyz LOGO.png" alt="Հետախույզ լրատվական լոգո" /></NavLink>
          </div>
        
            <ul>
                <li><NavLink onClick={scrollTop} to='armenia'>Հայաստան</NavLink></li>
                <li><NavLink onClick={scrollTop} to="region">Տարածաշրջան</NavLink></li>
                
                <ul className='footer_mobile'>
                  <li><NavLink onClick={scrollTop} to="international">Միջազգային</NavLink></li>
                  <li><NavLink onClick={scrollTop} to="live">Ուղիղ եթեր</NavLink></li>
                </ul>

                <ul className='icons'>
                  <li>
                  <img src="/img/Group.png" alt="Facebook" />
                  </li>
                  <li>
                  <img src="/img/Group1.png" alt="Instagram" />
                  </li>
                  <li>
                  <img src="/img/Group2.png" alt="Twitter" />
                  </li>
                </ul>
            </ul>

        </div>
        <hr />
        <h4>© Tesvan llc</h4>
    </footer>
  )
}

export default Footer