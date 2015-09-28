

var MovieBox = React.createClass({
  render: function() {
    return (
      	<li key={this.props.id} className="movie-box" data-key={this.props.id}>
      		<div className="box-image">
      			<img src={this.props.src} alt={this.props.title}/>
      		</div>
      		<div className="box-contents">
      			<div className="contents">
      				<div className="title">{this.props.title}</div>
      				<div className="rating">
      					<span data-key="1"></span>
      					<span data-key="2"></span>
      					<span data-key="3"></span>
      					<span data-key="4"></span>
      					<span data-key="5"></span>
      				</div>
      			</div>
      		</div>
      	</li>
    );
  }
});

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

var data = [
  {"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"},
  {"id":"77992","title":"GROW : 인피니트의 리얼 청춘 라이프","src":"img/img77992.jpg"},
  {"id":"76755","title":"7번방의 선물","src":"img/img76755.jpg"},
  {"id":"38373","title":"(IMAX DMR 2D)다크 나이트","src":"img/img38373.gif"},
  {"id":"38210","title":"추격자","src":"img/img38210.gif"},
  {"id":"76625","title":"인피니트 콘서트 세컨드 인베이전 에볼루션 더 무비 3D","src":"img/img76625.jpg"},
  {"id":"39679","title":"세 얼간이","src":"img/img39679.jpg"},
  {"id":"77968","title":"제자, 옥한흠","src":"img/img77968.jpg"},
  {"id":"76165","title":"언터처블 : 1%의 우정","src":"img/img76165.jpg"},
  {"id":"38877","title":"아바타: 스페셜 에디션","src":"img/img38877.gif"}
];


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