/* eslint-disable import/no-unresolved */
import React from 'react';
import MainHeader from '/imports/ui/components/MainHeader.jsx';
const MainLayout = ({ children }) => (
    <div className="mainLayout">
        <MainHeader title="ArtTree" />
        <main>
          {children}
        </main>
    </div>
);

MainLayout.propTypes = {
    children: React.PropTypes.element.isRequired,
};

export default MainLayout;
