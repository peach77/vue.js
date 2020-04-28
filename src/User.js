import React from 'react';
import { Component } from 'react';
class User extends Component {
    
    render() {
        console.log(this.props.match.params.username);

        return <div>
            <div className="top">
                <p>个人中心</p>


            </div>
        </div>
    }
}
export default User