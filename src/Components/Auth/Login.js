import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
    Form,
    Input,
    Icon,
    Button,
    message,
    Checkbox,
} from 'antd';

import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import ErrorThrower from '../../ErrorBoundary/ErrorThrower';
import { auth } from '../../Actions/authAction';

const FormItem = Form.Item;

const Email = (props) => {
    const { form } = props;
    // const { getFieldProps, getFieldError } = form;
    const { getFieldProps } = form;
    // const errors = getFieldError('email');
    // console.log(form);
    // setTimeout(() => {
    //     form.setFields({
    //         email: {
    //             value: 'asdasd',
    //         },
    //     });
    // }, 500);
    return (
        <div>
            <FormItem className="form-group">
                <Input
                //   className={errors && 'has-error'}
                  prefix={<Icon type="user" className="text-muted" />}
                  type="text"
                  placeholder="Email"
                  {...getFieldProps('email', {
                                    rules: [{
                                        required: true,
                                        type: 'email',
                                    },
                                ],
                            })
                        }
                />
            </FormItem>
            <div>
                {/* {errors ? errors.join(',') : null} */}
            </div>
        </div>);
};
const Password = (props) => {
    const { form } = props;
    // const { getFieldProps, getFieldError } = form;
    const { getFieldProps } = form;
    // const errors = getFieldError('email');
    // console.log(form);
    // setTimeout(() => {
    //     form.setFields({
    //         email: {
    //             value: 'asdasd',
    //         },
    //     });
    // }, 500);
    return (
        <div>
            <FormItem className="form-group">
                <Input
                //   className={errors && 'has-error'}
                  prefix={<Icon type="lock" className="text-muted" />}
                  type="password"
                  placeholder="Password"
                  {...getFieldProps('password', {
                                    rules: [{
                                        required: true,
                                        min: 3,
                                    },
                                ],
                            })
                        }
                />
            </FormItem>
            <div>
                {/* {errors ? errors.join(',') : null} */}
            </div>
        </div>);
};
const RememberMe = () => {
    console.log('dada');
    // function onChange(e) {
    //     console.log(`checked = ${e.target.checked}`);
    // }
    // const { form } = props;
    // const { getFieldProps, getFieldError } = form;
    // const { getFieldProps } = form;
    // const errors = getFieldError('email');
    // console.log(form);
    // setTimeout(() => {
    //     form.setFields({
    //         email: {
    //             value: 'asdasd',
    //         },
    //     });
    // }, 500);
    return (
        <div>
            <FormItem className="form-group">
                <Checkbox>Remember me</Checkbox>
            </FormItem>
            <div>
                {/* {errors ? errors.join(',') : null} */}
            </div>
        </div>);
};

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
                dispatch(auth(this.props, values));
            }
        });
    }

    render() {
        // console.log(this.props);
        const { loading } = this.state;
        const { form, errors } = this.props;
        // const { getFieldDecorator } = form;

        return (
            <form onSubmit={this.handleSubmit} id="logIn">
                <h1 className="text-center font-weight-light mb-4">Login</h1>
                <Email form={form} />
                <Password form={form} />
                <RememberMe form={form} />

                <Link className="float-right small mb-2" to="/">Forgot password</Link>
                <Button className="btn btn-primary" htmlType="submit" loading={loading} block>
                    Log in
                </Button>
                <ErrorBoundary>
                    <ErrorThrower {...errors} errorMessage="Crushed in login" />
                </ErrorBoundary>
                <Link to="/signup" className="btn btn-block btn-outline-primary mt-3">
                    Signup
                </Link>
            </form>
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
// export {
//     LoginForm,
// };
export default withRouter(connect(mapStateToProps)(LoginForm));
// export default WrappedNormalLoginForm;
