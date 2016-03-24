import { getPollById, getChoices } from '../firebaseUtils';
import Choice from './Choice';
// import Add from './Add';

export default React.createClass({

  getInitialState () {
    this.pollStream = getPollById(this.props.params.pollId);
    return {
      title: '',
      choices: []
    }
  },

  componentDidMount () {
    this.getPoll();
  },

  getPoll () {
    this.pollStream.subscribe(pollSnapshot => {
      if (!this.poll) this.poll = pollSnapshot;
      this.getChoices(pollSnapshot.ref());
      this.setState({
        title: pollSnapshot.val().title,
      });
    });
  },

  getChoices (pollRef) {
    this.choicesStream = getChoices(pollRef)
      .subscribe(c => {
        this.setState({ choices: this.state.choices.concat([c]) });
      });
  },

  mapChoices () {
    return this.state.choices.map((c, i) => (
      <Choice
        key={i}
        text={c.text}
        count={c.count}
      />
    ));
  },

  addNewChoice (e) {
    if(e.keyCode === 13){
      this.setState({ choices: this.state.choices.concat([ {text: e.target.value, count: 0} ]) });
      e.target.value = '';
    }
  },

  render () {
    return (
      <div>
        <h4 className="">{this.state.title}</h4>
        <div className="">
          {this.mapChoices()}
        </div>
        <input
          type="text"
          placeholder="new choice..."
          ref="newChoiceInput"
          className=""
          onKeyDown={this.addNewChoice}
        />
      </div>
    )
  }

});
