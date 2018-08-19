returnInitialState = () => {
  let initVal = [[],[],[],[],[],[],[],[],[],[]];
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        initVal[i].push(null);
      }
    }
  
  const initialState = {
      snake: [{x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}, {x: 5, y: 8}],
      val: initVal,
      direction: 'left',
      fruit: {x: 8, y: 9},
      score: 0,
      oldScore: 0,
      showGameOver: false,
      paused: false
    };
  
  return initialState;
}



class HelloWorldApp extends React.Component {

  constructor() {
    super();
       
    this.state = returnInitialState();
    
    this.boxStyle={height: '30px', width: '35px'};
  }

 moveSnake = (xaxis, yaxis) => {
   let newSnake = [{}];
   
   let x  = this.state.snake[0].x+xaxis;
   let y = this.state.snake[0].y+yaxis;
   
   // tackle overflow
   if (x > 9) x = 0;
   if (x === -1) x = 9;
   if (y > 9) y = 0;
   if (y === -1) y = 9;
   
   let newFruit; 
   // if the snake has eaten the fruit
   if(x === this.state.fruit.x && y === this.state.fruit.y) {
     newSnake = [(this.state.fruit), ...this.state.snake];
     newFruit = {x: Math.floor(Math.random() * 9), y: Math.floor(Math.random() * 9)};
     this.setState( {fruit: newFruit, 
                    score: this.state.score+1});
   } else {
     newSnake[0] = {x: x, y: y};
     this.state.snake.forEach((item, index) => {
       if(index < this.state.snake.length - 1) {
         newSnake[index+1] = item;
       }
     });
   }
 
   let gameOver = false;
   // check whether snake is biting itself:
   newSnake.forEach((item, index) => {
     if(index !== 0) {
       if(this.isEqual(newSnake[0], item)) {
         this.setState({...returnInitialState(),
                        showGameOver: true,
                       oldScore: this.state.score,
                       paused: true});
         gameOver = true;
       }
     }
   });
   
   if(!gameOver) {
     this.setState({snake: newSnake});
   }
   
 }
 
 isEqual = (obj1, obj2) => {
   return (obj1.x === obj2.x && obj1.y === obj2.y);
 }
 
 onDirection = (e) => {
   
   const keyPressed = e.target.value[e.target.value.length-1];
   const direction = this.state.direction;
   
   if(direction === 'up' && keyPressed === 's' ||
      direction === 'down' && keyPressed === 'w' ||
      direction === 'right' && keyPressed === 'a' ||
      direction === 'left' && keyPressed === 'd')  
      {
        return 0;
      }
      
   switch(keyPressed) {
     case 'w': 
       this.setState({direction: 'up'});
       break;
     case 'a': 
       this.setState({direction: 'left'});
       break;
     case 's': 
       this.setState({direction: 'down'});
       break;
     case 'd': 
       this.setState({direction: 'right'});
       break;
   }
 }
 
 renderSnakeAndFruit = () => {
   let newVal = [[],[],[],[],[],[],[],[],[],[]];
   for(let i=0; i<10; i++) {
     for(let j=0; j<10; j++) {
      newVal[i].push(null); 
     }
   }

   // render the snake
   this.state.snake.forEach((item, index) => {
     if (index === 0) {
       newVal[item.x][item.y] = (<Status value='disabled' size='small' />); // render head
     }
     else {
       newVal[item.x][item.y] = (<Status value='unknown' size='small' />); // render body
     }
   });
   
   // render the fruit
   
   const fruit = this.state.fruit;
   newVal[fruit.x][fruit.y] = (<Status value='ok' size='small' />);  
   
   return newVal;
 }
 
 timerCallback = () => {
   switch(this.state.direction) {
     case 'right':
       this.moveSnake(0, 1);
       break;
     case 'left':
       this.moveSnake(0, -1);
       break;
     case 'up':
       this.moveSnake(-1, 0);
       break;
     case 'down':
       this.moveSnake(1, 0);
       break;
   }
 }

  render () {
    let val = returnInitialState().val;
    if (!this.state.paused) {
      val = this.renderSnakeAndFruit();
    }
    
    return (
      <App>
        <ReactInterval timeout={300} enabled={!this.state.paused}
          callback={this.timerCallback}/>
        <Box direction='row' full={true} colorIndex='accent-1' align='center' justify='center'>
          <Box colorIndex='light-2' margin='small' pad='small'>
            <Box direction='row'>
              <Heading tag='h1'>Snake Game</Heading>
            </Box>
            <Box size='medium' margin={{bottom: 'small'}}>
              <FormField>
                <TextInput id='item1'
                  name='item-1'
                  value='Click Here & play with "A", "S", "D", "W"'
                  onDOMChange={this.onDirection} />
              </FormField>
            </Box>
            <Box direction='row' align='center' margin={{vertical: 'small'}}>
              <Heading tag='h3' margin='none'>Score: </Heading>
              <Value value={this.state.score} size='small'/>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/0'>{val[0][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/1'>{val[0][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/2'>{val[0][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/3'>{val[0][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/4'>{val[0][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/5'>{val[0][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/6'>{val[0][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/7'>{val[0][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/8'>{val[0][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all' id='0/9'>{val[0][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[1][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[2][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[3][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[4][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[5][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[6][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[7][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[8][9]}</Box>
            </Box>
            <Box direction='row' size='large'>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][0]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][1]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][2]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][3]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][4]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][5]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][6]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][7]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][8]}</Box>
              <Box align='center' justify='center' style={this.boxStyle} separator='all'>{val[9][9]}</Box>
            </Box>
          </Box>
        </Box>
        {this.state.showGameOver && 
        <Layer align='center' closer={false}>
          <Box size={{minimum: 'medium'}} pad='medium'>
            <Heading tag='h3' strong={true}> Game Over! </Heading>
            <Heading tag='h3'> Your Score: </Heading>
            <Heading tag='h2' strong={true}>{this.state.oldScore}</Heading>
            <Button label='Play Again !' primary={true} onClick={() => {this.setState({showGameOver: false, paused: false})}} />
          </Box>
        </Layer>}
      </App>
    );
  }
};

var element = document.getElementById('content');
ReactDOM.render(<HelloWorldApp />, element);