/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var app= {};
	app.SelectWrapper = "showSelectWrapper";
	app.ResultWrapper = "showResultWrapper";
	app.Movies = __webpack_require__(1);

	var BoxContainer = __webpack_require__(2);
	var Header = __webpack_require__(4);


	var SelectWrapper = React.createClass({displayName: "SelectWrapper",
	  render:function () {
	    return (
	      React.createElement("section", {id: "selectWrapper"}, 
	          React.createElement(BoxContainer, {
	            data: this.props.movies, 
	            addMovie: this.props.onPut, 
	            removeMovie: this.props.onPop}), 
	          React.createElement("div", {id: "bottomContainer"}, 
	            React.createElement("div", {id: "waitContainer", className: this.props.waitPageForLoad}, 
	              "로딩중 입니다."
	            ), 
	            React.createElement("div", {id: "endContainer", className: this.props.endPageForLoad}, 
	              "끝! 더 이상 영화가 존재하지 않습니다." 
	            )
	          )
	      )
	    )
	  }
	})

	var ResultWrapper = React.createClass({displayName: "ResultWrapper",
	  render:function () {
	    var count = this.props.count
	    var totalCount = this.props.totalCount
	    var moreCount = totalCount-count;
	    var container;
	    
	    var boxList = this.props.activeMovie.map(function (movieId, i) {
	      return (
	          React.createElement("li", {key: i}, 
	            React.createElement("p", null, 
	              movieId
	            )
	          )
	      );
	    }, this);
	    

	    if(count<totalCount){
	      container = React.createElement("div", {id: "moreContinaer"}, 
	          count, " 개 체크 하셨습니다. ", React.createElement("br", null), 
	          moreCount, " 더 체크해 주세요"
	        )
	    }else{
	      container = React.createElement("ul", {id: "resultContainer"}, 
	          React.createElement("li", null, 
	            React.createElement("div", {id: "activeMovie"}, 
	              React.createElement("ul", null, 
	                boxList
	              )
	            ), 
	            React.createElement("div", null, 
	              "뭔가 데스크탑에서만 보일 화면"
	            )
	          ), 
	          
	          React.createElement("li", null, 
	            React.createElement("div", null, 
	              "그래프"
	            ), 
	            React.createElement("div", null, 
	              "뭔가 데스크탑에서만 보일 화면"
	            )
	          )
	        ) 
	    }

	    return (
	      React.createElement("section", {id: "resultWrapper"}, 
	        container
	      )
	    )
	  }
	})

	var Body = React.createClass({displayName: "Body",
	  getInitialState: function () {
	    return {
	      selectCount: 0,
	      totalCount: 10,
	      activeMovie: [],
	      nowShowing: app.SelectWrapper,
	      showResult: true,
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
	    if ( this.state.endPageForLoad === "on" || this.state.waitPageForLoad === "on" ) { return; }
	    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	      this.setState({waitPageForLoad:"on"});
	      var req = {loadItem:this.state.loadMovie.length, loadEach:this.state.loadEach}

	      this.moreShow(req, function (res) {
	        if(res && res.status){
	          this.setState({ loadMovie: this.state.loadMovie.concat(res.movies)}, this.setState({waitPageForLoad: ""}) );
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
	  onScroll:function() {
	    window.addEventListener('scroll', function (e) {
	      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	        this.handleScroll();
	      }
	    }.bind(this));

	    this.moreShow({loadItem:this.state.loadMovie.length, loadEach:this.state.loadEach}, function (res) {
	      this.setState({ loadMovie: this.state.loadMovie.concat(res.movies) });
	    }.bind(this));
	  },
	  componentDidMount: function () {
	    var setState = this.setState;
	    var router = Router({
	      '/': setState.bind(this, {nowShowing: app.SelectWrapper}),
	      '/result': setState.bind(this, {nowShowing: app.ResultWrapper}),
	    });
	    router.init('/');

	    if(document.body.offsetWidth>965){
	      this.setState({loadEach:10}, this.onScroll)
	    }else if(document.body.offsetWidth>768){
	      this.setState({loadEach:8}, this.onScroll)
	    }else if(document.body.offsetWidth>586){
	      this.setState({loadEach:6}, this.onScroll)
	    }else{
	      this.onScroll();
	    }
	  },
	  render: function() {
	    var header, selectWrapper, resultWrapper;
	    header =
	      React.createElement(Header, {
	        count: this.state.selectCount, 
	        totalCount: this.state.totalCount, 
	        nowShowing: this.state.nowShowing, 
	        downScroll: this.downScroll});

	    selectWrapper = 
	      React.createElement(SelectWrapper, {
	        onPop: this.onPop, 
	        onPut: this.onPut, 
	        movies: this.state.loadMovie, 
	        waitPageForLoad: this.state.waitPageForLoad, 
	        endPageForLoad: this.state.endPageForLoad})
	    
	    resultWrapper = 
	      React.createElement(ResultWrapper, {
	        count: this.state.selectCount, 
	        totalCount: this.state.totalCount, 
	        activeMovie: this.state.activeMovie})
	    
	    return (
	      React.createElement("div", {className: this.state.nowShowing}, 
	        header, 
	        selectWrapper, 
	        resultWrapper, 
	        React.createElement("footer", null, 
	          "erin@naver.com © 2015. All Rights Reserved."
	        )
	      )
	    );
	  }
	});

	React.render(
	  React.createElement(Body, null),
	  document.getElementById('Container')
	);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var data =[
		{"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"},
		{"id":"77992","title":"GROW : 인피니트의 리얼 청춘 라이프","src":"img/img77992.jpg"},
		{"id":"76755","title":"7번방의 선물","src":"img/img76755.jpg"},
		{"id":"76625","title":"인피니트 콘서트 세컨드 인베이전 에볼루션 더 무비 3D","src":"img/img76625.jpg"},
		{"id":"39679","title":"세 얼간이","src":"img/img39679.jpg"},
		{"id":"77968","title":"제자, 옥한흠","src":"img/img77968.jpg"},
		{"id":"76165","title":"언터처블 : 1%의 우정","src":"img/img76165.jpg"},
		{"id":"76829","title":"소원","src":"img/img76829.jpg"},
		{"id":"77957","title":"님아, 그 강을 건너지 마오","src":"img/img77957.jpg"},
		{"id":"77268","title":"원 오브 어 카인드 3D","src":"img/img77268.jpg"},
		{"id":"77613","title":"베테랑","src":"img/img77613.jpg"},
		{"id":"76550","title":"광해, 왕이 된 남자","src":"img/img76550.jpg"},
		{"id":"77305","title":"어바웃 타임","src":"img/img77305.jpg"},
		{"id":"78257","title":"연평해전","src":"img/img78257.jpg"},
		{"id":"78030","title":"빅 히어로","src":"img/img78030.jpg"},
		{"id":"78316","title":"암살","src":"img/img78316.jpg"},
		{"id":"77379","title":"겨울왕국","src":"img/img77379.jpg"},
		{"id":"76791","title":"신세계","src":"img/img76791.jpg"},
		{"id":"77372","title":"인터스텔라","src":"img/img77372.jpg"},
		{"id":"76767","title":"더 헌트","src":"img/img76767.jpg"},
		{"id":"77974","title":"가디언즈(드림웍스기획전)","src":"img/img77974.jpg"},
		{"id":"76617","title":"퍼스트 포지션","src":"img/img76617.jpg"},
		{"id":"39561","title":"써니","src":"img/img39561.jpg"},
		{"id":"77236","title":"수상한 그녀","src":"img/img77236.jpg"},
		{"id":"39444","title":"파수꾼","src":"img/img39444.jpg"},
		{"id":"78231","title":"말할 수 없는 비밀","src":"img/img78231.jpg"},
		{"id":"77772","title":"비긴 어게인","src":"img/img77772.jpg"},
		{"id":"76670","title":"아이언 맨 3","src":"img/img76670.jpg"},
		{"id":"77348","title":"분노의 질주: 더 세븐","src":"img/img77348.jpg"},
		{"id":"39142","title":"아저씨","src":"img/img39142.jpg"},
		{"id":"76980","title":"길위에서","src":"img/img76980.jpg"},
		{"id":"76955","title":"국제시장","src":"img/img76955.jpg"},
		{"id":"76855","title":"크루즈 패밀리","src":"img/img76855.jpg"},
		{"id":"76249","title":"어벤져스","src":"img/img76249.jpg"},
		{"id":"77633","title":"의궤, 8일간의 축제3D","src":"img/img77633.jpg"},
		{"id":"76658","title":"레미제라블","src":"img/img76658.jpg"},
		{"id":"55765","title":"헬프","src":"img/img55765.jpg"},
		{"id":"78343","title":"인사이드 아웃","src":"img/img78343.jpg"},
		{"id":"39440","title":"그대를 사랑합니다","src":"img/img39440.jpg"},
		{"id":"76770","title":"뽀로로 극장판 슈퍼썰매 대모험","src":"img/img76770.jpg"},
		{"id":"78368","title":"인턴","src":"img/img78368.jpg"},
		{"id":"77263","title":"잉여들의 히치하이킹","src":"img/img77263.jpg"},
		{"id":"76891","title":"월플라워","src":"img/img76891.jpg"},
		{"id":"39739","title":"도가니","src":"img/img39739.jpg"},
		{"id":"39160","title":"토이 스토리 3","src":"img/img39160.jpg"},
		{"id":"78042","title":"킹스맨: 시크릿 에이전트","src":"img/img78042.jpg"},
		{"id":"39438","title":"라푼젤","src":"img/img39438.jpg"},
		{"id":"76605","title":"가디언즈","src":"img/img76605.jpg"},
		{"id":"76574","title":"서칭 포 슈가맨","src":"img/img76574.jpg"},
		{"id":"77948","title":"그 사람 그 사랑 그 세상","src":"img/img77948.jpg"},
		{"id":"77373","title":"명량","src":"img/img77373.jpg"},
		{"id":"76937","title":"분노의 질주: 더 맥시멈","src":"img/img76937.jpg"},
		{"id":"76636","title":"라이프 오브 파이","src":"img/img76636.jpg"},
		{"id":"76417","title":"다크 나이트 라이즈","src":"img/img76417.jpg"},
		{"id":"39614","title":"해리포터와 죽음의 성물 2","src":"img/img39614.jpg"},
		{"id":"78181","title":"파울볼","src":"img/img78181.jpg"},
		{"id":"76456","title":"늑대 아이","src":"img/img76456.jpg"},
		{"id":"39635","title":"마당을 나온 암탉","src":"img/img39635.jpg"},
		{"id":"77835","title":"초콜렛 도넛","src":"img/img77835.jpg"},
		{"id":"76868","title":"송 포 유","src":"img/img76868.jpg"},
		{"id":"77885","title":"누구에게나 찬란한","src":"img/img77885.jpg"},
		{"id":"76815","title":"지슬","src":"img/img76815.jpg"},
		{"id":"76144","title":"아티스트","src":"img/img76144.jpg"},
		{"id":"55851","title":"범죄와의 전쟁 : 나쁜놈들 전성시대","src":"img/img55851.jpg"},
		{"id":"77312","title":"집으로 가는 길","src":"img/img77312.jpg"},
		{"id":"76724","title":"아무르","src":"img/img76724.jpg"},
		{"id":"77420","title":"또 하나의 약속","src":"img/img77420.jpg"},
		{"id":"77454","title":"굿모닝 맨하탄","src":"img/img77454.jpg"},
		{"id":"76466","title":"케빈에 대하여","src":"img/img76466.jpg"},
		{"id":"76675","title":"심플 라이프","src":"img/img76675.jpg"},
		{"id":"78207","title":"매드맥스: 분노의 도로","src":"img/img78207.jpg"},
		{"id":"77219","title":"코알라","src":"img/img77219.jpg"},
		{"id":"76660","title":"MB의 추억","src":"img/img76660.jpg"},
		{"id":"76763","title":"몬스터 주식회사 3D","src":"img/img76763.jpg"},
		{"id":"76626","title":"내가 살인범이다","src":"img/img76626.jpg"},
		{"id":"76584","title":"늑대소년","src":"img/img76584.jpg"},
		{"id":"55833","title":"프렌즈 : 몬스터 섬의 비밀 3D","src":"img/img55833.jpg"},
		{"id":"78213","title":"미션 임파서블: 로그네이션","src":"img/img78213.jpg"},
		{"id":"77571","title":"캡틴 아메리카: 윈터 솔져","src":"img/img77571.jpg"},
		{"id":"77319","title":"그렇게 아버지가 된다","src":"img/img77319.jpg"},
		{"id":"76671","title":"지저스 크라이스트 슈퍼스타","src":"img/img76671.jpg"},
		{"id":"76429","title":"미드나잇 인 파리","src":"img/img76429.jpg"}
	]


	module.exports = data;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var MovieBox = __webpack_require__(3);
	module.exports  = React.createClass({displayName: "module.exports",
	  render: function() {
	    var boxList = this.props.data.map(function (movie, i) {
	      return (
	          React.createElement(MovieBox, {
	            key: i, 
	            movie: movie, 
	            addRating: this.props.addMovie, 
	            removeRating: this.props.removeMovie}
	          )
	      );
	    }, this);
	    return (
	      React.createElement("ul", {id: "boxContainer"}, 
	        boxList
	      )
	    );
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports = React.createClass({displayName: "module.exports",
	  getInitialState: function() {
	    return {"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"};
	  },
	  onClick:function (e) {
	    var target = e.target;
	    var children = target.parentNode.children;
	    // var ancestor = target.closest(".movie-box"); //for ei 8
	    var ancestor = target.parentElement.parentElement.parentElement.parentElement
	    var rate = (this.props.movie.rate && this.props.movie.rate === target.dataset.key)? null: target.dataset.key;
	    
	    var method = (rate)? "add":"remove";
	    for(var i=0; i<5; i++){
	      if(i<target.dataset.key){
	          classie[method+"Class"](children[i], "on");
	      }else{
	        classie["removeClass"](children[i], "on");
	      }
	    }
	    classie[method+"Class"](ancestor,"on");

	    this.props.movie.rate = rate;
	   	this.props[method+"Rating"](this.props.movie);
	  },
	  render: function() {
	    return (
	      	React.createElement("li", {key: this.props.movie.id, className: "movie-box", "data-key": this.props.movie.id}, 
	      		React.createElement("div", {className: "box-image"}, 
	      			React.createElement("img", {src: this.props.movie.src, alt: this.props.movie.title, width: "185px"})
	      		), 
	      		React.createElement("div", {className: "box-contents"}, 
	      			React.createElement("div", {className: "contents"}, 
	      				React.createElement("div", {className: "title"}, this.props.movie.title), 
	      				React.createElement("div", {className: "rating"}, 
	      					React.createElement("span", {"data-key": "1", onClick: this.onClick}), 
	      					React.createElement("span", {"data-key": "2", onClick: this.onClick}), 
	      					React.createElement("span", {"data-key": "3", onClick: this.onClick}), 
	      					React.createElement("span", {"data-key": "4", onClick: this.onClick}), 
	      					React.createElement("span", {"data-key": "5", onClick: this.onClick})
	      				)
	      			)
	      		)
	      	)
	    );
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports = React.createClass({displayName: "module.exports",
	  render:function () {
	    var nav;
	    if(this.props.count<this.props.totalCount){
	      nav = React.createElement("a", {href: "#/", onClick: this.props.downScroll}, "더 보기")
	    }else{
	      nav = React.createElement("a", {href: "#/result"}, "분석 결과")
	    }
	    return (
	      React.createElement("header", null, 
	        React.createElement("h1", null, React.createElement("a", {href: "#/"}, "Mogie")), 
	        React.createElement("div", {className: "nav"}, 
	          React.createElement("a", {href: "#/"}, "더 평가하기"), 
	          nav
	        ), 
	        React.createElement("div", {id: "countContainer"}, 
	          React.createElement("span", {id: "count"}, this.props.count), 
	          React.createElement("span", null, "/ ", this.props.totalCount), 
	          React.createElement("span", null)
	        )
	      )
	    )
	  }
	});

/***/ }
/******/ ]);