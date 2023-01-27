musica = "";

pulsoEsqX = 0;
pulsoEsqY = 0;

pulsoDirX = 0;
pulsoDirY = 0;

function preload(){
    musica = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, modelLoaded);
    pose.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    stroke("#ffff00");
    fill("#ffff00");
    circle(pulsoEsqX, pulsoEsqY, 25);

    esquerdo = Number(pulsoEsqY);
    pulsoEsq = floor(esquerdo);
    volume = pulsoEsq / 500;

    document.getElementById("vol").innerHTML = "Volume da música: " + volume;

    musica = setVolume(volume);
}

function tocar(){
    musica.play();

    musica.setVolume(0.5);
    musica.rate(1);
}

function modelLoaded(){
    console.log("O modelo foi carregado");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        pulsoDirX = results[0].pose.rightWrist.x;
        pulsoDirY = results[0].pose.rightWrist.y;

        pulsoEsqX = results[0].pose.leftWrist.x;
        pulsoEsqY = results[0].pose.leftWrist.y;
        
        console.log(pulsoDirX, pulsoDirY, pulsoEsqX, pulsoEsqY);
    }
}
