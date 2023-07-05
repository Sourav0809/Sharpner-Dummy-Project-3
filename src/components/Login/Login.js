import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return ({ value: action.val, IsValid: action.val.includes('@') })
  }
  if (action.type === "INPUT_BLUR") {
    return ({ value: state.value, isValid: state.value.includes('@') })
  }
  return state
}

const pwdReducer = (state, action) => {
  if (action.type === 'USER_INPUT_PWD') {
    return ({ value: action.val, isValid: action.val.trim().length > 6 })
  }
  if (action.type === 'INPUT_BLUR') {
    return ({ value: state.value, isValid: state.value.trim().length > 6 })
  }
  return state
}

const Login = (props) => {
  const [enteredCollegeName, setEnteredCollgeName] = useState('')
  const [collegeNameValid, setCollegeNameValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [pwdState, dispatchPwd] = useReducer(pwdReducer, { value: '', isValid: null })




  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
    setFormIsValid(event.target.value.includes('@') && pwdState.isValid)
  };

  const passwordChangeHandler = (event) => {
    console.log(emailState);
    dispatchPwd({
      type: 'USER_INPUT_PWD',
      val: event.target.value
    })

    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid)
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPwd({ type: 'INPUT_BLUR' })
  };

  const collegeNameChangeHandeler = (e) => {
    setEnteredCollgeName(e.target.value)
  }
  // validating college name when it include more than 10 charcters
  const validateCollegeNameHandler = () => {
    setCollegeNameValid(enteredCollegeName.trim().length >= 10)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, pwdState.value, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${collegeNameValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collegeName">CollegeName</label>
          <input
            type="text"
            id="college_name"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandeler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${pwdState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
