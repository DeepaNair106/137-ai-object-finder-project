status ="";
video ="";
objects =[];



    

function setup(){
    canvas = createCanvas(470,300)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}



function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("input").value;

}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
   

}

function gotResult(error,results){
    if (error){
        console.log(error);
    }else
    {
        console.log(results);
        objects = results;
    }
    
}

function draw(){
    image(video,0,0,470,300);
    if(status != ""){
        objectDetector.detect(video,gotResult);

        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected ";
            

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent +"%" ,objects[i].x + 15,objects[i].y +15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(object_name == objects[i].label){
                document.getElementById("number_of_objects").innerHTML = object_name +" found";
                video.stop();
                objectDetector.detect(gotResult);
                synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
               
            }
            else{
                document.getElementById("number_of_objects").innerHTML = object_name +" not found";   
            }

        }

    }
}
