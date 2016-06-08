/* eslint-disable import/no-unresolved */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const renderTreeListItems = treeList => (
    treeList.map(({ treeId, treeLabel }) => (
        <MenuItem key={treeId} value={treeId}>
            {treeLabel}
        </MenuItem>
    ))
);

const TreeList = ({ treeList }) => (
    <div className="treeList">
        <Drawer>
            {renderTreeListItems(treeList)}
        </Drawer>
    </div>
);

TreeList.propTypes = {
    treeList: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default TreeList;
