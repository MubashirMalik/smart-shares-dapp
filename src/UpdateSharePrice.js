import { useParams, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { web3, SMART_SHARES } from './config.js'
import { handleError } from './ErrorHandler';

export default function UpdateSharePrice() {
    const { name, price } = useParams();
    let navigate = useNavigate();
    const [state, setState] = useState({ newPrice: "", error: ""});
    const newPrice = state.newPrice;
    const error = state.error;

    async function handleSubmit(evt) {
      evt.preventDefault();
      const accounts = await web3.eth.getAccounts();

      var price = '1';
      await SMART_SHARES.methods.changeSharePrice(
        name,
        newPrice
      ).send({from: accounts[0], gas:3000000}).catch(err => {
          setState({ ...state, error: handleError(err.message)});
        });

      //if (error == "") navigate(`/sellers/${name}`);
    }

    function handleChange(evt) {
      setState({
        ...state, [evt.target.name]: evt.target.value
      });
    }

    return(
      <div className="Form">
        <div className="Form-body">
          <h1>{name}: Update SharePrice</h1>
          <p>Instructions: Only TTP of the asset can update the share price.<br />
          <b>Current Price: {price}</b>
          </p>
          <form>
            <label htmlFor="newPrice">
              New Price
            </label>
            <input
              type="number"
              id="newPrice"
              name="newPrice"
              value={newPrice}
              placeholder="7"
              onChange={handleChange}
              required
            />
            <div className="form-error">{error}</div>
            <button onClick={handleSubmit}>Update</button>
          </form>
        </div>
      </div>
    );
}
