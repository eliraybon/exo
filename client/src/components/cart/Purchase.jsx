import React from "react";

export default class Purchase extends React.Component {
  // sleep(milliseconds) {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds))
  // }

  // async componentDidMount() {
  //   await this.sleep(4000);
  //   this.props.history.push("/products");
  // }

  render() {
    return(
      <div className="cart-outer to-flex" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)` }}>
        <div className="cart-ribbon to-flex-col shadow purchase-box">
          <div className="purchase-div">Thank you for your purchase. You have secured your place in the stars. Godspeed fellow explorer</div>
          <div className="keep-shopping">
            <button className="keep-shopping-btn" onClick={() => this.props.history.push("/products")}>Keep shopping!</button>
          </div>
      </div>
      </div>
    )
  }
}