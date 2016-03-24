import firebaseUtils from './firebaseUtils';

export default React.createClass({

  getInitialState () {
    return {
      polls: []
    };
  },

  componentDidMount () {
    this.getPolls();
      // this.setState({ polls: [ {title: 'one'}, {title: 'two'}] });
  },

  getPolls () {
    firebaseUtils.getPolls().then(p => {
      this.setState({ polls: p });
    });
  },

  mapPolls () {
    console.log('line 19', this.state.polls);
    return this.state.polls.map((p, i) => (
      <div key={p[0]}><a href="">{p[1].title}</a></div>
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
