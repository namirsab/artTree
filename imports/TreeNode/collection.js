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
    const localNode = _(n).omit('treeId');
    const tree = {
        [localNode._id]: Object.assign({}, localNode, {
            children: Object.assign.apply(Object,
                [_(localNode.children).isArray() ?
                    localNode.children
                        .map(childId => treeNodes.findOne(childId))
                        .reduce((subTree, node) =>
                            Object.assign(subTree, toObject(treeNodes, node)), {})
                    :
                    {},
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

    getTreeAsObject(treeId) {
        const root = this.getRoot(treeId);
        return root ? toObject(this, root) : {};
    }

    getTreeAsArray(treeId, tillLevel = Infinity) {
        const getLevel = level => {
            const levelsCursor = this.find({ treeId, level }, { sort: { label: 1 } });
            return levelsCursor.fetch();
        };
        let index = 0;
        const treeAsArray = [];
        let level = getLevel(index);
        while (level.length && tillLevel >= index) {
            treeAsArray.push(level);
            level = getLevel(++index);
        }
        return treeAsArray;
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

    createTree(treeId, treeLabel, nodeLabel, content) {
        return this.insert({
            treeId,
            treeLabel,
            label: nodeLabel,
            content,
            parent: null,
            level: 0,
        });
    }

    appendChild(treeId, parentId, label, content) {
        const parent = this.findOne({ treeId, _id: parentId });
        let newNodeId;
        if (parent) {
            const newNode = {
                parent: parentId,
                level: parent.level + 1,
                treeId,
                label,
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
