import React, { PureComponent } from 'react';
import { Card, Form, Input, Button, Modal } from 'antd';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false, loading: false });
  }

  loading() {
    this.setState({ loading: true });
  }

  unloading() {
    this.setState({ loading: false });
  }

  render() {
    const { children, onOk, ...props } = this.props;
    const { visible, loading } = this.state;
    const { setState } = this;
    const self = this;

    const modalPropsDefault = {
      width: 600,
      maskClosable: false,
      title: '设置',
      visible,
      onCancel() {
        self.hide();
      },
      confirmLoading: loading,
      onOk() {
        onOk && onOk();
        self.loading();
      },
    };

    const p = Object.assign({}, modalPropsDefault, props);

    return (
      <Modal {...p}>
        {children}
      </Modal>
    );
  }
}
