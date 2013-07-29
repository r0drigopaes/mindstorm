/**
 * Created with JetBrains WebStorm.
 * User: Asus
 * Date: 7/29/13
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */

const FPS = 30;
var imgSrc = ['https://www.udacity.com/media/js/standalone/libs/gamedev_assets/robowalk/robowalk00.png',
    'https://www.udacity.com/media/js/standalone/libs/gamedev_assets/robowalk/robowalk01.png',
    'https://www.udacity.com/media/js/standalone/libs/gamedev_assets/robowalk/robowalk02.png'
];


var objs = [];
var canvas;
var ctx;

window.onload = init;


function Sprite(url, pos, size, speed, frames, dir, once) {
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
};

Sprite.prototype.update = function(dt) {
    this._index += this.speed*dt;
}

Sprite.prototype.render = function(ctx) {
    var frame;

    if(this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if(this.once && idx >= max) {
            this.done = true;
            return;
        }
    }
    else {
        frame = 0;
    }


    var x = this.pos[0];
    var y = this.pos[1];

    if(this.dir == 'vertical') {
        y += frame * this.size[1];
    }
    else {
        x += frame * this.size[0];
    }

    ctx.drawImage(resources.get(this.url),
        x, y,
        this.size[0], this.size[1],
        0, 0,
        this.size[0], this.size[1]);
}





function MyObject() {
    this.sprite;
    this.x;
    this.y;
    this.increment;

    this.xDirection = 1;
    this.yDirection = 1;


}

MyObject.prototype.updatePosition = function(){
    //console.log(this.x+ '|'+this.y+ '|'+this.increment+'|'+this.xDirection);
    this.x += this.increment * this.xDirection;
    this.y += this.increment * this.yDirection;
    if (this.x >= 450) {
        this.x = 450;
        this.xDirection = -1;
    }
    else if (this.x <= 0) {
        this.x = 0;
        this.xDirection = 1;
    }
    if (this.y >= 250) {
        this.y = 250;
        this.yDirection = -1;
    }
    else if (this.y <= 0) {
        this.y = 0;
        this.yDirection = 1;
    }
    //console.log(this.x+ '|'+this.y);
}





function init() {

    var myJson;
    var xhr = new XMLHttpRequest();
    xhr.open('GET','sprite.json',true);
    xhr.onload =  function(){
        console.log("Received: "+xhr.responseText);
        //myJson = JSON.parse(xhr.response);
        //console.log(myJson);
    };

    xhr.send();


    /*for (var sprite in myJson['sprites']){
        console.log( myJson['sprites'][sprite]);
    }
    */
/*
    // carregar imagens
    for (var i = 0; i < imgSrc.length; i++) {
        var obj = new MyObject();

        //sprite
        var sprite = new Sprite("sprite.png",)

        obj.img = new Image();
        //img.onload =funcao
        console.log(imgSrc[i]);
        obj.img.src =imgSrc[i];
        obj.x = 0;
        obj.y = 0;
        obj.increment = i + 1;
        objs.push(obj);
    }
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    setInterval(animate, 1000 / FPS);
    */
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0 ; i< objs.length; i++) {

        ctx.drawImage(objs[i].img, objs[i].x, objs[i].y);
        objs[i].updatePosition();
    }
}

