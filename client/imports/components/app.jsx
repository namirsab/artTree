/* eslint-disable import/no-unresolved */
import React from 'react';

const renderTree = treeId => treeId;

const App = ({ treeId }) => (
    <div>
        {renderTree(treeId)}
    </div>
);

App.propTypes = {
    treeId: React.propTypes.number,
};

export default App;
