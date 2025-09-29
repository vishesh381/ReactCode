import React, { useReducer, useState } from 'react'
import './CounterUsingReducer.css';
const CounterUsingReducer = () => {
    const count = 0;
    function reducer(state,action){
        switch(action.type){
            case "INCREMENT":
                return state+1;
            case "DECREMENT":
                return state-1;
            case "RESET":
                return 0;
            default:
                return state;
        }
    }
    const [state,dispatch] = useReducer(reducer, count);
    return (
    <div className='count-container'>
      <h3>Counter Using Reducer</h3>
      <p>Count : {state}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment(+1)</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrease(-1)</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset(0)</button>
    </div>
  )
}

export default CounterUsingReducer
