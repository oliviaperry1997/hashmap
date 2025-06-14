import { LinkedList } from "./linkedlist.js";

export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0;
        this.buckets = Array.from(
            { length: this.capacity },
            () => new LinkedList()
        );
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        const before = bucket.size();
        bucket.replaceOrAppend(key, value);
        const after = bucket.size();

        if (after > before) {
            this.size++;
        }

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from(
            { length: this.capacity },
            () => new LinkedList()
        );
        this.size = 0;

        for (const bucket of oldBuckets) {
            let node = bucket.head;
            while (node) {
                this.set(node.value.key, node.value.value);
                node = node.next;
            }
        }
    }

    get(key) {
        const index = this.hash(key);
        const node = this.buckets[index].findByKey(key);
        return node ? node.value.value : undefined;
    }

    has(key) {
        const index = this.hash(key);
        const node = this.buckets[index].findByKey(key);
        return node ? true : false;
    }

    remove(key) {
        const index = this.hash(key);
        const node = this.buckets[index];
        node.removeByKey(key);
    }

    hashLength() {
        let totalLength = 0;
        for (let i = 0; i < this.capacity; i++) {
            totalLength += this.buckets[i].length;
        }
        return totalLength;
    }

    clear() {
        for (let i = 0; i < this.capacity; i++) {
            while (this.buckets[i].length !== 0) {
                this.buckets[i].removeAt(0);
            }
        }
    }

    keys() {
        let keysOutput = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i].head;
            while (current) {
                keysOutput.push(current.value.key);
                current = current.next;
            }
        }
        return keysOutput;
    }

    values() {
        let valuesOutput = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i].head;
            while (current) {
                valuesOutput.push(current.value.value);
                current = current.next;
            }
        }
        return valuesOutput;
    }

    entries() {
        let entriesOutput = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i].head;
            while (current) {
                let pair = [current.value.key, current.value.value]
                entriesOutput.push(pair);
                current = current.next;
            }
        }
        return entriesOutput;
    }
}
