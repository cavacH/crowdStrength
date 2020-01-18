import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Console extends React.Component {
  state = {
    collapsed: false
  };

  render() {
    return (
      <Layout>
        <Sider style= {{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
        }}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                  <Icon type="user" />
                  <span>Tasks</span>
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <div>
              console
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Console;
