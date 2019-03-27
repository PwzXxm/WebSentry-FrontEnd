import React from 'react';
import { Layout, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import { UserContext } from '../UserContext';
import logo from '../assets/logo.png';
import './AppHeader.less';




const { Header } = Layout;

class AppHeader extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        { ({switchLang}) => {
            return (
              <Header className="app-header">
                  <img src={logo} className="app-header-logo"/>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["explore"]}
                    style={{ lineHeight: "64px" }}
                  >
                  <Menu.Item key="explore">
                    <FormattedMessage
                      id='explore'
                      defaultMessage='Explore'
                    />
                  </Menu.Item>
                  <Menu.Item key="dashboard">
                    <FormattedMessage
                      id='dashboard'
                      defaultMessage='Dashboard'
                    />
                  </Menu.Item>
                  <Menu.Item key="signIn">
                    <FormattedMessage
                      id='signIn'
                      defaultMessage='Sign in'
                    />
                  </Menu.Item>
                  <Menu.Item key="signUp">
                    <FormattedMessage
                      id='signUp'
                      defaultMessage='Sign up'
                    />
                  </Menu.Item>
                  <Menu.Item key="switchLang" onClick={switchLang}>
                    <FormattedMessage
                      id='lang'
                      defaultMessage='Language:English'
                    />
                  </Menu.Item>
                </Menu>
              </Header>
            );
      }}
      </UserContext.Consumer>
    );
  }
}

export default AppHeader;
