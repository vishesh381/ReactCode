import React, { useState } from 'react'
import './TextToDoc.css';
const TextToDoc = () => {
    const [input,setInput] = useState([]);
    const [sentences, setSentences] = useState([]);
  return (
    <div>
        <div>
            <input type="text" placeholder='Type a sentence and press Enter...' onChange={e=>setInput(e.target.value)}></input>
        </div>
        <div>
            <input type="text" value={sentences}></input>
        </div>
    </div>
  )
}

export default TextToDoc
