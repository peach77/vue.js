import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Pagination } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn'
import axios from 'axios';
import './Home.css'
moment.locale('zh-cn'); 


class Home extends Component {

    state = {
        topics: [],
        page: 1
    }
    NewUp = (type = 'all', a = '1') => {
        axios.get(`https://www.vue-js.com/api/v1/topics?tab=${type}&page=${a}
        `).then(res => {
            this.setState({
                topics: res.data.data,
            })
        })
    }
    componentDidMount = () => {
        const url = this.props.location.search
        console.log(url);
        
        
        const cunrrentPage = url.includes('page') ? Number(this.props.location.search.match(/[0-9]{1,2}/)) : 1

        const type = this.fromLocationGetType()
        this.NewUp(type, cunrrentPage)
        this.setState({
            page: cunrrentPage
        })

    }

    fromLocationGetType = () => {
        const url = (this.props.location.search);
        return url === '' ? 'all' : url.includes('all') ? 'all' : url.includes('good') ? 'good' : url.includes('weex') ? 'weex' : url.includes('share') ? 'share' : url.includes('job') ? 'job' : 'ask'

    }
    changepage = (a) => {

        const type = this.fromLocationGetType()
        this.NewUp(type, a)
        this.props.history.push(`?tab=${type}&page=${a}`)
        this.setState({
            page: a
        })
    }
    componentDidUpdate = (a) => {
        const url = this.props.location.search
        const type = this.fromLocationGetType()
        if (a.location.search !== url) {
            this.setState({
                topics: [],

            })
            if (!url.includes('page')) {
                this.setState({
                    page: 1
                })
                this.NewUp(type, 1)
            } else {
                this.NewUp(type, this.state.page)
            }
        }

    }

    render() {
        const { page } = this.state
        const url = (this.props.location.search);
     
        


        const pagationArr = [
            { tab: 'all', allnumber: 1015 },
            { tab: 'good', allnumber: 15 },
            { tab: 'weex', allnumber: 3 },
            { tab: 'share', allnumber: 350 },
            { tab: 'ask', allnumber: 623 },
            { tab: 'job', allnumber: 39 },
        ]
        const num = pagationArr.find(item => url === '' ? item.tab === 'all' : url.indexOf(item.tab) > -1).allnumber
        const { topics } = this.state
        console.log(this.props.location.search);
        const have=this.props.location.search.includes('all')||this.props.location.search.includes('good')||this.props.location.search===''
        console.log(have);
        
        return <div className='wrap'>
          
            <ul className='list'>
                <li><NavLink className={url===''?'active':''} isActive={() => url.includes('?tab=all')} to="/?tab=all" >全部</NavLink></li>
                <li><NavLink isActive={() => url.includes('?tab=good')} to="/?tab=good">精华</NavLink></li>
                <li><NavLink isActive={() => url.includes('?tab=weex')} to="/?tab=weex">weex</NavLink></li>
                <li><NavLink isActive={() => url.includes('?tab=share')} to="/?tab=share">分享</NavLink></li>
                <li><NavLink isActive={() => url.includes('?tab=ask')} to="/?tab=ask">问答</NavLink></li>
                <li> <NavLink isActive={() => url.includes('?tab=job')} to="/?tab=job">招聘</NavLink></li>
            </ul>
           
            {topics ? <div className="topic"><ul className="listOne">{topics.map(res => <li key={res.id}><Link style={{width:'50px',display:"inline-block" }}  to={`/user/:username`}><img style={{ width: '30px',borderRadius:"3px",marginRight:'10px' }} className='people-logo' src={res.author.avatar_url} alt="" /></Link><p className="all" ><span className="int">{res.reply_count}</span><span className="intone">/{res.visit_count}</span></p><span className="top" style={res.top?{backgroundColor: "#369219",color:"#fff"}:res.good?{backgroundColor: "#369219",color:"#fff"}:{backgroundColor: "#e5e5e5",color:"#999"}}>{have?<span className="yeah">{res.top?'置顶':res.good?'精华':res.tab==='share'?'分享':res.tab==='ask'?'问答':res.tab==='job'?'招聘':'weex'}</span>:''}</span><Link className="dis" to={`/topic/${res.id}`}>{res.title}</Link><hr/></li>)}</ul></div> : <div>稍等一下数据马上就来</div>}

            <Pagination onChange={this.changepage} total={num} current={page} defaultPageSize={20} />
        </div>
    }


}

export default Home