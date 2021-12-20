import React, {Component} from 'react';
import { web3, SMART_SHARES } from './config.js'
import { handleError } from './ErrorHandler';

export default class AddAsset extends Component {

  constructor() {
    super();
    this.state = {
      addresses: [],
      percentages: [],
      name: "",
      address: "",
      percentage: "",
      sharePrice: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addAddress = this.addAddress.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    this.addAddress(evt);
    const accounts = await web3.eth.getAccounts();

    await SMART_SHARES.methods.addAsset(
      this.state.name,
      this.state.sharePrice,
      this.state.percentages,
      this.state.addresses
    ).send({from: accounts[0], gas:3000000}).catch(err => {
        this.setState({ error: handleError(err.message)});
    });
  }

  addAddress(evt) {
    evt.preventDefault();
    this.setState({
      addresses: [...this.state.addresses, this.state.address],
      percentages: [...this.state.percentages, this.state.percentage],
      percentage: "",
      address: ""
    });
  }

  render() {
    return(
      <div className="Form">
        <div className="Form-body">
          <h1>Register Asset</h1>
          <p>Instructions: Sum of share percentages must equal 100. You can provide as many address as you want. Minimum of one address is required.</p>
          <form>
            <label htmlFor="name">Name of an Asset or Company</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              placeholder="ez"
            />
            <label htmlFor="sharePrice">Unit Price of Share</label>
            <input
              type="number"
              id="sharePrice"
              name="sharePrice"
              value={this.state.sharePrice}
              onChange={this.handleChange}
              required
              placeholder="271"
            />
            <label htmlFor="address">
              Address of the Share Holder #{this.state.addresses.length+1}
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              placeholder="0x123.."
              required
            />
            <label htmlFor="percentage">
              Percentage of the Share Holder #{this.state.percentages.length+1}
            </label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              value={this.state.percentage}
              onChange={this.handleChange}
              placeholder="100"
              required
            />
            <div className="form-error">{this.state.error}</div>
            <button onClick={this.addAddress}>Add Address</button>
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
