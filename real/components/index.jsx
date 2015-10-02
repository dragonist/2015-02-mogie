var app= {};
app.SelectWrapper = "showSelectWrapper";
app.ResultWrapper = "showResultWrapper";
app.Movies = require('./../mockData/movie3.js');

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
          <div id="waitContainer" className={this.props.waitPageForLoad}>
            로딩중 입니다. 
          </div>
          <div id="endContainer" className={this.props.endPageForLoad}>
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
      // loadMovie:app.DownLoads,
      waitPageForLoad: "",
      endPageForLoad: "",
      loadEach: 4,
      hasMore:true,
      loadMovie: []
    };
  },
  downScroll: function(e) {
    // window.scrollTo(0,screen.height);
    window.scrollTo(0, window.scrollY+screen.height-80);
  },
  handleScroll: function () {
    console.log("handleScroll");
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setState({waitPageForLoad:"on"});
      var req = {loadItem:this.state.loadMovie.length, loadEach:this.state.loadEach}

      this.moreShow(req, function (res) {
        if(res && res.status){
          this.setState({ loadMovie: this.state.loadMovie.concat(res.movies), waitPageForLoad: "" });
        }else{
          debugger;
          this.setState({ endPageForLoad: "on" , waitPageForLoad: "" });
        }
      }.bind(this));
    }
  },
  moreShow : function (req, callback) {
    var res = { movies: [], status: false };

    res.movies = app.Movies.slice(req.loadItem, req.loadItem+req.loadEach);
    if(res.movies.length === req.loadEach){ res.status=true; } 
    callback(res);
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
    
    window.addEventListener('scroll', function (e) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.handleScroll();
      }
    }.bind(this));
    this.moreShow({loadItem:this.state.loadMovie.length, loadEach:this.state.loadEach}, function (res) {
      this.setState({ loadMovie: this.state.loadMovie.concat(res.movies) });
    }.bind(this));
    
    if(document.body.offsetWidth>965){
      setState({loadEach:10})
    }else if(document.body.offsetWidth>768){
      setState({loadEach:8})
    }else if(document.body.offsetWidth>586){
      setState({loadEach:6})
    }
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
        onPop={this.onPop}
        onPut={this.onPut}
        movies={this.state.loadMovie}
        waitPageForLoad={this.state.waitPageForLoad}
        endPageForLoad={this.state.endPageForLoad}/>
    
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
  <Body/>,
  document.getElementById('Container')
);