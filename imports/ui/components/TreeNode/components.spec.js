/* eslint-disable import/no-unresolved, prefer-arrow-callback, func-names, no-unused-expressions*/
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import TreeList from './TreeList.jsx';
const { expect } = chai;

describe('TreeList Component', function () {
    it('should render', function () {
        const treeList = [{ treeId: 'id', treeLabel: 'TREE_LABEL' }];
        const treeListComponent = shallow(<TreeList treeList={treeList} open />);
        const menuItems = treeListComponent.find('MenuItem');
        const drawer = treeListComponent.find('Drawer');
        expect(treeListComponent.hasClass('treeList'));
        expect(menuItems).to.have.length(1);
        expect(menuItems.props().primaryText).to.equal('TREE_LABEL');
        expect(menuItems.props().value).to.equal('id');
        expect(drawer.props().open).to.be.ok;
    });

    it('should listen to clicks on items', function () {
        const onSelect = sinon.spy();
        const treeItem = { treeId: 'id', treeLabel: 'TREE_LABEL' };
        const treeList = [treeItem];
        const treeListComponent =
            shallow(<TreeList treeList={treeList} open onItemSelect={onSelect} />);
        const menuItem = treeListComponent.find('MenuItem');
        menuItem.simulate('click');
        expect(menuItem.props().onClick).to.be.a('function');
        expect(onSelect.calledWith(treeItem)).to.be.ok;
    });
});
