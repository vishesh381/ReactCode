import React, { useState } from 'react'
import HOCComp from './HOCComp';
const CounterDemo = (props) => {
  return (
    <div>
      <button onClick={props.incrementCount}>Increment</button>
      <button onMouseOver={props.incrementCount}>Hover</button>
      <h1>{props.count}</h1>
    </div>
  )
}
// Wrap CounterDemo with HOC
export default HOCComp(CounterDemo);
