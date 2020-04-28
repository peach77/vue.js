import React, { Component } from 'react';
import './Header.css'
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom'
class Header extends Component {
    state = {
        uesrInfo: null,
        inputValue: '3d029f55-d68b-4e46-8e78-69149b95cabe',
    }
    render() {
        const { uesrInfo, inputValue } = this.state


        return <header>
        <div className="wrap">
                    <div className="top">
                    <Link to='/'><img className='logo' src="https://www.vue-js.com/public/images/vue.png" alt="" /></Link>
                    <Link to='/'><span className='vue' >Vue.js</span></Link>
                <input type="text" value={inputValue} onChange={this.text} />
                </div>
            

                {uesrInfo ? <div className='user'> <Link to={`/user/${uesrInfo.loginname}`}><img style={{ width: '40px',borderRadius:'50%',padding:"5px 5px" }} className='logo' src={uesrInfo.avatar_url} alt="" /></Link>
                    <span className="name">{uesrInfo.loginname}</span>
                    <Link to='/'><span className="btn" onClick={this.Exit}>退出</span></Link>
                </div> :
                    <div ><Link to='/'><span  className="btn" onClick={this.Login}>登录</span></Link></div>}
        </div>
          
        </header>
    }
    componentDidMount = () => {
        const { inputValue } = this.state

        if (localStorage.getItem("token")) {
            axios.post('https://www.vue-js.com/api/v1/accesstoken', { accesstoken: inputValue }).then(res => {
                this.setState({
                    uesrInfo: res.data,
                    inputValue: '',
                })

                localStorage.getItem("lastname");
                localStorage.setItem("id", res.data.id);
            })

        }
    }
    text = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }
    Login = () => {
        const { inputValue } = this.state

        if (inputValue.trim() === '3d029f55-d68b-4e46-8e78-69149b95cabe') {
            axios.post('https://www.vue-js.com/api/v1/accesstoken', { accesstoken: inputValue }).then(res => {
                this.setState({
                    uesrInfo: res.data,
                    inputValue: '',
                })
                localStorage.setItem("token", '3d029f55-d68b-4e46-8e78-69149b95cabe');
                localStorage.setItem("lastname", res.data.loginname);
                localStorage.setItem("id", res.data.id);
                this.props.history.push('/')

            })

        }
        else {
            alert('请输入正确的用户名或者密码')
        }
    }
    Exit = () => {
        console.log(this.props.history.push('/'));

        // const { uesrInfo } = this.state
        this.setState({
            uesrInfo: false,
            inputValue: '3d029f55-d68b-4e46-8e78-69149b95cabe'
        })
       
        localStorage.removeItem("token", '3d029f55-d68b-4e46-8e78-69149b95cabe');
        localStorage.removeItem("lastname");
        localStorage.removeItem("id");
        this.props.history.push('/')


    }
}
export default withRouter(Header)