import React from "react";
import CarCard from './CarCard'
const mockCarData = [
  {
    make: "Toyota",
    quantity: 10,
    id: 1,
    date: new Date(),
  },
  {
    make: "Honda",
    quantity: 10,
    id: 2,
  },
  {
    make: "Nissan",
    quantity: 10,
    id: 3,
  },
];
class CarAPP extends React.Component{
 state={
    cars:[...mockCarData]
 }
 handleSell=(id)=>{
    const newList = this.state.cars.map((item)=>{
        if(item.id===id){
            return {...item,quantity: item.quantity - 1 }
        }
        return item;
    });
    this.setState({
      cars: newList,
    });
 }
  render(){
    return(
        <>
            <h3>Car APP</h3>
             <ul style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {this.state.cars.map((item)=>(<CarCard key={item.id} item={item} handleSell={this.handleSell}/>))}
            </ul>
        </>
    )
 }
}
export default CarAPP;