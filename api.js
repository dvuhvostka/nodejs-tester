const fs = require('fs');

class API {
  // Создаем конструктор
  // Принимаем в него ссылку на тестируемую функцию и на директорию с файлами для теста
  constructor(options) {
    this.func = options.func;
    this.dir = options.dir;
    //console.log('New test initialized!');
  }

  // Получаем кол-во файлов в папке
  filesCount(){
    return new Promise((resolve, reject)=>{
      fs.readdir(this.dir, (err, files) => {
          resolve(files.length);
        });
    });
  }

  // Читаем файл с тестом
  readFile(nr, ext){
    return new Promise((resolve, reject)=>{
      let arr = fs.readFileSync(this.dir+'/test.'+nr+'.'+ext).toString().split("\n");
      let array = arr.map((element)=>{
        return element.replace("\r", "");
      });
      resolve(array);
    });
  }

  callFunc(input){
    return new Promise((resolve, reject)=>{
      let res = this.func.apply(this.func, input);
      resolve(res);
    });
  }

  // Запускаем тест
  async runTest() {
    let count = await this.filesCount();

    for (let i = 0; i<(count-1)/2; i++){
      let input = await this.readFile(i, 'in');
      let output = await this.readFile(i, 'out');
      let result = await this.callFunc(input);
      let status = result==[...output] ? " TRUE" : " FALSE";
      let nr = i+1;
      console.log("TEST #"+nr+":"+status);
      //console.log('INPUT: ', ...input);
      //console.log('OUTPUT: ', ...output);
    }
  }
}

module.exports = API;
