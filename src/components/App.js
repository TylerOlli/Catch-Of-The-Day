import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    // First Reinstate Local Storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take A Copy Of The Existing State
    const fishes = { ...this.state.fishes };
    // 2. Add Our New Fish To Fishes Variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set The New Fishes Object To State
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take Copy of Current State
    const fishes = { ...this.state.fishes };
    // 2. Update That State
    fishes[key] = updatedFish;
    // 3. Set That to State
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take Copy of State
    const fishes = { ...this.state.fishes };
    // 2. Update State
    fishes[key] = null;
    // 3. Update State
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take Copy of State
    const order = { ...this.state.order };
    // 2. Add to Order or Update Quantity
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to Update State Object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take Copy of State
    const order = { ...this.state.order };
    // 2. Remove Item From Order
    delete order[key];
    // 3. Call setState to Update State Object
    this.setState({ order });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
