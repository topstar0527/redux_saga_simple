import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Header, Segment, Container, Dimmer, Loader, Button, Confirm,Form} from 'semantic-ui-react';
import { makeSelectCurrentUser } from 'containers/App/redux/selectors';
import { makeSelectUser,makeSelectUserLoading} from '../redux/selectors';
import { profileRequest} from '../../../auth/redux/actions';

import {
    userLoadRequest,
    updateUserField,
  } from '../redux/actions';

class ProfilePage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    };
   }
  
  componentWillMount() {
    const { userLoad, currentUser} = this.props
    userLoad(currentUser.get('_id'));
    this.setState({
      firstName: currentUser.get('firstName'),
      lastName: currentUser.get('lastName'),
      email: currentUser.get('email')
    })
  }
  
  handleSave = () => {
    const {user} = this.props
    this.props.userSave({ _id:user.get('_id'), ...this.state});
  }
  onUpdateField = (field) => (evt) => {
    this.setState({ [field]: evt.target.value });
  }

  render() {
    const { loading } = this.props
    const { firstName, lastName, email, password} = this.state
    return (
        
      <Container fluid>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        
        <Form onSubmit = {this.handleSave}>
            <Segment>
                <Header as="h4" content="Basic Info" dividing />
                    <Form.Input label="First Name" required value={ firstName } onChange={this.onUpdateField('firstName')} />
                    <Form.Input label="Last Name" required  value={ lastName } onChange={this.onUpdateField('lastName')} />
                    <Form.Input label="Email" type="email" required required value={ email } onChange={this.onUpdateField('email')} />
                    <Form.Input label="Password" type="password" value={ password } onChange={this.onUpdateField('password')} />   
                    <Button color="blue">Save</Button>&nbsp;&nbsp;
                    <Link to="/">Cancel</Link>  
            </Segment>
        </Form>  
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  user:makeSelectUser(),
  loading: makeSelectUserLoading(),
});

const mapDispatchToProps = {
  updateField: updateUserField,
  userLoad: userLoadRequest,
  userSave: profileRequest
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(withConnect)(ProfilePage);
  