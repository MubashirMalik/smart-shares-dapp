import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { SMART_SHARES } from './config.js'
import './ViewAssets.css';

function ViewAssets() {
  let navigate = useNavigate();
  const [state, setState] = useState({names: [], sharePrices: []});
  const names = state.names;
  const sharePrices = state.sharePrices;
  const assetList = names.map(
    (name, index) => <li key={index} className="ViewAssets-list">
      <div className="items">
        <span><b>Name:</b> {name}</span>
        <span><b>Price :</b> {sharePrices[index]} ethers per share</span>
      </div>
      <div>
        <button onClick={() => { navigate(`/view-share-holders/${name}`); }}>View ShareHolders</button>
        <button onClick={() => { navigate(`/sellers/${name}/${sharePrices[index]}`); }}>Buy Shares</button>
        <button onClick={() => { navigate(`/sell-shares/${name}`); }}>Sell Shares</button>
        <button style={{background: 'red'}} onClick={() => { navigate(`/add-ttp/${name}`); }}>Add TTP</button>
        <button style={{background: 'red'}} onClick={() => { navigate(`/update-share-price/${name}/${sharePrices[index]}`); }}>Update SharePrice</button>
      </div>
    </li>
  );

  useEffect(() => {
    async function loadAssets() {
      let result = await SMART_SHARES.methods.listAssets().call();
      setState({...state, names: result[0], sharePrices: result[1]});
    }
    loadAssets();
  }, []);

  return(
    <div className="ViewAssets">
      <h1>Registerd Assets</h1>
      <p>Loading may take sometime..</p>
      <ul>{ assetList }</ul>
    </div>
  );
}

export default ViewAssets;
