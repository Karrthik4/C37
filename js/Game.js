class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        });
    }

    update(state){
        database.ref('/').update({
            gameState:state
        });
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car2 = createSprite(300,200);
        car3 = createSprite(500,200);
        car4 = createSprite(700,200);

        cars = [car1, car2, car3, car4];
    }

    play(){
        form.hide();

        Player.getPlayerInfo();

        if(allPlayers !== undefined){
            //var display_Position = 130;

            //Index of the array
            var index = 0;

            //X and Y positions of the cars
            var x = 0;
            var y;


            for(var plr in allPlayers){
                //Add one to the index for every loop
                index = index+1;

                //Position the cars a little away from eachother in X directons
                x = x+200;

                //Use data from the database to display the cards in Y directions
                y = displayHeight - allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;

                if(index === player.index){
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            //textSize(15);
            //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_Position);
            }
        }

        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance += 50;
            player.update();
        }
        drawSprites();

    }
}