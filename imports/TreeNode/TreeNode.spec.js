/* eslint-disable import/no-unresolved, prefer-arrow-callback, func-names, no-unused-expressions*/
import { TreeNode } from './model.js';
import { TreeNodes } from './collection.js';
import { chai } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { describe, it, beforeEach, afterEach } from 'meteor/practicalmeteor:mocha';
import { _ } from 'meteor/underscore';
const { expect } = chai;

// Utility function to create a tree
function createTree(treeId, levels, childrenPerNode, outTree) {
    if (outTree.length === 0) {
        // Add root
        const root = {
            _id: 'root',
            treeId,
            content: 'root',
            parent: null,
        };
        outTree.push(root);
    }

    if (levels > 0) {
        const parent = _(outTree).last();
        const children = _(childrenPerNode).times(i => {
            const child = {
                _id: parent._id + i,
                content: parent._id + i,
                treeId,
                parent: parent._id,
            };
            outTree.push(child);
            createTree(treeId, levels - 1, childrenPerNode, outTree);
            return child;
        });
        parent.children = children.map(child => child._id);
    }
}

describe('TreeNode', function () {
    describe('hasChildren', function () {
        it('should return true if the node has children', function () {
            const node = {
                type: 'textTreeNode',
                children: ['id1'],
            };
            const treeNode = new TreeNode(node);
            expect(treeNode.hasChildren()).to.be.ok;
        });

        it('should return false if the node has no children', function () {
            const node = {
                type: 'textTreeNode',
                children: undefined,
            };
            const treeNode = new TreeNode(node);
            expect(treeNode.hasChildren()).to.be.not.ok;
        });
    });
});

describe('TreeNodes Collection', function () {
    const tree = [];
    beforeEach(function () {
        StubCollections.stub(TreeNodes);
        createTree('testTree', 2, 2, tree);
        tree.forEach(node => { TreeNodes.insert(node); });
    });

    describe('TreeNodes.getRoot(treeId)', function () {
        it('should return falsy if the treeId doesnt exist', function () {
            expect(TreeNodes.getRoot('nonExistingTreeId')).to.be.not.ok;
        });
        it('should get the root node for a given treeId', function () {
            expect(TreeNodes.getRoot('testTree')).to.deep.equal(tree[0]);
        });
    });

    describe('TreeNodes.getContentFromRootTo(treeId, nodeId)', function () {
        it(`should return the content of all nodes
            from root to the given one in order`, function () {
            const expectedForRoot11 = ['root', 'root1', 'root11'];
            const expectedForRoot10 = ['root', 'root1', 'root10'];
            const expectedForRoot01 = ['root', 'root0', 'root01'];
            const expectedForRoot00 = ['root', 'root0', 'root00'];
            const expectedForRoot1 = ['root', 'root1'];
            const expectedForRoot0 = ['root', 'root0'];
            const expectedForRoot = ['root'];
            expect(TreeNodes.getContentFromRootTo('testTree', 'root11'))
                .to.deep.equal(expectedForRoot11);
            expect(TreeNodes.getContentFromRootTo('testTree', 'root10'))
                .to.deep.equal(expectedForRoot10);
            expect(TreeNodes.getContentFromRootTo('testTree', 'root01'))
                .to.deep.equal(expectedForRoot01);
            expect(TreeNodes.getContentFromRootTo('testTree', 'root00'))
                .to.deep.equal(expectedForRoot00);
            expect(TreeNodes.getContentFromRootTo('testTree', 'root1'))
                .to.deep.equal(expectedForRoot1);
            expect(TreeNodes.getContentFromRootTo('testTree', 'root0'))
                .to.deep.equal(expectedForRoot0);
            expect(TreeNodes.getContentFromRootTo('testTree', 'root'))
                .to.deep.equal(expectedForRoot);
        });
        it('should return empty content if the treeId or the nodeId dont exist', function () {
            expect(TreeNodes.getContentFromRootTo('nonExistingTreeId', 'nonNodeId'))
                .to.deep.equal([]);
        });
    });

    describe('TreeNodes.getNodesFromRootTo(treeId, nodeId)', function () {
        it('should return all nodes from root to the given one in order', function () {
            const expectedForRoot11 = ['root', 'root1', 'root11'];
            const expectedForRoot10 = ['root', 'root1', 'root10'];
            const expectedForRoot01 = ['root', 'root0', 'root01'];
            const expectedForRoot00 = ['root', 'root0', 'root00'];
            const expectedForRoot1 = ['root', 'root1'];
            const expectedForRoot0 = ['root', 'root0'];
            const expectedForRoot = ['root'];
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root11').map(c => c._id))
                .to.deep.equal(expectedForRoot11);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root10').map(c => c._id))
                .to.deep.equal(expectedForRoot10);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root01').map(c => c._id))
                .to.deep.equal(expectedForRoot01);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root00').map(c => c._id))
                .to.deep.equal(expectedForRoot00);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root1').map(c => c._id))
                .to.deep.equal(expectedForRoot1);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root0').map(c => c._id))
                .to.deep.equal(expectedForRoot0);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root').map(c => c._id))
                .to.deep.equal(expectedForRoot);
        });
        it('should return empty content if the treeId or the nodeId dont exist', function () {
            expect(TreeNodes.getNodesFromRootTo('nonExistingTreeId', 'nonNodeId'))
                .to.deep.equal([]);
        });
    });

    afterEach(function () {
        TreeNodes.remove({});
        StubCollections.restore();
    });
});
