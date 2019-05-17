// const animals = {
//   run() {
//     console.log('달린다');
//   },
//   info() {
//     console.log(`name is ${this.name}, age is ${this.age}`);
//   }
// };

// const animalFactory = (name, age) => {
//   return Object.create(animals, { name: { value: name }, age: { value: age } });
// };

// const man = animalFactory('crong', 3);
// console.log(man);

// ====

class Garden {
  constructor(flower) {
    this.flower = flower;
  }

  grow() {
    setTimeout(() => {
      console.log(`식물이 쑥쑥 자라는 중입니다...`);
      this.grow();
    }, 1000);
  }
}

function grow() {
  setTimeout(function() {
    console.log('식물이 혼자 자라요.');
    this.grow();
  }, Math.random() * 2000);
}

myflower = new Garden('Lily');
myflower.grow.call(this);
// myflower.growCallback();
