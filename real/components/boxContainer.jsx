var MovieBox = require('./movieBox.jsx');
module.exports  = React.createClass({
  render: function() {
    var boxList = this.props.movies;
    if(this.props.filter){
      boxList = boxList.filter(function (movie) {
        return (movie.rate)?true:false;
      })
    }
    boxList = boxList.map(function (movie, i) {
      return (
          <MovieBox 
            key={i} 
            movie={movie}
            filter={this.props.filter}
            addMovie={this.props.addMovie} 
            removeMovie={this.props.removeMovie}>
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