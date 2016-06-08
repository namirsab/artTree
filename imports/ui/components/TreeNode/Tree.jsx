import React from 'react';
import Divider from 'material-ui/Divider';
import Level from './Level.jsx';

const renderLevels = levels => (
    levels.map((level, index) => (
        <div key={index}>
            <Level levelIndex={index} nodes={level} />
            <Divider />
        </div>
    ))
);

const Tree = ({ treeLabel, levels }) => (
    <div className="tree">
        {treeLabel}
        {renderLevels(levels)}
    </div>
);

Tree.propTypes = {
    treeLabel: React.PropTypes.string,
    levels: React.PropTypes.arrayOf(React.PropTypes.array),
};

export default Tree;
