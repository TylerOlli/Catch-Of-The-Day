import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  addFish = fish => {
    // 1. Take A Copy Of The Existing State
    const fishes = { ...this.state.fishes };
    // 2. Add Our New Fish To Fishes Variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set The New Fishes Object To State
    this.setState({
      fishes
    });
  };
  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
