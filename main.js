
var prediction1="";
var prediction2="";


Webcam.set({
    width:300,
    height:300,
    image_format:"png",
    png_quality:90
   });
   
Webcam.attach("#camera");

function takesnap(){
    Webcam.snap(function(dataurl){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+dataurl+"'>";
        
    })
}


classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/drb7AAY5D/model.json",modelReady);

function modelReady(){
    console.log("modelReady");
}


function speak(){
    var synth=window.speechSynthesis;
    var speak_data1 = "The first predicted gesture is "+prediction1;
    var speak_data2 = "the second predicted gesture is"+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis); 
}

function compare(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
   if(error){
    console.log(error);
   }
   else {
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML = result[0].label;
    document.getElementById("result_emotion_name2").innerHTML = result[1].label;
    prediction1 = result[0].label;
    prediction2 = result[1].label;
    speak();
    if(result[0].label=="ok"){
        document.getElementById("result_emoji1").value = "&#128076;" ;
    }
    if(result[0].label=="thumps up"){
        document.getElementById("result_emoji1").value = "&#128077;" ;
    }
    if(result[0].label=="rock"){
        document.getElementById("result_emoji1").value = "&#129304;" ;
    }
    if(result[0].label=="peace"){
        document.getElementById("result_emoji1").value = " &#9996;" ;
    }
    if(result[0].label=="up"){
        document.getElementById("result_emoji1").value = " &#128070;" ;
    }

    if(result[1].label=="ok"){
        document.getElementById("result_emoji2").value = "&#128076;" ;
    }
    if(result[1].label=="thumps up"){
        document.getElementById("result_emoji2").value = "&#128077;" ;
    }
    if(result[1].label=="rock"){
        document.getElementById("result_emoji2").value = "&#129304;" ;
    }
    if(result[1].label=="peace"){
        document.getElementById("result_emoji2").value = " &#9996;" ;
    }
    if(result[1].label=="up"){
        document.getElementById("result_emoji2").value = " &#128070;" ;
    }
   }
}