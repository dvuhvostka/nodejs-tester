const task = require('./task'); // Подключаем модуль с самим заданием
const API = require('./api');   // Подключаем модуль с классом API

const testOptions = {
  func: task.taskRun,
  dir: './tests/String'
}

let test = new API(testOptions);
test.runTest();
