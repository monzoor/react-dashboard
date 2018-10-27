import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
    Form, Icon, Input,
    Button,
    message,
} from 'antd';

import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import ErrorThrower from '../../ErrorBoundary/ErrorThrower';
import { signup } from '../../Actions/authAction';

const FormItem = Form.Item;

class Login extends Component {
    static propTypes = {
        form: PropTypes.oneOfType([PropTypes.object]).isRequired,
    };

    state = {
        loading: false,
    }


    componentWillReceiveProps(nextProps) {
        const { errors } = this.props;
        if (nextProps.errors !== errors) {
            if (nextProps.errors.errorInfos.hasErrors) {
                this.setState({
                    loading: false,
                });
                message.destroy();
            }
            if (nextProps.errors.errorInfos.messages && nextProps.errors.errorInfos.componentError) {
                message.error(nextProps.errors.errorInfos.messages);
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                });
                dispatch(signup(this.props, values));
            }
        });
    }

    render() {
        const { loading } = this.state;
        const { form, errors } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form onSubmit={this.handleSubmit} id="logIn">
                <h1 className="text-center font-weight-light mb-4">Sign Up</h1>
                <FormItem className="form-group">
                    {
                        getFieldDecorator('name', {
                            rules: [{
                                required: true,
                            }],
                    })(
                        <Input prefix={<Icon type="user" className="text-muted" />} placeholder="Name" />,
                    )}
                </FormItem>
                <FormItem className="form-group">
                    {
                        getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                type: 'email',
                            }],
                    })(
                        <Input prefix={<Icon type="mail" className="text-muted" />} placeholder="Email" />,
                    )}
                </FormItem>
                <FormItem className="form-group">
                    {
                        getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                min: 3,
                            }],
                    })(
                        <Input prefix={<Icon type="lock" className="text-muted" />} type="password" placeholder="Password" />,
                    )}
                </FormItem>
                <FormItem>
                    <Button className="btn btn-primary" htmlType="submit" loading={loading} block>
                        Sign Up
                    </Button>
                    <ErrorBoundary>
                        <ErrorThrower {...errors} errorMessage="Crushed in sign up" />
                    </ErrorBoundary>
                    <Link to="/login">
                        Back to login
                    </Link>
                </FormItem>
            </Form>
        );
    }
}

// const mapStateToProps = (state) => {
//     const { errors } = state;
//     return {
//         errors,
//     };
// };
const mapStateToProps = state => ({
    errors: state.errors,
});

const LoginForm = Form.create()(Login);

export default withRouter(connect(mapStateToProps)(LoginForm));
// export default WrappedNormalLoginForm;
