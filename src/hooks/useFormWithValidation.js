// import { useState } from "react";

// export function useFormWithValidation() {
  
//   const [values, setValues] = useState({});
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const handleChange = (evt) => {
//     const input = evt.target;
//     const name = input.name;
//     const value = input.value;
//     const validationMessage = input.validationMessage;


//     setValues({ ...values, [name]: value })
//     setErrors({ ...errors, [name]: validationMessage })
//     setIsValid(input.closest("form").checkValidity());
//   };

//   const resetFrom = (data={}) => {
//     setValues(data)
//     setErrors({})
//     setIsValid(false)
//   }

//   // console.log(errors)
//   return { handleChange, values, errors, isValid, resetFrom, setValues };
  
// }
