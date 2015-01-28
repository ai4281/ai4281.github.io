/*** @jsx React.DOM */


var PersonApp = React.createClass({

  getInitialState:function(){
    return{data:[], first:'', last:''}
  },

  onChangeFirst:function(e){
    this.setState({first: e.target.value})
  },

  onChangeLast:function(e){
    this.setState({last: e.target.value})
  },

  handleSubmit:function(e){
    e.preventDefault();
    this.state.data.push({first:this.state.first, last:this.state.last});
    this.setState({first:'', last:''});
  },

  render:function(){
    return (
      <div>
        <h3>Enter first and last name</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.first} onChange={this.onChangeFirst} />
          <input type="text" value={this.state.last} onChange={this.onChangeLast} />
          <button>Add</button>
        </form>
        <PersonList data={this.state.data} />
      </div>
      )
  }
});

var Person = React.createClass({
  render:function(){
    return (
      <div>
      <h2>{this.props.last}, {this.props.first}</h2>
      </div>
    )
  }

})

var PersonList = React.createClass({
  render:function(){

    var people = this.props.data.map(function(person){
      return <Person first = {person.first} last= {person.last} />
    });

    return (
        <div>
        {people}
        </div>
      )

  }

})

React.render(<PersonApp />, document.getElementById('content'))