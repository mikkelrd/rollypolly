import Poll from './Poll';
import firebaseUtils from './firebaseUtils';
console.log(firebaseUtils);
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

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

  render () {
    return (
      <div className="container">
        <a onClick={this.login}>LOGIN</a>
        <a onClick={this.logout}>LOGOUT</a>
        <h2 className=""> ROLLY POLLY <br/> roll your own poll </h2>
        <Poll />
      </div>
    )
  }
//{this.props.children}

});

// const Routes = (
//   <Route handler={App} >
//     <Route path="poll/:poll" handler={Poll} />
//     <DefaultRoute handler={App} >
//   </Route>
// );

// Router.run(Routes, function(Component){
//   React.render(<Component /> , document.getElementById('app'));
// });


ReactDOM.render( <App />, document.getElementById('app') );
