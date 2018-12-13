
const assert = require("assert");
const props = require("../src/node-properties.js");
const nodes = require("./nodes.js");


describe("Checking nodes basic properties.", function(){
	describe("nodesWithBody", function(){
		it('Should contain only nodes with a body block.', function(){

			const nodez = [];
			const _nodes = nodes.getAllNodes();

			//Let's iterate through all of the possible nodes
			_nodes.map((n) => {

				//Get all the properties from each node
				const properties = Object.getOwnPropertyNames(n);

				//If we find a body property then push it to nodez
				if (properties.indexOf('body') > -1){
					nodez.push(n.type);
				}
			});

			//Sort both arrays before comparing them.

			assert.deepEqual(nodez.sort(), props.nodesWithBody.sort(), "nodesWithBody did not contain only nodes that have a body property");
		});
	});

	describe("nodesWithLeftAndRight", function(){
		it('Should contain only nodes that have a "right" and a "left" leaf node.', function(){

			const nodez = [];
			const _nodes = nodes.getAllNodes();

			//Let's iterate through all of the possible nodes
			_nodes.map((n) => {

				//Get all the properties from each node
				const properties = Object.getOwnPropertyNames(n);

				//If we find a node with a "right" and a "left" property then push it to nodez
				if (properties.indexOf('right') > -1 && properties.indexOf('left') > -1){
					nodez.push(n.type);
				}
			});

			//Sort both arrays before comparing them.
			
			assert.deepEqual(
				nodez.sort(), 
				props.nodesWithLeftAndRight.sort(), 
				"nodesWithLeftAndRight did not contain only nodes that have a 'right' and a 'left' leaf node"
			);

		});
	});

	describe("nodesWithLeftAndRightExceptForIn", function(){
		it('Should contain only nodes that have a "right" and a "left" leaf node excluding the ForInStatement node.', function(){

			const nodez = [];
			const _nodes = nodes.getAllNodes();

			//Let's iterate through all of the possible nodes
			_nodes.map((n) => {

				//Get all the properties from each node
				const properties = Object.getOwnPropertyNames(n);

				//If we find a node with a "right" and a "left" property then push it to nodez
				if (properties.indexOf('right') > -1 && properties.indexOf('left') > -1){
					//Make sure we filter out the ForInStatement node
					if(n.type != 'ForInStatement'){
						nodez.push(n.type);
					}
				}
			});

			//Sort both arrays before comparing them.
			assert.deepEqual(
				nodez.sort(), 
				props.nodesWithLeftAndRightExceptForIn.sort(), 
				"nodesWithLeftAndRightExceptForIn did not contain only nodes that have a 'right' and a 'left' leaf node with exception of the ForInStatement node"
			);

		});
	});
	
	describe("nodesWithCallee", function(){
		it('Should contain only nodes that have a "callee" property', function(){

			const nodez = [];
			const _nodes = nodes.getAllNodes();

			//Let's iterate through all of the possible nodes
			_nodes.map((n) => {

				//Get all the properties from each node
				const properties = Object.getOwnPropertyNames(n);

				//If we find a node with a "callee" property then push it to nodez
				if (properties.indexOf('callee') > -1 ){
					nodez.push(n.type);
				}
			});

			//Sort both arrays before comparing them.
			
			assert.deepEqual(
				nodez.sort(), 
				props.nodesWithCallee.sort(), 
				"nodesWithCallee did not contain only nodes that have a 'callee' property"
			);

		});
	});

});
