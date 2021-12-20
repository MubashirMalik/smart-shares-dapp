import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SMART_SHARES } from './config.js'
import './ViewAssets.css';

function ViewShareHolders() {
  const { name } = useParams();
  const [state, setState] = useState({addresses: [], percentages: []});
  const addresses = state.addresses;
  const percentages = state.percentages;
  const addressList = addresses.map((address, index) => <li className="ViewAssets-list" key={index}><strong>ShareHolder: {index+1}</strong><span><b>Address:</b> {address}<br/><b>Percentage Owned:</b> {percentages[index]}</span></li>);

  useEffect(() => {
    let _addresses = [];
    async function loadShareHolders() {
      _addresses = await SMART_SHARES.methods.listShareHolders(name).call();
      let _percentages = [];
      for (let i = 0; i < _addresses.length; i++) {
         _percentages.push(await SMART_SHARES.methods.getMyShares(name).call({ from: _addresses[i]}));
       }
       setState({...state, addresses: _addresses, percentages: _percentages});
    }
    loadShareHolders();
  }, []);

  return(
    <div className="ViewAssets">
      <h1>ShareHolders of {name}</h1>
      <p>Loading may take sometime..</p>
      <ul>{ addressList }</ul>
    </div>
  );
}
export default ViewShareHolders;
