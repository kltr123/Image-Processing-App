function colorSpaceYCbCr(img)
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
            
            //display Y as red, Cb as green, Cr as  blue
            imgOut.pixels[pixelIndex+0] = ycbcr[0]; 
            imgOut.pixels[pixelIndex+1] = ycbcr[1];
            imgOut.pixels[pixelIndex+2] = ycbcr[2];
            imgOut.pixels[pixelIndex+3] = 255;         
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function rgbToYCbCr(r, g, b) 
{
    // Calculate Y (luminance) component
    var Y = (0.299 * r) + (0.587 * g) + (0.114 * b);
    //adding 128 to ensure that the Cb and Cr components are properly represented in the [0, 255] range 
    // Calculate Cb (blue difference) component
    var Cb = (-0.169 * r) - (0.331 * g) + (0.500 * b) + 128; 
    // Calculate Cr (red difference) component
    var Cr = (0.500 * r) - (0.419 * g) - (0.081 * b) + 128;
    
    return [Y, Cb, Cr];
}
