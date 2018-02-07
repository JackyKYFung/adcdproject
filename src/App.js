import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './chat.js';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            kjuState: require('./imgs/kju_spaceman.png'),
            kjuToggle: true,
            jkyState: require('./imgs/jky_spaceman.png'),
            jkyToggle: true,
            rocket: require('./imgs/spaceship_2.png')
        }
       
        this.kjuAnimate = this.kjuAnimate.bind(this);
        this.jkyAnimate = this.jkyAnimate.bind(this);
    }
    
    
    kjuAnimate(){
        
    var kju = document.getElementById("kju");
    var jky = document.getElementById("jky");
    var lBio = document.getElementById("lBio");
    var rBio = document.getElementById("rBio");
        
    
        
//    if (this.state.kjuToggle == true){    
//        
//        this.setState({
//            kjuState: require('./imgs/kju2.png'),
//            kjuToggle: false
//        })
//        
//        jky.style.display = "none";
//        lBio.style.display = "inline";
//        
//    }
//    
//    else {
//        this.setState({
//            kjuState: require('./imgs/kju1.png'),
//            kjuToggle: true
//        })
//        
//        jky.style.display = "inline";
//        lBio.style.display = "none";
//    }
    }
    
    jkyAnimate(){
        
    var kju = document.getElementById("kju");
    var jky = document.getElementById("jky");
    var lBio = document.getElementById("lBio");
    var rBio = document.getElementById("rBio");
//        
//    if (this.state.jkyToggle == true){    
//        
//        this.setState({
//            jkyState: require('./imgs/jky2.png'),
//            jkyToggle: false
//        })
//        
//        kju.style.display = "none";
//        rBio.style.display = "inline";
//        
//    }
//    
//    else {
//        this.setState({
//            jkyState: require('./imgs/jky1.png'),
//            jkyToggle: true
//        })
//        
//        kju.style.display = "inline";
//        rBio.style.display = "none";
//    }
        
    }
    
  render() {
    
        
    return (
      <div className="App">
        
        
        
        <div>
        
            <img id="kju"
                 className="leftImage"
                 src={this.state.kjuState}

            />
        
        
        
        <div id="lBio" className="leftBio">
            
            <p>My name is Keiju Sekiguchi, I am a junior designer, with 2 years of desiging experience from BCIT Digital Desgin and development. I like to sketch, sculpt, and design my artwork both analog and digital format.
        
            </p>
        
        </div>
        
        <div id="rBio" 
             className="rightBio">
            
            <p>Hi, this is Jacky. I am a full-time student in the 2nd year of the D3 program at BCIT. I am lazy, but I have curiosity. I like to browse 9gag.
        
            </p>
        
        </div>
        
        <div id="rocketDiv">
            <img id="rocket"
                 className="rocket"
                 src={require('./imgs/spaceship_2.png')}
            />
        
        
        
            <img id="booster"
                 src={require('./imgs/booster.png')}
            />
                  
        </div>
                  
        <img 
             id="jky"
             className="rightImage"
             src={this.state.jkyState}
             
        />
                  
        </div>
        
        <Chat />        
      </div>
    );
  }
}

export default App;
