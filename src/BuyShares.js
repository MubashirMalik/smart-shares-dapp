import { useParams, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { web3, SMART_SHARES } from './config.js'
import { handleError } from './ErrorHandler';

export default function BuyShares() {
    const { price, name, seller } = useParams();
    let navigate = useNavigate();
    const [state, setState] = useState({ percentageBuying: "", error: ""});
    const percentageBuying = state.percentageBuying;
    const error = state.error;

    async function handleSubmit(evt) {
      evt.preventDefault();
      const accounts = await web3.eth.getAccounts();
      let totalPrice = price*percentageBuying;

      await SMART_SHARES.methods.transferShares(
        name,
        percentageBuying,
        seller
      ).send({value: web3.utils.toWei(totalPrice.toString(), 'ether'), from: accounts[0], gas:3000000}).catch(err => {
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
          <h1>{name}: Buy Shares</h1>
          <p>Instructions: You must send that much ethers.<br />
            <b>Seller Address: </b>{seller}<br/>
            <b>Share Price: </b>{price}
          </p>
          <form>
            <label htmlFor="percentageBuying">
              Percentage you wish to buy
            </label>
            <input
              type="number"
              id="percentageBuying"
              name="percentageBuying"
              value={percentageBuying}
              placeholder="100"
              onChange={handleChange}
              required
            />
            <div className="form-error">{error}</div>
            <button onClick={handleSubmit}>Place Order</button>
          </form>
        </div>
      </div>
    );
}
