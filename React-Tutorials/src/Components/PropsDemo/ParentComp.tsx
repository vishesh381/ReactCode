import { useState } from 'react'
import ChildComp from './ChildComp'
export default function ParentComp(){
    const [value,setValue] =  useState("");
    const handleMessageSend = (msg)=>{
        setValue(msg);
    }
    return(
        <>
        <p>Message got from CHild:{value}</p>
        <ChildComp onMessageClick={handleMessageSend}/>
        </>
    )
}

