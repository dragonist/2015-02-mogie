var MovieBox = React.createClass({
	getInitialState: function() {
	   	return { rating : 
	   			{result : false, count : null, span: ["", "", "", "", ""]}}
	},
	handleClick:function (count) {
		var rating = {};
		if(this.state.rating.count && this.state.rating.count==count){
			for(var i=0; i<count; i++){
				rating.span[i] = "";
			}
			rating.count = null;
			rating.result = false;
		}else{
			for(var i=0; i<count; i++){
				this.state.rating.span[i] = "on";
			}
			rating.count = count;
			rating.result = true;
		}
		// this.setState({rating: rating});
	},
  render: function() {
  	var cx = React.addons.classSet;
  	var classes = cx({
  	    "movie-box" : true,
  	    'on': this.state.rating.result
  	});
  	var rateSpan = cx({
  		"on" : this.state.rating.span[0],
  	})
    return (
      	<li key={this.props.id} className={classes} data-key={this.state.rating.count}>
      		<div className="box-image">
      			<img src={this.props.src} alt={this.props.title} width="185px"/>
      		</div>
      		<div className="box-contents">
      			<div className="contents">
      				<div className="title">{this.props.title}</div>
      				<div className="rating">
      					<span className={this.state.rating.result[0]} onClick={this.handleClick(1)}></span>
      					<span className={this.state.rating.result[1]} onClick={this.handleClick(2)}></span>
      					<span className={this.state.rating.result[2]} onClick={this.handleClick(3)}></span>
      					<span className={this.state.rating.result[3]} onClick={this.handleClick(4)}></span>
      					<span className={this.state.rating.result[4]} onClick={this.handleClick(5)}></span>
      				</div>
      			</div>
      		</div>
      	</li>
    );
  }
});

// var MovieBox = React.createClass({
// 	handleRating: function () {
// 		this.props.onEdit();
// 		classie.removeClass(ancestor,"on");
// 		this.setState({editText: this.props.todo.title});
// 	},
// 	render: function() {
// 		return (
// 		  	<li key={this.props.id} className={React.addons.classSet({
// 					moveBox: true,
// 					editing: this.props.editing
// 				}>
// 		  		<div className="box-image">
// 		  			<img src={this.props.src} alt={this.props.title} width="185px" />
// 		  		</div>
// 		  		<div className="box-contents">
// 		  			<div className="contents">
// 		  				<div className="title">{this.props.title}</div>
// 		  				<div className="rating" onClick={this.handleRating} >
// 		  					<span data-key="1"></span>
// 		  					<span data-key="2"></span>
// 		  					<span data-key="3"></span>
// 		  					<span data-key="4"></span>
// 		  					<span data-key="5"></span>
// 		  				</div>
// 		  			</div>
// 		  		</div>
// 		  	</li>
// 		);
// 	}
// });
module.exports = MovieBox;

/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	app.TodoItem = React.createClass({
		handleSubmit: function (event) {
			var val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
				this.props.onDestroy();
			}
		},

		handleEdit: function () {
			this.props.onEdit();
			this.setState({editText: this.props.todo.title});
		},

		handleKeyDown: function (event) {
			if (event.which === ESCAPE_KEY) {
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
			} else if (event.which === ENTER_KEY) {
				this.handleSubmit(event);
			}
		},

		handleChange: function (event) {
			this.setState({editText: event.target.value});
		},

		getInitialState: function () {
			return {editText: this.props.todo.title};
		},

		/**
		 * This is a completely optional performance enhancement that you can
		 * implement on any React component. If you were to delete this method
		 * the app would still work correctly (and still be very performant!), we
		 * just use it as an example of how little code it takes to get an order
		 * of magnitude performance improvement.
		 */
		shouldComponentUpdate: function (nextProps, nextState) {
			return (
				nextProps.todo !== this.props.todo ||
				nextProps.editing !== this.props.editing ||
				nextState.editText !== this.state.editText
			);
		},

		/**
		 * Safely manipulate the DOM after updating the state when invoking
		 * `this.props.onEdit()` in the `handleEdit` method above.
		 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
		 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
		 */
		componentDidUpdate: function (prevProps) {
			if (!prevProps.editing && this.props.editing) {
				var node = React.findDOMNode(this.refs.editField);
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}
		},

		render: function () {
			return (
				<li className={React.addons.classSet({
					completed: this.props.todo.completed,
					editing: this.props.editing
				})}>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.todo.completed}
							onChange={this.props.onToggle}
						/>
						<label onDoubleClick={this.handleEdit}>
							{this.props.todo.title}
						</label>
						<button className="destroy" onClick={this.props.onDestroy} />
					</div>
					<input
						ref="editField"
						className="edit"
						value={this.state.editText}
						onBlur={this.handleSubmit}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
					/>
				</li>
			);
		}
	});
})();