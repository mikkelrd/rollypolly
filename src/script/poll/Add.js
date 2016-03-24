export default React.createClass({

  // addChat: function(){
  //   $.ajax({
  //     url: this.props.url,
  //     type: 'POST',
  //     data: JSON.stringify({text: this.refs.newChatInput.getDOMNode().value}),
  //     beforeSend: function(request) {
  //       request.setRequestHeader("X-Parse-Application-Id", '1tNw34UWSqjkyu4byPGV3q1G6hZcYQmYuvqx0abS');
  //       request.setRequestHeader("X-Parse-REST-API-Key", 'ALlZ2WvYnreWNPfHQXoRRiDWt0pXkryYINGAzqnc');
  //       request.setRequestHeader("Content-Type", 'application/json');
  //     },
  //     error: function() {
  //       console.log('error on post');
  //     },
  //     success: function() {
  //       this.refs.newChatInput.getDOMNode().value = '';
  //       console.log('Successful Post');
  //     }.bind(this)
  //   })
  // },

  handleSubmit (e) {
    if(e.keyCode === 13){
      this.props.add.call(null, e.target)
    }
  },

  render () {
    return (
      <div className="">
        <input
          type="text"
          placeholder="new choice..."
          ref="newChoiceInput"
          onKeyDown={this.handleSubmit}
        />
      </div>
    )
  }

});
