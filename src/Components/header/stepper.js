import React, {useContext} from 'react';
import {Step, Stepper, StepButton} from '@mui/material';
import GlobalContext from '../Context/GlobalContext';

export default function HeaderStepper() {
    const label = ["Phone Number", "Email", "Name", "Location"];
    const { currentStep } = useContext(GlobalContext); 
    return(
        <div className="stepper">
            {currentStep < 4 && 
            <Stepper nonLinear activeStep={currentStep}>
            {label.map((child, index) => (
            <Step key={child}>
                <StepButton color="inherit">
                    {currentStep === index &&
                    <div>
                        <p className="Mui-p">User</p>
                        <h3 className="Mui-h">{child}</h3>
                    </div>
                    }
                </StepButton>
            </Step>
            ))}
            </Stepper>
            }
        </div>
    )
}