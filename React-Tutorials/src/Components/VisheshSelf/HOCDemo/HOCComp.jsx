import React, { useState } from 'react'

const HOCComp = (OriginalComponent) => {
    const UpgradedComp = (props)=>{
        const [count,setCount] = useState(0);
        const incrementCount = ()=>{
            setCount(count+1);
        }
        // forward props + add count and incrementCount
    return (
      <OriginalComponent
        {...props}
        count={count}
        incrementCount={incrementCount}
      />
    );
    }
  return UpgradedComp;
}

export default HOCComp
