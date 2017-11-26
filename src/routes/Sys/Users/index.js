import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Table, Divider } from 'antd';
import styles from './index.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import UsersAddModal from './UsersAdd';
import qs from 'query-string';

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
              <a href="">修改</a>
              <Divider type="vertical" />
              <a href="">删除</a>
              <Divider type="vertical" />
              <a href="">重置密码</a>
            </div>
          );
        }),
      },
    ];

    const UsersAddModalProps = {
      onOk(value) {
        __DEV__ && console.log(value);
        dispatch({ type: 'users/userAdd', payload: value }).then(() => {
          self.user_add_modal.refs.modal.hide();
        }).catch(() => {
          self.user_add_modal.refs.modal.unloading();
        });
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
      </div>

    );
  }
}
