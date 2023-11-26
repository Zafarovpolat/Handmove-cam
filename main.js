let cam = document.querySelector("#cam")
let turnOn = document.querySelector("#camOn")
let turnOff = document.querySelector("#camOff")
let canvas = document.querySelector("#camResult")
let canvasContext = canvas.getContext("2d");
let result = document.querySelector(".result")

let isVideo = false;
let model = null

turnOn.addEventListener('click', () => {
    handTrack.startVideo(cam).then(function (status) {
        if (status) {
            runDetection()
        }
    })
})

turnOff.addEventListener('click', () => {
    handTrack.stopVideo(cam)
})

handTrack.load().then(lmodel => {
    model = lmodel
})

function runDetection() {
    model.detect(cam).then(predictions => {

        predictions.forEach(a => {
            if (a.class == "1" && a.score > '0.88') {
                let image = new Image();
                image.src = canvas.toDataURL();
                result.appendChild(image)
            }
        });

        model.renderPredictions(predictions, canvas, canvasContext, cam);
        requestAnimationFrame(runDetection);
    });
}