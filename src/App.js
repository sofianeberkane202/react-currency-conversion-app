import { useEffect, useState } from "react";
import { urlCurrencies,urlCurrencyConvertions } from "./config";
import { fetchData } from "./helper";

const keyWords={
    TARGET: 'target',
    BASED:'based',
}

console.log(urlCurrencyConvertions);


export default function App(){

    const [currencies,setCurrencies] = useState(new Map());
    const [basedConversion, setBasedConversion] = useState('no');
    const [targetConversion, setTargetConversion] = useState('no');

    const [conversionRate, setConversionRate] = useState(null);

    const [inputBased, setInputBased]= useState(1);
    const [inputTarget, setInputTarget]= useState(null);

    const [isLoading, setIsLoading] = useState(false);

    

    
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

    useEffect(function(){

        async function fetchConversionData(){
            try {
                const url = urlCurrencyConvertions + `${basedConversion}/${targetConversion}`;
                setIsLoading(true);
                const data = await fetchData(url);
                console.log(data);
                setConversionRate(data.conversion_rate); 
            } catch (error) {
                console.log(error);
            }finally{setIsLoading(false)}
        }

        if(basedConversion === 'no' || targetConversion === 'no') {
            setConversionRate(null);
            return;
        }

        fetchConversionData();

    },[basedConversion,targetConversion])

    useEffect(function(){
        setInputTarget(Number(conversionRate * inputBased).toFixed(3));
    },[conversionRate]);

    function handleConversion(value, type){
        
        if(type === keyWords.BASED){
            setInputTarget(Number(conversionRate * value).toFixed(3));
            setInputBased(value);
        }

        if(type === keyWords.TARGET){
            setInputBased(Number(value  /conversionRate).toFixed(3));
            setInputTarget(value);
        }
    }

  return (
    <div className="app">
        <div className="box">
            <input 
            type="number" 
            min={1}
            value={inputBased}
            onChange={(e) => handleConversion(+e.target.value,keyWords.BASED)} 
            disabled={!conversionRate || isLoading}
            />


            <select value={basedConversion} onChange={(e) => setBasedConversion(e.target.value)}>
                <option value={'no'}>Select Currency</option>
                {
                    Array.from(currencies.entries()).map(([code,country]) => 
                    <option key={code} value={code}>{country}</option>)
                }
            </select>
        </div>

        <div className="box">
            <input 
            type="number" 
            value={inputTarget} 
            onChange={(e) => handleConversion(+e.target.value,keyWords.TARGET)}
            disabled={!conversionRate || isLoading}
            />

            <select value={targetConversion} onChange={(e) => setTargetConversion(e.target.value)}>
            <option value={'no'}>Select Currency</option>
                {
                    Array.from(currencies.entries()).map(([code,country]) => 
                    <option key={code} value={code}>{country}</option>)
                }
            </select>
        </div>
    </div>

  )
}
