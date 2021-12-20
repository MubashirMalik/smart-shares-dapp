import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SMART_SHARES } from './config.js'
import './ViewAssets.css';

export default function Sellers() {
    const navigate = useNavigate();
    const { price, name } = useParams();
    const [state, setState] = useState({addresses: [], error: ""});
    const addresses = state.addresses;
    const error = state.error;

    const addressList = addresses.map((address, id) => <li key={id} className="ViewAssets-list">{address}<button onClick={() => { navigate(`/buy-shares/${name}/${price}/${address}`); }}>Buy</button></li>);

    useEffect(() => {
      async function loadAddresses() {
        let result = await SMART_SHARES.methods.getShareSellers(name).call().catch(err => setState({ ...state, error: err.message }));

        // filtering returned addresses
        let _addresses = [];
        for(let i = 0; i < result[1]; i++)
          _addresses.push(result[0][i]);
        let _error = "";
        if (result[1] == 0) {
          _error = "Looks like no one is willing to sell shares of this asset! :(";
        }

        setState({
          ...state , addresses: _addresses, error: _error
        });
      }
      loadAddresses();
    }, []);

    return(
      <div className="ViewAssets">
        <h1>{name}: Sellers</h1>
        <p>Loading may take sometime..</p>
        <p style={{color: "red"}}>{error}</p>
        <ul>{addressList}</ul>
      </div>
    );
}
