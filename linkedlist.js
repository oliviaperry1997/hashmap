export class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);
        if (this.head) {
            newNode.next = this.head;
        }
        this.head = newNode;
        this.length++;
    }

    size() {
        return this.length;
    }

    printHead() {
        return this.head;
    }

    printTail() {
        if (!this.head) {
            return null;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            return current;
        }
    }

    at(index) {
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    pop() {
        if (this.head) {
            let current = this.head;
            while (current.next.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.length--;
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }
        return null;
    }

    toString() {
        let current = this.head;
        let output = "";
        while (current) {
            output +=
                `( ${current.value} )` + (current.next ? " -> " : " -> null");
            current = current.next;
        }
        return output;
    }

    insertAt(value, index) {
        const newNode = new Node(value)
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            for (let i=0; i<(index-1) && i<this.length; i++) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
        this.length++
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.head.next;
        } else if (index >= this.length) {
            return;
        } else {
            let current = this.head;
            for (let i=0; i<(index-1); i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        this.length--;
    }

    findByKey(key) {
        let current = this.head;
        while (current) {
            if (current.value.key === key) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    replaceOrAppend(key, value) {
        const existingNode = this.findByKey(key);
        if (existingNode) {
            existingNode.value.value = value;
        } else {
            this.append({ key, value });
            this.length++;
        }
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
