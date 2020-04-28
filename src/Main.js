import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './Main.css'

import Home from './Home';
import Text from './Text';
import User from './User';
class Main extends Component {
    render() {
        // 原因是你用了两次Router 也就是++++
        return <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/topic/:id' component={Text} />
            <Route path='/user/:username' component={User} />
        </Switch>


    }




}
export default Main