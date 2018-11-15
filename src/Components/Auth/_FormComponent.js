import React from 'react';
// import PropTypes from 'prop-types';
import {
    Form,
    Input,
    Icon,
    Checkbox,
} from 'antd';


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
            <div>
                {/* {errors ? errors.join(',') : null} */}
            </div>
        </FormItem>
    );
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
            <div>
                {/* {errors ? errors.join(',') : null} */}
            </div>
        </FormItem>
    );
};


const RememberMe = () => (
    <FormItem className="form-group">
        <Checkbox>Remember me</Checkbox>
    </FormItem>
);

export {
    Email,
    Password,
    RememberMe,
};
