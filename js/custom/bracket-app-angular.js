
/*<li class="game-cell" ng-repeat="game in games | gamesByRoundRegion:2:'south'">
    <div class="team-info top">
        <div class="seed">{{ game.seedTop }}</div>
        <div class="name">{{ getTeam("top",game) }}</div>
        <div class="tot-score">{{ getScore("top",game) }}</div>
    </div>
    <div class="team-spacer"></div>
    <div class="team-info bottom">
        <div class="seed">{{ game.seedBottom }}</div>
        <div class="name">{{ getTeam("bottom",game) }}</div>
        <div class="tot-score">{{ getScore("bottom",game) }}</div>
    </div>
</li>-->
<!-- <li class="spacer">&nbsp;</li>*/

//var bracketApp = angular.module('bracketApp', []);

/*bracketApp.filter('gamesByRoundRegion', function(){

    return function(items,round,region){

        if(items){

            var min,
                max,
                filtered = [];

            if(round == 2 && region == "south"){
                min = 201;
                max = 208;
            }else if(round == 2 && region == "east"){
                min = 209;
                max = 216;
            }else if(round == 2 && region == "west"){
                min = 217;
                max = 224;
            }else if(round == 2 && region == "midwest"){
                min = 225;
                max = 232;
            }else if(round == 3 && region == "south"){
                min = 301;
                max = 304;
            }else if(round == 3 && region == "east"){
                min = 305;
                max = 308;
            }else if(round == 3 && region == "west"){
                min = 309;
                max = 312;
            }else if(round == 3 && region == "midwest"){
                min = 313;
                max = 316;
            }else if(round == 4 && region == "south"){
                min = 401;
                max = 402;
            }else if(round == 4 && region == "east"){
                min = 403;
                max = 404;
            }else if(round == 4 && region == "west"){
                min = 405;
                max = 406;
            }else if(round == 4 && region == "midwest"){
                min = 407;
                max = 408;
            }else if(round == 5 && region == "south"){
                min = 501;
                max = 501;
            }else if(round == 5 && region == "east"){
                min = 502;
                max = 502;
            }else if(round == 5 && region == "west"){
                min = 503;
                max = 503;
            }else if(round == 5 && region == "midwest"){
                min = 504
                max = 504;
            }else if(round == 6){
                min = 601;
                max = 602;
            }else if(round == 7){
                min = 701;
                max = 701;
            }

            for (var i = 0; i < items.length; i++) {

                var item = items[i],
                    item_round = parseFloat(item.round),
                    item_bpid = parseFloat(item.bracketPositionId);

                if(round == 1 && item_round == round){
                    filtered.push(item);
                }else{
                    if(round == item_round){
                        //console.log(item_bpid+'-'+min+'-'+max);
                    }
                    if(item_bpid >= min && item_bpid <= max){
                        filtered.push(item);
                    }

                }

            }

            console.log(filtered.length);

            return filtered;

        }

    }

});

bracketApp.controller('bracketController', ['$scope','$http', function($scope,$http) {

   var data_url = 'http://lucasbyerley.com/dev/proxy.php?callback=JSON_CALLBACK&year=2013';

   $scope.loading = false;

    $http.jsonp(data_url)
        .success(function(data) {
            $scope.games = data.games;
            $scope.loading = false;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.getTeam = function(loc,game){
        if(loc == "top"){
            if(game.away.isTop === "T"){
                return game.away.names.short
            }else if(game.home.isTop === "T"){
                return game.home.names.short
            }
        }else if(loc == "bottom"){
            if(game.away.isTop === "T"){
                return game.home.names.short
            }else if(game.home.isTop === "T"){
                return game.away.names.short
            }
        }
    };

    $scope.getScore = function(loc,game){
        if(loc == "top"){
            if(game.away.isTop === "T"){
                return game.away.score
            }else if(game.home.isTop === "T"){
                return game.home.score
            }
        }else if(loc == "bottom"){
            if(game.away.isTop === "T"){
                return game.home.score
            }else if(game.home.isTop === "T"){
                return game.away.score
            }
        }
    }

}]);*/
