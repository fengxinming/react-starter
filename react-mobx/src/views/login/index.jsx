import './index.styl';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import history from '~/history';

const iconStyle = { color: 'rgba(0,0,0,.25)' };

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@observer
class LoginComponent extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.loginStore.updateState({
        disabledUsername: false,
        disabledPassword: false
      });
    }, 1000);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { loginStore, form } = this.props;
    const { validateFields, setFields } = form;
    validateFields((error, values) => {
      if (!error) {
        loginStore.login()
          .then(() => {
            history.push('/');
          })
          .catch(({ message }) => {
            setFields({
              password: {
                value: values.password,
                errors: [new Error(message)]
              }
            });
          });
      }
    });
  }

  render() {
    const { loginStore, form } = this.props;
    const { getFieldDecorator, getFieldsError } = form;
    const { disabledUsername, disabledPassword, isLogging, } = loginStore;

    return (
      <div className="login">
        <div className="login-form">
          <h1 className="login-logo">管理平台</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input
                  disabled={disabledUsername}
                  prefix={<Icon type='user' style={iconStyle}></Icon>}
                  placeholder="用户名"></Input>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input
                  type="password"
                  disabled={disabledPassword}
                  prefix={<Icon type='lock' style={iconStyle}></Icon>}
                  placeholder="密码"></Input>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>记住我</Checkbox>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLogging}
                className="login-submit-button"
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginForm = Form.create({
  name: 'loginForm',
  // onFieldsChange(props, changedFields) {
  //   console.log('onFieldsChange', changedFields);
  // },
  mapPropsToFields(props) {
    // console.log('mapPropsToFields', props);
    const { fields } = props.loginStore;
    return {
      username: Form.createFormField({
        value: fields.username
      }),
      password: Form.createFormField({
        value: fields.password
      })
    };
  },
  onValuesChange(props, values) {
    props.loginStore.updateFields(values);
  }
})(LoginComponent);

export default inject('loginStore')(LoginForm);
