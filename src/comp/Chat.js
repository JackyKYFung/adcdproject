import React, { Component } from 'react';
import '../css/chat.css';
import mySocket from 'socket.io-client';

class App extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            myname: "",
            mode:0,
            allNames:[],
            allMsgs:[],
            myMsg: "",
            myAvt:""
        }
        
        this.joinChat = this.joinChat.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.chatEsc = this.chatEsc.bind(this);
        this.handleAvatar = this.handleAvatar.bind(this);
    }
    

    componentDidMount(){
//        this.socket = mySocket("http://localhost:10001");

    }
    
    joinChat(){
        this.setState({
            mode:1
        })
        this.socket = mySocket("localhost:10001");
        //names over to the server
        
        var userObj = {
            name:this.state.myname,
            avt:this.state.myAvt
        }
        this.socket.emit("uname", userObj);
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
    
    handleAvatar(evt){
        //console.log("test");
        this.setState({
            myAvt:evt.target.src
        })
        
        console.log(evt.target.src);
        


    }
    
    sendMsg(){
        var msg = this.state.myname + ": " + 
        this.state.myMsg;
        //Alex: Hi
        var msgObj = {
            avt: this.state.myAvt,
            msg: msg
        }
        
        this.socket.emit("sendMsg", msgObj);
        
        var msgBox = document.getElementById("msgBox");
        
        msgBox.value = "";
        
    }
    
    chatEsc(data){
        this.props.changePage(data);
    }
    

    
    
  render() {
    
    var allNames = this.state.allNames.map((obj, i)=>{
        return(
        <div key={i}>
            <img src={obj.avt} height={20}/> {obj.name}
        </div>
        )
    })
    
    var comp = null;
      
      if(this.state.mode === 0){
      
          comp = (
            
                    
                  <div id="joinBox">
                  <button id="escBtn" onClick={this.chatEsc.bind(this, "home")}>X</button>
                  <p id="chatBoxTitle">Lifeform Signal Transmitter</p>


                  <div id="jControls">

                    <p id="nameTitle">What is your name</p>
                    
                  <input id="inputName" onChange={this.handleName} type="text" placeholder = "type in your username" />
              
                    <p id="skinTitle">Choose your skin</p>    
                
                  <div id="avatarDiv">
                    
                    <img src={require('../imgs/avatar1.png')} ref="av1" className="avatars"
                    onClick={this.handleAvatar}
                    />
                    <img src={require('../imgs/avatar2.png')} ref="av2" className="avatars"
                    onClick={this.handleAvatar}          
                    />
                    <img src={require('../imgs/avatar3.png')} ref="av3" className="avatars"
                    onClick={this.handleAvatar}            
                    />
                    
                    <img src={require('../imgs/avatar4.png')} ref="av4" className="avatars"
                    onClick={this.handleAvatar}
                    />
                    
                    <img src={require('../imgs/avatar5.png')} ref="av5" className="avatars"
                    onClick={this.handleAvatar}
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
                <img src={obj.avt} height={20}/> {obj.msg}
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
