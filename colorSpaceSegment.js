var hsvSlider;
var ycbcrSlider;

function colorSpaceHSVSegment(img)
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

            var hsv = rgbToHSV(pixelRed, pixelGreen, pixelBlue);

            // Segment the image to check for hue so that pixel falls within skin tone range
            if(hsvSlider.value() > hsv[0])
            {
                //display hue as red, saturation as green, value as blue
                // Skin pixel
                imgOut.pixels[pixelIndex] = hsv[0];
                imgOut.pixels[pixelIndex + 1] = hsv[1];
                imgOut.pixels[pixelIndex + 2] = hsv[2];
                imgOut.pixels[pixelIndex + 3] = 255;
            }
            else 
            {
                // Non-skin pixel
                imgOut.pixels[pixelIndex] = 255;
                imgOut.pixels[pixelIndex + 1] = 255;
                imgOut.pixels[pixelIndex + 2] = 255;
                imgOut.pixels[pixelIndex + 3] = 0;
            }
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function colorSpaceYCbCrSegment(img)
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

            var ycbcr = rgbToYCbCr(pixelRed, pixelGreen, pixelBlue);


            // Segment the image to check for Y so that pixel falls within skin tone range
            if (ycbcrSlider.value() > ycbcr[0]) 
            {
                //display hue as red, saturation as green, value as blue
                // Skin pixel
                imgOut.pixels[pixelIndex] = ycbcr[0];
                imgOut.pixels[pixelIndex + 1] = ycbcr[1];
                imgOut.pixels[pixelIndex + 2] = ycbcr[2];
                imgOut.pixels[pixelIndex + 3] = 255;
            } 
            else 
            {
                // Non-skin pixel
                imgOut.pixels[pixelIndex] = 255;
                imgOut.pixels[pixelIndex + 1] = 255;
                imgOut.pixels[pixelIndex + 2] = 255;
                imgOut.pixels[pixelIndex + 3] = 0;
            }
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
