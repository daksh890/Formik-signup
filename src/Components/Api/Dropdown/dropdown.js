import React, { useEffect, useContext} from 'react'
import GlobalContext from '../../Context/GlobalContext';

export function Dropdown() {
    const {setCountryCode} = useContext(GlobalContext);
    
    useEffect(() => {
      const offset = {first:"?offset=100", second:"?offset=200"};
      var data = [];
        async function getData(code) {
          const response = await fetch(
            `https://test.paplilabs.com/login_api/callingCode/${code}`
          )
          let actualdata = await response.json();
          
          await actualdata.results.map(item => 
                     data.push(item),
          );
          // console.log(actualdata.results);
          return actualdata.results;
        }
        async function runoff(){
          var promise = getData('');
          await promise.then(value => {});

          promise = getData(offset.first);
          await promise.then(value => {});

          promise = getData(offset.second);
          await promise.then(value => {});
          // console.log(data.length);
          setCountryCode(data);
          return data.length;
        }
        runoff();

      }, [])
    return null;
  } 

  export function Country(){
    const {setCountry} = useContext(GlobalContext);
    
    useEffect(() => {
      const offset = {first:"", second:"?offset=100", third:"?offset=200"};
      var data = [];
        async function getData(code) {
          const response = await fetch(
            `https://test.paplilabs.com/login_api/country/${code}`
          )
          let actualdata = await response.json();
          // console.log(actualdata);
          await actualdata.results.map(item => 
                     data.push(item),
          );
          // console.log(actualdata.results);
          return actualdata.results;
        }
        async function runoff(){
          var promise = getData(offset.first);
          await promise.then(value => {});

          promise = getData(offset.second);
          await promise.then(value => {});

          promise = getData(offset.third);
          await promise.then(value => {});
          // console.log(data);
          setCountry(data);
          return data.length;
        }
        runoff();

      }, [])
    return null;
  }

  export function AllStates(){
    const {setStates, states} = useContext(GlobalContext);
    var targetUrl =  'http://test.paplilabs.com/login_api/state/in/'
    useEffect(() => {
      
      var data = [];
        async function getData(code) {
          const response = await fetch(targetUrl)
          let actualdata = await response.json();
          // console.log(actualdata);
          await actualdata.map(item => 
                     data.push(item.region),
          );
          // console.log(actualdata.results);
          return actualdata.results;
        }
        async function runoff(){
          var promise = getData('');
          await promise.then(value => {});

          // console.log(data);
          setStates(data);
          return data.length;
        }
        runoff();
      }, [])
    return null;
      
  }

  

  // 'https://test.paplilabs.com/login_api/state/in'