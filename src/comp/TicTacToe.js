import React, { Component } from 'react';
//import logo from './logo.svg';
import '../css/tictactoe.css';
import mySocket from 'socket.io-client';

class App extends Component {
    constructor(props){
        super(props);
        //this be put on server side
        this.state = {
            box1: null,
            box2: null,
            box3: null,
            box4: null,
            box5: null,
            box6: null,
            box7: null,
            box8: null,
            box9: null,
            id1:null,
            id2:null,
            id3:null,
            id4:null,
            id5:null,
            id6:null,
            id7:null,
            id8:null,
            id9:null,
            mode: 0,
            name: null,
            players: [],
            countdown: 5,
            playerID: null,
            playerIcon: null,
            playerTurn: 1,
            winner: null,
            quitter: null,
            windowToggle: false,
            restartCount: 3,
            playerWin: false
        }
        
        this.timer = 0;
        this.restartTimer = 0;
    
        this.boxClick = this.boxClick.bind(this);
        this.playerName = this.playerName.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.countDown = this.countDown.bind(this);
        //this.turnCheck = this.turnCheck.bind(this);
        //this.turnSwitch = this.turnSwitch.bind(this);
        this.winCondition = this.winCondition.bind(this);
        //this.restartGame = this.restartGame.bind(this);
        this.tttEsc = this.tttEsc.bind(this);
    }    

componentDidMount(){    
    //this.socket = mySocket("localhost:10001");    
}
   
    
playerName(evt){
    this.setState({
        name:evt.target.value
    })
    
    console.log(evt.target.value);
}    
    
joinGame(){
    this.socket = mySocket("https://adcdtttsocket.herokuapp.com");
    
    this.socket.emit("username", this.state.name);
    
    this.socket.on("playerID", (data)=>{
        this.setState({
            playerID:data,
            playerTurn: 1
        })
        
        if (this.state.playerID == 1){
            this.setState({
                playerIcon: require('../imgs/O.png')
            })           
            
        }
        
        else if (this.state.playerID == 2){
            this.setState({
                playerIcon: require('../imgs/X.png')
            })
            
        }
    });
    
    this.socket.on("players", (data)=>{
                
                console.log(data);
        
                this.setState({
                    players:data
                });
        
            console.log(this.state.playerID);
        
            var timer = 5;
        
            if (data.length == 1){
                this.refs.waitingPhase.style.display = "block";
            }
        
            if (data.length == 2){
                this.refs.waitingPhase.style.display = "none";
                
                this.refs.timer.style.display = "block";
                
                this.timer = setInterval(this.countDown, 1000);
            }
    });
    
    this.socket.on("initialState", (data)=>{
        this.setState({
            box1: data.box1,
            box2: data.box2,
            box3: data.box3,
            box4: data.box4,
            box5: data.box5,
            box6: data.box6,
            box7: data.box7,
            box8: data.box8,
            box9: data.box9
        })
    });
    
    this.socket.on("selected", (data)=>{
        console.log(data);
        
        this.setState({
            box1: data.box.box1,
            box2: data.box.box2,
            box3: data.box.box3,
            box4: data.box.box4,
            box5: data.box.box5,
            box6: data.box.box6,
            box7: data.box.box7,
            box8: data.box.box8,
            box9: data.box.box9,
            id1: data.box.id1,
            id2: data.box.id2,
            id3: data.box.id3,
            id4: data.box.id4,
            id5: data.box.id5,
            id6: data.box.id6,
            id7: data.box.id7,
            id8: data.box.id8,
            id9: data.box.id9,
            
            playerTurn: data.turn
            
        })
        
        this.winCondition();
        
        
    if (this.state.playerTurn != this.state.playerID){
        
      if (this.state.playerID == 1){
          this.refs.oIcon.style.opacity = "0.5";
          this.refs.player1.style.opacity = "0.5";
          this.refs.xIcon.style.opacity = "1";
          this.refs.player2.style.opacity = "1";
      } 
    
      else if (this.state.playerID == 2){
          this.refs.oIcon.style.opacity = "1";
          this.refs.player1.style.opacity = "1";
          this.refs.xIcon.style.opacity = "0.5";
          this.refs.player2.style.opacity = "0.5";
      }
        
      this.refs.cell1.style.opacity = "0.5";
      this.refs.cell2.style.opacity = "0.5";
      this.refs.cell3.style.opacity = "0.5";
      this.refs.cell4.style.opacity = "0.5";
      this.refs.cell5.style.opacity = "0.5";
      this.refs.cell6.style.opacity = "0.5";
      this.refs.cell7.style.opacity = "0.5";
      this.refs.cell8.style.opacity = "0.5";
      this.refs.cell9.style.opacity = "0.5";
      
      this.refs.cell1.style.pointerEvents = "none";
      this.refs.cell2.style.pointerEvents = "none";
      this.refs.cell3.style.pointerEvents = "none";
      this.refs.cell4.style.pointerEvents = "none";
      this.refs.cell5.style.pointerEvents = "none";
      this.refs.cell6.style.pointerEvents = "none";
      this.refs.cell7.style.pointerEvents = "none";
      this.refs.cell8.style.pointerEvents = "none";
      this.refs.cell9.style.pointerEvents = "none";    
        
          
  }
      
  else if (this.state.playerTurn == this.state.playerID){
      
      if (this.state.playerID == 1){
          this.refs.oIcon.style.opacity = "1";
          this.refs.player1.style.opacity = "1";
          this.refs.xIcon.style.opacity = "0.5";
          this.refs.player2.style.opacity = "0.5";
      } 
    
      else if (this.state.playerID == 2){
          this.refs.oIcon.style.opacity = "0.5";
          this.refs.player1.style.opacity = "0.5";
          this.refs.xIcon.style.opacity = "1";
          this.refs.player2.style.opacity = "1";
      }
      
      this.refs.cell1.style.opacity = "1";
      this.refs.cell2.style.opacity = "1";
      this.refs.cell3.style.opacity = "1";
      this.refs.cell4.style.opacity = "1";
      this.refs.cell5.style.opacity = "1";
      this.refs.cell6.style.opacity = "1";
      this.refs.cell7.style.opacity = "1";
      this.refs.cell8.style.opacity = "1";
      this.refs.cell9.style.opacity = "1";
      
      this.refs.cell1.style.pointerEvents = "auto";
      this.refs.cell2.style.pointerEvents = "auto";
      this.refs.cell3.style.pointerEvents = "auto";
      this.refs.cell4.style.pointerEvents = "auto";
      this.refs.cell5.style.pointerEvents = "auto";
      this.refs.cell6.style.pointerEvents = "auto";
      this.refs.cell7.style.pointerEvents = "auto";
      this.refs.cell8.style.pointerEvents = "auto";
      this.refs.cell9.style.pointerEvents = "auto";
  }
    });
    
    this.refs.gameTitle.style.display = "none";
    this.refs.username.style.display = "none";
    this.refs.nameInput.style.display = "none";
    this.refs.joinBtn.style.display = "none";
    this.refs.title.style.display = "block";
    this.refs.hr.style.display = "block";
    
//    this.socket.on("tieGame", (data)=>{
//        this.setState({
//            box1: data.box1,
//            box2: data.box2,
//            box3: data.box3,
//            box4: data.box4,
//            box5: data.box5,
//            box6: data.box6,
//            box7: data.box7,
//            box8: data.box8,
//            box9: data.box9,
//            id1: data.id1,
//            id2: data.id2,
//            id3: data.id3,
//            id4: data.id4,
//            id5: data.id5,
//            id6: data.id6,
//            id7: data.id7,
//            id8: data.id8,
//            id9: data.id9,
//            playerTurn: data.turn
//            
//        })
//        
//        //this.restartTimer = setInterval(this.restartGame, 1000);
//    });
    
    
    this.socket.on("playerLeft", (data)=>{
        this.setState({
            winner: data,
            windowToggle: true
        })
    });
    
}  
 
countDown(){
    
    if (this.state.countdown == 0){
        clearInterval(this.timer);
        this.changeMode();
        //this.turnCheck();
        
    }
    else {
        var newTime = this.state.countdown - 1;

        this.setState({
            countdown: newTime
        })
    }
    
}    
    
//restartGame(){
//    if (this.state.restartCount == 0){
//        clearInterval(this.restartTimer);
//        //this.changeMode();
//        //this.turnCheck();
//        
//    }
//    else {
//        var newTime = this.state.restartCount - 1;
//
//        this.setState({
//            restartCount: newTime
//        })
//    }
//}    
    
//restartGameBox(){
//    
//}    
    
boxClick(data){
    console.log(this.state.playerTurn);
    console.log(this.state.playerID);
    
    if (this.state.playerTurn != this.state.playerID){
        return false;
      } 
    if (data == 1){
        if (this.state.box1 == null){
        
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj);
        }
    }
    
