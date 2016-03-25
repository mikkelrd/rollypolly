import { getFireRef, getCountStream, castVote } from '../firebaseUtils';

export default React.createClass({

  propTypes: {
    text: React.PropTypes.string,
    count: React.PropTypes.number,
    poll: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      text: '',
      count: 0
    };
  },

  getInitialState () {
    return {
      text: this.props.text,
      count: this.props.count
    };
  },

  getCount () {
    this.choiceRef = getFireRef(`polls/${this.props.poll.id}/choices/${this.props.text}`);
    this.countStream = getCountStream(this.choiceRef)
      .subscribe(countSnapshot => {
        this.setState({ count: countSnapshot.val() });
      });
  },

  componentDidMount () {
    this.getCount();
    let choice = document.querySelector(`#choice-${this.props.reactKey}`);
    let choiceStream = Rx.Observable.fromEvent(choice, 'click')
      .subscribe(e => {
        castVote(this.choiceRef)
      });
  },

  render () {
    return (
      <div id={`choice-${this.props.reactKey}`}
      className="choice pointer margin-bottom-small">
        <div className="count">{this.state.count}</div>
        <div className="">{this.state.text}</div>
      </div>
    )
  }

});
