/* eslint-disable import/no-unresolved */
import React from 'react';
import AppBar from 'material-ui/AppBar';

const MainHeader = ({ title }) => (
    <AppBar
      title={title}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      className="mainHeader"
      onLeftIconButtonTouchTap={() => alert('hola')}
    />
);

MainHeader.propTypes = {
    title: React.PropTypes.string,
};

export default MainHeader;
