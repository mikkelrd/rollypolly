import { getAllPolls } from '../firebaseUtils';
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
    let polls = [];
    getAllPolls()
      .subscribe(s => {
        polls.push(s);
        this.setState({polls});
      });
  },

  mapPolls () {
    return this.state.polls.map(p => (
      <div key={p.id}>
        <Link to={`/poll/${p.id}`}>
          {p.poll.title}
        </Link>
      </div>
    ));
  },

  addNewPoll (e) {
    if(e.keyCode === 13){
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
