import React from 'react';
import { withRouter } from 'react-router-dom';


class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    localStorage.removeItem('jwtToken');
    this.props.history.push('/login');
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper" >
            <div className="brand-logo left" id="navLogout">DocumentME</div>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a className="waves-effect wave-light"
               href= '/login' onClick={this.onSubmit}>Logout</a></li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}
export default withRouter(LogoutPage);
