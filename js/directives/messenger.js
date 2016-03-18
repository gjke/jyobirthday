app.directive('messenger', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      messages: '=messages' 
    }, 
    template: function(){
    	return '<div id="messages" scroll-glue> <div class="message" ng-repeat="m in messages"> <div class="face"> <img ng-src="{{m.img}}" width="30px"/> </div><div class="text"> <span> {{m.message}} </span></div><div class="clearer"></div>	</div><div class="clearer"></div></div>';
  	},
  	link: function (scope, elem){
  		scope.$watch('messages', function(){
  			elem[0].scrollTop = elem[0].scrollHeight;
  		});
  	}
  }; 
});