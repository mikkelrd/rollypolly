import firebaseUtils from './firebaseUtils';

export default React.createClass({

  getInitialState () {
    return {
      polls: []
    };
  },

  componentDidMount () {
    firebaseUtils.getPolls().then(p => {
      this.setState({ polls: p });
    });
      // this.setState({ polls: [ {title: 'one'}, {title: 'two'}] });
  },

  mapPolls () {
    console.log('line 19', this.state.polls);
    return this.state.polls.map((p, i) => (<a href="" key={i}>{p[1].title}</a>));
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
