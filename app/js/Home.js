import firebaseUtils from './firebaseUtils';

export default React.createClass({

  getInitialState () {
    return {
      polls: []
    };
  },

  componentWillMount () {
    this.getPolls();
  },

  getPolls () {
    console.log(firebaseUtils.getPolls());
    // firebaseUtils.getPolls().then(p => {
    //   console.log(p);
    //   this.setState({ polls: p });
    // });
  },

  mapPolls () {
    return this.state.polls.map((p, i) => (<a href="" key="{i}">{p.title}</a>));
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
          className="poll-add"
          onKeyDown={this.addNewPoll}
        />
      </div>
    )
  }
});
