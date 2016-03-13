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
  			$scope.position.horizontal = 1;
  			break;
  		case 37:
  			$scope.position.horizontal = 0;
  			break;
  		case 38:	
  			$scope.position.vertical = 1;
  			break;
  		case 40:
  			$scope.position.vertical = 0;
  			break;		
  	}
  	$scope.figureImageSource = $scope.figureImages[$scope.position.horizontal][$scope.position.vertical];
  };
  $scope.figureImages = [["img/left-low.png", "img/left-up.png"], ["img/right-low.png", "img/right-up.png"]];
  $scope.figureImageSource = $scope.figureImages[0][0];
  
  function Ingredient(currentImage, currentPosition){
  	this.currentImage = currentImage;
  	this.currentPosition = currentPosition;
  	this.running = false;
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
  			this.currentImage = "img/jeera/jeera-"+this.currentPosition.toString()+".png";
  		}
  	},
  	this.start = function(){
  		this.running = true;
  		this.currentPosition = 0;
  	}
  }
  
  $scope.jeera= new Ingredient("img/jeera/jeera-1.png", 1);
  $scope.aloo = new Ingredient("img/jeera/jeera-1.png", 1);
  $scope.paneer = new Ingredient("img/jeera/jeera-1.png", 1);
  $scope.paratha = new Ingredient("img/jeera/jeera-1.png", 1);

  ingredients = [$scope.jeera, $scope.aloo, $scope.paneer, $scope.paratha];
  running = [0, 0, 0, 0];
  var level = 2;
  var toStart = 1;
  $scope.play = function(){
  	redraw = $interval(function(){
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

  }

}]);
