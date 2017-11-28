import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Card, Button, Table, Divider } from 'antd';
import qs from 'query-string';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

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
                  // this.users_add_modal.refs.modal.show();
                }}
              >新建
              </Button>
            </div>
          </Card>
        </PageHeaderLayout>
      </div>
    );
  }
}
