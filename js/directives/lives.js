app.directive('lives', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      images: 'images' 
    }, 
    template: '<img ng-src="{{images[0]}}"><img ng-src="{{images[1]}}"><img ng-src="{{images[3]}}">' 
  }; 
});