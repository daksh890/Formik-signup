import React from 'react'
import HeaderStepper from './stepper';
import Logo from '../../assets/Frame 1750.png';
import './header.css';
export default function Header() {
  return (
    <div className="header">
      <div className="comp">
        <div className="logo">
            <img src={Logo} alt="Novae Avenue"/>
        </div>
        <div className="stepper-container">
          <HeaderStepper/>
        </div>
      </div>  
    </div>
  )
}
