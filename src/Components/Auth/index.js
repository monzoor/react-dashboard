import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';


import {
    Form, Icon, Input,
    Button,
    Checkbox,
} from 'antd';

import auth from '../../Actions/authAction';

const FormItem = Form.Item;

class Login extends Component {
    static propTypes = {
        form: PropTypes.oneOfType([PropTypes.object]).isRequired,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { dispatch } = this.props;
                dispatch(auth());
            }
        });
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <div id="components-form-demo-normal-login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {
                            getFieldDecorator('email', {
                                rules: [{
                                    required: true,
                                    type: 'email',
                                }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    len: 3,
                                }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>,
                        )}
                        <Link className="login-form-forgot" to="/">Forgot password</Link>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or
                        <Link to="/">
                           register now!
                        </Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ad: state.ad.payload,
});

const WrappedNormalLoginForm = Form.create()(Login);

export default withRouter(connect(mapStateToProps)(WrappedNormalLoginForm));
// export default WrappedNormalLoginForm;
