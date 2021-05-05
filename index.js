// Import stylesheets
import "./style.css";

class Neuron {
  constructor() {
    this.a = 0;
    this.b = 0;
    this.b = 0;
  }

  findWeight(educationArr, a, b, c) {
    let score = 0;
    educationArr.forEach(ed => {
      const weight = ed[0] * a + ed[1] * b + ed[2] * c;
      if ((weight > 0 && ed[3] === true) || (weight <= 0 && ed[3] === false)) {
        score++;
      }
    });
    return score;
  }

  educate(educationArr) {
    const weightArr = [];
    for (let a = -10; a <= 10; a++) {
      for (let b = -10; b <= 10; b++) {
        for (let c = -10; c <= 10; c++) {
          const score = this.findWeight(educationArr, a, b, c);
          weightArr.push({ score, a, b, c });
        }
      }
    }

    weightArr.sort((a, b) => a.score - b.score);
    const resultWeight = weightArr.pop();
    this.a = resultWeight.a;
    this.b = resultWeight.b;
    this.c = resultWeight.c;
    console.log("weights", this.a, this.b, this.c);
    return JSON.stringify(resultWeight);
  }

  getWeight(data) {
    return this.a * data[0] + this.b * data[1] + this.c * data[2];
  }
}
class Generator {
  static generateArr(length) {
    const result = [];
    let falseCount = 0;
    let trueCount = 0;
    for (let i = 0; i < length; ) {
      const x = Utils.getRandomInt(0, 10);
      const y = Utils.getRandomInt(0, 10);
      const z = Utils.getRandomInt(0, 10);
      const answer = x <= y && y <= z ? true : false;
      if ((answer && trueCount <= length/2) || (!answer && falseCount <= length/2)) {
        answer ? trueCount++ : falseCount++;
        result.push([x, y, z, answer]);
        i++;
      }
    }
    return result;
  }
}

class Utils {
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
}

const educationArr = Generator.generateArr(1000);
console.log(educationArr);
const neuron = new Neuron();
neuron.educate(educationArr);

let neuronScore = 0;
const testArr = Generator.generateArr(100);  
testArr.forEach(testData => {
  console.log(neuron.getWeight(testData), testData);
  if (neuron.getWeight(testData) > 0 && testData[3] === true) {
    neuronScore++;
  } else if (neuron.getWeight(testData) < 0 && testData[3] === false) {
    neuronScore++;   
  }
});

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Процент правильных ответов: ${neuronScore / testArr.length * 100}</h1>`;
