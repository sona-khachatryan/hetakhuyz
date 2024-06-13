import './header.style.scss'
import NavBar from '../navBar/NavBar'
import ExchangeRates from './exchangeRates/ExchangeRates'

const Header = () => {
  return (
    <header>
      <NavBar/>
        <hr/>
      <div className='header_exchange_rates'>
      <ExchangeRates/>
      </div>
    </header>
  )
}

export default Header