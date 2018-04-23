var app = angular.module('myApp', []);
app.controller('message', function($scope) {
	$scope.messages=[];
	$scope.Name="Yash";

    $scope.display=function(message){
    	if($scope.message1!="" )
    	{	if(message.Mess!="")
    	
    	message=message.replace(" "," ");
    	$scope.messages.push({Mess:message});
    	
    	}
	}

   // $scope.messages=message;
    
});