    else if (data == 2){
        if (this.state.box2 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    else if (data == 3){
        if (this.state.box3 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    else if (data == 4){
        if (this.state.box4 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    else if (data == 5){
        if (this.state.box5 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    else if (data == 6){
        if (this.state.box6 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }
            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    else if (data == 7){
        if (this.state.box7 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    else if (data == 8){
        if (this.state.box8 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    else if (data == 9){
        if (this.state.box9 == null){
            
            var nextTurn;
    
            if (this.state.playerTurn == 1){
                nextTurn = 2;
            }

            else if (this.state.playerTurn == 2){
                nextTurn = 1;
            }
            
            var clickObj = {
                boxNum: data,
                imgSrc: this.state.playerIcon,
                playerID: this.state.playerID,
                turn: nextTurn

            }

            this.socket.emit("boxSelect", clickObj); 
        }
    }
    
    
//    
    
}  

winCondition(){
    
    console.log(this.state);
    //check all horizontal matches
    if (this.state.id1 != null || this.state.id2 != null || this.state.id3 != null){
        if (this.state.id1 == this.state.id2 &&
            this.state.id2 == this.state.id3 &&
            this.state.id3 == this.state.id1){
                
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
            
                var winner = this.state.id1;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
                    
        return false;
        }
    }
    
    if (this.state.id4 != null || this.state.id5 != null || this.state.id6 != null){
        if (this.state.id4 == this.state.id5 &&
            this.state.id5 == this.state.id6 &&
            this.state.id6 == this.state.id4) {
                
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
            
            var winner = this.state.id4;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                return false;
        }
    }
    
    if (this.state.id7 != null || this.state.id8 != null || this.state.id9 != null){
        if (this.state.id7 == this.state.id8 &&
            this.state.id8 == this.state.id9 &&
            this.state.id9 == this.state.id7) {
            
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
                
                var winner = this.state.id7;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                return false;
        }
    }
    

    //check all vertical matches    
    if (this.state.id1 != null || this.state.id4 != null || this.state.id7 != null){
        if (this.state.id1 == this.state.id4 &&
            this.state.id4 == this.state.id7 &&
            this.state.id7 == this.state.id1) {
            
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
                
                var winner = this.state.id1;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                return false;
        }
    }
    
    if (this.state.id2 != null || this.state.id5 != null || this.state.id8 != null){
            if (this.state.id2 == this.state.id5 &&
            this.state.id5 == this.state.id8 &&
            this.state.id8 == this.state.id2) {
                
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
                
                var winner = this.state.id2;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
                
                return false;
            }
    }

    if (this.state.id3 != null || this.state.id6 != null || this.state.id9 != null){
            if (this.state.id3 == this.state.id6 &&
            this.state.id6 == this.state.id9 &&
            this.state.id9 == this.state.id3) {
                
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
                
                var winner = this.state.id3;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
                
                return false;
            }
    }    
         
        
    //check diagonal matches
    if (this.state.id1 != null || this.state.id5 != null || this.state.id9 != null){
        if (this.state.id1 == this.state.id5 &&
            this.state.id5 == this.state.id9 &&
            this.state.id9 == this.state.id1) {
            
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
                
                var winner = this.state.id1;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                return false;
            }
    }

    if (this.state.id7 != null || this.state.id5 != null || this.state.id3 != null){
            if (this.state.id7 == this.state.id5 &&
                this.state.id5 == this.state.id3 &&
                this.state.id3 == this.state.id7) {
                
                this.refs.cell1.style.pointerEvents = "none";
                this.refs.cell2.style.pointerEvents = "none";
                this.refs.cell3.style.pointerEvents = "none";
                this.refs.cell4.style.pointerEvents = "none";
                this.refs.cell5.style.pointerEvents = "none";
                this.refs.cell6.style.pointerEvents = "none";
                this.refs.cell7.style.pointerEvents = "none";
                this.refs.cell8.style.pointerEvents = "none";
                this.refs.cell9.style.pointerEvents = "none";
                    
                    var winner = this.state.id7;
            
                if (winner == 1){
                    var winName = this.state.players[0];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
            
                else if (winner == 2){
                    var winName = this.state.players[1];
                
                    this.setState({
                        winner: winName,
                        playerWin: true
                    })
                }
                
                    return false;
                }

    }    
}    
    
    
    
changeMode(){
    this.setState({
        mode: 1
    })
    
    if (this.state.playerTurn == 1){
          this.refs.oIcon.style.opacity = "1";
          this.refs.player1.style.opacity = "1";
          this.refs.xIcon.style.opacity = "0.5";
          this.refs.player2.style.opacity = "0.5";
      } 
    
      else if (this.state.playerID == 2){
          this.refs.oIcon.style.opacity = "0.5";
          this.refs.player1.style.opacity = "0.5";
          this.refs.xIcon.style.opacity = "1";
          this.refs.player2.style.opacity = "1";
      }
}    
 
tttEsc(data){
    this.props.changePage(data);
}    
    
    
    
  render() {
      
      var winWindow = null;
      
      if (this.state.playerWin == true){
          winWindow = (
            <div id="winWindow">
              
                <p id="winPhase"> Winner is <span id="winner">{this.state.winner}</span> ! </p>
              
                <button ref="homeBtn" id="homeBtn" onClick={this.tttEsc.bind(this, "home")}>Return to Homepage</button>
              
            </div>
          
          );
      }
      
      var disconnect = null;
      
      if (this.state.windowToggle == true){
          disconnect = (
            <div id="endWindow">
                <p> A player has left the game!</p>
              
                <p id="winPhase"> Winner is <span id="winner">{this.state.winner}</span> ! </p>
              
                <button ref="homeBtn" id="homeBtn" onClick={this.tttEsc.bind(this, "home")}>Return to Homepage</button>
              
            </div>
              
          
          );
      }
      
      var allPlayers = this.state.players.map((obj, i)=>{ i++;
        
        return(

        <div key={i}>
            {i} -  {obj}
        </div>
        )
    });
      
      var comp = null;
      
      if (this.state.mode == 0){
          comp = (
            <div id="ttt_joinBox">
              
                <button id="tttEsc" onClick={this.tttEsc.bind(this, "home")}>X</button>
          
                <p id="gameTitle" ref="gameTitle">TicTacToe</p>
                
                <p id="username" ref="username">Username</p>
              
                <input ref="nameInput" id="nameInput" type="text" placeholder="Type username" onChange={this.playerName} />  
        
                <button ref="joinBtn" id="ttt_joinBtn" onClick={this.joinGame}>Join Game</button>
            
                <div id="playerList">
                    <div id="title" ref="title" id="title">Players</div> 
                    <hr id="hr" ref="hr" />
                    {allPlayers}
                    <br />
                    <div id="waitingPhase" ref="waitingPhase">Waiting for one more player...</div>
              
                    <div id="timer" ref="timer">Dimensions warping  in {this.state.countdown} second(s)...</div>
                </div>
              
            
            </div>
              
          
          );
          
      }
      
      else if(this.state.mode == 1){
          comp = (
              
            <div>
              
                <div id="infoBox">  
                      <img id="oIcon" ref="oIcon" className="playerIcon" src={require("../imgs/O.png")} />
                    <div id="player1" ref="player1">
                        {this.state.players[0]}
                    </div>

                        <img id="xIcon" ref="xIcon" className="playerIcon" src={require("../imgs/X.png")} />
                    <div id="player2" ref="player2"> 
                        {this.state.players[1]}
                    </div>
                </div>        
            
            <div id="playBox">
            
              
            <div id="line1" className="hLines"></div>
            <div id="line2" className="hLines"></div>
            <div id="line3" className="vLines"></div>
            <div id="line4" className="vLines"></div>
        
            <div id="row1">
                <div id="cell1" ref="cell1" className="box" onClick={this.boxClick.bind(this, 1)}>
                    <img className="boxIcons" id="icon1" ref="icon1" src={this.state.box1}/>
                </div>
                
                <div id="cell2" ref="cell2" className="box" onClick={this.boxClick.bind(this, 2)}>
                    <img className="boxIcons" id="icon2" ref="icon2" src={this.state.box2}/>
                </div>
                                                    
                <div id="cell3" ref="cell3" className="box" onClick={this.boxClick.bind(this, 3)}>
                    <img className="boxIcons" id="icon3" ref="icon3" src={this.state.box3}/>
                </div>
            </div>
            <div id="row2">
                <div id="cell4" ref="cell4" className="box" onClick={this.boxClick.bind(this, 4)}>
                    <img className="boxIcons" id="icon4" ref="icon4" src={this.state.box4}/>
                </div>
                <div id="cell5" ref="cell5" className="box" onClick={this.boxClick.bind(this, 5)}>
                    <img className="boxIcons" id="icon5" ref="icon5" src={this.state.box5}/>
                </div>
                <div id="cell6" ref="cell6" className="box" onClick={this.boxClick.bind(this, 6)}>
                    <img className="boxIcons" id="icon6" ref="icon6" src={this.state.box6}/>
                </div>
            </div>
            <div id="row3">
                <div id="cell7" ref="cell7" className="box" onClick={this.boxClick.bind(this, 7)}>
                    <img className="boxIcons" id="icon7" ref="icon7" src={this.state.box7}/>            
                </div>
                <div id="cell8" ref="cell8" className="box" onClick={this.boxClick.bind(this, 8)}>
                    <img className="boxIcons" id="icon8" ref="icon8" src={this.state.box8}/>            
                </div>
                <div id="cell9" ref="cell9" className="box" onClick={this.boxClick.bind(this, 9)}>
                    <img className="boxIcons" id="icon9" ref="icon9" src={this.state.box9}/>            
                </div>
            </div>
        </div>
    </div>                
          );
      }
      
    return (
      <div className="App">
        {comp}
        {disconnect}
        {winWindow}
      </div>
    );
  }
}

export default App;
