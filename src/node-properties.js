
const nodesWithBody = [
  "Program", "FunctionDeclaration", "FunctionExpression", "BlockStatement", 
  "LabeledStatement", "WithStatement", "CatchClause", "WhileStatement", 
  "DoWhileStatement", "ForStatement", "ForInStatement"
];

const nodesWithLeftAndRight = ["ForInStatement", "BinaryExpression", "AssignmentExpression", "LogicalExpression"];
const nodesWithLeftAndRightExceptForIn = ["BinaryExpression", "AssignmentExpression", "LogicalExpression"];
const nodesWithCallee = ["NewExpression", "CallExpression"];

module.exports = {
  nodesWithBody : nodesWithBody,
  nodesWithLeftAndRight : nodesWithLeftAndRight,
  nodesWithLeftAndRightExceptForIn : nodesWithLeftAndRightExceptForIn,
  nodesWithCallee : nodesWithCallee,
};
