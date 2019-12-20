import React from "react";

export default class Purchase extends React.Component {
  constructor(props) {
    super(props);

  }

  // sleep(milliseconds) {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds))
  // }

  // async componentDidMount() {
  //   await this.sleep(4000);
  //   this.props.history.push("/products");
  // }

  render() {
    return(
      <div>
          <div className="purchase-div">Thank you for your purchase. You have secured your place in the stars. Godspeed fellow explorer</div>
          <div className="keep-shopping">
            <button className="keep-shopping-btn" onClick={() => this.props.history.push("/products")}>Keep shopping!</button>
          </div>
      </div>
    )
  }
}