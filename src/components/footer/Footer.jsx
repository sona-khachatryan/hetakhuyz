import { NavLink } from 'react-router-dom'
import './footer.style.scss'
import { scrollTop } from '../../repetitiveVariables/variables'

const Footer = () => {
  return (
      <footer>
          <hr />
          <div className='footer_container'>
              <div className='footer_logo'>
                  <NavLink onClick={scrollTop} to="/"><img className='logo' src="/img/Hetaxuyz%20LOGO.svg" alt="Հետախույզ լրատվական լոգո" /></NavLink>
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
                          <a href='https://www.facebook.com/hetaxuyzlratvakan' target="_blank" rel="noopener noreferrer">
                              <img src="/img/facebook.svg" alt="Facebook"/>
                          </a>
                      </li>
                      <li>
                          <a href='https://t.me/hetakhuyz' target="_blank" rel="noopener noreferrer">
                              <img src="/img/telegram.svg" alt="Telegram"/>
                          </a>
                      </li>
                      <li>
                          <a href='https://youtube.com/@hetakhuyz?si=Bpru_1CMqdyeDDth' target="_blank" rel="noopener noreferrer">
                              <img src="/img/youtube.svg" alt="YouTube"/>
                          </a>
                      </li>
                  </ul>
              </ul>

          </div>
          <hr/>
      </footer>
  )
}

export default Footer