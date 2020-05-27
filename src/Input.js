import React,{useCallback} from 'react';
import Wraper from './HOC/Wraper';
import { useDispatch } from 'react-redux';

  

  
  

function Input (props) {
    const dispatch = useDispatch();
    const logout = useCallback(
      () => dispatch({ type: 'logout' }),
      [dispatch]
    )   
    const Clickfuntion=()=>
  {
    
    if(props.onclickfunction==='logout')
    {
        logout();
    }
    else{
        props.onclickfunction();
    }
  }
    return(<input style={props.styles} id="reenter" onClick={Clickfuntion} value={props.value} type="submit" />)
}

export default (Wraper(Input));