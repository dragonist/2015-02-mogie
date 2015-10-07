var LineChart = require("react-chartjs").Line;

var app= {};
app.SelectWrapper = "showSelectWrapper";
app.ResultWrapper = "showResultWrapper";
app.Movies = require('./../mockData/movie3.js');
app.util = {
  localAjax: function (req, callback) {
    setTimeout(function () {
      var res = { movies: [], status: false };
      res.movies = app.Movies.slice(req.loadItem, req.loadItem+req.loadEach);
      if(res.movies.length === req.loadEach){ res.status=true; } 
      callback(res);
    }, 500);
  }
}

var BoxContainer = require('./boxContainer.jsx');
var Header = require('./header.jsx');


var SelectWrapper = React.createClass({
  render:function () {
    return (
      <section id="selectWrapper">
          <a id="overWrapper" href="#/"></a>
          <BoxContainer
            data={this.props.movies}
            addMovie={this.props.addMovie} 
            removeMovie={this.props.removeMovie} />
          <div id="bottomContainer">
            <div id="waitContainer" className={this.props.waitPageForLoad}>
              로딩중 입니다.
            </div>
            <div id="endContainer" className={this.props.endPageForLoad}>
              끝! 더 이상 영화가 존재하지 않습니다. 
            </div>
          </div>
          <footer>
            erin@naver.com © 2015. All Rights Reserved.
          </footer>
      </section>
    )
  }
})

var ResultWrapper = React.createClass({
  getInitialState: function () {
    return {
      ratingData : [0,0,0,0,0]
    };
  },
  render:function () {
    var count = this.props.count
    var totalCount = this.props.totalCount
    var boxList = [];
    var movieChart;
    var container;
    var chartData = {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
          {
              label: "평점분포 그래프",
              fillColor: "rgba(252,183,180,0.2)",
              strokeColor: "rgba(252,183,180,0.6)",
              
              pointColor: "rgba(252,183,180,1)",
              pointStrokeColor: "rgba(252,183,180,1)",

              pointHighlightFill: "rgba(250,144,140,1)",
              pointHighlightStroke: "rgba(250,144,140,1)",
              data: this.state.ratingData
          }
      ]
    };
    var chartOptions = {
        responsive: true
    };
    for(var i=0; i<5; i++){
      this.state.ratingData[i] = 0;
    }
    for(var i = 0; i< sessionStorage.length; i++){
      var movie = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
      this.state.ratingData[movie.rate-1]++;
      var result = (<li key={movie.id}>
        <p className="title">
          {movie.title}
        </p>
        <p className="rate">
          {movie.rate}
        </p>
      </li>)
      boxList.push(result);
    }

    movieChart = <LineChart data={chartData} options={chartOptions}/>
    container = (count<totalCount) ?
    <p>{totalCount-count}개 더 체크해 주세요</p> : <div id="movieChart">{movieChart}</div> 
    movieList = (count === 0)? <p>평가한 영화가 없어요</p> : <ul id="movieList">{boxList}</ul>
    
    return (
      <section id="resultWrapper">
        <div id="resultContainer">{container}</div>
        <div id="movieList">{movieList}</div>
      </section>
    )
  }
})


var Body = React.createClass({
  getInitialState: function () {
    return {
      selectCount: 0,
      totalCount: 10,
      nowShowing: app.SelectWrapper,
      showResult: true,
      waitPageForLoad: "",
      endPageForLoad: "",
      loadEach: 10,
      hasMore:true,
      loadMovie: []
    };
  },
  downScroll: function(e) {
    // window.scrollTo(0,screen.height);
    window.scrollTo(0, window.scrollY+screen.height-80);
  },
  handleScroll: function () {
    if ( this.state.endPageForLoad === "on" || this.state.waitPageForLoad === "on" ) { return; }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setState({waitPageForLoad:"on"});
      var req = {loadItem:this.state.loadMovie.length, loadEach:this.state.loadEach}

      app.util.localAjax(req, function (res) {
        if(res && res.status){
          this.setState({ loadMovie: this.state.loadMovie.concat(res.movies), waitPageForLoad:""});
        }else{
          this.setState({ endPageForLoad: "on" , waitPageForLoad: "close" });
        }
      }.bind(this));
    }
  },
  moreShow : function (req, callback) {
    setTimeout(function () {
      var res = { movies: [], status: false };
      res.movies = app.Movies.slice(req.loadItem, req.loadItem+req.loadEach);
      if(res.movies.length === req.loadEach){ res.status=true; } 
      callback(res);
    }, 500);
  },
  addMovie: function (movie) {
    sessionStorage.setItem(movie.id, JSON.stringify(movie));
    this.setState({selectCount: this.state.selectCount+1})
  },
  removeMovie: function (movie) {
    sessionStorage.removeItem(movie.id);
    this.setState({selectCount: this.state.selectCount-1})
  },
  onScroll:function() {
    window.addEventListener('scroll', function (e) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { this.handleScroll() }
    }.bind(this));

    app.util.localAjax({loadItem:this.state.loadMovie.length, loadEach:this.state.loadEach}, function (res) {
      this.setState({ loadMovie: this.state.loadMovie.concat(res.movies) });
    }.bind(this));
  },
  setMock: function (mockstate) {
    app.util.localAjax({loadItem:this.state.loadMovie.length, loadEach: mockstate.selectCount}, function (res) {
      mockstate.loadMovie = this.state.loadMovie.concat(res.movies)
      this.setState(mockstate);

      for(var i=0; i<res.movies.length; i++){
        var movie = res.movies[i];
        movie.rate = Math.floor((Math.random() * 5) + 1);
        sessionStorage.setItem(movie.id, JSON.stringify(movie));
      }
    }.bind(this));
  },
  componentDidMount: function () {
    sessionStorage.clear();
    var setState = this.setState;
    var setMock = this.setMock;

    var router = Router({
      '/'      : setState.bind(this, {nowShowing: app.SelectWrapper}),
      '/result': setState.bind(this, {nowShowing: app.ResultWrapper}),
      '/mock'  : setMock.bind(this, {nowShowing: app.ResultWrapper, selectCount:11})
    });

    var width = document.body.offsetWidth;
    var keyForloadEach = (width > 965) ? 10 : (width > 768) ? 8 : (width > 586) ? 6 : 4;
    this.setState({loadEach: keyForloadEach}, this.onScroll)

    router.init('/');

  },
  render: function() {
    var header, selectWrapper, resultWrapper;
    header =
      <Header
        count={this.state.selectCount}
        totalCount={this.state.totalCount}
        nowShowing={this.state.nowShowing} 
        downScroll={this.downScroll}/>;

    selectWrapper = 
      <SelectWrapper 
        addMovie={this.addMovie}
        removeMovie={this.removeMovie}
        movies={this.state.loadMovie}
        waitPageForLoad={this.state.waitPageForLoad}
        endPageForLoad={this.state.endPageForLoad}
        activeMovie={this.state.movies}/>
    
    resultWrapper = 
      <ResultWrapper 
        count={this.state.selectCount}
        totalCount = {this.state.totalCount} />
    
    return (
      <div className={this.state.nowShowing}>
        {header}
        {selectWrapper}
        {resultWrapper}
      </div>
    );
  }
});

React.render(
  <Body/>,
  document.getElementById('Container')
);