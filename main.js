scoreleft_wrist=0;
scoreright_wrist=0;
song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
function preload(){
song=loadSound("Sub-Urban-Bella-Poarch-Inferno-mp3-song-download.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotPoses);

    
}
function draw(){
    image(video,0,0,600,500);

    fill("blue");
    stroke("blue");
    if(scoreleft_wrist>0.2){
        circle(leftwristx,leftwristy,20);
    number_leftwristy=Number(leftwristy);
    remove_decimals=floor(number_leftwristy);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
    }

   if(scoreright_wrist>0.2){
       circle(rightwristx,rightwristy,20);

       if(rightwristy>0&&rightwristy<=100){
           document.getElementById("speed").innerHTML="Speed=0.5x";
           song.rate(0.5); 
       }
       else if(rightwristy>100&&rightwristy<=200){
           document.getElementById("speed").innerHTML="Speed=1x";
           song.rate(1);
       }
       else if(rightwristy>200&&rightwristy<=300){
           document.getElementById("speed").innerHTML="Speed=1.5x";
           song.rate(1.5);
       }
       else if(rightwristy>300&&rightwristy<=400){
           document.getElementById("speed").innerHTML="Speed=2x";
           song.rate(2);
       }
       else if(rightwristy>400&&rightwristy<=500){
           document.getElementById("speed").innerHTML="Speed=2.5x";
           song.rate(2.5);
       }
   }

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function modelloaded(){
    console.log("posenet is initialized");
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("leftwristx="+leftwristx);
    console.log("leftwristy="+leftwristy);

    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("rightwristx="+rightwristx);
    console.log("rightwristy="+rightwristy);

    scoreleft_wrist=results[0].pose.keypoints[9].score;
    console.log("score_leftwrist="+scoreleft_wrist);

    scoreright_wrist=results[0].pose.keypoints[10].score;
    console.log("score_rightwrist="+scoreright_wrist);
}
}