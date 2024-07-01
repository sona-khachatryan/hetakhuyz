import { useEffect, useState } from 'react'
import './exchangerates.style.scss'
import axios from 'axios'

const ExchangeRates = () => {
    const [exchangeDate,setExchangeDate] = useState("")

    useEffect(()=>{
        (async () => {
            try { 
          const {data} = await axios.get('https://cb.am/latest.json.php')
          setExchangeDate(data)
        } catch (error) {
            console.log(error)
          }
        })()
      },[])

  return (
      <div className='exchange_container'>
          <div>
              <img src="/img/usd.svg" alt="USD" />
              <span>{exchangeDate && exchangeDate.USD.slice(0,3)}</span>
          </div>
          <div className='exchange_rub'>
              <img src="/img/rub.svg" alt="RUB" />
              <span>{exchangeDate && exchangeDate.RUB.slice(0,4)}</span>
          </div>
          {/* <div>
            <img src="/img/tabler_currency-dram.png" alt="Dram" />   
            <span>510</span>
        </div> */}
          <div>
              <img src="/img/eur.svg" alt="EUR" />
              <span>{exchangeDate && exchangeDate.EUR.slice(0,3)}</span>
          </div>
      </div>
  )
}

export default ExchangeRates