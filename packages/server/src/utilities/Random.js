import RandomJS from 'random-js';

const generator = new RandomJS();

export default class Random {
  static integer(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return generator.integer(min, max);
  }

  static positiveInteger(max = Number.MAX_SAFE_INTEGER) {
    return generator.integer(1, max);
  }

  static negativeInteger(min = Number.MIN_SAFE_INTEGER) {
    return generator.integer(min, -1);
  }

  static shuffle(array) {
    return generator.shuffle([...array]);
  }

  static pick(array) {
    return generator.pick(array);
  }

  static sample(array, count) {
    return generator.sample(array, count);
  }

  static uuid() {
    return generator.uuid4();
  }

  static bool(percentage) {
    return generator.bool(percentage);
  }

  static float(min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
    return generator.real(min, max);
  }

  static die(sides = 6) {
    return generator.die(sides);
  }
}
