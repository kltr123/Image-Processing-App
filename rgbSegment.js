var redSlider;
var greenSlider;
var blueSlider;

function redChannelSegment(img)
{
    var imgOut = createImage(img.width, img.height);
    //load image pixel values into array pixels
    imgOut.loadPixels();
    img.loadPixels();
    for(var y=0;y<img.height;y++)
    {
        for(var x=0;x<img.width;x++)
        {
            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];

            //red channel
            if(redSlider.value() > pixelRed)
                {
                    pixelRed = 0;
                }
            
            imgOut.pixels[pixelIndex+0] = pixelRed;
            imgOut.pixels[pixelIndex+1] = 0;
            imgOut.pixels[pixelIndex+2] = 0;
            imgOut.pixels[pixelIndex+3] = 255;           
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function greenChannelSegment(img)
{
    var imgOut = createImage(img.width, img.height);
    //load image pixel values into array pixels
    imgOut.loadPixels();
    img.loadPixels();
    for(var y=0;y<img.height;y++)
    {
        for(var x=0;x<img.width;x++)
        {
            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];

            //green channel 
            if(greenSlider.value() > pixelGreen)
                {
                    pixelGreen = 0;
                }
            
            imgOut.pixels[pixelIndex+0] = 0;
            imgOut.pixels[pixelIndex+1] = pixelGreen;
            imgOut.pixels[pixelIndex+2] = 0;
            imgOut.pixels[pixelIndex+3] = 255;           
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function blueChannelSegment(img)
{
    var imgOut = createImage(img.width, img.height);
    //load image pixel values into array pixels
    imgOut.loadPixels();
    img.loadPixels();
    for(var y=0;y<img.height;y++)
    {
        for(var x=0;x<img.width;x++)
        {
            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];

            //blue channel 
            if(blueSlider.value() > pixelBlue)
                {
                    pixelBlue = 0;
                }
            
            imgOut.pixels[pixelIndex+0] = 0;
            imgOut.pixels[pixelIndex+1] = 0;
            imgOut.pixels[pixelIndex+2] = pixelBlue;
            imgOut.pixels[pixelIndex+3] = 255;           
        }
    }
    imgOut.updatePixels();
    return imgOut;
}


