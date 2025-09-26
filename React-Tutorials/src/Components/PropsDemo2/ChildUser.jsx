import { act, useReducer, useState } from "react";

export default function ChildUser(props) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [age, setAge] = useState("");

  // const handleSubmit = () => {
  //   const dataToSendToParent = { name, email, age };
  //   props.onSubmitData(dataToSendToParent);
  // };

  // return (
  //   <div>
  //     <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
  //     <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
  //     <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
  //     <button onClick={handleSubmit}>Send to Parent</button>
  //   </div>
  // );
  // const [user, setUser] = useState({
  //   name:"Vishesh",
  //   email:"abc@xyz.com",
  //   age: 25
  // });

  // const handleSubmit = () => {
  //   const dataToSendToParent = user;
  //   props.onSubmitData(dataToSendToParent);
  // };

  // return (
  //   <div>
  //     <input type="text" placeholder="Name" onChange={(e) => setUser({...user,name:e.target.value})} />
  //     <input type="text" placeholder="Email" onChange={(e) => setUser({...user,email:e.target.value})} />
  //     <input type="number" placeholder="Age" onChange={(e) => setUser({...user,age:e.target.value})} />
  //     <button onClick={handleSubmit}>Send to Parent</button>
  //   </div>
  // );
  const initialState = {
    name:"Vishesh",
    email:"abc@xyz.com",
    age: 25
  };
  function reducer(state,action){
    switch(action.type){
      case "Set_Name":
        return {...state,name:action.payload};
      case "Set_Email":
        return {...state,email:action.payload};
      case "Set_Age":
        return {...state,age:action.payload};
      default:
        return state;
    }
  }
const [state,dispatch] = useReducer(reducer,initialState);
  const handleSubmit = () => {
    props.onSubmitData(state);
  };

  return (
    <div>
      <input type="text" placeholder="Name" onChange={(e) => dispatch({type:"Set_Name",payload:e.target.value})} />
      <input type="text" placeholder="Email" onChange={(e) => dispatch({type:"Set_Email",payload:e.target.value})} />
      <input type="number" placeholder="Age" onChange={(e) => dispatch({type:"Set_Age",payload:e.target.value})} />
      <button onClick={handleSubmit}>Send to Parent</button>
    </div>
  );
}
