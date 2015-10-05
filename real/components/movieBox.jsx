module.exports = React.createClass({
  getInitialState: function() {
    return {"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"};
  },
  onClick:function (e) {
    var target = e.target;
    var children = target.parentNode.children;
    // var ancestor = target.closest(".movie-box"); //for ei 8
    var ancestor = target.parentElement.parentElement.parentElement.parentElement
    var rate = (this.props.movie.rate && this.props.movie.rate === target.dataset.key)? null: target.dataset.key;
    
    // 추가및 변경 "add" /삭제 "remove"
    var method = (rate)? "add":"remove";
    for(var i=0; i<5; i++){
      // 선택한 값 만큼 하트 [methd] + 않선택한 부분은 [remove]
      var localMethod = (i<target.dataset.key) ? method : "remove"
      classie[localMethod+"Class"](children[i], "on");
    }
    classie[method+"Class"](ancestor,"on");

    this.props.movie.rate = rate;
   	this.props[method+"Rating"](this.props.movie);
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