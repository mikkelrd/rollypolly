import Main from './Main';
import Home from './Home';
import Poll from './Poll';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHistory, useBasename } from 'history';
const history = useBasename(createHistory)({
  basename: '/'
});

// const Main = React.createClass({
//   render () {
//     return (
//       <div>
//         <div>main test</div>
//         {this.props.children}
//       </div>
//     )
//   }
// });

// const Home = React.createClass({
//   render () {
//     return (
//       <div>
//         <div>home test</div>
//         <Link to="/poll">to poll</Link>
//       </div>
//     )
//   }
// });

// const Poll = React.createClass({
//   render () {
//     console.log(this.props);
//     return (
//       <div>poll test</div>
//     )
//   }
// });

const Routes = (
  <Router history={history}>
    <Route path="/" component={Main} >
      <IndexRoute component={Home} />
      <Route path="poll" component={Poll} />
    </Route>
  </Router>
);
ReactDOM.render(Routes , document.getElementById('app'));
