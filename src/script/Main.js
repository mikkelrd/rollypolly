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

  componentDidMount () {
    let authBtn, authClickStream;
    authBtn = document.querySelector('#auth-btn');
    authClickStream = Rx.Observable.fromEvent(authBtn, 'click')
      .subscribe(e => this.state.loggedIn ? this.logout() : this.login() );
  },

  render () {
    return (
      <div className="">
        <button className="button" id="auth-btn">
          {this.state.loggedIn ? 'LOGOUT' : 'LOGIN'}
        </button>
        <h2 className=""> ROLLY POLLY <br/> roll your own poll </h2>
        {this.props.children}
      </div>
    )
  }

});
