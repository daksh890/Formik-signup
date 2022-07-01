import { TextField, Select } from '@mui/material';
import React from 'react';


export const PasswordField = ({label, form, field, ...props}) => {
  const {name, value} = field;
  const{ setFieldValue, errors, touched } = form;
  
  
  return <TextField 
            sx={{width: 200}}
            variant="standard" 
            label={label}
            name={name}
            value={value}
            type= 'password'
            margin="none"
            onChange={e => {
            setFieldValue(name, e.target.value);
            }}         
            error={Boolean(errors.name && touched.name)}
            
          />

};

export const InputField = ({label, form, field, ...props}) => {
  const {name, value} = field;
  const{ setFieldValue, errors, touched } = form;
  
  return <TextField 
            sx={{width: 200}}
            variant="standard" 
            label={label}
            name={name}
            value={value}
            margin="none"
            onChange={e => {
            setFieldValue(name, e.target.value);
            }}         
            error={Boolean(errors.name && touched.name)}
            // helperText={errors.name && touched.name &&
            //             String(errors.name)}
          />

};

export const CustomSelect = ({children, form, field}) => {
  const { name, value } = field;
  const{ setFieldValue } = form;
  return (
      <Select
        sx={{width:80, mr:2}}
        name={name}
        value={value}
        onChange={e => {
          var x = e.target.value;
          setFieldValue(name, x);
        }}
      >
        {children}
      </Select>
  );
};

export const CustomSelectcountry = ({children, form, field}) => {
  const { name, value } = field;
  const{ setFieldValue } = form;
  return (
      <Select
        sx={{width:200}}
        name={name}
        value={value.country}
        
        onChange={e => {
          setFieldValue(name, e.target.value.country);
        }}
      >
        {children}
      </Select>
  );
};

export const CustomSelectstate = ({children, form, field}) => {
  
  const{ name, value } = field;
  const{setFieldValue} = form;

  return (
      <Select
        sx={{width:200}}
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
  );
};
