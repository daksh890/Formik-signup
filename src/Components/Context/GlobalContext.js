import React from'react';
const GlobalContext = React.createContext({
    countryCode:[],
    setCountryCode:(code)=>{},
    validatePhoneNumber:()=>{},
    validateEmail:()=>{},
    country:[], 
    setCountry:()=>{},
    currentStep:0, 
    setCurrentStep:()=>{}, 

});

export default GlobalContext;
