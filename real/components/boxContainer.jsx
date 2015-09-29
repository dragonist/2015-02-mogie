var MovieBox = require('./movieBox.jsx');
module.exports  = React.createClass({
  render: function() {
    var boxList = this.props.data.map(function (movie, i) {
      return (
          <MovieBox 
            key={i} 
            movie={movie} 
            addRating={this.props.addMovie} 
            removeRating={this.props.removeMovie}>
          </MovieBox>
      );
    }, this);
    return (
      <ul id="boxContainer">
        {boxList}
      </ul>
    );
  }
});