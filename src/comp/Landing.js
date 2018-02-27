import React, { Component } from 'react';

import '../App.css';



class App extends Component {
    constructor(props){
        super(props);
    
    this.state = {
        kjuToggle: false,
        jkyToggle: false
    }    
    
    this.chatPage = this.chatPage.bind(this);
    this.kjuClick = this.kjuClick.bind(this);
    this.jkyClick = this.jkyClick.bind(this);
    this.stickerPage = this.stickerPage.bind(this);
    this.showChatLabel = this.showChatLabel.bind(this);
    this.hideChatLabel = this.hideChatLabel.bind(this);
    //this.roomsPage = this.roomsPage.bind(this);
    //this.rocketAnimate = this.rocketAnimate.bind(this);
    }
    
chatPage(){
    var chat = true;
    this.props.chatToggle(chat);
}

stickerPage(){
    var sticker = true;
    this.props.stickerToggle(sticker);
}
  

kjuClick(){
    
    if (this.state.kjuToggle == false){
        
        this.refs.kjuBio.style.animation = "kjuBioIn 2s 1";
        this.refs.kjuBio.style.animationFillMode = "forwards";
        this.refs.rocketDiv2.style.animation = "rocketOut 3s 1";
        this.refs.rocketDiv2.style.animationFillMode = "forwards";
        this.refs.jkyDiv.style.animation = "jkyOut 3s 1";
        this.refs.jkyDiv.style.animationFillMode = "forwards";
        this.refs.kjuDiv.style.animation = "hoverspin1 2s 1";
        this.refs.kjuDiv.style.animationFillMode = "forwards";
        this.refs.kjuName.style.animation = "kjuNameIn 2s 1";
        
        this.refs.kjuName.style.animationFillMode = "forwards";
        
        this.setState({
            kjuToggle:true
        })
    }
    
    else {
        this.refs.kjuBio.style.animation = "kjuBioOut 2s 1";
        this.refs.kjuBio.style.animationFillMode = "forwards";
        this.refs.rocketDiv2.style.animation = "rocketIn 3s 1";
        this.refs.rocketDiv2.style.animationFillMode = "forwards";
        this.refs.jkyDiv.style.animation = "jkyIn 3s 1";
        this.refs.jkyDiv.style.animationFillMode = "forwards";
        this.refs.kjuDiv.style.animation = "hoverspin2 2s 1";
        
        this.refs.kjuDiv.style.animationFillMode = "forwards";
        
        this.refs.kjuName.style.animation = "kjuNameOut 2s 1";
        
        this.refs.kjuName.style.animationFillMode = "forwards";
        
        this.setState({
            kjuToggle:false
        })
        
        
    }
    
    
}

jkyClick(){
    if (this.state.jkyToggle == false){
        
        this.refs.jkyBio.style.animation = "jkyBioIn 2s 1";
        this.refs.jkyBio.style.animationFillMode = "forwards";
        this.refs.rocketDiv2.style.animation = "rocketOut 3s 1";
        this.refs.rocketDiv2.style.animationFillMode = "forwards";
        this.refs.kjuDiv.style.animation = "kjuOut 3s 1";
        this.refs.kjuDiv.style.animationFillMode = "forwards";
        this.refs.jkyDiv.style.animation = "rhoverspin1 2s 1";
        this.refs.jkyDiv.style.animationFillMode = "forwards";
        this.refs.jkyName.style.animation = "jkyNameIn 2s 1";
        
        this.refs.jkyName.style.animationFillMode = "forwards";
        
        this.setState({
            jkyToggle:true
        })
    }
    
    else {
        this.refs.jkyBio.style.animation = "jkyBioOut 2s 1";
        this.refs.jkyBio.style.animationFillMode = "forwards";
        this.refs.rocketDiv2.style.animation = "rocketIn 3s 1";
        this.refs.rocketDiv2.style.animationFillMode = "forwards";
        this.refs.kjuDiv.style.animation = "kjuIn 3s 1";
        this.refs.kjuDiv.style.animationFillMode = "forwards";
        this.refs.jkyDiv.style.animation = "rhoverspin2 2s 1";
        
        this.refs.jkyDiv.style.animationFillMode = "forwards";
        
        this.refs.jkyName.style.animation = "jkyNameOut 2s 1";
        
        this.refs.jkyName.style.animationFillMode = "forwards";
        
        
        this.setState({
            jkyToggle:false
        })
        
        
    }
    
}

showChatLabel(){
    this.refs.chatLabel.style.display = "block";
}
hideChatLabel(){
    this.refs.chatLabel.style.display = "none";
}
    
  render() {
    

      
    return (
      <div>
        
        <div>
            
            <div id="kjuDiv" ref="kjuDiv">
            <img id="kju" ref="kju"    
                 className="leftImage"
                onClick={this.kjuClick} 
                src={require('../imgs/kju_spaceman.png')}
                

            />
            </div>
        
        
        <div id="kjuBio" className="bio" ref="kjuBio">
            
            <p>My name is Keiju Sekiguchi, I am a junior designer, with 2 years of desiging experience from BCIT Digital Desgin and development. I like to sketch, sculpt, and design my artwork both analog and digital format.
        
            </p>
        
        </div>
        
        <div id="jkyBio" ref="jkyBio"
             className="bio">
            
            <p>Hi, this is Jacky. I am a full-time student in the 2nd year of the D3 program at BCIT. I am lazy, but I have curiosity. I like to browse 9gag.
        
            </p>
        
        </div>
        
        <div id="rocketDiv2" ref="rocketDiv2">    
        <div id="rocketDiv">
            <img id="rocket"
                 className="rocket"
                 src={require('../imgs/spaceship_2.png')}
            />
        
        
            <img id="booster"
                 src={require('../imgs/booster.png')}
            />
                  
        </div>
        </div>
        
        <div id="jkyDiv" ref="jkyDiv">    
            <img 
                 id="jky" ref="jky"
                 className="rightImage"
                 onClick={this.jkyClick}
                 src={require('../imgs/jky_spaceman.png')}

            />
        </div>
                  
          
        <div id="stlDiv">
        <div id="stlLabel" ref="chatLabel">Chat</div>              
        <img 
             id="satellite"
             src={require('../imgs/satellite.png')}
             onClick={this.chatPage}
             onMouseOver={this.showChatLabel}
             onMouseLeave={this.hideChatLabel}
             
        />          
        </div>
        
        <div id="kjuName" ref="kjuName" class="names">Keiju Sekiguchi</div>
        <div id="jkyName" ref="jkyName" class="names">Jacky Fung</div>
        
        <button onClick={this.stickerPage}>STICKERS</button>
        
        </div>
        
                
      </div>
    );
  }
}

export default App;
