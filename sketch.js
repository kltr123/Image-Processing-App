/*
GP COMMENTARY in main.js file
Step 8: The segmentation outcomes vary for each channel due to their unique capture of different aspects of the image's colour information. For instance, the red channel emphasizes regions with prominent red tones, while the green channel highlights areas with greenish hues. This discrepancy arises because the segmentation process relies on intensity or colour thresholds, which can differ significantly between channels owing to variations in the scene's colour distribution.

Step 11: The segmentation results from the colour -converted images show less noise compared to those obtained from RGB segmentation. This difference stems from utilizing different colour spaces and segmentation methods. In RGB images, segmentation is directly applied to the RGB channels, potentially leading to noise due to the intricate nature of colour representation. Conversely, in colour -converted images, segmentation operates within the HSV and YCbCr colour spaces, where separating colour information from hue, brightness, or luminance can reduce noise, especially in regions with fluctuating lighting conditions.
Since colour -converted images segmentation leverages the HSV and YCbCr colour spaces' characteristics, it better captures perceptual distinctions among colours and luminance levels, potentially leading to more accurate region separation, especially in scenarios with varying lighting or distinct colour regions within the image.
To potentially enhance results further, experimenting with alternative colour spaces, such as LAB (CIELAB), could be fruitful. The LAB colour space dissects colour information into three components: L (lightness), A (green-red), and B (blue-yellow). By leveraging LAB, segmentation algorithms may better account for perceptual colour differences, potentially yielding more accurate and robust segmentation outcomes compared to RGB, HSV, or YCbCr.
Throughout the project, numerous technical challenges, such as colour space conversions and image segmentation, were encountered. These required meticulous understanding and precise implementation to overcome. Through rigorous debugging and testing, most of the technical issues encountered were resolved.

Despite facing these obstacles, the project remained on track for successful completion. However, managing the project timeline and ensuring timely task completion posed ongoing challenges. Prioritizing tasks and setting realistic deadlines facilitated effective project management. Adjusting the project plan and redistributing tasks helped keep the project on course when unexpected problems arose.

Regarding the unique extension, the main focus was integrating a comprehensive GUI menu to enhance user interaction and accessibility. This was achieved by providing familiar graphical elements such as sliders, checkboxes, and dropdown menus. Additionally, the extension introduced several features, including RGB channel adjustment sliders, pixelation and background subtraction mode toggle, pixel shape selection dropdown, and colour palette selection. These features empowered users with robust tools to customize their image processing workflows and achieve desired visual effects.
For pixelation mode, users can customize pixel shapes and adjust colours based on their selections from the colour palette. The background subtraction mode allows users to observe the effect in real-time and dynamically modify its outline using the RGB channel sliders. By consolidating all functionalities into a single GUI interface, users can seamlessly navigate through different options, experiment with various settings, and visualize effects in real-time.
*/

var video;
var snapshot;

function setup() 
{
    createCanvas(900, 800);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(160,120);
    video.hide(); // Hide the video element

    var scaleFactor = 1.2;
    detector = new objectdetect.detector(160, 120, scaleFactor, classifier);
    faceImg = createImage(160, 120);
    currImg = createImage(160, 120);
    
    //create sliders 
    redSlider = createSlider(0,255,100);
    redSlider.position(0,280);
    greenSlider = createSlider(0,255,100);
    greenSlider.position(180,280);
    blueSlider = createSlider(0,255,100);
    blueSlider.position(360,280);
    hsvSlider = createSlider(0,255,100);
    hsvSlider.position(180, 560);
    ycbcrSlider = createSlider(0,255,100);
    ycbcrSlider.position(360, 560);     

    //create gui
    gui = createGui('DIY Pixel Outline');
    gui.setPosition(width - 100, 0);

    gui.addGlobals('pixelMode');
    gui.addGlobals('pixelShape');
    gui.addGlobals('pixelColor');
    gui.addGlobals('bgSubMode');
    

    sliderRange(0, 255, 1);
    gui.addGlobals('bgSubRedSlider');
    gui.addGlobals('bgSubGreenSlider');
    gui.addGlobals('bgSubBlueSlider');
    
    sliderRange(0, 50, 1);
    gui.addGlobals('thresholdSlider');

    fill(0);
    noStroke();
}

function draw()
{
    background(255);

    if (snapshot) 
    {
        // Display the snapshot image from the webcam feed
        image(snapshot, 0, 0, 160, 120);

        // Display other images based on the snapshot image
        image(greyScaleAndBrightness(snapshot), 180, 0, 160, 120); 

        image(redChannel(snapshot), 0, 140, 160, 120); 
        image(greenChannel(snapshot), 180, 140, 160, 120);
        image(blueChannel(snapshot), 360, 140, 160, 120);

        image(redChannelSegment(snapshot), 0, 280, 160, 120);
        image(greenChannelSegment(snapshot), 180, 280, 160, 120);
        image(blueChannelSegment(snapshot), 360, 280, 160, 120);

        image(snapshot, 0, 420, 160, 120);
        image(colorSpaceHSV(snapshot), 180, 420, 160, 120);
        image(colorSpaceYCbCr(snapshot), 360, 420, 160, 120);

        faceDetection(snapshot);
        image(colorSpaceHSVSegment(snapshot), 180, 560, 160, 120);
        image(colorSpaceYCbCrSegment(snapshot), 360, 560, 160, 120);

        //Unique Extension
        image(pixelOutline(video), 600, 40, 160, 120);
        image(backgroundSubtraction(video), 600, 40, 160, 120);
        copyCurrentToBackImage();
      
        
        //instruction texts
        fill("purple")
        textSize(20);
        text("Unique Extension", 600, 20);

        fill(255,0,0);
        textSize(15);
        text("If the red box did not appear at the \n bottom left faceImg,  please press \n 's' key to take another snapshot!", 550, 420);
        fill(0,0,255);
        text("Toggle pixelMode to \npixelate the image!", 600, 200);
        text("Toggle bgSubMode to show \nthe effect of background\n subtraction!", 600, 250);
        text("Press key number '1' to \n grey scale the faceImg", 550, 500);
        text("Press key number '2' to \n blur the faceImg", 550, 540);
        text("Press key number '3' to \n colour convert the faceImg", 550, 580);
        text("Press key number '4' to \n pixelate the faceImg", 550, 620);
    } 
    else 
    {
        // Display the webcam feed if no snapshot is available
        image(video, 0, 0, 160, 120);

        //instruction texts
        fill(0,0,255);
        textSize(20);
        text("Press 's' key to take a \n snapshot to proceed", 550, 350);
    }
}

function keyPressed() 
{
    // Press 's' key to take a snapshot
    if (keyCode == 83) 
    {
        // Take a snapshot by capturing the current frame from the video feed
        snapshot = video.get();
    }
}