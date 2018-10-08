import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {
    Layout,
    Row,
    Col,
} from 'antd';


// const {
//     Content,
// } = Layout;


class MainLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Row>
                    <Col lg={16}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ullam eaque possimus perferendis nesciunt architecto cum similique consectetur, nemo natus, perspiciatis esse asperiores amet voluptas magnam! Dolorum esse corporis tempora ab, suscipit, soluta natus recusandae praesentium nulla adipisci voluptatum perspiciatis vel consequatur sed, incidunt ipsa necessitatibus enim veritatis exercitationem dicta. Ex, odio eveniet rerum voluptatibus maiores reiciendis error, pariatur reprehenderit voluptatem. Tempora id vel minus nostrum, ducimus suscipit. Temporibus, et tenetur quasi, ab dolore totam. Eius a ut, consectetur nemo ab aut quae maxime neque dolores id voluptates impedit, explicabo commodi rem, facilis atque nesciunt delectus repudiandae quod, iure voluptate!
                    </Col>
                    <Col lg={8}>
                        {children}
                    </Col>
                </Row>
            </Layout>
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
