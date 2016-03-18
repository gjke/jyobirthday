app.directive('lives', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      images: '=images' 
    }, 
    template: '<img ng-src="{{images[0]}}" height="20px"><img ng-src="{{images[1]}}" height="20px"><img ng-src="{{images[2]}}" height="20px">' 
  }; 
});