import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Explore from './Explore';
import NoMatch from './NoMatch';
import {UserContext} from '../UserContext'
import Api from '../helpers/Api';

import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from '../locale/lang/zh_CN.js';
import en_US from '../locale/lang/en_US.js';

addLocaleData([...en, ...zh]);

class App extends Component {
  constructor(props) {
    super(props);

    // user context
    this.userContextToggleRefreash = async () => {
      if (!this.state.isLoading) {
        this.setState({isLoading: true});
      }

      const response = await Api.getUserInfo();
      if (response.code === Api.code.ok) {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          userEmail: response.data.email,
        });
      } else {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          userEmail: "",
        });
      }
    };

    this.state = {
      lang:navigator.language,
      isLoading: true,
      isLoggedIn: false,
      userEmail: "",
      toggleRefreash: () => this.userContextToggleRefreash,
    };
    // async function, don't wait
    this.userContextToggleRefreash();
    this.switchLang = this.switchLang.bind(this);
  }

  chooseLocale() {
    switch(this.state.lang.split('-')[0]){
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        default:
            return en_US;
    }
  }

  switchLang(){
    console.log(this.state);
    switch (this.state.lang.split('-')[0]) {
      case 'en':
        this.setState({ lang:'zh-CN' });
        break;
      case 'zh':
        this.setState({ lang:'en-US' });
        break;
      default:
        this.setState({ lang:navigator.language });
        break;
    }
    console.log(this.state);
  }


  render() {
    console.log("loading app");
    return (
      <UserContext.Provider value={this.state}>
        <IntlProvider locale={this.state.lang}  messages={this.chooseLocale()}>
          <Router state={this.state}>
            <Switch>
              <Route
                exact path="/"
                render={()=><Explore
                                state={this.state}
                                switchLang={this.switchLang}
                        />}
              />
              <Route path="/dashboard" component={Dashboard}/>
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </IntlProvider>
      </UserContext.Provider>
    );
  }
}

export default App;
