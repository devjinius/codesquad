# prototype

## 객체를 만드는 방법

js에서 객체를 만드는 방법은 여러가지다. 이 여러가지 방법들로 생성하면 어떤 차이가 있는지 알아봤다. 또한 왜 현재 프로토타입 방식 혹은 같은 방식인 class 방식이 제일 많이 사용되는지도 알아봤다.

### Object Literal

```js
const healthObj = {
  name: 'crong',
  lastTime: 'PM10:12',
  showHealth() {
    console.log(this.name + '님, 오늘은 ' + this.lastTime + '에 운동을 하셨네요');
  }
};

healthObj.showHealth();
```

싱글톤 방식이다. 전역변수의 사용을 줄이는 좋은 방식이다.

```js
const healthObj = {
  name: 'crong',
  lastTime: 'PM10:12',
  showHealth() {
    console.log(this.name + '님, 오늘은 ' + this.lastTime + '에 운동을 하셨네요');
  }
};

const healthObj2 = {
  name: 'jin',
  lastTime: 'PM08:08',
  showHealth() {
    console.log(this.name + '님, 오늘은 ' + this.lastTime + '에 운동을 하셨네요');
  }
};
```

하나만 사용할때는 좋지만 위의 코드처럼 여러개의 비슷한 healthObj가 필요하다면 좋지않은 패턴일 수 있다.

### Constructor Pattern

그래서 나온것이 constructor pattern이다. 함수를 생성자처럼 이용하여 마치 객체지향의 클래스처럼 이용해 찍어낼 수 있다.

```js
const Health = function(name, healthTime) {
  this.name = name;
  this.healthTime = healthTime;
  this.showHealth = function() {
    console.log(this.name + '님, 오늘은 ' + this.healthTime + '에 운동을 하셨네요');
  };
};

const ho = new Health('crong', '12:12');
const ho2 = new Health('jin', '08:08');
ho.showHealth();
ho2.showHealth();
```

#### new 키워드 사용

생성자 패턴에서 new를 사용하게 되면 다음과 같은 일이 일어난다.

1. 새 객체가 만들어진다.
2. 새 객체의 \_\_proto\_\_ (\[\[prototype\]\]) 이 연결된다.
3. 새로 생성된 객체는 함수 호출 시 this로 바인딩 된다.
4. 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 1번의 새로 생성된 객체를 반환한다.

즉 `new`로 만들면 객체 하나가 만들어지고 함수의 실행이 그 this를 사용하게 합니다. 그런 뒤 반환값이 `return this`가 되게 만듭니다.

#### 문제점

1번의 상황보다는 좋지만 생성자 패턴의 문제점은 ho1과 ho2가 이름마저 같은 메서드를 각자 가진다는 점이다. 각자가 메서드를 가지게 되면 메모리가 두 곳에 생긴다. 그 뿐만아니라 이는 중복이기 때문에 수정이 발생하면 두 곳을 모두 수정해야하는 문제가 생긴다. 이는 유지보수에도 문제가 생기는 설계가 될 것이다.

즉 새로생긴 객체의 \_\_proto\_\_는 생성자 함수의 프로토타입 객체를 가리킨다. 이 프로토타입 객체는 결국 Object의 생성자 함수의 프로토타입 객체를 가리켜 연결되는 구조를 가진다. 따라서 Object의 메서드를 ho도 사용할 수 있다. `ho.hasOwnProperty('name')` 이런 메서드를 생성하지 않았지만 사용할 수 있다.

자신의 메서드가 아니라면 prototype을 찾아가 그 prototype에 메서드가 있는지 찾는다. 이것이 prototype chain이라고 한다.

### Prototype Pattern

```js
const Health = function(name, healthTime) {
  this.name = name;
  this.healthTime = healthTime;
};

Health.prototype.showHealth = function() {
  console.log(this.name + '님, 오늘은 ' + this.healthTime + '에 운동을 하셨네요');
};

const ho = new Health('crong', '12:12');
const ho2 = new Health('jin', '08:08');
ho.showHealth();
ho2.showHealth();
```

`ho.showHealth === ho2.showHealth // true` 이렇게 하면 같은 메서드를 공유하기 때문에 마치 클래스처럼 작동할 수 있다.

처음 했었던 Object Literal 방식은 사실 프로토타입 방식의 일종이기도 한데 대신 Object의 생성자로 만들어지는 인스턴스라고 할 수 있다.

### claas 방식

ES 6부터는 class 키워드를 사용할 수 있게 되었다. 근데 이건 사실 바로 위의 프로토타입 패턴과 다르지 않다. 내부적으로는 동일하나 문법만 편하게 만든 syntatic sugar다.

### Object Create

Object의 create 방식을 사용해서 만드는 방식이다. 그런데 자주 사용되지는 않고 null 객체를 만들 정도에 사용한다.

`Object.create(null)` 라고 만들면 프로토타입과 관계되지 않은 객체가 생성된다.
