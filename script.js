*{
    margin: 0;padding: 0;
    box-sizing: border-box;
}
.cameraContainer{
    border: 2px solid black;
    width: 400px;
    margin:30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.cameraContainer video{
    border: 2px solid red;
    object-fit:fill;
    width: 100%;
    
}

.cameraContainer .action{
    text-align: center;
    margin:5px;
    width: 100%;
}.cameraContainer .action input{
    margin-left: 20px;
}

.Recorder{
    display: none;
}

@media (max-width:500px) {
    .cameraContainer{
        width: 100%;
    }
}
