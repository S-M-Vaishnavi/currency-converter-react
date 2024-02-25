import { useState ,useEffect} from 'react'
import axios from 'axios';
import { country_list } from './CountryList';

function App() {
  const [amount,setAmount] = useState(0);
  const [fromCurrency,setFromCurrency] = useState("INR");
  const [toCurrency,setToCurrency] = useState("USD");
  const [convertedAmount,setConvertedAmount] = useState(null);
  const [exchangeRate,setExchangeRate] = useState(null)

  useEffect(()=>{
    const getExchahngeRate = async () => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toCurrency])
      } catch(error) {
        console.log(error)
      }
    };
    getExchahngeRate();
},[fromCurrency,toCurrency])

useEffect(()=>{
  if (exchangeRate !== null){
    setConvertedAmount((amount * exchangeRate).toFixed(2))
  }
},[amount,exchangeRate])

const handleFromCurrencyChange = (e) =>{
  setFromCurrency(e.target.value)
}
const handleToCurrencyChange = (e) =>{
  setToCurrency(e.target.value)
}

function handleAmountChange(e){
  const value = parseFloat(e.target.value);
  setAmount(isNaN(value)? 0 : value)
}
  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-conatiner">
            <label htmlFor="amt">Amount:</label>
            <input type="text" id='amt' value={amount} onChange={handleAmountChange}/>
          </div>
          <div className="input-conatiner">
            <label htmlFor="fromCurrency">From Currency:</label>
            <select id="fromoCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
                  {Object.keys(country_list).map((currencyCode, index) => (
                    <option value={currencyCode} key={index}>
                      {currencyCode}
                    </option>
                  ))}
            </select>

          </div>
          <div className="input-conatiner">
            <label htmlFor="toCurrency">To Currency:</label>
            <select id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
            {Object.keys(country_list).map((currencyCode, index) => (
                    <option value={currencyCode} key={index}>
                      {currencyCode}
                    </option>
                  ))}
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default App
