var elmCircle = document.createElement('div');
var tmrId = null;

elmCircle.classList.add('pointer');
elmCircle.classList.add('hide');
document.body.append(elmCircle);

addEventListener('mouseout', function(){
    elmCircle.classList.add('hide');
});

addEventListener('mousemove', function(e){

    if (tmrId){
        clearTimeout(tmrId);
        tmrId = null;
    }

    tmrId = setTimeout(function(){
        elmCircle.classList.add('hide');
    }, 2000);

    if (elmCircle.classList.contains('hide')){
        elmCircle.classList.remove('hide');
    }

    var xPos = e.pageX;
    var yPos = e.pageY;

    elmCircle.style.left = xPos + "px";
    elmCircle.style.top = yPos + "px";
});