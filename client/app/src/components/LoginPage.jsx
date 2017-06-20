import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginAction } from '../actions/userActions';
//import { fetchdocument } from '../actions/documentActions';
import Navigation from './Navigation';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
      userId:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.login(this.state).then((error) => {
      if (!error) {
        ////this.props.dispatch(fetchdocument(this.state.userId));
        this.props.history.push('/documents');
      } else {
        this.setState({ errors: error.response.data, isLoading: false });
        this.props.history.push('/');
      }
    });
  }
  render() {
    const rowStyle = {
      marginTop: '100px',
    };
    const { errors } = this.state;

    return (
      <div>
        <Navigation />
        <div className="loginContainer">
        <div className="row" style={rowStyle}>
          <div className="col s12  z-depth-5" id="login">
        <div className="row">
          <div className="col s12">
                  <h5>Login into your account</h5>
            {errors.message && <div className="alert alert-danger">{errors.message}</div> }
          </div>
        </div>
        <div className="row">
              <div className="input-field col s12">
            <i className="material-icons" id="iconEmailPassword">
              email</i>
            <input id="email" name="email" type="text"
              className="validate" onChange={this.handleChange} />
            <label htmlFor="email" id="label">Email</label>
            {errors.email && <span id="errorAlert" className="help-block">{errors.email}</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons" id="iconEmailPassword">
              lock_outline</i>
            <input id="password" name="password" type="text"
              className="validate" onChange={this.handleChange} />
            <label htmlFor="password" id="label">Password</label>
             {errors.password && <span id="errorAlert" className="help-block">{errors.password}</span>}
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                  <button className="waves-effect waves-light btn orange" id="loginButton" type="submit" onClick={this.onSubmit}>
                  Log in</button>
                <div className="row">
                  <div className="col s12">
                    <p> Don't have an account? <a href="/signup" id="signupLink">SignUp Here</a></p>
                  </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
          </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.createUsersReducer.user.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: loginCrendentials => dispatch(loginAction(loginCrendentials))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};
LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};
