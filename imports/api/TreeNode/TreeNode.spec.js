/* eslint-disable import/no-unresolved, prefer-arrow-callback, func-names, no-unused-expressions*/
import { TreeNode } from './model.js';
import { TreeNodes } from './collection.js';
import { chai } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { describe, it, beforeEach, afterEach } from 'meteor/practicalmeteor:mocha';
import { createTree } from './utils.js';
const { expect } = chai;

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
    let tree = [];
    beforeEach(function () {
        StubCollections.stub(TreeNodes);
        tree = [];
        createTree('testTree', 2, 2, tree);
        TreeNodes.remove({});
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
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root11').map(n => n._id))
                .to.deep.equal(expectedForRoot11);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root10').map(n => n._id))
                .to.deep.equal(expectedForRoot10);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root01').map(n => n._id))
                .to.deep.equal(expectedForRoot01);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root00').map(n => n._id))
                .to.deep.equal(expectedForRoot00);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root1').map(n => n._id))
                .to.deep.equal(expectedForRoot1);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root0').map(n => n._id))
                .to.deep.equal(expectedForRoot0);
            expect(TreeNodes.getNodesFromRootTo('testTree', 'root').map(n => n._id))
                .to.deep.equal(expectedForRoot);
        });
        it('should return empty content if the treeId or the nodeId dont exist', function () {
            expect(TreeNodes.getNodesFromRootTo('nonExistingTreeId', 'nonNodeId'))
                .to.deep.equal([]);
        });
    });

    describe('TreeNodes.count', function () {
        it('should return the number of nodes of given tree', function () {
            expect(TreeNodes.count('testTree')).to.equal(7);
        });

        it('should return 0 if the tree does not exist or have no nodes', function () {
            expect(TreeNodes.count('nonExistingTree')).to.equal(0);
        });
    });

    describe('TreeNodes.getTreeAsObject(treeId, tillLevel)', function () {
        it('should return undefined if the tree does not exist', function () {
            const treeObject = TreeNodes.getTreeAsObject('nonExistingTree');
            expect(treeObject).to.deep.equal({});
        });
        it('should return all nodes inside a tree structure', function () {
            const treeObject = TreeNodes.getTreeAsObject('testTree');
            expect(treeObject).to.deep.equals({
                root: {
                    _id: 'root',
                    content: 'root',
                    level: 0,
                    parent: null,
                    treeLabel: 'root',
                    label: 'root',
                    children: {
                        root0: {
                            _id: 'root0',
                            content: 'root0',
                            level: 1,
                            label: 'root0',
                            parent: 'root',
                            children: {
                                root00: {
                                    _id: 'root00',
                                    content: 'root00',
                                    level: 2,
                                    label: 'root00',
                                    parent: 'root0',
                                    children: {},
                                },
                                root01: {
                                    _id: 'root01',
                                    content: 'root01',
                                    level: 2,
                                    label: 'root01',
                                    parent: 'root0',
                                    children: {},
                                },
                            },
                        },
                        root1: {
                            _id: 'root1',
                            content: 'root1',
                            level: 1,
                            label: 'root1',
                            parent: 'root',
                            children: {
                                root10: {
                                    _id: 'root10',
                                    content: 'root10',
                                    level: 2,
                                    label: 'root10',
                                    children: {},
                                    parent: 'root1',
                                },
                                root11: {
                                    _id: 'root11',
                                    content: 'root11',
                                    level: 2,
                                    label: 'root11',
                                    children: {},
                                    parent: 'root1',
                                },
                            },
                        },
                    },
                },
            });
        });
    });

    describe('TreeNodes.getTreeAsArray(treeId, tillLevel)', function () {
        it(`should return all the nodes inside an array of arrays, each subarray
            each subarray containing all the nodes of level === index
            ordered by label`, function () {
            const expected =
                [['root'], ['root0', 'root1'], ['root00', 'root01', 'root10', 'root11']];
            expect(TreeNodes.getTreeAsArray('testTree')
                .map(nodes => nodes.map(node => node.label)))
            .to.deep.equal(expected);
        });

        it('should return only the levels till the one given', function () {
            const expected =
                [['root'], ['root0', 'root1'], ['root00', 'root01', 'root10', 'root11']];
            expect(TreeNodes.getTreeAsArray('testTree', 0)
                .map(nodes => nodes.map(node => node.label)))
            .to.deep.equal(expected.slice(0, 1));
            expect(TreeNodes.getTreeAsArray('testTree', 1)
                .map(nodes => nodes.map(node => node.label)))
            .to.deep.equal(expected.slice(0, 2));
            expect(TreeNodes.getTreeAsArray('testTree', 2)
                .map(nodes => nodes.map(node => node.label)))
            .to.deep.equal(expected.slice(0, 3));
        });

        it('should return an empty array if the tree is empty', function () {
            expect(TreeNodes.getTreeAsArray('nonExistingTree')).to.deep.equal([]);
        });
    });

    describe('TreeNodes.getNodesFromLevel(treeId, level)', function () {
        it('should return all the nodes for the given level for the given tree', function () {
            const expectedLevel0 = ['root'];
            const expectedLevel1 = ['root0', 'root1'];
            const expectedLevel2 = ['root00', 'root01', 'root10', 'root11'];
            expect(TreeNodes.getNodesFromLevel('testTree', 0).map(n => n._id))
                .to.deep.equal(expectedLevel0);
            expect(TreeNodes.getNodesFromLevel('testTree', 1).map(n => n._id))
                .to.include.members(expectedLevel1);
            expect(TreeNodes.getNodesFromLevel('testTree', 2).map(n => n._id))
                .to.include.members(expectedLevel2);
            expect(TreeNodes.getNodesFromLevel('testTree', 3).map(n => n._id))
                .to.deep.equal([]);
        });
    });

    describe('TreeNodes.createTree(treeId, content)', function () {
        it('should create a new root node for a new tree, returning the nodeId', function () {
            const rootId = TreeNodes.createTree(
                'anotherTree', 'testTreeLabel',
                'testNodeLabel', 'testContent'
            );
            const rootNode = TreeNodes.findOne(rootId);
            expect(rootNode).to.deep.equals({
                _id: rootId,
                treeId: 'anotherTree',
                level: 0,
                treeLabel: 'testTreeLabel',
                label: 'testNodeLabel',
                content: 'testContent',
                parent: null,
            });
        });
    });

    describe('TreeNodes.appendChild(treeId, parentId, content)', function () {
        it(`should insert a new node adding automatically the level, returning the nodeId
            The parent should have the new child id inside its children array`, function () {
            const content = 'hello';
            const nodeId = TreeNodes.appendChild('testTree', 'root', 'testLabel', content);
            const node = TreeNodes.findOne(nodeId);
            expect(node).to.deep.equals({
                _id: nodeId,
                treeId: 'testTree',
                level: 1,
                content,
                label: 'testLabel',
                parent: 'root',
            });
            const parent = TreeNodes.findOne('root');
            expect(parent.children).to.include(nodeId);
        });

        it('should return falsy if the parent node or the tree doesnt exist', function () {
            expect(TreeNodes.appendChild()).to.be.not.ok;
        });
    });

    afterEach(function () {
        TreeNodes.remove({});
        StubCollections.restore();
    });
});
