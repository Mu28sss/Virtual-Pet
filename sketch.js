var dog,dogImg,hDogImg,database,foodS,foodStock

function preload()
{
  dogImg = loadImage("dogImg.png")
  hDogImg = loadImage("dogImg1.png")
}

function setup() {
	database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.25
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

}


function draw() {  
  background(46,139,87)
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(hDogImg);
  }

  fill("white");
  textSize(20);
  text("Food left : "+foodS,190,100)
  textSize(15)
  text("CLICK UP ARROW TO FEED YOUR DOG",105,20)
  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}