import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../../actions/userActions';
import NavigationBar from './NavigationBar.jsx';
import AllUsersList from './AllUsersList.jsx';

class ViewAllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: []
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchUser());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ allUsers: nextProps.usersList });
  }
  render() {
    const users = this.state.allUsers.filter(user => user.roleId !== 1);
    console.log(users, 'user');
    return (
      <div>
        <NavigationBar />
        <AllUsersList allUsers={users} />
        </div>
    );
  }
}
const mapStateToProps = state => ({
  usersList: state.usersReducer.users
});
export default connect(mapStateToProps)(ViewAllUsers);