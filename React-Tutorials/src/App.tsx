import './App.css'
import "./ToDoList.css";
import CarAPP from './Components/ClassComp/CarAPP';
import TicTacToe from './Components/TicTacToe';
import ToDoClass from './Components/ToDoClass/ToDoClass';
import ParentComp from './Components/PropsDemo/ParentComp';
import { Provider } from "react-redux";
// import { store } from "./store/store";

import ToDoListRedux from "./Components/ToDoListRedux";
// import Profile, { getUserInfo as GetUserInfo, Greeting } from './Day1/day1Practice';
// import { ToDoList as ToDoList } from './Day1/toDoList';
// import ToDoList1 from './Day1/ToDoList1';
import { TodoProvider } from "./context/TodoContext";
import ToDoListFunctionalWithContext from "./components/ToDoListFunctionalWithContext";
import ToDoList from './Components/VisheshSelf/ToDoList/ToDoListFunc/ToDoList'
import ToDoListClass from './Components/VisheshSelf/ToDoList/ToDoListClass/ToDoListClass'
import ParentUser from './Components/PropsDemo2/ParentUser';
import TicTacToeFun from './Components/VisheshSelf/TicTacToeFun/TicTacToeFun';
import { ThemeProvider } from "./Components/VisheshSelf/ContextAPIDemo/Context/ThemeContext";
import ThemeComponent from "./Components/VisheshSelf/ContextAPIDemo/ThemeComponent";
import { store } from "./Components/VisheshSelf/ReduxDemo/store/store";
import ThemeSwitcher from "./Components/VisheshSelf/ReduxDemo/ThemeSwitcher";
import CounterDemo from "./Components/VisheshSelf/HOCDemo/CounterDemo";
import ToDoListFetch from './Components/VisheshSelf/ToDoList/ToDOListFetchAPI/ToDoListFetch';
import TransferList from './Components/VisheshSelf/TransferList/TransferList';
import TextToDoc from './Components/VisheshSelf/TextToDoc/TextToDoc';
import ToDOListClassFetchApi from './Components/VisheshSelf/ToDoList/ToDoListClass/ToDOListClassFetchApi';
function App() {

  return (
    <div className="app">
      <div>Learning React</div>
      {/* <Profile/>
      <Profile/>
      <GetUserInfo/>
       <Greeting name="Vishesh" />
      <Greeting name="John" />
      <Greeting name="Alice" />
      <ToDoList/> */}
      {/* <CarAPP/>
      <ToDoListFullyFunctionalHW/>
      <TicTacToe/>
      <ToDoClass/> */}
      {/* <ParentComp/> */}
      {/* <TodoProvider>
      <ToDoListFunctionalWithContext />
    </TodoProvider> */}
    {/* <Provider store={store}>
    <ToDoListRedux />
  </Provider> */}
  {/* <ToDoList/>*/}
  {/* <ParentUser/> 
<ToDoListClass/> */}
{/* <ThemeProvider>
    <ThemeComponent/>
</ThemeProvider>
<Provider store={store}>
    < ThemeSwitcher/>
  </Provider>
  <CounterDemo/> */}
  {/* <ToDoListFetch/> */}
 {/* <TicTacToeFun/>  */}
 {/* <TransferList/> */}
 {/* <TextToDoc/> */}
 <ToDOListClassFetchApi/>
    </div>
  )
}

export default App
