import React from 'react';
import Node from './Node.jsx';

const Level = ({ levelIndex, nodes }) => (
    <div className="level">
        <div className="levelIndex">{levelIndex}</div>
        <div className="levelNodes">
            {
                nodes.map(node => (<Node key={node._id} node={node} />))
            }
        </div>
    </div>
);

Level.propTypes = {
    levelIndex: React.PropTypes.number,
    nodes: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default Level;
