
const KEY = process.env.REACT_APP_API_KEY;
console.log('KEY',`https://v6.exchangerate-api.com/v6/${KEY}/pair/`);


const urlCurrencyConvertions= `https://v6.exchangerate-api.com/v6/${KEY}/pair/`;
const urlCurrencies= 'https://openexchangerates.org/api/currencies.json'; 

export {urlCurrencies, urlCurrencyConvertions};