import firebaseUtils from './firebaseUtils';

export default React.createClass({

  getInitialState () {
    return {
      loggedIn: firebaseUtils.getAuthData()
    };
  },

  login () {
    firebaseUtils.login()
    .then(r => {
      this.setState({
        loggedIn: r
      });
    })
    .catch(r => {
      this.setState({
        loggedIn: r
      });
    });
  },

  logout () {
    firebaseUtils.logout();
    this.setState({
      loggedIn: firebaseUtils.getAuthData()
    });
  },

  render () {
    let auth = this.state.loggedIn ?
      (<a className="button" onClick={this.logout}>LOGOUT</a>) :
      (<a className="button" onClick={this.login}>LOGIN</a>);
    return (
      <div className="">
        {auth}
        <h2 className=""> ROLLY POLLY <br/> roll your own poll </h2>
        {this.props.children}
      </div>
    )
  }

});
