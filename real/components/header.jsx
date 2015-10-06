module.exports = React.createClass({
  render:function () {
    var nav;
    if(this.props.count<this.props.totalCount){
      nav = <a href="#/" onClick={this.props.downScroll}>더 보기</a>
    }else{
      nav = <a href="#/result">분석 결과</a>
    }
    return (
      <header>
        <h1><a href="/">Mogie</a></h1>
        <div className="nav">
          <a href="#/">더 평가하기</a>
          {nav}
        </div>
        <div id="countContainer">
          <span id="count">{this.props.count}</span>
          <span>/ {this.props.totalCount}</span>
          <span></span>
        </div>
      </header>
    )
  }
});