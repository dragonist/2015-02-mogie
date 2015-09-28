( function( window ) {
	
	'use strict';

	var elBoxContainer = document.getElementById("boxContainer");

	elBoxContainer.addEventListener("mouseover", function(e) {   
	  	if(e.target.tagName !== "SPAN") return

	  	var target = e.target;
	  	var children = target.parentNode.children;
	  	for(var i=0; i<children.length; i++){
	  		var method = (i<target.dataset.key)?"addClass":"removeClass";
	  		classie[method](children[i], "on");
	  	}
	});

	elBoxContainer.addEventListener("click", function(e) {   
		if(e.target.tagName !== "SPAN") return

		var target = e.target;
		var children = target.parentNode.children;
		var ancestor = target.closest(".movie-box");

		if(target.parentNode.dataset.key && target.parentNode.dataset.key === target.dataset.key){
			for(var i=0; i<target.dataset.key; i++){
				classie.removeClass(children[i], "on");
			}
			target.parentNode.dataset.key = null;
			classie.removeClass(ancestor,"on");
		}else{
			for(var i=0; i<target.dataset.key; i++){
				classie.addClass(children[i], "on");
			}
			target.parentNode.dataset.key = target.dataset.key;
			classie.addClass(ancestor,"on");
		}
	});
	
} )( window );