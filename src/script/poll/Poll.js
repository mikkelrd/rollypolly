import { getPollStreamById, getChoicesStream, addChoice } from '../firebaseUtils';
import Choice from './Choice';
import Chart from './Chart';

export default React.createClass({

  getInitialState () {
    this.poll = {id: this.props.params.pollId};
    this.pollStream = getPollStreamById(this.props.params.pollId);
    return {
      title: '',
      choices: []
    }
  },

  componentDidMount () {
    this.getPoll();
    let newChoiceInput = document.querySelector('#new-choice-input');
    let newChoiceInputStream = Rx.Observable.fromEvent(newChoiceInput, 'submit')
      .subscribe(e => {
        addChoice(this.poll.ref(), e.target[0].value);
        e.target[0].value = '';
      });
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
    this.choicesStream = getChoicesStream(pollRef)
      .filter(c => this.state.choices.findIndex(e => e.text === c.text) === -1)
      .subscribe(c => {
        this.setState({ choices: this.state.choices.concat([c]) });
      });
  },

  updateCount (index, newCount) {
    let choices = this.state.choices;
    if (choices[index].count !== newCount) {
      choices[index].count = newCount;
      this.setState({choices});
    };
  },

  mapChoices () {
    return this.state.choices.map((c, i) => (
      <Choice
        key={i}
        reactKey={i}
        text={c.text}
        count={c.count}
        poll={this.poll}
        update={this.updateCount}
      />
    ));
  },

  componentWillUnmount () {
    this.pollStream.dispose();
  },

  render () {
    return (
      <div className="container">
        <h4 className="italic margin-bottom">{this.state.title}</h4>
        <div className="poll-data margin-bottom">
          <div className="choices">{this.mapChoices()}</div>
          <Chart data={this.state.choices} />
        </div>
        <form id="new-choice-input">
          <input
            type="text"
            placeholder="new choice..."
            ref="newChoiceInput"
            className="input"
          />
        </form>
      </div>
    )
  }

});
