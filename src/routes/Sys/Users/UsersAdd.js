import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button } from 'antd';
import Modal from '../../../components/StandardModal';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

@Form.create()
export default class UserAdd extends PureComponent {
  render() {
    const { getFieldDecorator, validateFields, resetFields } = this.props.form;
    const { onOk } = this.props;

    const onSubmit = () => {
      validateFields((err, value) => {
        if (!err) {
          onOk(value);
        }
      });
    };

    const ModalProps = {
      title: '添加用户',
      onOk() {
        onSubmit();
      },
      afterClose() {
        resetFields();
      },
    };

    return (
      <Modal {...ModalProps} ref="modal">
        <Form>
          <FormItem label="用户名" {...formItemLayout} hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
              ],
            })(
              <Input placeholder="请输入" />
              )}
          </FormItem>
          <FormItem label="密码" {...formItemLayout} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
              ],
            })(
              <Input placeholder="请输入" type="password" />
              )}
          </FormItem>
          <FormItem label="邮箱" {...formItemLayout} hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
              ],
            })(
              <Input placeholder="请输入" />
              )}
          </FormItem>

          <FormItem label="手机号" {...formItemLayout} hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
              ],
            })(
              <Input placeholder="请输入" />
              )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

