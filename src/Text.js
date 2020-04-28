import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';
import './Text.css'  ;
import 'moment/locale/zh-cn'
import { Link } from 'react-router-dom';
import E from 'wangeditor'

moment.locale('zh-cn'); 

class Text extends Component{
    state={
        topic:null,
        replies:[],
        comment:'',
        textAreacomment:''
        
    }
    componentDidMount=()=>{
       const topic=this.state.topic
        const topicId=this.props.match.params.id
        this.initEditor()
      
      
        
  
       
        
      
        Axios.get(`https://www.vue-js.com/api/v1/topic/${topicId}`).then(res=>
                {  
                    const topic=res.data.data
                    topic.replies.forEach(item=>item.textArea=false)
                this.setState({
                    topic:topic,
                    replies:res.data.data.replies

                })}
                    ) }
       initEditor () { 
        const elem = this.refs.editorElem
        const editor = new E(elem)
        this.editor = editor 
        editor.customConfig.menus = [
            'head',
            'bold',
            'italic',
            'underline'
        ]
        editor.customConfig.onchange =html=> {  
            this.setComment(html)
          
        }
      
        editor.create()
     }
     setComment=(html)=>{
        this.setState({
           comment:html
        })
     }
       
    render() {
       
      const {topic,replies,comment,textAreacomment}=this.state
      const name=localStorage.getItem("lastname")

       
        
        
      
     return <div className='big-wrap'>
       
         {topic?
           <div><h2>{topic.title}</h2><div><span>• 发布于 {moment(topic.create_at).fromNow()}</span> <span>• 作者<Link className="author" to='/user/:username'>{topic.author.loginname}</Link></span> •{topic.visit_count}次浏览<div dangerouslySetInnerHTML={{__html:topic.content}}/></div></div>:'请稍等'}
        <div className="comment-box">
        {replies?<div >{replies.map(res=>
        <div style={{display:'flex',flexWrap:'nowrap',padding:'10px',justifyContent:'space-between',borderTop:'1px solid #DCDCDC'}} key={res.id}>  
            <div style={{display:'flex',flexWrap:'nowrap',width:'800px'}}>
                <img style={{width:'30px',height:'30px',marginRight:'6px'}} src={res.author.avatar_url} alt=""/>
                <div >
                    {res.author.loginname}<br/>
                    <div style={{display:'inline-block'}} dangerouslySetInnerHTML={{__html:res.content}}/>
                </div>
            </div>
           
           
            <div className="zan">
                <button onClick={()=>{this.zan(res.id)}} style={{color:res.ups.includes('5e86e2a97d2d480729ae771c')?'red':'black'}}>点赞</button>
                <span>{res.ups.length}</span>
                {name?<button onClick={()=>{this.reply(res.author.loginname,res.id)}}>回复</button>:''}
                <div style={{marginLeft:'-850px',marginTop:'30px'}}>
                {res.textArea?<div  ><textarea rows="8" cols="135"  className='reply' onChange={(event=>this.setState({ textAreacomment:event.target.value }))} style={{display:'block'}} value={textAreacomment}></textarea><button onClick={()=>{this.replyReply(res.id)}}>回复</button></div>:''} 
                </div>
            </div>
           
               
           
        </div>)}</div>:'等一下'

        }
        
        </div>
      
        <h3>添加回复</h3>
        <div ref='editorElem' id="#div1"></div>
       <button onClick={this.addComment}>回复</button>
        </div>
    }
    replyReply=(id)=>{
        const topicId=this.props.match.params.id
        // const comment=this.state.comment
        const {textAreacomment}=this.state
        if(textAreacomment.trim()){
            Axios.post(`https://www.vue-js.com/api/v1/topic/${topicId}/replies`,{accesstoken:'3d029f55-d68b-4e46-8e78-69149b95cabe',content:textAreacomment,reply_id:id}).then(res=>{
                Axios.get(`https://www.vue-js.com/api/v1/topic/${topicId}`).then(res=>
                { 
                this.setState({
                    topic:res.data.data,
                    replies:res.data.data.replies
                })}
                    )})

        }
     
    }
    reply=(a,b)=>{
        const {topic}=this.state

        const newTopic={...topic}
        topic.replies.forEach(res=>{
            if(res.id===b){
                res.textArea=!res.textArea
            }else{
                res.textArea=false
            }
        })
      
       this.setState({
        topic:newTopic,
        textAreacomment:`@${a}  `
       })
  
      
        
    }
    addComment=()=>{
            const comment=this.state.comment
            const topic_id=this.props.match.params.id
            if(comment.trim()){
                Axios.post(`https://www.vue-js.com/api/v1/topic/${topic_id}/replies`,{accesstoken:'3d029f55-d68b-4e46-8e78-69149b95cabe',content:comment}).then(res=>{
                    console.log(res.data);
                    const topicId=this.props.match.params.id
                    Axios.get(`https://www.vue-js.com/api/v1/topic/${topicId}`).then(res=>
                    { 
                    this.setState({
                        topic:res.data.data,
                        replies:res.data.data.replies
                    })}
                        )
                })
                
               
            }else{
                alert('请输入有效字符')
            }
          
   
     
        
    }
    handle=(event)=>{
        this.setState({
            comment:event.target.value
        })
    }
    zan=(reply_id)=>{
        const token=localStorage.getItem("token")
        const id=localStorage.getItem("id")
        const topic={...this.state.topic}
        if(token){
            Axios.post(`https://www.vue-js.com/api/v1/reply/${reply_id}/ups`,{accesstoken:'3d029f55-d68b-4e46-8e78-69149b95cabe'}).then(res=>{
                console.log(res.data)
                if(res.data.action==='up'){
                    topic.replies.find(item=>item.id===reply_id).ups.push(id)
                    console.log(topic.replies.find(item=>item.id===reply_id).ups);
                    
                }else{
              
                
                    
                    topic.replies.find(item=>item.id===reply_id).ups=topic.replies.find(item=>item.id===reply_id).ups.filter(res=>res!=='5e86e2a97d2d480729ae771c')
                }
                this.setState({
                    topic:topic
                })
                
            })
        }

      
       
        
    }
}
export default Text