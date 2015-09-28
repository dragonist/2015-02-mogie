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
/***/ function(module, exports) {

	/** @jsx React.DOM */

	var MovieBox = React.createClass({displayName: "MovieBox",
	  render: function() {
	    return (
	      	React.createElement("li", {key: this.props.id, className: "movie-box", "data-key": this.props.id}, 
	      		React.createElement("div", {className: "box-image"}, 
	      			React.createElement("img", {src: this.props.src, alt: this.props.title})
	      		), 
	      		React.createElement("div", {className: "box-contents"}, 
	      			React.createElement("div", {className: "contents"}, 
	      				React.createElement("div", {className: "title"}, this.props.title), 
	      				React.createElement("div", {className: "rating"}, 
	      					React.createElement("span", {"data-key": "1"}), 
	      					React.createElement("span", {"data-key": "2"}), 
	      					React.createElement("span", {"data-key": "3"}), 
	      					React.createElement("span", {"data-key": "4"}), 
	      					React.createElement("span", {"data-key": "5"})
	      				)
	      			)
	      		)
	      	)
	    );
	  }
	});

	var BoxContainer = React.createClass({displayName: "BoxContainer",
	  render: function() {
	    var boxList = this.props.data.map(function (movie) {
	      return (
	        React.createElement(MovieBox, {author: movie.id, title: movie.title, src: movie.src}, 
	          movie.title
	        )
	      );
	    });
	    return (
	      React.createElement("ul", {id: "boxContainer"}, 
	        boxList
	      )
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
	var Header = React.createClass({displayName: "Header",
	  render:function () {
	    return (
	      React.createElement("header", null, 
	        React.createElement("h1", null, React.createElement("a", {href: "#"}, "Mogie")), 
	        React.createElement("div", {className: "nav activemore"}, 
	          React.createElement("a", {href: "#result"}, "분석 결과"), 
	          React.createElement("a", {href: "#"}, "더 평가하기 ")
	        ), 
	        React.createElement("div", {id: "countContainer"}, 
	          React.createElement("span", {id: "count"}, "3"), 
	          React.createElement("span", null, "/ 10"), 
	          React.createElement("span", null)
	        )
	      )
	    )
	  }
	})

	var SelectWrapper = React.createClass({displayName: "SelectWrapper",
	  render:function () {
	    return (
	      React.createElement("section", {id: "selectWrapper"}, 
	          React.createElement(BoxContainer, {data: data}), 
	          React.createElement("div", {id: "waitContainer"}, 
	            "끝! 더 이상 영화가 존재하지 않습니다." 
	          )
	      )
	    )
	  }
	})
	var ResultWrapper = React.createClass({displayName: "ResultWrapper",
	  render:function () {
	    return (
	      React.createElement("section", {id: "resultWrapper"}, 
	        React.createElement("div", {id: "moreContinaer"}, 
	          "더 체크해 주세요"
	        ), 
	        React.createElement("div", {id: "loadContainer"}, 
	          "잠시만 기다려 주세요"
	        ), 
	        React.createElement("ul", {id: "resultContainer"}, 
	          React.createElement("li", null, 
	            React.createElement("div", null, 
	              "그래프"
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
	      )
	    )
	  }
	})


	var Body = React.createClass({displayName: "Body",
	  render: function() {
	    
	    return (
	      React.createElement("div", null, 
	        React.createElement(Header, null), 
	        React.createElement(SelectWrapper, null), 
	        React.createElement(ResultWrapper, null), 
	        React.createElement("footer", null, 
	          "erin@naver.com © 2015. All Rights Reserved."
	        )
	      )
	    );
	  }
	});

	React.render(
	  React.createElement(Body, {data: data}),
	  document.getElementById('Container')
	);

/***/ }
/******/ ]);