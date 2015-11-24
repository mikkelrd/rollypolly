import AddOption from './AddOption';
import Option from './Option';

export default React.createClass({

  getInitialState () {
    return {
      options: [
        {text: 'taco bell', vote: 0},
        {text: 'del taco', vote: 0},
        {text: 'taco time', vote: 0},
      ]
    };
  },

  componentDidMount () {
  },

  createOptions () {
    return this.state.options.map(function(item, index){
      return (
        <Option
          key={index}
          text={item.text}
          vote={item.vote}
        />
      )
    });
  },

  addNewOption (e) {
    this.setState({ options: this.state.options.concat( [ { text: e.value, vote: 0 } ] ) });
    e.value = '';
  },

  render () {
    return (
      <div>
        <h3 className="">where to go for lunch</h3>
        <div className="options">
          {this.createOptions()}
        </div>
        <AddOption add={this.addNewOption} />
      </div>
    )
  }

});
