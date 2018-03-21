import React, { Component } from 'react';
import '../css/stickers.css';
import mySocket from "socket.io-client";
import Rooms from "./Rooms";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            myImg5:require("../imgs/saturn.png"),
            myImg4:require("../imgs/earth.png"),
            myImg3:require("../imgs/asteroid.png"),
            myImg2:require("../imgs/spaceship_1.png"),
            myImg:require("../imgs/alien_ship.png"),
            allusers:[],
            myID:null,
            showDisplay:false,
            stickers:[]
        }
        this.handleImage = this.handleImage.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
    }
    componentDidMount(){
        
       this.socket = mySocket("http://localhost:10000");
       
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allusers:data
            })
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myID:data
            });
        
        
        this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myID === null){
                return false; 
            }
            
             this.refs["u"+this.state.myID].style.left = ev.pageX+"px";
            this.refs["u"+this.state.myID].style.top = ev.pageY+"px";
            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myID,
                src:this.refs["u"+this.state.myID].src
                
            })
        });
        
        this.refs.thedisplay.addEventListener("click", (ev)=>{
            this.socket.emit("stick", {
                x:ev.pageX,
                y:ev.pageY,
                src:this.refs["u"+this.state.myID].src
            });
        });
    });
        this.socket.on("newsticker", (data)=>{
            this.setState({
                stickers:data
            });
        });
        
        this.socket.on("newmove", (data)=>{
            //console.log(data);
            //console.log(this.refs["u"])
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        });
        
            
           
    }
    handleImage(evt){
        this.refs["u"+this.state.myID].src = evt.target.src;
    }
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        });
        this.socket.emit("joinroom", roomString);
    }
    
  render() {
      
      var allimgs = this.state.allusers.map((obj, i)=>{
          return (
            <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i} />
          )
          
      });
      
      var allstickers = this.state.stickers.map((obj, i)=>{
          var mstyle = {left:obj.x, top:obj.y};
          return (
          <img style={mstyle} key={i} src={obj.src} height={50} className="allImgs" />
          )
      })
      
      var comp = null;
      
      if(this.state.showDisplay === false){
          comp = <Rooms
            handleDisplay={this.handleDisplay}
          />;
      } else {
          comp = ( 
            <div>
              <div ref="thedisplay" id="display">
              {allimgs}
              {allstickers}
            </div>
              <div id="controls">
                {this.state.myID}
                <img src={this.state.myImg} height={50} onClick={this.handleImage} />
                <img src={this.state.myImg2} height={50} onClick={this.handleImage} />
              <img src={this.state.myImg3} height={50} onClick={this.handleImage} />
              <img src={this.state.myImg4} height={50} onClick={this.handleImage} />
              <img src={this.state.myImg5} height={50} onClick={this.handleImage} />
              </div>
            </div>
          )
      }
    return (
      <div className="App">
        {comp}
      </div>
    );
  }
}

export default App;
