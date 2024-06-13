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
            <img src="/img/fa_usd.png" alt="USD" />   
            <span>{exchangeDate && exchangeDate.USD.slice(0,3)}</span>
        </div>
        <div className='exchange_rub'>
            <img src="/img/bx_ruble.png" alt="RUB" />   
            <span>{exchangeDate && exchangeDate.RUB.slice(0,4)}</span>
        </div>
        {/* <div>
            <img src="/img/tabler_currency-dram.png" alt="Dram" />   
            <span>510</span>
        </div> */}
        <div>
            <img src="/img/ic_outline-euro.png" alt="EUR" />   
            <span>{exchangeDate && exchangeDate.EUR.slice(0,3)}</span>
        </div>   
        <hr/>
    </div>
  )
}

export default ExchangeRates