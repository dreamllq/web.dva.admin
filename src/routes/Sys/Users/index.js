import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Table, Divider } from 'antd';
import qs from 'query-string';
import styles from './index.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import UsersAddModal from './UsersAdd';
import ResetPasswordModal from './ResetPassword';

@connect(({ users }) => ({ users }))
export default class Users extends PureComponent {
  componentDidMount() {
    const { dispatch, location, match } = this.props;
    const query = qs.parse(location.search);
    dispatch({
      type: 'users/fetch', ...query,
    });
  }

  render() {
    const { dispatch, users } = this.props;
    const { items, total, page } = users;
    const self = this;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: 'username',
        dataIndex: 'username',
      },
      {
        title: '角色',
        render: ((record) => {
          return <div>11</div>;
        }),
      },
      {
        title: '操作',
        render: ((record) => {
          return (
            <div>
              <a href="javascript:;">修改</a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() => {
                  Modal.confirm({
                    title: '提示',
                    content: '确认删除此用户吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      dispatch({ type: 'users/delete', ...record });
                    },
                  });
                }}
              >删除
              </a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() => {
                  self.reset_password_modal.refs.modal.show(record);
                }}
              >重置密码
              </a>
            </div>
          );
        }),
      },
    ];

    const UsersAddModalProps = {
      onOk(value) {
        __DEV__ && console.log(value);
        return dispatch({ type: 'users/userAdd', payload: value });
      },
    };

    return (
      <div>
        <PageHeaderLayout title="用户管理">
          <Card bordered={false}>
            <div style={{
              marginBottom: 16,
            }}
            >
              <Button
                icon="plus"
                type="primary"
                onClick={() => {
                  this.user_add_modal.refs.modal.show();
                }}
              >新建
              </Button>
            </div>

            <Table
              rowKey={record => record.id}
              dataSource={items}
              columns={columns}
              pagination={{
                total, page,
              }}
            />
          </Card>
        </PageHeaderLayout>
        <UsersAddModal {...UsersAddModalProps} wrappedComponentRef={inst => this.user_add_modal = inst} />
        <ResetPasswordModal
          onOk={(value, record) => {
            return dispatch({
              type: 'users/resetPassword',
              payload: {
                ...value, id: record.id,
              },
            });
          }}
          wrappedComponentRef={inst => this.reset_password_modal = inst}
        />
      </div>

    );
  }
}
