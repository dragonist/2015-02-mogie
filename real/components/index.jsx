var data = require('./movie3.js');

var MovieBox = require('./movieBox.jsx');


var BoxContainer = React.createClass({
  onPut: function (movie, i, rating) {
    movie.rate = rating;
    this.props.addMovie(movie);
  },
  onPop: function (movie, i, rating) {
    movie.rate = null;
    this.props.removeMovie(movie);
  },
  render: function() {
    var boxList = this.props.data.map(function (movie, i) {
      var onPut = this.onPut.bind(this, movie, i);
      var onPop = this.onPop.bind(this, movie, i);
      return (
        <MovieBox 
          key={i} 
          movie={movie} 
          addRating={onPut} 
          removeRating={onPop}>
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

// React.render(
//   <CommentBox url="./../mockData/movie1.json" />,
//   document.getElementById('Container')
// );

var Header = React.createClass({
  render:function () {
    return (
      <header>
        <h1><a href="#/">Mogie</a></h1>
        <div className="nav activemore">
          <a href="#/result">분석 결과</a>
          <a href="#/">더 평가하기 </a>
        </div>
        <div id="countContainer">
          <span id="count">{this.props.count}</span>
          <span>/ {this.props.totalCount}</span>
          <span></span>
        </div>
      </header>
    )
  }
})

var SelectWrapper = React.createClass({
  render:function () {
    return (
      <section id="selectWrapper">
          <BoxContainer 
            data={data} 
            addMovie={this.props.onPut} 
            removeMovie={this.props.onPop} />
          <div id="waitContainer">
            끝! 더 이상 영화가 존재하지 않습니다. 
          </div>
      </section>
    )
  }
})
var ResultWrapper = React.createClass({

  render:function () {
    var count = this.props.count
    var totalCount = this.props.totalCount
    var moreCount = totalCount-count;
    var container;

    if(count<totalCount){
      container = <div id="moreContinaer">
          {count} 개 체크 하셨습니다. <br/>
          {moreCount} 더 체크해 주세요
        </div>
    }else{
      container = <ul id="resultContainer">
          <li>
            <div>
              그래프
            </div>
            <div>
              뭔가 데스크탑에서만 보일 화면
            </div>
          </li>
          
          <li>
            <div>
              그래프
            </div>
            <div>
              뭔가 데스크탑에서만 보일 화면
            </div>
          </li>
        </ul> 
    }

    return (
      <section id="resultWrapper">
        {container}
      </section>
    )
  }
})
var app= {};
app.SelectWrapper ="showSelectWrapper";
app.ResultWrapper ="showResultWrapper";

var Body = React.createClass({
  onPut: function (movie) {
    console.log("onPut +++ ")
    console.log(movie);
  },
  onPop: function (movie) {
    console.log("onPop --- ")
    console.log(movie);
  },
  getInitialState: function () {
    return {
      nowShowing: app.SelectWrapper,
      showResult: true
    };
  },
  componentDidMount: function () {
    var setState = this.setState;
    var router = Router({
      '/': setState.bind(this, {nowShowing: app.SelectWrapper}),
      '/result': setState.bind(this, {nowShowing: app.ResultWrapper}),
    });
    router.init('/');
  },
  render: function() {
    var selectCount = 2;
    var totalCount = 10;
    var header, selectWrapper, resultWrapper;

    header =
      <Header
        count={selectCount}
        totalCount={totalCount}
        nowShowing={this.state.nowShowing} />;

    selectWrapper = 
      <SelectWrapper 
        onPop={this.onPop}
        onPut={this.onPut}/>
    
    resultWrapper = 
      <ResultWrapper 
        count={selectCount}
        totalCount = {totalCount}/>
    
    return (
      <div className={this.state.nowShowing}>
        {header}
        {selectWrapper}
        {resultWrapper}
        <footer>
          erin@naver.com © 2015. All Rights Reserved.
        </footer>
      </div>
    );
  }
});

React.render(
  <Body />,
  document.getElementById('Container')
);