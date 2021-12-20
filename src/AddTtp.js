import { useParams, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { web3, SMART_SHARES } from './config.js'
import { handleError } from './ErrorHandler';

export default function AddTTP() {
    const { name, seller } = useParams();
    let navigate = useNavigate();
    const [state, setState] = useState({ address: "", error: ""});
    const address = state.address;
    const error = state.error;

    async function handleSubmit(evt) {
      evt.preventDefault();
      const accounts = await web3.eth.getAccounts();

      var price = '1';
      await SMART_SHARES.methods.addTTP(
        name,
        address
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
          <h1>{name}: Add TTP</h1>
          <p>Instructions: Only owner can set the TTP and only once.</p>
          <form>
            <label htmlFor="address">
              Address of TTP
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder="0x123"
              onChange={handleChange}
              required
            />
            <div className="form-error">{error}</div>
            <button onClick={handleSubmit}>Set</button>
          </form>
        </div>
      </div>
    );
}
