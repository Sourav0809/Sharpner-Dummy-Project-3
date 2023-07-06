import React, { useReducer, useState, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/AuthContext';
import Input from '../Input/Input';

// For Email
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return ({ value: action.val, IsValid: action.val.includes('@') })
  }
  if (action.type === "INPUT_BLUR") {
    return ({ value: state.value, isValid: state.value.includes('@') })
  }
  return state
}
// For Password 
const pwdReducer = (state, action) => {
  if (action.type === 'USER_INPUT_PWD') {
    return ({ value: action.val, isValid: action.val.trim().length > 6 })
  }
  if (action.type === 'INPUT_BLUR') {
    return ({ value: state.value, isValid: state.value.trim().length > 6 })
  }
  return state
}

// For collgeName 
const collegeNameReducer = (state, action) => {
  if (action.type === 'USER_INPUT_CLGNAME') {
    return ({ value: action.val, isValid: action.val.trim().length >= 10 })
  }
  if (action.type === 'INPUT_BLUR') {
    return ({ value: state.value, isValid: state.value.trim().length >= 10 })
  }
  return state
}
const Login = (props) => {
  const ctx = useContext(AuthContext)
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [pwdState, dispatchPwd] = useReducer(pwdReducer, { value: '', isValid: null })
  const [collegeeNameState, dispatchCollegeName] = useReducer(collegeNameReducer, { value: '', isValid: null })




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

  const collegeNameChangeHandeler = (event) => {
    dispatchCollegeName(
      {
        type: 'USER_INPUT_CLGNAME',
        val: event.target.value
      }
    )
  }
  // validating college name when it include more than 10 charcters
  const validateCollegeNameHandler = () => {
    dispatchCollegeName(
      { type: 'INPUT_BLUR' }
    )
  }


  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, pwdState.value, collegeeNameState.value);
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input type={'email'}
          id={'email'}
          label={'Email'}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler} />

        <Input type={'text'}
          id={'college_name'}
          label={'College Name'}
          value={collegeeNameState.value}
          onChange={collegeNameChangeHandeler}
          onBlur={validateCollegeNameHandler} />

        <Input type={'password'}
          id={'password'}
          label={"Password"}
          value={pwdState.value}
          onChange={passwordChangeHandler}
          onblur={validatePasswordHandler} />

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
