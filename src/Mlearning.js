import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import * as tmImage from '@teachablemachine/image'
import * as tmPose from '@teachablemachine/pose'
import * as tf from  "@tensorflow/tfjs"
import io from 'socket.io/client-dist/socket.io';
import './Mlearning.css'

function Mlearning() {
    const[state , setState] = useState('');
    const socket = io('http://localhost:5000');
    // const URL = "https://teachablemachine.withgoogle.com/models/UsFqrmpvY/";
    const URL = "https://teachablemachine.withgoogle.com/models/5EaCz9Cai/";
    let model, webcam, ctx, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 300;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            if(prediction[0].probability.toFixed(2) >=0.9){
                socket.emit('forward');
               var fwd = document.getElementById('text').textContent = 'Moving car forward';
            }else if(prediction[1].probability.toFixed(2) >=0.9){
                socket.emit('backward');
                document.getElementById('text').textContent = 'Moving car backward';
            }else if(prediction[2].probability.toFixed(2) >=0.9){
                socket.emit('right');
                socket.emit('on')
                document.getElementById('text').textContent = 'Moving car right';
                
            }else if(prediction[3].probability.toFixed(2) >=0.9){
                socket.emit('left');
                document.getElementById('text').textContent = 'Moving car left ';
            }else if(prediction[4].probability.toFixed(2) >=0.9){
                socket.emit('stop');
                socket.emit('off')

                document.getElementById('text').textContent = 'Stop';
            }else{
                document.getElementById('text').textContent = 'Face movement mismatched'
            }
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }
    async function stop(e){
         await webcam.pause();
         await window.cancelAnimationFrame(predict);
         await window.cancelAnimationFrame(loop);

    }
    return (
        <div className="ML">
            {/* <h4 className="h41">ultrasonic front :<input className="ult1" defaultValue="cm"></input><button className="btnS1">Turn on ultra front</button></h4>
           <h4 className="h42">ultrasonic back : <input className="ult2" defaultValue="cm"></input><button 
        //    onClick={()=> setState(()=>{
        //              console.log("UltraSonic Work")
        //             socket.on('ultrasonic', (counter , hr) => {
        //             document.getElementById('ult2').value = hr;
        //             console.log(`hello - ${counter} ${hr}`);
        //             });})}
        //             onDoubleClick={()=> {
        //                 document.getElementById('ult2').value = '';}} 
                    className="btnS2">Turn on ultra back</button></h4>                    */}
         <button className="button button1" type="button" onClick={init}>Start</button>
           <button className="button button2" type="button" onClick={stop}>Stop</button>
           <div><canvas id="canvas"></canvas></div>
            <div id="webcam-container"></div>
            <div id="label-container"></div> 
            <div id="text"></div>
            <Link to="/Menu">
            <button type="button" className="button">Back to home</button>
            </Link>
            
        </div>
    )
}

export default Mlearning
