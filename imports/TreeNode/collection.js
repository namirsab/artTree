/* eslint-disable import/no-unresolved */
import { Mongo } from 'meteor/mongo';
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
class TreeNodeCollection extends Mongo.Collection {
    // Traverse till root from node
    getRoot(treeId) {
        return this.findOne({
            treeId,
            parent: null,
        });
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
