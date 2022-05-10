var texts = [
    'Sajith dilshan',
    'Full stack software engineer',
    'Tech enthusiast'
];
var startingTimee = null;
var i = 0;
var j = 0;
var k = 0;
var elmStage = document.getElementById('stage');
var reverse = false;

function animateText(stamp){

    if (!startingTimee){
        startingTimee = stamp;
    }

    var interval = stamp - startingTimee;

    if (interval >= 70 && reverse){
        var text = texts[j];
        elmStage.innerText = text.substring(0, k--);

        if (k === 0){
            j++;
            reverse = false;

            if (j >= texts.length) j = 0;
        }
    }

    if (interval >= 150 && !reverse){
        startingTimee = stamp;

        var text = texts[j];
        elmStage.innerText = text.substring(0, i++);
        if (i > (text.length + 10)) {
            reverse = true;
            i = 0;
            k = text.length;
        }
    }

    requestAnimationFrame(animateText);

}

requestAnimationFrame(animateText);