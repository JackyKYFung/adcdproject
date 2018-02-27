import React, { Component } from 'react';
import '../css/chat.css';
import mySocket from 'socket.io-client'

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
        this.chatEsc = this.chatEsc.bind(this);
    }
    

    componentDidMount(){
//        this.socket = mySocket("http://localhost:10001");

    }
    
    joinChat(){
        this.setState({
            mode:1
        })
        this.socket = mySocket("https://adcdchatsocket.herokuapp.com/");
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
        
        var inputName = document.getElementById("inputName");
        
        inputName.value = "";
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
        var msg = this.state.myname + ": " + 
        this.state.myMsg;
        //Alex: Hi
        
        
        this.socket.emit("sendMsg", msg);
        
        var msgBox = document.getElementById("msgBox");
        
        msgBox.value = "";
        
    }
    
    chatEsc(){
        var chat = false;
        this.props.chatToggle(chat);
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
                  <button id="escBtn" onClick={this.chatEsc}>X</button>
                  <p id="chatBoxTitle">Lifeform Signal Transmitter</p>


                  <div id="jControls">

                    <p id="nameTitle">What is your name</p>
                    
                  <input id="inputName" onChange={this.handleName} type="text" placeholder = "type in your username" />
              
                    <p id="skinTitle">Choose your skin</p>    
                
                  <div id="avatarDiv">
                    
                    <img src={require('../imgs/avatar1.png')} className="avatars"
                    />
                    <img src={require('../imgs/avatar2.png')} className="avatars"
                    />
                    <img src={require('../imgs/avatar3.png')} className="avatars"
                    />
                    
                    <img src={require('../imgs/avatar4.png')} className="avatars"
                    />
                    <img src={require('../imgs/avatar5.png')} className="avatars"
                    />
              
                    </div>

                    <button id="joinBtn" onClick={this.joinChat}>Join Chat</button>

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
            <div id="chatComp">  
            <div id="chatBox">
                <button id="escBtn" onClick={this.chatEsc}>X</button>
                <div id="chatDisplay">{allMsgs}</div>
                <div id="chatControls">
                    <input id="msgBox" type="text" placeholder="type your messag here" onChange={this.handleMyMsg} />
                    <button id="msgBtn" onClick={this.sendMsg}>Send</button>
                </div>
            
            </div>
            
            <p id="nameBoxIntro">Detected Lifeforms <hr/></p>
              
              <div id="nameBox"></div> 
            
              <div id="names"> 
                {allNames}
              
                
              
              </div>
              
        
              
            </div>
          );     
          
      }
      
      
    return (
      <div className="App">
            {comp}
        
    <div id="blurbg"></div>
      </div>
    );
  }
}

export default App;
