/***
 * 
 * Bracket App
 * 
**/

window.bracketApp = {};

(function($){

    var BA = bracketApp,
        year = '',
        locations = [],
        spinner = $(".spinner");

    spinner.show();

    BA.getURLParam = function(param){
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) 
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == param) 
            {
                return sParameterName[1];
            }
        }
    }

    if(BA.getURLParam("year") != undefined){
        year = BA.getURLParam("year");
    }else{
        var d = new Date();
        year = d.getFullYear();
    }

    $(".hero .year").html('<i class="fa fa-star"></i> '+year+' <i class="fa fa-star"></i>');

    BA.jsonCallback = function(json){};

    BA.getGames = function(){

        $.ajax({
            type: 'GET',
            url: 'http://lucasbyerley.com/dev/proxy.php?callback=?&year='+(parseFloat(year)-1),
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(data) {
                spinner.hide();
                BA.sortGamesByBracketPosId(data.games);
            },
            error: function(e) {
                console.log(e.message);
            }
        });

    };

    BA.sortGamesByBracketPosId = function(games){

        games.sort(function(a, b){
            return parseFloat(a.bracketPositionId) - parseFloat(b.bracketPositionId);
        });

        BA.buildRegions(games)

    };

    BA.buildRegions = function(games){

        BA.buildLocations(games);

        BA.buildFirstFour(games,4,101,104);

        BA.buildRound("south",2,games,8,201,208);
        BA.buildRound("south",3,games,4,301,304);
        BA.buildRound("south",4,games,2,401,402);
        BA.buildRound("south",5,games,1,501,501);

        BA.buildRound("east",2,games,8,209,216);
        BA.buildRound("east",3,games,4,305,308);
        BA.buildRound("east",4,games,2,403,404);
        BA.buildRound("east",5,games,1,502,502);

        BA.buildRound("west",2,games,8,217,224);
        BA.buildRound("west",3,games,4,309,312);
        BA.buildRound("west",4,games,2,405,406);
        BA.buildRound("west",5,games,1,503,503);

        BA.buildRound("midwest",2,games,8,225,232);
        BA.buildRound("midwest",3,games,4,313,316);
        BA.buildRound("midwest",4,games,2,407,408);
        BA.buildRound("midwest",5,games,1,504,504);

        BA.buildFinalFour(games);

    };

    BA.buildRound = function(region,round,games,total,min,max){

        var count = 0;

        for (var i = 0; i < games.length; i++) {

            var game = games[i],
                markup = '',
                bpid = parseFloat(game.bracketPositionId);

            if(bpid >= min && bpid <= max){

                count++;

                markup += BA.getGameMarkup(game,"li");

                if(count == 1){
                    markup = '<li class="spacer first">&nbsp;</li>' + markup;
                }

                if(count == total){
                    markup = markup + '<li class="spacer last">&nbsp;</li>';
                }else{
                    markup = markup + '<li class="spacer">&nbsp;</li>';
                }

                $('div.region.'+region+' .round-'+round+' .round-games').append(markup);
                
            };

            if(count == total){break;}

        }

    };

    BA.buildFirstFour = function(games,total,min,max){

        for (var i = 0; i < games.length; i++) {

            var game = games[i],
                markup = '',
                bpid = parseFloat(game.bracketPositionId);

            if(bpid >= min && bpid <= max){

                markup += '<div class="small-3 columns">'
                    markup += BA.getGameMarkup(game,"div");
                markup += '</div>'

                $('div.row.first-four').append(markup);
            }

        }

    };

    BA.buildFinalFour = function(games){

        for (var i = 0; i < games.length; i++) {

            var game = games[i],
                markup = '',
                game_id = '',
                bpid = parseFloat(game.bracketPositionId);

            if(bpid === 601 || bpid === 602 || bpid == 701){

                game_id = bpid;
                markup = BA.getGameMarkup(game,"div");
                $('div#game-'+game_id).append(markup);
                continue;
            
            }

        }

    };

    BA.getGameMarkup = function(game,wrap){

        var markup = '',
            top_logo = BA.getTeamInfo("img","top",game),
            bot_logo = BA.getTeamInfo("img","bottom",game);

        if(wrap == "li"){
            markup += '<li class="game-cell '+game.gameState+'" id="'+game.bracketPositionId+'">'
        }else{
            markup += '<div class="game-cell '+game.gameState+'" id="'+game.bracketPositionId+'">'
        }

            //markup += '<div class="location">testing this</div>';
            markup += '<div class="game-state-text">'+BA.getGameStateText(game)+'</div>';
            markup += '<div class="network">'
                if(game.gameState == "pre"){
                    markup += game.network
                }else if(game.gameState == "live"){
                    markup += '<a target="_blank" href="'+game.watchLiveUrl+'">'+game.network+'</a>';
                }else if(game.Url != ''){
                    markup += '<a target="_blank" href="http://www.ncaa.com'+game.url+'/recap">Recap</a>';
                }
            markup += '</div>'
            
            markup += '<div class="team-info top '+BA.winnerClass("top",game)+'">'
                markup += '<div class="winner-arrow"></div>';
                markup += '<div class="seed">'+game.seedTop+'</div>'
                if(top_logo != ''){
                    markup += '<img class="logo" src="http://www.ncaa.com'+BA.getTeamInfo("img","top",game)+'">'
                }
                markup += '<div class="name">'+BA.getTeamInfo("team","top",game)+'</div>'
                markup += '<div class="tot-score">'+BA.getTeamInfo("score","top",game)+'</div>'
            markup += '</div>'
            markup += '<div class="team-spacer"></div>'
            markup += '<div class="team-info bottom '+BA.winnerClass("bottom",game)+'">'
                markup += '<div class="seed">'+game.seedBottom+'</div>'
                if(bot_logo != ''){
                    markup += '<img class="logo" src="http://www.ncaa.com'+bot_logo+'">'
                }
                markup += '<div class="name">'+BA.getTeamInfo("team","bottom",game)+'</div>'
                markup += '<div class="tot-score">'+BA.getTeamInfo("score","bottom",game)+'</div>'
                markup += '<div class="winner-arrow"></div>'
            markup += '</div>'

        if(wrap == "li"){
            markup += '</li>'
        }else{
            markup += '</div>'
        }

        return markup;

    };

    BA.buildLocations = function(games){

        for (var i = 0; i < games.length; i++) {
            var game = games[i];
            if(locations.indexOf(game.location) === -1 && game.location != ''){
                locations.push(game.location);
            }
        }
        //console.log(locations);
    };

    BA.getGameStateText = function(game){

        var status = ''

        if(game.gameState === "pre"){
            if(game.startTimeEpoch != ''){
                var epoch = game.startTimeEpoch,
                date = moment.unix(parseFloat(epoch));
                status = moment(date).format("MMM D - h:mm a");
            }else{
                status = 'TBA'
            }
        }else if(game.gameState === "final"){
            status = "FINAL"
        }else if(game.gameState === "live"){
            game.currentPeriod === "Halftime" ? status = game.currentPeriod : status = game.currentPeriod + ' - ' + game.timeclock
        }

        return status;

    };

    BA.winnerClass = function(loc,game){
        var wclass = ''
        if(loc == "top"){
            if(game.away.isTop === "T" && game.away.winner === "true"){
                wclass = 'winner'
            }else if(game.home.isTop === "T" && game.home.winner === "true"){
                wclass = 'winner'
            }
        }else if(loc == "bottom"){
            if(game.away.isTop === "T" && game.home.winner == "true"){
                wclass = 'winner'
            }else if(game.home.isTop === "T" && game.away.winner == "true"){
                wclass = 'winner'
            }
        }
        return wclass
    };

    BA.getTeamInfo = function(type,loc,game){
        var team = 'TBD',
            img = '',
            score = '',
            teamTop = {},
            teamBottom = {};

        if (typeof game.home !== 'undefined' || typeof game.away !== 'undefined') {
            if (typeof game.home.isTop !== 'undefined' && game.home.isTop === 'T') {
                teamTop = game.home;
                teamBottom = game.away;
            } else if (typeof game.away.isTop !== 'undefined' && game.away.isTop === 'T') {
                teamTop = game.away;
                teamBottom = game.home;
            } else if (typeof game.away.isTop !== 'undefined' && game.away.isTop === 'F') {
                teamTop = game.home;
                teamBottom = game.away;
            } else if (typeof game.home.isTop !== 'undefined' && game.home.isTop === 'F') {
                teamTop = game.away;
                teamBottom = game.home;
            } else {
                teamTop = game.away;
                teamBottom = game.home;
            }
            if(loc == "top"){
                team = (teamTop.names.short !== '') ? teamTop.names.short : 'TBD'
                img = teamTop.iconURL
                score = teamTop.score
            }else if(loc == "bottom"){
                team = (teamBottom.names.short != '') ? teamBottom.names.short : 'TBD'
                img = teamBottom.iconURL
                score = teamBottom.score
            }
        }

        switch(type){
            case "team":
                return team;
                break;
            case "img":
                return img;
                break;
            case "score":
                return score;
                break;
        }

    };

    BA.monthAsString = function(mon){
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mon];
    }

    BA.getGames();
    
})(jQuery);