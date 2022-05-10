var particles = [];
var mouseX = null;
var mouseY = null;

addEventListener('mousemove', function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
});

function Particle(){

    var elm = document.createElement('div');
    elm.style.position = 'absolute';

    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a = Math.sin(Math.floor(Math.random() * 91) * (Math.PI / 180));
    elm.style.backgroundColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    var angle = Math.floor(Math.random() * 361);
    var scale = Math.random() * 2;
    elm.style.transform = 'rotate(' + angle + 'deg) scale(' +  scale +')';

    elm.style.borderRadius = (Math.floor(Math.random() * 101)) + '%';
    elm.style.width = '25px'
    elm.style.height = '25px';
    elm.style.left = (Math.random() * (innerWidth - 25)) + "px";
    elm.style.top = (Math.random() * (innerHeight - 25)) + "px";

    document.body.append(elm);

    this.divElm = elm;
    this.dx = (5 + (Math.random() * 5)) * (Math.round(Math.random()) * 2  - 1);
    this.dy = (5 + (Math.random() * 5)) * (Math.random() > 0.5 ? 1 : -1) ;
}

Particle.prototype.move = function(){

    var xPos  = this.divElm.offsetLeft + this.dx;
    var yPos  = this.divElm.offsetTop + this.dy;

    if ((yPos + this.divElm.offsetHeight) > innerHeight){
        yPos = innerHeight - this.divElm.offsetHeight;
        this.dy = -this.dy;
    }

    if (yPos < 0){
        yPos = 0;
        this.dy = -this.dy;
    }

    if ((xPos + this.divElm.offsetWidth) > innerWidth){
        xPos = innerWidth  - this.divElm.offsetWidth;
        this.dx = -this.dx;
    }

    if (xPos < 0){
        xPos = 0;
        this.dx = -this.dx;
    }

    var xElmCenter = xPos + this.divElm.offsetWidth / 2;
    var yElmCenter = yPos + this.divElm.offsetHeight / 2;

    var elmRadius = Math.hypot(this.divElm.offsetWidth / 2,
        this.divElm.offsetHeight / 2);

    var pointerRadius = 70;

    var xDiff = xElmCenter - mouseX;
    var yDiff = yElmCenter - mouseY;
    var distance = Math.hypot(xDiff, yDiff);
    var hide = document.getElementsByClassName('pointer')[0].classList.contains('hide');

    if (distance <= pointerRadius  + elmRadius && !hide){

        var r = pointerRadius + elmRadius + 1;
        var slope = yDiff / xDiff;
        var angle = Math.atan(slope);

        var translateY = r * Math.sin(angle);
        var translateX = r * Math.cos(angle);

        if (xDiff < 0 && yDiff < 0){
            this.dx = -Math.abs(this.dx);
            this.dy = -Math.abs(this.dy);
            xPos = mouseX - translateX - this.divElm.offsetWidth / 2;
            yPos = mouseY - translateY - this.divElm.offsetHeight / 2;
        }else if (xDiff > 0 && yDiff < 0){
            this.dx = Math.abs(this.dx);
            this.dy = -Math.abs(this.dy);
            xPos = mouseX  + translateX - this.divElm.offsetWidth / 2;
            yPos = mouseY + translateY - this.divElm.offsetHeight / 2;
        }else if(xDiff > 0 & yDiff > 0){
            this.dx = Math.abs(this.dx);
            this.dy = Math.abs(this.dy);
            xPos = mouseX + translateX - this.divElm.offsetWidth / 2;
            yPos = mouseY + translateY - this.divElm.offsetHeight / 2;
        }else{
            this.dx = -Math.abs(this.dx);
            this.dy = Math.abs(this.dy);
            xPos = mouseX - translateX - this.divElm.offsetWidth / 2;
            yPos = mouseY - translateY - this.divElm.offsetHeight / 2;
        }

    }

    this.divElm.style.left = xPos + "px";
    this.divElm.style.top = yPos + "px";
}

for(var i = 0; i < 75; i++){
    particles.push(new Particle());
}

var startingTime = null;

function animateParticles(stamp){

    if (!startingTime){
        startingTime = stamp;
    }

    var interval = stamp - startingTime;

    if (interval >= 30){
        startingTime = stamp;

        for(var i = 0; i < particles.length; i++){
            particles[i].move();
        }
    }

    requestAnimationFrame(animateParticles);

}

requestAnimationFrame(animateParticles);