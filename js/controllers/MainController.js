app.controller('MainController', ['$scope', '$interval','$timeout', '$window', function($scope, $interval, $timeout, $window) { 
  $scope.title = 'Go Jyotsna';
  $scope.position = {
  	vertical: 0,
  	horizontal: 0
  };
  $scope.figureControll = function(e){
  	if (e.keyCode == 39){
  		$scope.position.horizontal = 1;
  	}
  	switch (e.keyCode){
  		case 39:
  			$scope.position.horizontal = 1; // right
  			break;
  		case 37:
  			$scope.position.horizontal = 0; //left
  			break;
  		case 38:	
  			$scope.position.vertical = 1; // top
  			break;
  		case 40:
  			$scope.position.vertical = 0; // bottom
  			break;		
  	}
  	$scope.figureImageSource = $scope.figureImages[$scope.position.horizontal][$scope.position.vertical];
  };
  $scope.figureImages = [["img/graphic/5-2.png", "img/graphic/5-1.png"], ["img/graphic/5-4.png", "img/graphic/5-3.png"]];
  $scope.figureImageSource = $scope.figureImages[0][0];
  $scope.livesImages = ["img/wp-60.jpg", "img/wp-60.jpg", "img/wp-60.jpg"];
  Messenger = function(){
    this.messages = [],
    this.init = function(){
      this.messages = [];
    },
    this.write = function(message){
      this.messages.push(message);
    }
    this.gotToBottom = function(){

    }
  }
  
  function Ingredient(currentImage, currentPosition, margin_top, base){
  	this.currentImage = currentImage;
  	this.currentPosition = currentPosition;
  	this.running = false;
    this.margin_top = margin_top;
    this.base = base
  	this.isFalling = function(){
  		return ((this.currentPosition == 4) );
  	},
    this.isFallingForLives = function(){
      return (this.currentPosition == 4);
    }
    this.isRunning = function(){
      return (this.running == true);
    }
  	this.update = function(){
  		if (this.currentPosition == 5){
  			this.currentPosition = 0;
  			this.running = false;
        //asdasda
  		}
  		if (this.isRunning()){
  			this.currentPosition += 1;

  			this.currentImage = this.base+ "-" +this.currentPosition.toString()+".png";
  		}
  	},
  	this.start = function(){
  		this.running = true;
  		this.currentPosition = 0;
  	}
  }

  function Grid(ingredients){
    this.ingredients = ingredients;
    this.init = function(){
      var i = Math.floor(Math.random()*this.ingredients.length);
      //ingredients[i].start();
    }
    this.getAvailableIngredient = function(){
      var notRunning = []
      for (var i = 0; i < this.ingredients.length; i++){
        if (!this.ingredients[i].isRunning()){ notRunning.push(i);}
      }
      if (notRunning.length == 0){
        return null;
      }
      else{
        //console.log(notRunning);
        return Math.random() < 0.7 ? notRunning[Math.floor(Math.random()*notRunning.length)] : null;
      }
    },
    this.startIngredient = function(i){
      ingredients[i].start();
    },
    this.update = function(){
      var toStart = this.getAvailableIngredient();
      if (toStart != null){
        this.startIngredient(toStart);
      }
      for (var i = 0; i < this.ingredients.length; i++){
        ingredients[i].update();
      }
    },
    this.getFalling = function(){
      var falling = null;
      for (var i = 0; i < this.ingredients.length; i++){
        if (this.ingredients[i].isFalling()){
          return i;
        }
      }
      return null;
    }
    this.getFallingForLives = function(){
      var falling = null;
      for (var i = 0; i < this.ingredients.length; i++){
        if (this.ingredients[i].isFallingForLives()){
          return i;
        }
      }
      return null;
    }

  }
  $scope.jeera= new Ingredient("img/graphic/jeera-1.png", 1, "0px", "img/graphic/jeera");
  $scope.aloo = new Ingredient("img/graphic/aloo-1.png", 1, "-67px", "img/graphic/aloo");
  $scope.paneer = new Ingredient("img/graphic/paneer-1.png", 1, "-67px", "img/graphic/paneer");
  $scope.paratha = new Ingredient("img/graphic/paratha-1.png", 1, "0px", "img/graphic/paratha");
  ingredients = [$scope.jeera, $scope.aloo, $scope.paneer, $scope.paratha];
  grid = new Grid(ingredients);
  grid.init();
  $scope.messenger = new Messenger();
  $timeout(function(){
    $scope.messenger.init();
    $scope.messenger.write(messages["start"]);
  }, 2000);
  $scope.interval = 1700;
  $scope.score = 0;
  $scope.lives = 3;
  $scope.won = 0;
  $scope.lost = 0;
  $scope.level = 0;
  $scope.playing = 0;

  $scope.play = function(){
    $scope.score = 0;
    $scope.lives = 3;
    $scope.won = 0;
    $scope.lost = 0;
    $scope.level = 0;
    $scope.livesImages = ["img/wp-60.jpg", "img/wp-60.jpg", "img/wp-60.jpg"];
    $scope.messenger.init();
    $scope.messenger.write(messages["start"]);
    $scope.playing = 1;
    $scope.interval = 1700;
  	loop();
    
    //var redraw = $interval(loop, $scope.interval);

    $scope.$watch("level", function(){
      $scope.interval = $scope.interval - 90*$scope.level;
    });
    
    $scope.$watch("won", function(){
      if ($scope.won == 1){
        $scope.playing = 0;
      }
    });

    $scope.$watch("lost", function(){
      if ($scope.lost == 1){
        $scope.messenger.write(messages["lost"]);
        $scope.playing = 0;
      }
    });
  
  };

  function loop(){
    if (getScoreUpdate(grid.getFalling())){
      $scope.score ++;
      $scope.won = checkIfWon();
      $scope.level = updateLevel();
    }
    else{
      updateLives(grid.getFallingForLives());
      $scope.lost = checkIfLost();
    }
    grid.update();

    if ((!$scope.won) && (!$scope.lost)){
      $timeout(loop, $scope.interval);
    }
  }

  function checkIfWon(){
    return ($scope.score == 60);
  }
  function checkIfLost(){
    return ($scope.lives == 0);
  }
  function updateLevel(){
    if (($scope.score > 0) && ($scope.score % 10 == 0)){
      $scope.messenger.write(messages["good"][$scope.level]);
      return ++$scope.level;
    }
    else{
      return $scope.level;
    }
  }

  getScoreUpdate = function(i){
    if ((i == 0) && ($scope.position.horizontal == 0) && ($scope.position.vertical == 1)){
      return 1;
    }
    if ((i == 1) && ($scope.position.horizontal == 0) && ($scope.position.vertical == 0)){
      return 1;
    }
    if ((i == 2) && ($scope.position.horizontal == 1) && ($scope.position.vertical == 0)){
      return 1;
    }
    if ((i == 3) && ($scope.position.horizontal == 1) && ($scope.position.vertical == 1)){
      return 1;
    }
    return 0;
  }
  updateLives = function(i){
    if ((i == 0) && (($scope.position.horizontal != 0) || ($scope.position.vertical != 1))){
      $scope.lives--;
      $scope.livesImages[3-$scope.lives-1] = "img/wp-60-grey.jpg";
      $scope.messenger.write(messages["bad"][3 - $scope.lives - 1]);
    }
    if ((i == 1) && (($scope.position.horizontal != 0) || ($scope.position.vertical != 0))){
      $scope.lives--;
      $scope.livesImages[3-$scope.lives-1] = "img/wp-60-grey.jpg";
      $scope.messenger.write(messages["bad"][3 - $scope.lives - 1]);
    }
    if ((i == 2) && (($scope.position.horizontal != 1) || ($scope.position.vertical != 0))){
      $scope.lives--;
      $scope.livesImages[3-$scope.lives-1] = "img/wp-60-grey.jpg";
      $scope.messenger.write(messages["bad"][3 - $scope.lives - 1]);
    }
    if ((i == 3) && (($scope.position.horizontal != 1) || ($scope.position.vertical != 1))){
      $scope.lives--;
      $scope.livesImages[3-$scope.lives-1] = "img/wp-60-grey.jpg";
      $scope.messenger.write(messages["bad"][3 - $scope.lives - 1]);
    }

  }

}]);
