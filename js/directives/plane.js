app.directive('plane', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      ingredient: '=ingredient' 
    }, 
    template: '<img ng-src="{{ingredient.currentImage}}" />' 
  }; 
});
