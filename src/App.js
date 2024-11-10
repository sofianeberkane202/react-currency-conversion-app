import { useEffect, useState } from "react";
import { urlCurrencies,urlCurrencyConvertions } from "./api";
import { fetchData } from "./helper";

export default function App(){

    const [currencies,setCurrencies] = useState(new Map());
    const [basedConversion, setBasedConversion] = useState('noSelection');
    const [targetCondersion, setTargetConversion] = useState('noSelection');

    
    useEffect(function(){
        async function fetchCurrencies(){
            const data = await fetchData(urlCurrencies);
            
            setCurrencies(() => {
                const newMap = new Map();
                Object.entries(data).forEach(([code,country]) => {
                    newMap.set(code, country);}
                ) 
                return newMap;
            })
        }

        fetchCurrencies();
    },[]);

  return (
    <div className="app">
        <div className="box">
            <input type="number" value={1}/>


            <select value={basedConversion} onChange={(e) => setBasedConversion(e.target.value)}>
                <option value={'noSelection'}>Select Currency</option>
                {
                    Array.from(currencies.entries()).map(([code,country]) => 
                    <option key={code} value={code}>{country}</option>)
                }
            </select>
        </div>

        <div className="box">
            <input type="number"/>
            <select value={targetCondersion} onChange={(e) => setTargetConversion(e.target.value)}>
            <option value={'noSelection'}>Select Currency</option>
                {
                    Array.from(currencies.entries()).map(([code,country]) => 
                    <option key={code} value={code}>{country}</option>)
                }
            </select>
        </div>

        <p className="result">0</p>
    </div>

  )
}