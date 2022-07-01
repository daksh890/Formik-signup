import React, {useState} from 'react';
import GlobalContext from './GlobalContext';

async function validatePhoneNumber(phoneNumber){
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body:JSON.stringify({"phone_number" : phoneNumber})
    };
    var token="";
    const data = await fetch('https://test.paplilabs.com/login_api/validatePhNum/', requestOptions).then(response => response.json()).then(result => {token = result.user_exist});
    //console.log(token);
    return token;
    
}

async function validateEmail(email) {
    // console.log(email);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body:JSON.stringify({"email" : email})
    };
    var token="";
    const response = await fetch('https://test.paplilabs.com/login_api/validateEmail/', requestOptions).then(response => response.json()).then(result => {token = result.success});
    
    return token;
}

export default function ContextWrapper(props) { 
    const [currentStep, setCurrentStep] = useState(0);
    const [country, setCountry] = useState([]);
    const [countryCode, setCountryCode] = useState([]);
    const [states, setStates] = useState([]);


    return (
        <GlobalContext.Provider value={{
            currentStep,
            setCurrentStep,
            validatePhoneNumber,
            validateEmail,
            country,
            setCountry, 
            countryCode,
            setCountryCode,
            states, 
            setStates 
        }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}