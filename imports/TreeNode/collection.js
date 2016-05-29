/* eslint-disable import/no-unresolved */
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
/*
{
    _id: 'aNode',
    treeId: 'aTree',
    parent: null || id,
    children: null || [id],
    content: [miscelannea]
    level: Number
}
*/

function toObject(treeNodes, n) {
    const tree = {
        [n._id]: Object.assign({}, n, {
            children: Object.assign.apply(Object,
                [_(n.children).isArray() ?
                    n.children
                        .map(childId => treeNodes.findOne(childId))
                        .reduce((subTree, node) =>
                            Object.assign(subTree, toObject(treeNodes, node)), {})
                    :
                    null,
                ]),
        }),
    };
    return tree;
}
class TreeNodeCollection extends Mongo.Collection {
    // Traverse till root from node
    getRoot(treeId) {
        return this.findOne({
            treeId,
            parent: null,
        });
    }

    getTree(treeId, tillLevel){
        const root = this.getRoot(treeId);
        return toObject(this, root);
    }

    getContentFromRootTo(treeId, nodeId) {
        return this.getNodesFromRootTo(treeId, nodeId)
            .map(node => node.content);
    }

    getNodesFromRootTo(treeId, nodeId) {
        if (nodeId) {
            const node = this.findOne({
                treeId,
                _id: nodeId,
            });
            if (node) {
                return [...this.getNodesFromRootTo(treeId, node.parent), node];
            }
        }
        // Default return
        return [];
    }

    getNodesFromLevel(treeId, level) {
        return this.find({
            treeId,
            level,
        }).fetch();
    }

    createTree(treeId, content) {
        return this.insert({
            treeId,
            content,
            parent: null,
            level: 0,
        });
    }

    appendChild(treeId, parentId, content) {
        const parent = this.findOne({ treeId, _id: parentId });
        let newNodeId;
        if (parent) {
            const newNode = {
                parent: parentId,
                level: parent.level + 1,
                treeId,
                content,
            };
            newNodeId = this.insert(newNode);
            this.update(parentId, {
                $push: {
                    children: newNodeId,
                },
            });
        }
        return newNodeId;
    }

    count(treeId) {
        return this.find({ treeId }).count();
    }
}

const TreeNodes = new TreeNodeCollection('tree_nodes');

export {
    TreeNodes,
};
