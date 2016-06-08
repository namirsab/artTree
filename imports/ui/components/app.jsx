/* eslint-disable import/no-unresolved */
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tree from './TreeNode/Tree.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const getTreeAsArray = (collection, treeId) => collection.getTreeAsArray(treeId);
const App = ({ collection }) => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Tree treeLabel="Test Tree" levels={getTreeAsArray(collection, 'testTree')} />
    </MuiThemeProvider>
);

App.propTypes = {
    collection: React.PropTypes.object,
};

export default App;
