export default React.createClass({

  propTypes: {
    text: React.PropTypes.string,
    vote: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      text: '',
      vote: 0
    };
  },

  getInitialState () {
    return {
      text: this.props.text,
      vote: this.props.vote
    };
  },

  voteUp (e) {
    console.log(e);
    this.setState( { vote: this.state.vote + 1 } );
  },

  render () {
    return (
      <div className="option" onClick={this.voteUp}>
        <div className="option-text">{this.props.text}</div>
        <div className="option-vote">{this.props.vote}</div>
      </div>
    )
  }

});
