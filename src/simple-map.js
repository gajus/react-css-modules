export default class SimpleMap {
    constructor() {
        this.keys = [];
        this.values = [];
    }

    get(key) {
        const index = this.keys.indexOf(key);
        if (index === -1) {
            return;
        }
        return this.values[index];
    }
    
    set(key, value) {
        this.keys.push(key);
        this.values.push(value);
        return value;
    }
}