'use strict'

var React = require('react')
// var Content = require('./content.jsx')

// React.render(<Content />, document.getElementById('countContainer'))


var Comment = React.createClass({
  render: function() {
    return (
      	<li className="movie-box" data-key={this.props.id}>
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


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.id} title={comment.title} src={comment.src}>
          {comment.title}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        안녕! 난 댓글 폼이야.
      </div>
    );
  }
});



// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//         <h1>댓글</h1>
//         <CommentList data={this.props.data}/>
//         <CommentForm />
//       </div>
//     );
//   }
// });

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: [ {"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"},
  {"id":"77992","title":"GROW : 인피니트의 리얼 청춘 라이프","src":"img/img77992.jpg"}]};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.setState({data: this.props.data});
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });

  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});


var data = [
  {"id":"77959","title":"빌리 엘리어트 뮤지컬 라이브","src":"img/img77959.jpg"},
  {"id":"77992","title":"GROW : 인피니트의 리얼 청춘 라이프","src":"img/img77992.jpg"},
  {"id":"76755","title":"7번방의 선물","src":"img/img76755.jpg"}
];


// React.render(
//   <CommentBox url="./../mockData/movie1.json" />,
//   document.getElementById('Container')
// );

React.render(
  <CommentBox data={data}/>,
  document.getElementById('Container')
);



var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});



React.render(
  <LikeButton />,
  document.getElementById('LikeContainer')
);
