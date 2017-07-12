$(document).ready(function(){
  console.log("test");
})



var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J',
'J', 'K', 'K', 'L', 'L'];

var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.memory_tile_shuffle = function(){
  var i = this.length, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}

function newBoard(){
  tiles_flipped = 0;
  var output = '';
  memory_array.memory_tile_shuffle();

  for(var i = 0; i < memory_array.length; i++){
    output += '<div id ="tile_'+i+'" onclick="memoryFlipTile(this, \''+memory_array[i]+'\')" class="col-xs-6 col-md-4 tileContainer"></div>';
  }
    document.getElementById('memory_board').innerHTML = output;
}
window.addEventListener('load', newBoard());


function memoryFlipTile(tile, val){
  //check to see if tile val is empty and amount of tiles flipped < 2
  if(tile.innerHTML == "" && memory_values.length < 2){
    //if true, "flip" card/style background and put the val in it
    tile.style.background = '#f2f2f2';
    tile.innerHTML = val;
    //if array of flipped tiles is 0, put the val of flipped tile in it and its id
    if(memory_values.length == 0){
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
    } else if(memory_values.length == 1){ // if 1 tile already flipped, get val of newly flipped tile
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
      if(memory_values[0] == memory_values[1]){ //if the vals of flipped tiles match, increase amount of tiles_flipped count by 2
        tiles_flipped += 2;

        //then clear arrays
        memory_values = [];
        memory_tile_ids = [];
        //check if board is cleared
        if(tiles_flipped == memory_array.length){
          alert('Good Job! Generating New Board');
          document.getElementById('memory_board').innerHTML = "";
          newBoard();
        }
      } else {
        function flipBack(){ //if tiles do not match - flip them back over
          var tile_1 = document.getElementById(memory_tile_ids[0]);
          var tile_2 = document.getElementById(memory_tile_ids[1]);
          tile_1.style.background = `url('https://thumbs.dreamstime.com/z/canary-bird-yellow-feather-green-background-flat-design-style-vector-illustration-68955780.jpg') no-repeat`;
          tile_1.style.backgroundSize = 'cover';
          tile_1.innerHTML = "";
          tile_2.style.background = `url('https://thumbs.dreamstime.com/z/canary-bird-yellow-feather-green-background-flat-design-style-vector-illustration-68955780.jpg') no-repeat`;
          tile_2.style.backgroundSize = 'cover';
          tile_2.innerHTML = "";
          memory_values = [];
          memory_tile_ids = [];
      }
      setTimeout(flipBack, 800);
    }
    }
  }
}
