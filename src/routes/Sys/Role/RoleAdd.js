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
export default class UserAdd extends PureComponent {
  render() {
    const { getFieldDecorator, validateFields, resetFields } = this.props.form;
    const { onOk } = this.props;

    const onSubmit = () => {
      return new Promise((resolve, reject) => {
        validateFields((err, value) => {
          if (!err) {
            onOk(value)
              .then(() => resolve())
              .catch(e => reject(e));
          } else {
            reject(err);
          }
        });
      });
    };

    const ModalProps = {
      title: '添加角色',
      onOk() {
        return onSubmit();
      },
      afterClose() {
        resetFields();
      },
    };

    return (
      <Modal {...ModalProps} ref="modal">
        <Form>
          <FormItem label="角色名" {...formItemLayout} hasFeedback>
            {getFieldDecorator('name', {
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
          <FormItem label="key" {...formItemLayout} hasFeedback>
            {getFieldDecorator('key', {
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

