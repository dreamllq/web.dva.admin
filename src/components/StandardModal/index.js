import React, { PureComponent } from 'react';
import { Card, Form, Input, Button, Modal } from 'antd';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      payload: null,
    };
  }

  show(payload) {
    this.setState({ visible: true, payload });
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
    const { children, onCancel, onOk, ...props } = this.props;
    const { visible, loading, payload } = this.state;
    const { setState } = this;
    const self = this;

    const modalPropsDefault = {
      width: 600,
      maskClosable: false,
      title: '设置',
      visible,
      onCancel() {
        onCancel && onCancel();
        self.hide();
      },
      confirmLoading: loading,
      onOk() {
        // onOk && onOk(payload);
        // self.loading();
        if (onOk) {
          const promise = onOk(payload);
          if (promise.then && typeof promise.then === 'function') {
            self.loading();
            promise.then(() => {
              self.hide();
            }).catch(() => {
              self.unloading();
            });
          }
        } else {
          self.hide();
        }
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
