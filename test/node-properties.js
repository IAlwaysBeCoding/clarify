/* global describe it __dirname*/


const path = require("path");
const fs = require("fs");
const parse = require("esprima").parse;
const visit = require("ast-types").visit;
const assert = require("assert");
const props = require("../src/node-properties.js");
const simpleNodes = require("./nodes/index.js");


const nodeNames = ["Program", "EmptyStatement", "BlockStatement", "ExpressionStatement",
  "IfStatement", "LabeledStatement", "BreakStatement", "ContinueStatement", "WithStatement",
  "SwitchStatement", "ReturnStatement", "ThrowStatement", "TryStatement", "CatchClause",
  "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "DebuggerStatement",
  "FunctionDeclaration", "FunctionExpression", "VariableDeclaration", "VariableDeclarator",
  "ThisExpression", "ArrayExpression", "ObjectExpression", "SequenceExpression", 
  "UnaryExpression", "BinaryExpression", "AssignmentExpression", "UpdateExpression",
  "LogicalExpression", "ConditionalExpression", "NewExpression", "CallExpression", 
  "MemberExpression", "SwitchCase", "Identifier", "Literal"
];

const getNode = (name) => {

  if (!simpleNodes.hasOwnProperty(name)){
    throw Error("Node name: "+ name+ " does not exist!");
  }

  //Load the source code for each Node type
  const source = fs.readFileSync(
    path.join(__dirname, "nodes", name+".js"),
    "utf-8"
  );

  //Parse the source code and produce an AST node
  const ast = parse(source);

  //Set the node to null before traversing through the AST to find the
  //first occurence of the node name we are looking for
  var node = null;
	
  visit(ast, {
    visitNode: function(path) {
      //Return the first instance of the node name we are looking for
      if(path.value.type == name){
        node = path.node;
        this.abort();
      }
      this.traverse(path);
    }
  });

  if(node == null){
    console.log("Name:", name, " Return:", node);
  }

  return node;

};

const getAllNodes = () => {
	
  const nodes = [];

  //Iterate through all the possible node names
  nodeNames.map((name) => {
    nodes.push(getNode(name));
  });
	
  return nodes;
};


describe("Checking nodes basic properties.", function(){
  describe("nodesWithBody", function(){
    it("Should contain only nodes with a body block.", function(){

      const nodez = [];
      const _nodes = getAllNodes();

      //Let's iterate through all of the possible nodes
      _nodes.map((n) => {

        //Get all the properties from each node
        const properties = Object.getOwnPropertyNames(n);

        //If we find a body property then push it to nodez
        if (properties.indexOf("body") > -1){
          nodez.push(n.type);
        }
      });

      //Sort both arrays before comparing them.

      assert.deepEqual(nodez.sort(), props.nodesWithBody.sort(), "nodesWithBody did not contain only nodes that have a body property");
    });
  });

  describe("nodesWithLeftAndRight", function(){
    it("Should contain only nodes that have a \"right\" and a \"left\" leaf node.", function(){

      const nodez = [];
      const _nodes = getAllNodes();

      //Let's iterate through all of the possible nodes
      _nodes.map((n) => {

        //Get all the properties from each node
        const properties = Object.getOwnPropertyNames(n);

        //If we find a node with a "right" and a "left" property then push it to nodez
        if (properties.indexOf("right") > -1 && properties.indexOf("left") > -1){
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
    it("Should contain only nodes that have a \"right\" and a \"left\" leaf node excluding the ForInStatement node.", function(){

      const nodez = [];
      const _nodes = getAllNodes();

      //Let's iterate through all of the possible nodes
      _nodes.map((n) => {

        //Get all the properties from each node
        const properties = Object.getOwnPropertyNames(n);

        //If we find a node with a "right" and a "left" property then push it to nodez
        if (properties.indexOf("right") > -1 && properties.indexOf("left") > -1){
          //Make sure we filter out the ForInStatement node
          if(n.type != "ForInStatement"){
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
    it("Should contain only nodes that have a \"callee\" property", function(){

      const nodez = [];
      const _nodes = getAllNodes();

      //Let's iterate through all of the possible nodes
      _nodes.map((n) => {

        //Get all the properties from each node
        const properties = Object.getOwnPropertyNames(n);

        //If we find a node with a "callee" property then push it to nodez
        if (properties.indexOf("callee") > -1 ){
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
