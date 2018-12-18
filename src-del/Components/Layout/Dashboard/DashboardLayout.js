
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Layout,
} from 'antd';
import styled, { keyframes } from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

class DashboardLayout extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]).isRequired,
    };

    render() {
        const { children, users } = this.props;

        const fadeIn = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
        `;
        const FadeInAnimation = styled.div`
            animation: ${fadeIn} 1s;
            `;
        return (
            <Layout className="minvh-100">
                <Sidebar />
                <Layout className="minvh-100">
                    <Header {...users} />
                    <div className="container-fluid px-5">
                        <div className="row">
                            <div className="col-12 minvh-100">
                                <FadeInAnimation>
                                    {children}
                                </FadeInAnimation>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    users: state.auth.users,
});
export default connect(mapStateToProps)(DashboardLayout);
// const mapStateToProps = state => ({
//     errors: state.errors,
// });

// export const LoginForm = Form.create()(Login);

// export default withRouter(connect(mapStateToProps)(LoginForm));
