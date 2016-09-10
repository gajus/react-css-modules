export class SimpleMap {
  constructor () {
    this.size = 0;
    this.keys = [];
    this.values = [];
  }

  get (key) {
    const index = this.keys.indexOf(key);

    return this.values[index];
  }

  set (key, value) {
    this.keys.push(key);
    this.values.push(value);
    this.size = this.keys.length;

    return value;
  }
}

const exportedMap = typeof Map === 'undefined' ? SimpleMap : Map;

export default exportedMap;
