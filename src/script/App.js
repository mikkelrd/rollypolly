import Home from './home/Home';
import Poll from './poll/Poll';
import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import firebaseUtils from './firebaseUtils';

const Main = React.createClass({

  getInitialState () {
    return {
      loggedIn: firebaseUtils.getAuthData()
    };
  },

  login () {
    Rx.Observable.fromPromise(firebaseUtils.login())
      .subscribe(
        r => this.setState({ loggedIn: r }),
        r => this.setState({ loggedIn: r })
      );
  },

  logout () {
    firebaseUtils.logout();
    this.setState({ loggedIn: firebaseUtils.getAuthData() });
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
        <Link to="/">
          <h2 className=""> ROLLY POLLY <br/> roll your own poll </h2>
        </Link>
        {this.props.children}
      </div>
    )
  }

});

const Routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Main} >
      <IndexRoute component={Home} />
      <Route path=":pollId" component={Poll} />
    </Route>
  </Router>
);

ReactDOM.render(Routes , document.getElementById('app'));
