import Main from './Main';
import Home from './Home';
import Poll from './Poll';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

const history = useBasename(createHistory)({
  basename: '/'
});

const Routes = (
  <Router history={history}>
    <Route path="/" component={Main} >
      <IndexRoute component={Home} />
      <Route path="poll" component={Poll} />
    </Route>
  </Router>
);

ReactDOM.render(Routes , document.getElementById('app'));
