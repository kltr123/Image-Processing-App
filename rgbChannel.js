function redChannel(img)
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
            imgOut.pixels[pixelIndex+0] = pixelRed;
            imgOut.pixels[pixelIndex+1] = 0;
            imgOut.pixels[pixelIndex+2] = 0;
            imgOut.pixels[pixelIndex+3] = 255;           
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function greenChannel(img)
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
            imgOut.pixels[pixelIndex+0] = 0;
            imgOut.pixels[pixelIndex+1] = pixelGreen;
            imgOut.pixels[pixelIndex+2] = 0;
            imgOut.pixels[pixelIndex+3] = 255;           
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function blueChannel(img)
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
            imgOut.pixels[pixelIndex+0] = 0;
            imgOut.pixels[pixelIndex+1] = 0;
            imgOut.pixels[pixelIndex+2] = pixelBlue;
            imgOut.pixels[pixelIndex+3] = 255;           
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
