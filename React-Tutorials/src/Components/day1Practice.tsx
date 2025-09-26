/* eslint-disable react-refresh/only-export-components */
export default function Profile(){
    return(
        <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
    );
}
const person ={
  name: "Vishesh",
  "age": 27,
  JobTitle: "Developer"
}
export function getUserInfo(){
  return(
    <div>
        <h2>Name: {person.name}</h2>
        <h3>Age: {person.age}</h3>
        <h3>Title: {person.JobTitle}</h3>
    </div>
  );
}
export function Greeting(props: { name: string }) {
  return <h2>Hello, {props.name}!</h2>;
}
