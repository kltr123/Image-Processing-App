function greyScaleAndBrightness(img)
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

            var ave = (pixelRed + pixelGreen + pixelBlue)/3;

            var newAve = ave*1.2;
            newAve = constrain(newAve,0,255);

            //set RGB to ave value
            imgOut.pixels[pixelIndex+0] = newAve;
            imgOut.pixels[pixelIndex+1] = newAve;
            imgOut.pixels[pixelIndex+2] = newAve;
            imgOut.pixels[pixelIndex+3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
