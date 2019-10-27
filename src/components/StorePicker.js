import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  };

  goToStore = event => {
    // 1. Stop Form From Submitting
    event.preventDefault();
    // 2. Get Text From Input
    const storeName = this.myInput.current.value;
    // 3. Change The Page to /store/...
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form action='' className='store-selector' onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type='text'
          ref={this.myInput}
          required
          placeholder='Store Name'
          defaultValue={getFunName()}
        />
        <button type='submit'>Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
