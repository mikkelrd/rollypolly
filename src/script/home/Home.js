import firebaseUtils from '../firebaseUtils';
import { Link } from 'react-router';

export default React.createClass({

  getInitialState () {
    return {
      polls: []
    };
  },

  componentDidMount () {
    this.getPolls();
  },

  getPolls () {
    firebaseUtils.getPolls().then(p => {
      this.setState({ polls: p });
    });
  },

  mapPolls () {
    console.log('line 19', this.state.polls);
    return this.state.polls.map((p, i) => (
      <div key={p[0]}><Link to={`/${p[0]}`}>{p[1].title}</Link></div>
    ));
  },

  addNewPoll (e) {
    if(e.keyCode === 13){
      console.log(firebaseUtils.getAuthData());
      let newPoll = {
        title: e.target.value,
        uid: firebaseUtils.getAuthData().uid
      };
      firebaseUtils.addPoll(newPoll);
      this.getPolls();
      e.target.value = '';
    }
  },

  render () {
    return (
      <div>
        <h4>my polls</h4>
        {this.mapPolls()}
        <h4>create new</h4>
        <input
          type="text"
          placeholder="new poll name..."
          ref="newPollInput"
          className=""
          onKeyDown={this.addNewPoll}
        />
      </div>
    )
  }
});
