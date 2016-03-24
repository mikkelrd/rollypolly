import Home from './home/Home';
import Poll from './poll/Poll';
import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
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
        <Link to="/"><h2 className="">ROLLY POLLY</h2></Link>
        <h3>roll your own poll</h3>
        {this.props.children}
      </div>
    )
  }

});

const Routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Main} >
      <IndexRoute component={Home} />
      <Route path="poll/:pollId" component={Poll} />
    </Route>
  </Router>
);

ReactDOM.render(Routes , document.getElementById('app'));
