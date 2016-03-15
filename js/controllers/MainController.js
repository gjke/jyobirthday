app.controller('MainController', ['$scope', '$interval', function($scope, $interval) { 
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
  
  function Ingredient(currentImage, currentPosition, margin_top, base){
  	this.currentImage = currentImage;
  	this.currentPosition = currentPosition;
  	this.running = false;
    this.margin_top = margin_top;
    this.base = base
  	this.isFalling = function(){
  		return (this.currentPosition == 5);
  	},
  	this.update = function(){
  		if (this.currentPosition == 5){
  			this.currentPosition = 0;
  			this.running = false;
  		}
  		if (this.running){
  			this.currentPosition += 1;
  			this.currentImage = this.base+ "-" +this.currentPosition.toString()+".png";
  		}
  	},
  	this.start = function(){
  		this.running = true;
  		this.currentPosition = 0;
  	}
  }
  
  $scope.jeera= new Ingredient("img/graphic/jeera-1.png", 1, "0px", "img/graphic/jeera");
  $scope.aloo = new Ingredient("img/graphic/aloo-1.png", 1, "-67px", "img/graphic/aloo");
  $scope.paneer = new Ingredient("img/graphic/paneer-1.png", 1, "-67px", "img/graphic/paneer");
  $scope.paratha = new Ingredient("img/graphic/paratha-1.png", 1, "0px", "img/graphic/paratha");

  ingredients = [$scope.jeera, $scope.aloo, $scope.paneer, $scope.paratha];
  getLevel = function(score){
    var levels = [-1, -1, -1, 10, 20];
    var i = 0;
    while ((i < levels.length) && (score > levels[i])){
      i++;
    }
    return i;
  }
  running = [0, 0, 0, 0];
  var toStart = 1;
  $scope.score = 0;
  $scope.play = function(){
  	redraw = $interval(function(){
      var level = getLevel($scope.score);
      console.log(level);
  		if (toStart > 0){
  			ingredients[running.indexOf(0)].start();
  			running[running.indexOf(0)] = 1;
  			toStart--;
  		}
  		var totalRunning = 0
  		for (var i = 0; i < 4; i++){
  			if (running[i]){
  				if (ingredients[i].isFalling()){
  					updateScore(i);
  					running[i] = 0;
  				}
  				else{
  					ingredients[i].update();
  					totalRunning++;
  				}	
  			}
  		}
  		if (totalRunning < level){
  			toStart = level - totalRunning;
  		}	
  	}, 1000);
  };

  updateScore = function(i){
    if ((i == 0) && ($scope.position.horizontal == 0) && ($scope.position.vertical == 1)){
      $scope.score++;
    }
    if ((i == 1) && ($scope.position.horizontal == 0) && ($scope.position.vertical == 0)){
      $scope.score++;
    }
    if ((i == 2) && ($scope.position.horizontal == 1) && ($scope.position.vertical == 0)){
      $scope.score++;
    }
    if ((i == 1) && ($scope.position.horizontal == 1) && ($scope.position.vertical == 1)){
      $scope.score++;
    }
  }

}]);
