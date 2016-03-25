import Home from './home/Home';
import Poll from './poll/Poll';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import { authLogin, authLogout, getAuthData } from './firebaseUtils';

const Main = React.createClass({

  getInitialState () {
    return {
      loggedIn: getAuthData()
    };
  },

  login () {
    Rx.Observable.fromPromise(authLogin())
      .subscribe(
        r => this.setState({ loggedIn: true }),
        r => this.setState({ loggedIn: false })
      );
  },

  logout () {
    authLogout();
    this.setState({ loggedIn: getAuthData() });
  },

  componentDidMount () {
    let authBtn = document.querySelector('#auth-btn');
    let authClickStream = Rx.Observable.fromEvent(authBtn, 'click')
      .subscribe(e => this.state.loggedIn ? this.logout() : this.login() );
  },

  render () {
    return (
      <div className="">
        <div className="center"><button className="small button" id="auth-btn">
          {this.state.loggedIn ? 'LOGOUT' : 'LOGIN'}
        </button></div>
        <Link to="/"><h2 className="center">ROLLY POLLY</h2></Link>
        <h4 className="center sub">roll your own poll</h4>
        {this.props.children}
      </div>
    )
  }

});

const Routes = (
  <Router history={browserHistory}>
  {/*<Router history={createBrowserHistory()}>*/}
    <Route path="/" component={Main} >
      <IndexRoute component={Home} />
      <Route path="poll/:pollId" component={Poll} />
    </Route>
  </Router>
);

ReactDOM.render(Routes , document.getElementById('app'));
