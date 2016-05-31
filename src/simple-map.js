export class SimpleMap {
    constructor () {
        this.keys = [];
        this.values = [];
    }

    get size () {
        return this.keys.length;
    }

    get (key) {
        const index = this.keys.indexOf(key);

        return this.values[index];
    }

    set (key, value) {
        this.keys.push(key);
        this.values.push(value);

        return value;
    }
}

const exportedMap = typeof Map === 'undefined' ? SimpleMap : Map;

export default exportedMap;
