import React, { Component } from 'react';

import './App.css';
import Chat from './comp/Chat.js';
import Landing from "./comp/Landing.js";
import Stickers from "./comp/Stickers.js"; 
//import Rooms from "./comp/Rooms.js";

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            page:"home",
            chat: false,
            stickers:false
            
        }
    
    this.chatToggle = this.chatToggle.bind(this);   
  
    this.stickerToggle = this.stickerToggle.bind(this);    
    }
    
    
chatToggle(data){
    this.setState({
        chat:data
    })
}  

    
stickerToggle(data){
    this.setState({
        stickers:data
    })
}    
    
    
render() {
    
    var comp = null;
    var chatComp = null;
    var stickerComp = null;
      
    if (this.state.page == "home"){
        comp = <Landing 
                    chatToggle={this.chatToggle}
                    stickerToggle={this.stickerToggle}
        
                />
    }
    
    if (this.state.chat == true){
        comp = <Chat 
                    chatToggle={this.chatToggle}
                />
                
        
    }
        
    
    if (this.state.stickers == true){
        comp = <Stickers 
                    stickerToggle={this.stickerToggle}
                    
                />
                        
        
    }
        

        
        
        
    return (
      <div className="App">
        
        
        
        {comp}
        
        
      </div>
    );
  }
}

export default App;
