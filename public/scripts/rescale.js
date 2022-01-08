    // calculate the scaling factors to resize the image according to its real world size
    //markerSize when printing without page border = 19cm
    //markerSize when printing with standard page border = 17cm
    
    var markerSize=19;
    
    const width = document.getElementById("element-width");
    width.addEventListener("change",setScale);
    const height = document.getElementById("element-height");
    height.addEventListener("change",setScale);



    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }

    // set scale value of input field
    function setScale(){
   
        const newWidth = roundToTwo(width.value/markerSize);
        const newHeight = roundToTwo(height.value/markerSize);

        const scale = newWidth + " " + newHeight + " 1";
        document.getElementById("element-scale").value=scale;
        
    }
