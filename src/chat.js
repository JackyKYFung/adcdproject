import React, { Component } from 'react';
import './chat.css';
import mySocket from 'socket.io-client';

class App extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            myname: "",
            mode:0,
            allNames:[],
            allMsgs:[],
            myMsg: ""
        }
        
        this.joinChat = this.joinChat.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }
    

    componentDidMount(){
//        this.socket = mySocket("http://localhost:10001");

    }
    
    joinChat(){
        this.setState({
            mode:1
        })
        this.socket = mySocket("https://adcdprojectsocket.herokuapp.com");
        //names over to the server
        this.socket.emit("uname", this.state.myname);
        //getting data from the server and emiting who is in the web
        this.socket.on("names", (data)=>{
                this.setState({
                    allNames:data
                });
       });
        
        this.socket.on("msg", (data)=>{
            this.setState({
                allMsgs:data
            })
        });
    }
    
    handleName(evt){
        this.setState({
                    myname:evt.target.value
                   })
    }
    
    handleMyMsg(evt){
        this.setState({
            myMsg:evt.target.value
        })    
    }
    
    sendMsg(){
        var msg = this.state.myname + ": " + this.state.myMsg;
        //Alex: Hi
        
        this.socket.emit("sendMsg", msg);
    }
    

    
    
  render() {
    
    var allNames = this.state.allNames.map((obj, i)=>{
        return(
        <div key={i}>
            {obj}
        </div>
        )
    })
    
    var comp = null;
      
      if(this.state.mode === 0){
      
          comp = (
            <div id="joinBox">
              
              <p id="intro">Lifeform Signal Transmitter</p>
              
              <div id="jControls">
                
                <input onChange={this.handleName} type="text" placeholder = "type in your username" />
                <button onClick={this.joinChat}>Join Chat</button>
              </div>
            </div>  
          )
      } else if(this.state.mode === 1){
          
          var allMsgs = this.state.allMsgs.map((obj, i)=>{
              return(
                <div key={i}>
                  {obj}
                </div>
              )
          })
          
          comp = (
            <div id="chatBox">
                <div id="chatDisplay">{allMsgs}</div>
                <div id="controls">
                    <input id="msgBox" type="text" placeholder="type your messag here" onChange={this.handleMyMsg}/>
                    <button id="msgBtn" onClick={this.sendMsg}>Send</button>
                </div>
            <div id="nameBox"></div> 
              <div id="names"> 
                Aliens in Presence <hr/>
                {allNames}
            </div>
                
              
            
              
        
              
            </div>
          );     
          
      }
      
      
    return (
      <div className="App">
            {comp}
      </div>
    );
  }
}

export default App;
