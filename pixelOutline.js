var gui;

var pixelMode = false;
var pixelShape = ["circle", "square", "triangle", "pentagon", "star"];
var pixelColor = "#441F89";

var bgSubMode = false;
var bgSubRedSlider = 0;
var bgSubGreenSlider = 0;
var bgSubBlueSlider = 0;
var thresholdSlider = 15;
var currImg;
var backImg;

function pixelOutline(img)
{
    var imgOut = createImage(img.width, img.height);
    //load image pixel values into array pixels
    imgOut.loadPixels();
    img.loadPixels();

    //display webcam feed when both pixelMode and bgSubMode are true or both are false
    if(pixelMode == bgSubMode)
    {
        for(var y=0;y<img.height;y++)
        {
            for(var x=0;x<img.width;x++)
            {
                var pixelIndex = ((img.width * y) + x)*4;
                var pixelRed = img.pixels[pixelIndex + 0];
                var pixelGreen = img.pixels[pixelIndex + 1];
                var pixelBlue = img.pixels[pixelIndex + 2];

                imgOut.pixels[pixelIndex+0] = pixelRed;
                imgOut.pixels[pixelIndex+1] = pixelGreen;
                imgOut.pixels[pixelIndex+2] = pixelBlue;
                imgOut.pixels[pixelIndex+3] = 255;           
            }
        }
    }

    if(pixelMode && !bgSubMode)
    {
        push();
        var stepSize = 6;
        translate(600, 40);
        for (var y=0;y<img.height;y+=stepSize) 
        {
            for (var x=0;x<img.width;x+=stepSize) 
            {
                var i = y * img.width + x;
                var j = (255 - img.pixels[i * 4]) / 255;
                var radius = stepSize * j;
                fill(pixelColor);
                shapeSelection(x, y, radius);
            }
        }
        pop();
    }
    imgOut.updatePixels();
    return imgOut;
}

function shapeSelection(x, y, radius)
{
    switch(pixelShape)
    {
        case "circle":
            ellipse(x, y, radius, radius);
            break;
        case"square":
            rectMode(CENTER);
            rect(x,y,radius,radius);
            break;

        case"triangle":
            beginShape();
            for(var i = 0; i < 3; i++) 
            {
                var angle = TWO_PI / 3 * i;
                var px = x + sin(angle) * radius ;
                var py = y - cos(angle) * radius ;
                vertex(px, py);
            }
            endShape(CLOSE);
            break;

        case"pentagon":
            beginShape();
            for(var i = 0; i < 6; i++) 
            {
                var angle = TWO_PI / 6 * i;
                var px = x + sin(angle) * radius*0.8 ;
                var py = y - cos(angle) * radius*0.8 ;
                vertex(px, py);
            }
            endShape(CLOSE);
            break;
        case "star":
            var angle = TWO_PI / 5;
            beginShape();
            for (var i = 0; i < TWO_PI; i += angle)
            {
                var starX = x + cos(i) * radius*1.1;
                var starY = y + sin(i) * radius*1.1;
                vertex(starX, starY);
                starX = x + cos(i + angle/2) * radius*0.4;
                starY = y + sin(i + angle/2) * radius*0.4;
                vertex(starX, starY);
            }
            endShape();
            break;
    }
}

//reference from coursera
function backgroundSubtraction(img)
{
    image(img, 0, 0, 160, 120);
    currImg.copy(img, 0, 0, 160, 120, 0, 0, 160, 120);

    var diffImg = createImage(img.width, img.height);
    diffImg.loadPixels();
    if (backImg && bgSubMode && !pixelMode) 
    {
        backImg.loadPixels();
        currImg.loadPixels();
        for (var y=0;y<currImg.height;y++) 
        {
            for (var x=0;x<currImg.width;x++) 
            {
                var pixelIndex = ((currImg.width * y) + x)*4;
                var pixelRed = currImg.pixels[pixelIndex + 0];
                var pixelGreen = currImg.pixels[pixelIndex + 1];
                var pixelBlue = currImg.pixels[pixelIndex + 2];

                var redBack = backImg.pixels[pixelIndex + 0];
                var greenBack = backImg.pixels[pixelIndex + 1];
                var blueBack = backImg.pixels[pixelIndex + 2];

                var d = dist(pixelRed,pixelGreen,pixelBlue,  redBack,greenBack,blueBack);

                if(d > thresholdSlider)
                {
                    diffImg.pixels[pixelIndex + 0] = bgSubRedSlider;
                    diffImg.pixels[pixelIndex + 1] = bgSubGreenSlider;
                    diffImg.pixels[pixelIndex + 2] = bgSubBlueSlider;
                    diffImg.pixels[pixelIndex + 3] = 255;
                }
                else
                {
                    diffImg.pixels[pixelIndex + 0] = 255;
                    diffImg.pixels[pixelIndex + 1] = 255;
                    diffImg.pixels[pixelIndex + 2] = 255;
                    diffImg.pixels[pixelIndex + 3] = 0;
                }
            }
        }
    }
    diffImg.updatePixels();
    return diffImg;
}

function copyCurrentToBackImage()
{
    backImg = createImage(currImg.width, currImg.height);
    backImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, currImg.width, currImg.height);
}


