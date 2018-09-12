import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

class MainLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <div className="content mt-xl--m">
                    {children}
                </div>
                <Footer />
            </div>
        );
    }
}
MainLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default MainLayout;
