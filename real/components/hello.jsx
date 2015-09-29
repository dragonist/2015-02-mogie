var data = require('./movie3.js');
var MovieBox = require('./movieBox.jsx');

var BoxContainer = React.createClass({
  render: function() {
    var boxList = this.props.data.map(function (movie) {
      return (
        <MovieBox author={movie.id} title={movie.title} src={movie.src}>
          {movie.title}
        </MovieBox>
      );
    });
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
        <h1><a href="#">Mogie</a></h1>
        <div className="nav activemore">
          <a href="#result">분석 결과</a>
          <a href="#">더 평가하기 </a>
        </div>
        <div id="countContainer">
          <span id="count">3</span>
          <span>/ 10</span>
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
          <BoxContainer data={data}/>
          <div id="waitContainer">
            끝! 더 이상 영화가 존재하지 않습니다. 
          </div>
      </section>
    )
  }
})
var ResultWrapper = React.createClass({
  render:function () {
    return (
      <section id="resultWrapper">
        <div id="moreContinaer">
          더 체크해 주세요
        </div>
        <div id="loadContainer">
          잠시만 기다려 주세요
        </div>
        <ul id="resultContainer">
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
      </section>
    )
  }
})


var Body = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <SelectWrapper/>
        <ResultWrapper/>
        <footer>
          erin@naver.com © 2015. All Rights Reserved.
        </footer>
      </div>
    );
  }
});

React.render(
  <Body data={data}/>,
  document.getElementById('Container')
);