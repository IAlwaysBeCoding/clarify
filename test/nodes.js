/*global __dirname */

const path = require("path");
const fs = require("fs");
const parse = require("esprima").parse;
const visit = require("ast-types").visit;

const nodes = require("./nodes/index.js");

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

  if (!nodes.hasOwnProperty(name)){
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

module.exports = {
  getNode : getNode,
  getAllNodes : getAllNodes,
  nodeNames : nodeNames
};


