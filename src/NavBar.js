import {useNavigate} from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="NavBar">
      <div className="NavBar-left">
        <li className="NavBar-logo">
          Smart Shares
          <sup className="NavBar-slogan">An Ethereum DApp!</sup>
        </li>
      </div>
      <div className="NavBar-right">
        <li>
          <button onClick={() => { navigate(`/view-assets`); }}>View Assets</button>
        </li>
        <li>
          <button onClick={() => { navigate(`/add-asset`); }}>Register Asset</button>
        </li>
      </div>
    </div>
  );
}


export default NavBar;
