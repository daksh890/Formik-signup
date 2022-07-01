import React, {useContext, useState} from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, Button, CardContent, MenuItem, InputLabel, FormControl} from '@mui/material';
import { Formik, Form, Field, ErrorMessage} from 'formik'; 
// Styles
import './userform.css';
import { InputField, PasswordField, CustomSelect, CustomSelectcountry, CustomSelectstate } from './usercomp';
// Components
// Context
import GlobalContext from '../../Context/GlobalContext';

const theme = createTheme({
    palette: {
      primary: {
        main: '#EFD97B',
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });




export default function UserForm() {
    const [data, setData] = useState({
        code:"+91",
        phoneNumber:null, 
        email:"", 
        password:"",
        firstName:"", 
        lastName:"",
        country:"", 
        state:"",
        stateCode:"",  
        pincode:null,
    });
    const {country, countryCode, validatePhoneNumber, validateEmail, setStateCode, states, currentStep, setCurrentStep} = useContext(GlobalContext);
    
    const makeRequest = (formData) => {
        console.log("Submitted", formData)
    }
    const handleNextStep = (newData, final=false) => {
        setData(prev => ({...prev, ...newData}))
        
        if(final){
            console.log(newData);
            makeRequest(newData);
            return;
        }

        setCurrentStep(prev => prev+1)
    };
    const handlePrevStep = (newData) => {
        setData(prev => ({...prev, ...newData}))
        setCurrentStep(prev => prev-1)
    };

    const headings = {"first": ["Welcome!", "Let's get started with a free account."], 
                      "second": ["Welcome!", "Let's get started with a free account."], 
                      "third":["Alright, let's set this up! Tell us a bit about yourself."], 
                      "fourth":["Allow us, to get your location so we can set up map for you."]
                    }
    
                    
    const steps = [
        <StepOne next={handleNextStep} countryCode={countryCode} data={data} headings={headings} validatePhoneNumber={validatePhoneNumber} label="Phone Number"/>, 
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} headings={headings} validateEmail={validateEmail} label="Email"/>, 
        <StepThree next={handleNextStep} prev={handlePrevStep} data={data} headings={headings} label="Name"/>, 
        <StepFour next={handleNextStep}  prev={handlePrevStep} data={data} headings={headings} country={country} setStateCode={setStateCode} states={states} label="Location"/>,
        <StepFive/>
    ];

    return (
        
    <div className="userform">
        
        <div className="card">
            <Card>
                <CardContent>        
                    {steps[currentStep]}
                </CardContent>
            </Card>
        </div>    
    </div>
  );
};



const StepOne = ({countryCode, headings, ...props}) => {
    const stepOneValidation = (values) => {
        // console.log("values", values);
        const errors = {};
        if(!values.phoneNumber){
            errors.phoneNumber = 'Required';
        }
        
        if(!values.code){
             errors.code = 'Required';
        }

        if(values.phoneNumber && values.code){
            var num = values.code.toString() + values.phoneNumber.toString();
            // console.log(num);
            if(values.phoneNumber.length < 10){
                errors.phoneNumber="Enter a valid phone number."
            }
            // props.setErrors({...props.errors, phoneNumber:''});
            const data = props.validatePhoneNumber(num);
            data.then(res => {
                if(res === 'True'){
                    errors.phoneNumber="Enter a valid phone number."
                }
            }) 
        }
        // console.log(props.errors);
        // console.log(values, errors);
        return errors;
    }

    const handleSubmit = (values) => {
        console.log("handlesubmit", values);
        props.next(values);
    };
    
    return (
        <div>
            <div className="heading">
            <h1>{headings.first[0]}</h1>
            <p>{headings.first[1]}</p>
            </div>     
            <Formik 
                initialValues={props.data}
                validate={stepOneValidation}
                onSubmit={handleSubmit}
                validateOnBlur={true}
            >
            <Form autoComplete="off">    
            <div className="form1">
            <FormControl sx={{minWidth:300, display:"flex", flexDirection:"row"}}>
                <FormControl variant="standard" sx={{minWidth:100, mx:"2", pl:"1.2rem"}}>
                    <InputLabel id="demo-simple-select-standard-label" sx={{mx:"2", pl:"1.2rem"}}>Country Code</InputLabel>
                    <Field name="code" component={CustomSelect} label="code" variant="standard">
                        {countryCode.map(item => 
                            <MenuItem value={"+" + item.calling_code.toString()}>
                                {item.name} (+{item.calling_code})
                            </MenuItem>
                         )}
                    </Field>
                </FormControl>
                <div className="field">   
                    <Field name="phoneNumber" type="number" component={InputField} label="Phone Number" width="200"/>
                    <ErrorMessage name="phoneNumber" />
                </div> 
            </FormControl>
            </div>
            <div className="button">
            <ThemeProvider theme={theme}>
            <Button type="submit"  color="primary" variant="contained" sx={{mb:2, width:"22rem"}}>Continue</Button>    
            </ThemeProvider>
            </div>   
            </Form>
            </Formik>
        </div>
    );
};

const StepTwo = ({headings, ...props}) => {
    const stepTwoValidation = async (values)=>{
        const errors={};

        if(values.email.length === 0){
            errors.email="Required";
        }
        if(values.email.length > 0){
            const data = await props.validateEmail(values.email).then(res =>{
                console.log("email", res);
                if(res === 'False'){
                    console.log("hi");
                    errors.email='Enter a valid email.';
                }
                if(res === 'True'){
                    // console.log("Hi");
                    // errors.delete(errors.email);
                }
                
            })
        }
        // console.log(values, errors);
        return errors;
    }
    const handleSubmit = (values) => {
        // console.log("handlemail", values);
        props.next(values);
    };
    return(
        <div>
            <div className="heading">
            <h1>{headings.second[0]}</h1>
            <p>{headings.second[1]}</p>
            </div>
            <Formik
                initialValues={props.data}
                validate={stepTwoValidation}
                onSubmit={handleSubmit}
                validateOnBlur={true}
            >
            <Form>
            <div className="form">
            <div className="field">
                <Field name="email" component={InputField} label="Email" width="300"/>
                <ErrorMessage name="email" component="div"/>
            </div>

            <div className="field">
                <Field name="password" component={PasswordField} label="Password" width="300"/>
                <ErrorMessage name="password" component="div"/>
            </div>
            </div>
            <div className="button">
            <ThemeProvider theme={theme}>
            <Button type="submit"  color="primary" variant="contained" sx={{mb:2, width:"22rem"}}>Continue</Button>    
            <Button type="button" onClick={()=>{props.prev(Form.values)}} color="secondary" variant="outlined" sx={{mb:2, width:"22rem", ':hover':{bgcolor: 'rgba(239, 217, 123, 0.8)', color:'black'}}}>Go Back</Button>  
            </ThemeProvider>
            </div> 
            </Form>
            </Formik> 
        </div>
    );
};

const StepThree = ({headings, ...props}) =>{
    const stepThreeValidation = (values) => {
        const errors = {};

        if(values.firstName.length === 0){
            errors.firstName = "Please enter your first name."
        }

        if(values.lastName.length === 0){
            errors.lastName = "Please enter your last name."
        }

        return errors;
    }
    const handleSubmit = (values) => {
        // console.log("handlename", values);
        props.next(values);
    };
    return (
        <div>
            <div className="heading">
                <h1>{headings.third[0]}</h1>
            </div>
            <Formik
                initialValues={props.data}
                validate={stepThreeValidation}
                onSubmit={handleSubmit}
                validateOnBlur={true}
            >
            <Form>   
            <div className="form">
                <div className="field">
                    <Field name="firstName" component={InputField} label="First Name" width="300"/>
                    <ErrorMessage name="firstName" component="div"/>
                </div>

                <div className="field">
                    <Field name="lastName" component={InputField} label="Last Name" width="300"/>
                    <ErrorMessage name="lastName" component="div"/>
                </div>
            </div>
            <div className="button">
            <ThemeProvider theme={theme}>
            <Button type="submit"  color="primary" variant="contained" sx={{mb:2, width:"22rem"}}>Continue</Button>    
            <Button type="button" onClick={()=>{props.prev(Form.values)}} color="secondary" variant="outlined" sx={{mb:2, width:"22rem", ':hover':{bgcolor: 'rgba(239, 217, 123, 1)', color:'black'}}}>Go Back</Button>  
            </ThemeProvider>
            </div> 
            </Form>
            </Formik>
        </div>
    );
};

const StepFour = ({country, headings, states, ...props}) => {
    const handleSubmit = (values) => {
        console.log(values);
        props.next(values);
    };
    return (
      <div className="formwrap">
        <div className="heading">
            <h1>{headings.fourth[0]}</h1>
        </div>
        <Formik
            initialValues={props.data}
            onSubmit={handleSubmit}
        >
        <Form>    
          <div className="form">
            <FormControl sx={{minWidth:300, display:"flex", flexDirection:"column", alignItems: "center"}}>
                <FormControl variant="standard" sx={{minWidth:200, mb:2}}>
                    <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                    <Field name="country" component={CustomSelectcountry} label="country" variant="standard">
                        {country.map(item => 
                            <MenuItem value={{country:item.name, code:item.code}}>
                                {item.name}
                            </MenuItem>
                         )}
                    </Field>
                </FormControl>
                
                <FormControl variant="standard" sx={{minWidth:200, mb:1}}>
                    <InputLabel id="demo-simple-select-standard-label">States</InputLabel>
                    <Field name="state" component={CustomSelectstate} label="state" variant="standard">
                        {states.map(item => 
                            <MenuItem value={item}>
                                {item}
                            </MenuItem>
                         )} 
                    </Field>
                </FormControl> 
            </FormControl>

            <div className="field">
              <Field name="pincode" component={InputField} label="Pincode" />
              <ErrorMessage name="pincode" component="div" />
            </div>
          </div>
          <div className="button">
            <ThemeProvider theme={theme}>
            <Button type="submit"  color="primary" variant="contained" sx={{mb:2, width:"22rem"}}>Submit</Button>    
            <Button type="button" onClick={()=>{props.prev(Form.values)}} color="secondary" variant="outlined" sx={{mb:2, width:"22rem", ':hover':{bgcolor: 'rgba(239, 217, 123, 0.8)', color:'black'}}}>Go Back</Button>  
            </ThemeProvider>
          </div>  
        </Form>  
        </Formik>
      </div>
    );
};

const StepFive = () => { 
    return(
        <div>
            <h1 style={{fontFamily:"Roboto", fontSize:"44px"}}>Login Complete !!</h1>
        </div>
    )
}


