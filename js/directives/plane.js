app.directive('plane', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      ingredient: '=ingredient' 
    }, 
    template: '<img ng-src="{{ingredient.currentImage}}" style="margin-top:{{ingredient.margin_top}}"/>' 
  }; 
});
