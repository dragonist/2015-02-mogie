

module.exports = React.createClass({
  getInitialState: function() {
    return {"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"};
  },
  onClick:function (e) {
    var target = e.target;
    var children = target.parentNode.children;
    var ancestor = target.closest(".movie-box");
    var method = (this.props.movie.rate && this.props.movie.rate === target.dataset.key)? "remove":"add";
   	
   	for(var i=0; i<5; i++){
   		if(i<target.dataset.key){
   	  		classie[method+"Class"](children[i], "on");
   		}else{
   			classie["removeClass"](children[i], "on");
   		}
   	}

   	classie[method+"Class"](ancestor,"on");
   	this.props[method+"Rating"](target.dataset.key);

  },
  render: function() {
    return (
      	<li key={this.props.movie.id} className="movie-box" data-key={this.props.movie.id}>
      		<div className="box-image">
      			<img src={this.props.movie.src} alt={this.props.movie.title} width="185px"/>
      		</div>
      		<div className="box-contents">
      			<div className="contents">
      				<div className="title">{this.props.movie.title}</div>
      				<div className="rating">
      					<span data-key="1" onClick={this.onClick}></span>
      					<span data-key="2" onClick={this.onClick}></span>
      					<span data-key="3" onClick={this.onClick}></span>
      					<span data-key="4" onClick={this.onClick}></span>
      					<span data-key="5" onClick={this.onClick}></span>
      				</div>
      			</div>
      		</div>
      	</li>
    );
  }
});