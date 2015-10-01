var app= {};
app.SelectWrapper = "showSelectWrapper";
app.ResultWrapper = "showResultWrapper";
app.Movies = require('./../mockData/movie3.js');
app.DownLoads = [];
app.DownLoads = app.Movies;

var BoxContainer = require('./boxContainer.jsx');
var Header = require('./header.jsx');


var SelectWrapper = React.createClass({
  render:function () {
    return (
      <section id="selectWrapper">
          <BoxContainer
            data={this.props.movies}
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
    
    var boxList = this.props.activeMovie.map(function (movieId, i) {
      return (
          <li key={i}>
            <p>
              {movieId}
            </p>
          </li>
      );
    }, this);
    

    if(count<totalCount){
      container = <div id="moreContinaer">
          {count} 개 체크 하셨습니다. <br/>
          {moreCount} 더 체크해 주세요
        </div>
    }else{
      container = <ul id="resultContainer">
          <li>
            <div id="activeMovie">
              <ul>
                {boxList}
              </ul>
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



var Body = React.createClass({
  getInitialState: function () {
    return {
      selectCount: 0,
      totalCount: 10,
      activeMovie: [],
      nowShowing: app.SelectWrapper,
      showResult: true,
      downloadMovie:app.DownLoads
    };
  },
  moreShow: function (e) {
    console.log(e);
    console.log("show More");
    this.state.downloadMovie.push({"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"});
    this.setState({downloadMovie: this.state.downloadMovie})
  },
  onPut: function (movie) {
    var count = this.state.selectCount+1;
    this.state.activeMovie.push(movie.id);
    this.setState({selectCount: count});
  },

  onPop: function (movie) {
    var count = this.state.selectCount-1;
    this.state.activeMovie["key"+movie.id] = null;
    this.setState({selectCount: count})
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
    var header, selectWrapper, resultWrapper;
    header =
      <Header
        count={this.state.selectCount}
        totalCount={this.state.totalCount}
        nowShowing={this.state.nowShowing} 
        moreShow={this.moreShow}/>;

    selectWrapper = 
      <SelectWrapper 
        onPop={this.onPop}
        onPut={this.onPut}
        movies={this.state.downloadMovie}/>
    
    resultWrapper = 
      <ResultWrapper 
        count={this.state.selectCount}
        totalCount = {this.state.totalCount}
        activeMovie={this.state.activeMovie}/>
    
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