app.directive('figure' [] function() { 
  return { 
    restrict: 'E',
    template: '<img ng-src="{{}}" style="margin-top:-40px">' 
  }; 
});