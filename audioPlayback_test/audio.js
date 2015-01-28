function playSound(argSound)
{    
    var filepath='wrong.mp3'; //example

    if (argSound == 'wrong')
    {
    	console.log("wrong");
    	filepath='wrong_dis.mp3'
    }

    if (argSound == 'right')
    {
    	console.log("right");
    	filepath='right.mp3'
    }

    var audio = new Audio();   
    audio.src = filepath;
    audio.controls = true;
    audio.autoplay = true;

}