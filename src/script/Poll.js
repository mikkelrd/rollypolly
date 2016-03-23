// import AddOption from './AddOption';
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

  mapOptions () {
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
    if(e.keyCode === 13){
      this.setState({ options: this.state.options.concat( [ { text: e.target.value, vote: 0 } ] ) });
      e.target.value = '';
    }
  },

  render () {
    return (
      <div>
        <h3 className="">where to go for lunch</h3>
        <div className="options">
          {this.mapOptions()}
        </div>
        <input
          type="text"
          placeholder="new response option..."
          ref="newOptionInput"
          className="option-add"
          onKeyDown={this.addNewOption}
        />
      </div>
    )
  }

});
