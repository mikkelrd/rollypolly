import Poll from './Poll';
import firebaseUtils from './firebaseUtils';
console.log(firebaseUtils);
// const Router = ReactRouter.Router;
// const Route = ReactRouter.Route;
// const Link = ReactRouter.Link;
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHistory, useBasename } from 'history';
const history = useBasename(createHistory)({
  basename: '/'
})

const App = React.createClass({

  getInitialState () {
    return {
      loggedIn: firebaseUtils.isLoggedIn()
    }
  },

  login () {
    firebaseUtils.login();
  },

  logout () {
    firebaseUtils.logout();
  },

  polls () {
    //get from firebase
    //map of links array
  },

  render () {
    let c = this.props.children;
    console.log('children:', c);
    return (
      <div className="container">
        <a onClick={this.login}>LOGIN</a>
        <a onClick={this.logout}>LOGOUT</a>
        <h2 className=""> ROLLY POLLY <br/> roll your own poll </h2>
        <input type="text" />
        <Poll />
      </div>
    )
  }
//{this.props.children}

});

const Routes = (
  <Router history={history} >
    <Route path="/" component={App} >
      <Route path="poll/:poll" component={Poll} />
    </Route>
  </Router>
);
ReactDOM.render(Routes , document.getElementById('app'));

// ReactDOM.render( <App />, document.getElementById('app') );
