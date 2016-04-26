var socketApp = angular.module('socketApp',[]);

socketApp.controller('ChatController',['$http','$log','$scope',function($http,$log,$scope){
    $scope.predicate = '-id';
    $scope.reverse = false;
    $scope.chatList =[];

    $scope.getAllchat = function(){
        io.socket.get('/chat/addConversation');
        $http.get('/chat')
             .success(function(success_data){
                    $scope.chatList = success_data;
                    $log.info(success_data);
             });
    };

    $scope.getAllchat();

    $scope.chatUser = ""
    $scope.chatMessage="";

    io.socket.on('chat',function(obj){
        if(obj.verb === 'created'){
            $log.info(obj)
            $scope.chatList.push(obj.data);
            $scope.$digest();
        }
    });

    $scope.sendMsg = function(){
        $log.info($scope.chatMessage);
        io.socket.post('/chat/addConversation/',{user:$scope.chatUser,message: $scope.chatMessage});
        $scope.chatMessage = "";
    };
}]);