import { Mongo } from 'meteor/mongo';
/*
{
    _id: 'aNode',
    treeId: 'aTree',
    parent: null || id,
    children: null || [id],
    content: [miscelannea]
}
*/
class TreeNodeCollection extends Mongo.Collection {
    // Traverse till root from node
    getRoot(treeId) {

    }
    getMergedContent(treeId, nodeId) {

    }
}

const TreeNodes = new TreeNodeCollection('tree_nodes');

export {
    TreeNodes
};
