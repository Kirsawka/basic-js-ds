const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.mainRoot = null;
    }

    root() {
        return this.mainRoot;
    }

    add(value) {
        this.mainRoot = addWithin(this.mainRoot, value);

        function addWithin(node, value) {
            if (!node) {
                return new Node(value);
            }

            if (node.data === value) {
                return node;
            }
            if (value < node.data) {
                node.left = addWithin(node.left, value);
            } else {
                node.right = addWithin(node.right, value);
            }
            return node;
        }
    }

    has(value) {
        return searchWithin(this.mainRoot, value);

        function searchWithin(node, value) {
            if (!node) {
                return false;
            }
            if (node.data === value) {
                return true;
            }
            return (value < node.data) ? searchWithin(node.left, value) : searchWithin(node.right, value);
        }
    }

    find(value) {
        return findWithin(this.mainRoot, value);

        function findWithin(node, value) {
            if (!node) {
                return null;
            }

            if (node.data === value) {
                return node;
            }
            return (value < node.data) ? findWithin(node.left, value) : findWithin(node.right, value);
        }
    }

    remove(value) {
        this.mainRoot = removeNode(this.mainRoot, value);

        function removeNode(node, value) {
            if (!node) {
                return null;
            }

            if (value < node.data) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (node.data < value) {
                node.right = removeNode(node.right, value);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return null;
                }

                if (!node.left) {
                    node = node.right;
                    return node;
                }

                if (!node.right) {
                    node = node.left;
                    return node;
                }

                let minFromRight = node.right;
                while (minFromRight.left) {
                    minFromRight = minFromRight.left;
                }
                node.data = minFromRight.data;
                node.right = removeNode(node.right, minFromRight.data);
                return node;
            }
        }
    }

    min() {
        if (!this.mainRoot) {
            return;
        }
        let node = this.mainRoot;

        while (node.left) {
            node = node.left;
        }
        return node.data;
    }

    max() {
        if (!this.mainRoot) {
            return;
        }
        let node = this.mainRoot;

        while (node.right) {
            node = node.right;
        }
        return node.data;
    }
}

module.exports = {
    BinarySearchTree
};