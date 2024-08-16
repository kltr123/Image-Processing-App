var detector;
var classifier = objectdetect.frontalface;
var faceImg;

function faceDetection(img)
{
    image(img, 0, 560, 160, 120);
    faceImg.copy(img, 0, 0, 160, 120, 0, 0, 160, 120);
    var faces = detector.detect(faceImg.canvas);

    for (var i=0; i<faces.length; i++)
    {
        var face = faces[i];
        if (face[4] > 4)
        {
            var newFaceImg = faceImg.get(face[0], face[1], face[2], face[3]);
            if(keyIsDown(49)) // key "1"
            {
                // Apply grayscale effect to the detected face region
                var greyScaleImg = greyScale(newFaceImg);
                // Display the grayscale image within the rect box
                image(greyScaleImg, face[0], face[1] + 560);
            }
            else if(keyIsDown(50)) // key "2"
            {
                // Apply blur effect to the detected face region
                var blurImg = blur(newFaceImg);
                // Display the blur image within the rect box
                image(blurImg, face[0], face[1] + 560);
            }
            else if(keyIsDown(51)) // key "3"
            {
                // Apply color convert effect to the detected face region using colorSpaceHSB function from task 9
                var hsvImg = colorSpaceHSV(newFaceImg);
                // Display the color converted HSB image within the rect box
                image(hsvImg, face[0], face[1] + 560);
            }
            else if(keyIsDown(52)) // key "4"
            {
                // Apply pixelate effect to the detected face region 
                var pixelateImg = pixelate(newFaceImg);
                // Display the pixelated image within the rect box
                image(pixelateImg, face[0], face[1] + 560);
            }
            else
            {
                fill(255,0,0,150);
                rect(face[0], face[1]+ 560, face[2], face[3]);
            }
        }
    }
}

function greyScale(img)
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

            //set RGB to ave value
            imgOut.pixels[pixelIndex+0] = ave;
            imgOut.pixels[pixelIndex+1] = ave;
            imgOut.pixels[pixelIndex+2] = ave;
            imgOut.pixels[pixelIndex+3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function blur(img)
{
    var radius = 5; //Blur radius

    // Create a copy of the input image
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();

    // Iterate over each pixel in the image
    for (var y = 0; y < img.height; y++) 
    {
        for (var x = 0; x < img.width; x++) 
        {
            var totalRed = 0;
            var totalGreen = 0;
            var totalBlue = 0;
            var count = 0;

            // Iterate over neighboring pixels within the blur radius
            for (var dy = -radius; dy <= radius; dy++) 
            {
                for (var dx = -radius; dx <= radius; dx++) 
                {
                    var nx = x + dx;
                    var ny = y + dy;

                    // Ensure the neighboring pixel is within the image bounds
                    if (nx >= 0 && nx < img.width && ny >= 0 && ny < img.height) 
                    {
                        var pixelIndex = (nx + ny * img.width) * 4;
                        totalRed += img.pixels[pixelIndex + 0];
                        totalGreen += img.pixels[pixelIndex + 1];
                        totalBlue += img.pixels[pixelIndex + 2];
                        count++;
                    }
                }
            }

            // Calculate the average color of neighboring pixels
            var avgRed = totalRed / count;
            var avgGreen = totalGreen / count;
            var avgBlue = totalBlue / count;

            // Set the pixel color in the output image
            var pixelIndexOut = (x + y * img.width) * 4;
            imgOut.pixels[pixelIndexOut + 0] = avgRed;
            imgOut.pixels[pixelIndexOut + 1] = avgGreen;
            imgOut.pixels[pixelIndexOut + 2] = avgBlue;
            imgOut.pixels[pixelIndexOut + 3] = 255;
        }
    }

    // Update the pixels of the output image and return it
    imgOut.updatePixels();
    return imgOut;
}

function pixelate(img) 
{
    // Define block size
    var blockSize = 5;
    var imgOut = createImage(img.width, img.height);

    // Iterate through blocks
    for (var y = 0; y < img.height; y += blockSize) 
    {
        for (var x = 0; x < img.width; x += blockSize) 
        {
            // Calculate block boundaries
            var blockLeft = x;
            var blockTop = y;
            var blockRight = min(x + blockSize, img.width);
            var blockBottom = min(y + blockSize, img.height);

            // Calculate average intensity for the block
            var totalIntensity = 0;
            var pixelCount = 0;
            for (var blockY = blockTop; blockY < blockBottom; blockY++) 
            {
                for (var blockX = blockLeft; blockX < blockRight; blockX++) 
                {
                    totalIntensity += img.get(blockX, blockY)[0]; // Grayscale value
                    pixelCount++;
                }
            }
            var averageIntensity = totalIntensity / pixelCount;

            // Set all pixels in the block to the average intensity
            for (var blockY = blockTop; blockY < blockBottom; blockY++) 
            {
                for (var blockX = blockLeft; blockX < blockRight; blockX++) 
                {
                    imgOut.set(blockX, blockY, averageIntensity);
                }
            }
        }
    }
    imgOut.updatePixels();
    return imgOut;
}






