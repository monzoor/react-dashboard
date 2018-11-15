// import Login from '../Home/index';
// import { Login } from './Login';
// import { BrowserRouter as Router } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import { MemoryRouter } from 'react-router';
import { Login } from './Login';
import { Form } from 'antd';
// import NotFoundPage from '../404';
// import App from '../App';

describe('This is login test', () => {
    // it('add correctly', () => {
    //     expect(1 + 1).toEqual(2);
    // });
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    // const loginComponent = shallow(<LoginForm />);
    it('found login from', () => {
        // const wrapper = mount(
        //     <MemoryRouter initialEntries={['/random']}>
        //         <App />
        //     </MemoryRouter>,
        // );
        // expect(wrapper.find(LoginForm)).toHaveLength(0);
        // expect(wrapper.find(NotFoundPage)).toHaveLength(1);
        // const wrapper = mount(<Router><LoginForm /></Router>);
        // const push = jest.fn();
        // wrapper.setProps({ history: { push } });
        // const LoginTest = Form.create()(Login);
        // Form.setFieldsValue({
        //     email: {
        //         value: 'asdasd@f.com',
        //     },
        // });
        // const loginComponent = shallow(<LoginForm wrappedComponentRef={(form) => this.form = form} />);
        let formRef= {
            form: {},
        };
        const loginComponent = shallow(<Login{...formRef} />);
        // console.log(loginComponent.instance().props.wrappedComponentRef());
        // loginComponent.getDOMNode().setFieldsValue({
        //     name: 'tom'
        //   });
        // expect(loginComponent.node.getFieldsValue()).toEqual({name: 'tom'});
        // console.log()
        expect(loginComponent.find('#logIn').length).toBe(1);
        // loginComponent.find('#logIn').simulate('submit', fakeEvent);
        // const loginComponent = shallow(<LoginForm />).dive();
        // console.log(loginComponent.debug());
        // // expect(loginComponent.find('#logIn')).to.have.lengthOf(1);
        // // expect(loginComponent.find('#logIn').length).toBe(1);
        // expect(loginComponent.findWhere(node => node.hasClass('test'))).toBe(1);
    });
    it('User form submit test', () => {
        let formRef= {
            form: {
                setFields: {
                    email: {
                        value: 'asdasd',
                    },
                },
                validateFields: () => {},
            },
        };
        const loginComponent = shallow(<Login {...formRef} />);
        loginComponent.find('#logIn').simulate('submit', fakeEvent);
    });
    it('Noti test', () => {
        let formRef= {
            form: {
                setFields: {
                    email: {
                        value: 'asdasd',
                    },
                },
                validateFields: () => {},
                getFieldProps: (props) => {},
            },
        };
        const loginComponent = shallow(<Login {...formRef} />);
        // done// expect(loginComponent.find(Notification).length).toBe(1);
        // done// expect(loginComponent.exists()).toBe(true);
        loginComponent.find('Email').simulate('change', {
            target: { value: 'oka'}
        })
        console.log(loginComponent.find('Email'));
        expect(loginComponent.find('Email').props().form.getFieldProps('email').value).toBe('oka');
    });        
});
