function colorSpaceHSV(img)
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

            //display hue as red, saturation as green, value as  blue
            imgOut.pixels[pixelIndex+0] = hsv[0]; 
            imgOut.pixels[pixelIndex+1] = hsv[1];
            imgOut.pixels[pixelIndex+2] = hsv[2];
            imgOut.pixels[pixelIndex+3] = 255;   
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function rgbToHSV(r, g, b)
{
    // Normalize RGB values to the range [0, 1]
    var newR = r / 255;
    var newG = g / 255;
    var newB = b / 255;

    // Find the maximum and minimum values among the new values of  r, g, and b
    var max = Math.max(newR, newG, newB);
    var min = Math.min(newR, newG, newB);
    var h, s, v = max;

    var d = max - min;

    //Calculating value of saturation
    if (max == 0) 
    {
        s = 0;
    } 
    else 
    {
        s = d / max;
    }

    if (max == min) 
    {
        h = 0; // achromatic
    } 
    else 
    {
        //determine the hue (h) component based on which color channel (r, g, or b) has the max value 
        switch (max) 
        {
            case newR:
                if (newG < newB) 
                {
                    h = (newG - newB + 6) / d;
                } 
                else 
                {
                    h = (newG - newB) / d;
                }
                break;
                
            case newG:
                h = (newB - newR) / d + 2;
                break;
                
            case newB:
                h = (newR - newG) / d + 4;
                break;
        }
        h = h / 6;
    }
    return [h * 255, s * 255, v * 255];
}
