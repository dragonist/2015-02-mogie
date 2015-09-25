// var CountResult = React.createClass({
// 	render: function(){
// 		var count = this.props.count;
// 		var message = (count>10)?"좋아요! 분석결과를 확인해 보세요":"더 많이 영화를 평가해 주세요"
// 		return React.Dom.p(null, message);
// 	}
// });
// var CountFactory = React.createFactory(CountResult);
// var start = 10;
// setInterval(function () {
// 	React.render(CountFactory({count: start}), document.getElementById('countContainer'));
// }, 1000);



var CountResult = React.createClass({
	getInitialState: function () {
		return {
			value: this.props.value || 200
		}
	},
	render : function () {
		var count = 10;
		var message = (count>10)?"좋아요! 분석결과를 확인해 보세요":"더 많이 영화를 평가해 주세요"

		return (
			<div>
				<p>{this.state.value}</p>
		        <button onClick={this.decrease}>▼</button>
		        <button onClick={this.increase}>▲</button>
		    </div>
		);
	},
	// decrease: function () {
	// 	this.setState({value:--this.state.value});	
	// },
	decrease: function () {
		this.state.value -= 1;
		this.setState({value:this.adjustValue(this.state.value)});	
	},
	increase: function () {
		this.setState({value:++this.state.value});	
	},
	adjustValue : function (value) {
		if(value <495){
			value =495;
		}
		return value;
	}
})
var count = {
	value : 500
}

React.render(
	<CountResult {...count}/>,
	// <CountResult value="" />,
	document.getElementById('countContainer')
);