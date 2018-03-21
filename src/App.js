import React, { Component } from 'react';

import './App.css';
import Chat from './comp/Chat.js';
import Landing from "./comp/Landing.js";
import Stickers from "./comp/Stickers.js"; 
import TicTacToe from "./comp/TicTacToe.js";
//import Rooms from "./comp/Rooms.js";

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            page:"home"
            
            
        }
    
    this.changePage = this.changePage.bind(this);   
  
    //this.stickerToggle = this.stickerToggle.bind(this);
        
    //this.tttToggle = this.tttToggle.bind(this);    
    }
    
    
changePage(data){
    this.setState({
        page:data
    })
}  

  
    
    
render() {
    
    var comp = null;
    
      
    if (this.state.page == "home"){
        comp = <Landing 
                    changePage={this.changePage}
        
                />
    }
    
    if (this.state.page == "chat"){
        comp = <Chat 
                    changePage={this.changePage}
                />
                
        
    }
        
    
    if (this.state.page == "stickers"){
        comp = <Stickers 
                    changePage={this.changePage}
                    
                />
                        
        
    }
    
    if (this.state.page == "ttt"){
        comp = <TicTacToe 
                    changePage={this.changePage}
                />    
    }
        
    if (this.state.page == "hunter"){
        comp = <Hunter 
                    changePage={this.changePage}
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
