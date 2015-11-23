import Add from './Add';
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
    // this.interval = setInterval(function(){
    //   this.getPoll()
    // }.bind(this), 1000);
  },

  // getPoll: function(){
  //   $.ajax({
  //     url: this.props.url,
  //     type: 'GET',
  //     beforeSend: function(request) {
  //       request.setRequestHeader("X-Parse-Application-Id", '1tNw34UWSqjkyu4byPGV3q1G6hZcYQmYuvqx0abS');
  //       request.setRequestHeader("X-Parse-REST-API-Key", 'ALlZ2WvYnreWNPfHQXoRRiDWt0pXkryYINGAzqnc');
  //       request.setRequestHeader("Content-Type", 'application/json');
  //     },
  //     error: function(data) {
  //       console.log('There was an error in getting the chats');
  //     },
  //     success: function(data) {
  //       if (this.isMounted()) {
  //         this.setState({
  //           options: data.results
  //         });
  //       }
  //     }.bind(this)
  //   });
  // },

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
        <div className="options">
          {this.createOptions()}
        </div>
        <Add add={this.addNewOption} />
      </div>
    )
  }

});
