import { useState } from 'react';

export default function ChildComp(props) {
  const [inputVal, setInputVal] = useState("");

  const sendMessage = () => {
    props.onMessageClick(inputVal);
    setInputVal(""); // clear input after sending
  };

  return (
    <>
      <input
        type="text"
        value={inputVal}
        placeholder="Enter message to send"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </>
  );
}
