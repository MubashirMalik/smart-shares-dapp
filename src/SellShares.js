import { useParams, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { web3, SMART_SHARES } from './config.js'
import { handleError } from './ErrorHandler';

function SellShares() {
    const { name } = useParams();
    let navigate = useNavigate();
    const [state, setState] = useState({ percentageSelling: "", error: ""});
    const percentageSelling = state.percentageSelling;
    const error = state.error;

    async function handleSubmit(evt) {
      evt.preventDefault();
      const accounts = await web3.eth.getAccounts();

      await SMART_SHARES.methods.sellShares(
        name,
        percentageSelling
      ).send({from: accounts[0], gas:3000000}).catch(err => {
          setState({ ...state, error: handleError(err.message)});
        });
    }

    function handleChange(evt) {
      setState({
        ...state, [evt.target.name]: evt.target.value
      });
    }

    return(
      <div className="Form">
        <div className="Form-body">
          <h1>{name}: Sell Your Shares</h1>
          <p>Instructions: You must own that much shares atleast. Use the registered account for selling.</p>
          <form>
            <label htmlFor="percentageSelling">
              Percentage you wish to sell
            </label>
            <input
              type="number"
              id="percentageSelling"
              name="percentageSelling"
              value={percentageSelling}
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
export default SellShares;
