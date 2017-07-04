function textTransform(event){
    var ctx = window.AudioContext || window.webkitAudioContext;
    var context = new ctx();
    var mediaElement=new Audio(URL.createObjectURL(event.target.files[0]));
    var sourceNode = context.createMediaElementSource(mediaElement);
    sourceNode.connect(context.destination); // connect to the speakers
    mediaElement.play()
}

