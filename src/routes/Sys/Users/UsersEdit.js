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
export default class UserEdit extends PureComponent {
  render() {
    const { getFieldDecorator, validateFields, resetFields } = this.props.form;
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
    };

    return (
      <Modal {...ModalProps} ref="modal">
        <Form >
          <FormItem label="用户名" {...formItemLayout} hasFeedback>
            {getFieldDecorator('username')(
              <Input disabled />
            )}
          </FormItem>
          <FormItem label="邮箱" {...formItemLayout} hasFeedback>
            {getFieldDecorator('email')(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem label="手机号" {...formItemLayout} hasFeedback>
            {getFieldDecorator('phone')(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
