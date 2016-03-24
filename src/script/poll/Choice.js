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

  castVote (e) {
    this.setState( { vote: this.state.vote + 1 } );
  },

  render () {
    return (
      <div className="" onClick={this.castVote}>
        <div className="">{this.state.text}</div>
        <div className="">{this.state.vote}</div>
      </div>
    )
  }

});
