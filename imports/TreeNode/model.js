class TreeNode {
    constructor(doc) {
        _.extend(this, doc);
    }

    getContent() { return this.content; }
    hasParent() { return !!this.parent; }
    hasChildren() { return !!(this.children && this.children.length); }
    getType() { return this.type; }
};

class TextTreeNode extends TreeNode {
    constructor(doc) {
        if (!_(doc.content).isString()) {
            throw new TypeError('content is not a string');
        }

        super(doc);
    }
};

export {
    TreeNode,
    TextTreeNode
};
