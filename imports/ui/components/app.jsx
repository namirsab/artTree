/* eslint-disable import/no-unresolved */
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tree from './TreeNode/Tree.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainLayout from '/imports/ui/layouts/MainLayout.jsx';

injectTapEventPlugin();
const getTreeAsArray = (collection, treeId) => collection.getTreeAsArray(treeId);
const App = ({ collection }) => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MainLayout>
            <Tree treeLabel="Test Tree" levels={getTreeAsArray(collection, 'testTree')} />
        </MainLayout>
    </MuiThemeProvider>
);

App.propTypes = {
    collection: React.PropTypes.object,
};

export default App;
