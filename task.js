function getLength(str){
  return str.length;
}

let taskRun = (...args) => {
  return getLength(...args);
}

module.exports = {
  taskRun: taskRun
};
