import React, { Component } from 'react';
import '../css/stickers.css';
import mySocket from "socket.io-client";
import anime from './anime.js';
import Score from './Score.js';
import GameOver from './GameOver.js';
import StartButton from './StartButton.js';
import MoleHole from './MoleHole.js';
import MoleHole2 from './MoleHole2.js';
import MoleHole3 from './MoleHole3.js';

class Stickers extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      1:'translate(0, 110%)',
      2:'translate(0, 110%)',
      3:'translate(0, 110%)',
      4:'translate(0, 110%)',
      5:'translate(0, 110%)',
      6:'translate(0, 110%)',
      7:'translate(0, 110%)',
      8:'translate(0, 110%)',
      9:'translate(0, 110%)',
      shake: 'translate(0, 0)',
      gameHasStarted: false,
      moleHasBeenWhacked: false,
      score: 0,
      lastMole: '',
      display: 'none',
      buttonMessage: 'Start Game',
      gameOver: 'none',
      buttonDisplay: 'inline-block',
      titleMargin: '15px',
      myName:"",
      allusers:[],
      myID:null,
      showDisplay:false,
    }

  }

  animate(el){
    anime({
      targets: el,
      direction: 'alternate',
      loop: true,
      easing: 'easeInQuad',
      duration: 1600,
      scale: function(el, i, l) {
        return (l - i) + .08;
      },
    });
  }

  timeOut(num){
    if (this.state.gameHasStarted){return};
    this.setState({
      buttonDisplay: 'none',
      display: 'block',
      gameOver: 'none',
      titleMargin: 0
    });
    this.shakeScreen();
    window.setTimeout(() => {
      this.startGame();
    }, num);
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
        
        
    });
       
        
        this.socket.on("newmove", (data)=>{
            //console.log(data);
            //console.log(this.refs["u"])
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        });
        
            
           
    }
    
    handleName(evt){
        this.setState({
            myName:evt.target.value
        })
    }
                
  startGame(){
    if ( this.state.gameHasStarted){ return; }
      
    
      
    this.setState({
      gameHasStarted: true,
      score: 0
    });

    let x = 0;
    const intervalID = setInterval(() => {
      this.displayMoles();
      if (++x === 30) {
        window.clearInterval(intervalID);
        this.clearMoles();
        this.setState({ gameHasStarted: false });
        window.setTimeout(() => {
          this.setState({
            display: 'none',
            gameOver: 'block',
            buttonMessage: 'Play again',
            buttonDisplay: 'inline-block',
            titleMargin: '15px'
          });
          this.animate(this.refs.gameOver);
        }, 850)
      }
    }, 700);
  }

  clearMoles(){
    for(let value in this.state){
      if (!isNaN(value)){
        this.setState({
          [value]: 'translate(0, 110%)'
        });
      }
    }
  }

  displayMoles(){
    let activeMole = Math.ceil(Math.random() * 9);
    if (this.state.lastMole[0] === activeMole){
      this.displayMoles();
      return;
    }
      
    this.clearMoles();
    this.setState({
      [activeMole]: 'translate(0, 15%)',
      lastMole: [activeMole]
    });
  }
    

  lockOutClick(){
    window.setTimeout(() => {
      this.setState({ moleHasBeenWhacked: false })
    }, 350)
  }

  addToScore(e){
    if (this.state.moleHasBeenWhacked){ return; }
    let target = e.target;
    target.parentNode.classList.add('game__cross');
    target.classList.add('no-background');
    this.lockOutClick();
    this.setState({
      background: '75px',
      moleHasBeenWhacked: true,
      score: [parseInt(this.state.score, 10) + 1]
    });
    window.setTimeout(function(){
      target.parentNode.classList.remove('game__cross');
      target.classList.remove('no-background');
    }, 500)
  }
addToScore2(e){
    if (this.state.moleHasBeenWhacked){ return; }
    let target = e.target;
    target.parentNode.classList.add('game__cross');
    target.classList.add('no-background');
    this.lockOutClick();
    this.setState({
      background: '75px',
      moleHasBeenWhacked: true,
      score: [parseInt(this.state.score, 10) + 3]
    });
    window.setTimeout(function(){
      target.parentNode.classList.remove('game__cross');
      target.classList.remove('no-background');
    }, 500)
  }
    addToScore3(e){
    if (this.state.moleHasBeenWhacked){ return; }
    let target = e.target;
    target.parentNode.classList.add('game__cross');
    target.classList.add('no-background');
    this.lockOutClick();
    this.setState({
      background: '75px',
      moleHasBeenWhacked: true,
      score: [parseInt(this.state.score, 10) + 10]
    });
    window.setTimeout(function(){
      target.parentNode.classList.remove('game__cross');
      target.classList.remove('no-background');
    }, 500)
  }


  shakeScreen(){
    let posOrNeg = '+';
    let i = 0;
    let shake = () => {
      if (i === 15){
        this.setState({ shake: 'translate(0, 0)' });
        return;
      }
      window.setTimeout(() => {
        posOrNeg = posOrNeg === '-' ? '+' : '-';
        this.setState({ shake: `translate(${posOrNeg}${i}px, 0)` });
        shake();
      }, 80);
      i++
    };
    shake();
  }

  createMoleHoles(){
    var holes = [];
    for(let i = 1; i <= 9; i++){
      holes.push(<MoleHole key={ i } context={ this.state }
        onClick={ this.addToScore.bind(this) } holeNumber={ i }/>
      );
    }
    for(let i = 1; i <= 9; i++){
      holes.push(<MoleHole2 key={ i } context={ this.state }
        onClick={ this.addToScore2.bind(this) } holeNumber={ i }/>
      );
    }
    for(let i = 1; i <= 9; i++){
      holes.push(<MoleHole3 key={ i } context={ this.state }
        onClick={ this.addToScore3.bind(this) } holeNumber={ i }/>
      );
    }
    
    return (
      <div className="board">
        {holes}
       
      </div>
    );
  }



  render() {

 
      
    return (
      <div className="main-container">
        <div className="game" style={{WebkitTransform: this.state['shake']}}>
          <h1 className="game__title" style={{ margin: this.state.titleMargin }}>Alien Hunter</h1>
        <p>Hello Cadet. Unknown invaders are coming to our planet. It is up to you to keep them from coming to our home planet! Click on the aliens to shoot them down before it is too late!</p>
        <img className="alien_pic"/>
        <p> 1 point </p>
        <img className="alien_pic2"/>
        <p> 3 points </p>
        
        <img className="alien_pic3"/>
        <p> 10 point </p>
        <Score context={ this.state }/>
       
          <GameOver context={ this }/>
          <div ref={ 'gameOver' } className="game__button-container">
            <StartButton context={ this.state } onClick={ this.timeOut.bind(this) }/>
          </div>
          { this.createMoleHoles() }
          
        </div>
      </div>
    );
  }
}

export default Stickers;
