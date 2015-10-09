module.exports = React.createClass({
  onClick:function (e) {
    if(this.props.filter) return;
    var target = e.target;
    // var ancestor = target.closest(".movie-box"); //for ei 8
    var ancestor = target.parentElement.parentElement.parentElement.parentElement
    var rate = (this.props.movie.rate && this.props.movie.rate === target.dataset.key)? null: target.dataset.key;
    
    // 추가및 변경 "add" /삭제 "remove"
    var method = (rate)? "add":"remove";
    classie[method+"Class"](ancestor,"on");
    this.props.movie.rate = rate;
    debugger;
   	this.props[method+"Movie"](this.props.movie);
  },
  render: function() {
    var boxImage, boxContents;
    var rate = ["", "", "", "", ""];

    var movieBoxClassName = "movie-box"
    var count = this.props.movie.rate
    if(count){
      movieBoxClassName += " on";
      for(var i=0; i< 5; i++){
        rate[i] = (i < count) ? "on" : "";
      }
    }
    boxImage = (this.props.filter)? null: 
    <div className="box-image"><img src={this.props.movie.src} alt={this.props.movie.title} /></div>
    
    boxContents = <div className="box-contents">
            <div className="contents">
              <div className="title">{this.props.movie.title}</div>
              <div className="rating">
                <span data-key="1" onClick={this.onClick} className={rate[0]}></span>
                <span data-key="2" onClick={this.onClick} className={rate[1]}></span>
                <span data-key="3" onClick={this.onClick} className={rate[2]}></span>
                <span data-key="4" onClick={this.onClick} className={rate[3]}></span>
                <span data-key="5" onClick={this.onClick} className={rate[4]}></span>
              </div>
            </div>
          </div>
    
    return (
      	<li key={this.props.movie.id} className={movieBoxClassName} data-key={this.props.movie.id}>
      		{boxImage}
      		{boxContents}
      	</li>
    );
  }
});