import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Card, Button, Table, Divider } from 'antd';
import qs from 'query-string';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import RoleAddModal from './RoleAdd';

@connect(({ role }) => ({ role }))
export default class Role extends PureComponent {
  componentDidMount() {
    const { dispatch, location, match } = this.props;
    const query = qs.parse(location.search);
    dispatch({
      type: 'role/fetch', ...query,
    });
  }

  render() {
    const { dispatch, role } = this.props;
    const { items, total, page } = role;


    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '角色名',
        dataIndex: 'name',
      },
      {
        title: '角色键值',
        dataIndex: 'key',
      },
      {
        title: '操作',
        render: ((record) => {
          return (
            <div>
              <a
                href="javascript:;"
                onClick={() => {
                  Modal.confirm({
                    title: '提示',
                    content: '确认删除此角色吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() { dispatch({ type: 'role/delete', id: record.id }); },
                  });
                }}
              >删除
              </a>
            </div >
          );
        }),
      },
    ];

    return (
      <div>
        <PageHeaderLayout title="角色管理">
          <Card bordered={false}>
            <div style={{
              marginBottom: 16,
            }}
            >
              <Button
                icon="plus"
                type="primary"
                onClick={() => {
                  this.role_add_modal.refs.modal.show();
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
        <RoleAddModal
          onOk={(value) => {
            return dispatch({ type: 'role/add', ...value });
          }}
          wrappedComponentRef={inst => this.role_add_modal = inst}
        />
      </div>
    );
  }
}
