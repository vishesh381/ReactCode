import React from "react";

class CarCard extends React.Component{
    render(){
        const {make, quantity,id} = this.props.item;
        return(
            <>
            <div
        style={{
          width: "150px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          border: "1px solid black",
          padding: "15px",
        }}
      >
        <div>{make}</div>
        <div>{quantity}</div>
        <button onClick={() => this.props.handleSell(id)}>Sell</button>
      </div>
            </>
        )
    }
    
}
export default CarCard;