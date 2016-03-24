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

  vote (e) {
    // console.log(e);
    console.log(this.state);
    this.setState( { vote: this.state.vote + 1 } );
  },

  render () {
    return (
      <div className="" onClick={this.vote}>
        <div className="">{this.state.text}</div>
        <div className="">{this.state.vote}</div>
      </div>
    )
  }

});
