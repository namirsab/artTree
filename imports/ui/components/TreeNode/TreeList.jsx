/* eslint-disable import/no-unresolved */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const renderTreeListItems = (treeList, onItemSelect) => (
    treeList.map(({ treeId, treeLabel }) => (
        <MenuItem
          onClick={() => onItemSelect({ treeId, treeLabel })}
          key={treeId} value={treeId}
          primaryText={treeLabel}
        />
    ))
);

const TreeList = ({ treeList, open, onItemSelect }) => (
    <div className="treeList">
        <Drawer
          docked={false}
          open={open}
        >
            {renderTreeListItems(treeList, onItemSelect)}
        </Drawer>
    </div>
);

TreeList.propTypes = {
    treeList: React.PropTypes.arrayOf(React.PropTypes.object),
    open: React.PropTypes.bool,
    onItemSelect: React.PropTypes.func,
};

export default TreeList;
