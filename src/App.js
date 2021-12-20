import React, {Component} from 'react';
import NavBar from './NavBar';
import AddAsset from './AddAsset';
import ViewAssets from './ViewAssets';
import Sellers from './Sellers';
import SellShares from './SellShares';
import BuyShares from './BuyShares';
import ViewShareHolders from './ViewShareHolders';
import AddTtp from './AddTtp';
import UpdateSharePrice from './UpdateSharePrice';

import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

function Home() {
  return(
    <div className="ViewAssets">
      <h2>What is SmartShares?</h2>
      <ul>
        <li>DApp that allows buying and selling Shares of Assets using Smart Contracts. An asset can be any thing.. from a company, car to a NFT.</li>
      </ul>
      <h2>Why use SmartShares?</h2>
      <ul>
        <li>We ensure that the shares being sold and bought are the be actual shares on the chain and not fraud by dealers.</li>
        <li>Gas fee for buying shares is lower as compared to real life dealers cut along with Ease of use and anonymity</li>
      </ul>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/add-asset" element={ <AddAsset />} />
          <Route exact path="/view-assets" element={ <ViewAssets /> } />
          <Route exact path="/sellers/:name/:price" element={<Sellers />} />
          <Route exact path="/sell-shares/:name" element={<SellShares />} />
          <Route exact path="/buy-shares/:name/:price/:seller" element={<BuyShares />} />
          <Route exact path="/view-share-holders/:name" element={<ViewShareHolders />} />
          <Route exact path="/add-ttp/:name" element={<AddTtp />} />
          <Route exact path="/update-share-price/:name/:price" element={<UpdateSharePrice />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default App;
