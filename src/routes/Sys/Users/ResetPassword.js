import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
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

@Form.create()
export default class ResetPassword extends PureComponent {
  render() {
    const { getFieldDecorator, validateFields, resetFields, getFieldValue } = this.props.form;
    const { onOk } = this.props;


    const onSubmit = (payload) => {
      return new Promise((resolve, reject) => {
        validateFields({ force: true }, (err, value) => {
          if (!err) {
            onOk(value, payload)
              .then(() => resolve())
              .catch(e => reject(e));
          } else {
            reject(err);
          }
        });
      });
    };

    const ModalProps = {
      title: '添加用户',
      onOk(payload) {
        return onSubmit(payload);
      },
      afterClose() {
        resetFields();
      },
    };

    return (
      <Modal {...ModalProps} ref="modal">
        <Form >
          <FormItem label="密码" {...formItemLayout} hasFeedback>
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
              ],
            })(
              <Input placeholder="请输入" type="password" onChange={() => setTimeout(() => { validateFields({ force: true }); }, 100)} />
              )}
          </FormItem>
          <FormItem label="确认密码" {...formItemLayout} hasFeedback>
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: '必填',
                },
                {
                  validator(rule, value, callback) {
                    const newPassword = getFieldValue('newPassword');
                    if (newPassword !== value) {
                      callback('两次输入不一致！');
                    } else {
                      callback();
                    }
                  },
                },
              ],
            })(
              <Input placeholder="请输入" type="password" />
              )}
          </FormItem>
        </Form>
      </Modal>);
  }
}
