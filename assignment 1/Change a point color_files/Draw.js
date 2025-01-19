function draw()
{
    //g_shapeList.push();

    g_shapeList = []; 
    renderAllShapes();

    let stripWidth = 190;
    let stripeHeight = 98.8/13*1;
    let x_position_offset = 0;
    let y_position_offset = 95/100*1/2;

    for(let i = 0; i < 12; i += 2)
    {
        let ractangle1 = new Ractangle();
        ractangle1.position[0] = 0 + x_position_offset;
        ractangle1.position[1] = -0.95 + stripeHeight*1/2*1/100 + stripeHeight*1/100*i + y_position_offset;
        ractangle1.width = stripWidth;
        ractangle1.height = stripeHeight;
        ractangle1.color = [191/225, 10/225, 48/225, 1.0];
        ractangle1.update();
        g_shapeList.push(ractangle1);

        let ractangle2 = new Ractangle();
        ractangle2.position[0] = 0 + x_position_offset;
        ractangle2.position[1] = -0.95 + stripeHeight*1/2*1/100 + stripeHeight*1/100*(i+1) + y_position_offset;
        ractangle2.width = stripWidth;
        ractangle2.height = stripeHeight;
        ractangle2.color = [1.0, 1.0, 1.0, 1.0];
        ractangle2.update();
        g_shapeList.push(ractangle2);
    }

    let ractangle3 = new Ractangle();
    ractangle3.position[0] = 0 + x_position_offset;
    ractangle3.position[1] = -0.95 + stripeHeight*1/2*1/100 + stripeHeight*1/100*12 + y_position_offset;
    ractangle3.width = stripWidth;
    ractangle3.height = stripeHeight;
    ractangle3.color = [191/225, 10/225, 48/225, 1.0];
    ractangle3.update();
    g_shapeList.push(ractangle3);

    let ractangle4 = new Ractangle();
    ractangle4.position[0] = -0.57;
    ractangle4.position[1] = 0.246;
    ractangle4.width = 38*2;
    ractangle4.height = 26.6*2;
    ractangle4.color = [0/225, 40/225, 104/225, 1.0];
    ractangle4.update();
    g_shapeList.push(ractangle4);


    //let firstStarX = -1.9/2+0.0633;
    //let firstStarY = 0.988/2+0.0538*(0.988);
    /*
    let tempStar = new Star();
    tempStar.position[0] = firstStarX;
    tempStar.position[1] = firstStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);
    */

    for(let i = 0; i < 4; i++)
    {
        //First line
        let currentStarX = -1.9/2+0.0633*(1);
        let currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(3);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(5);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(7);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(9);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(11);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);


        //Second line
        currentStarX = -1.9/2+0.0633*(2);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i+1);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(4);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i+1);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(6);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i+1);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(8);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i+1);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);

        currentStarX = -1.9/2+0.0633*(10);
        currentStarY = 0.988/2-0.0538*(0.988)*(0.5+2*i+1);
        tempStar = new Star();
        tempStar.position[0] = currentStarX;
        tempStar.position[1] = currentStarY;
        tempStar.color=[1.0,1.0,1.0,1.0];
        tempStar.size = 3;
        tempStar.numSide = 5;
        tempStar.update();
        g_shapeList.push(tempStar);
    }

    //Last line
    let currentStarX = -1.9/2+0.0633*(1);
    let currentStarY = 0.988/2-0.0538*(0.988)*(8.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(3);
    currentStarY = 0.988/2-0.0538*(0.988)*(8.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(5);
    currentStarY = 0.988/2-0.0538*(0.988)*(8.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(7);
    currentStarY = 0.988/2-0.0538*(0.988)*(8.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(9);
    currentStarY = 0.988/2-0.0538*(0.988)*(8.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(11);
    currentStarY = 0.988/2-0.0538*(0.988)*(8.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);


    renderAllShapes();
}


function japanFlag()
{
    let sound = new Audio("../Audio/yooo-japanese-meme-made-with-Voicemod.mp3");
    g_shapeList = []; 
    renderAllShapes();

    let widthScale = 3;
    let heightScale = 2/widthScale;
    let circleRedious = 2/widthScale*3/5;
    let ractangle1 = new Ractangle();
    ractangle1.position[0] = 0;
    ractangle1.position[1] = 0;
    ractangle1.width = 190;
    ractangle1.height = heightScale * 190;
    ractangle1.color = [1.0, 1.0, 1.0, 1.0];
    ractangle1.update();
    g_shapeList.push(ractangle1);

    let circle1 = new Circle();
    circle1.position[0] = 0;
    circle1.position[1] = 0;
    circle1.size = 75;
    circle1.color = [0.88, 0.16, 0.18, 1.0];
    circle1.segments = 70;
    g_shapeList.push(circle1);

    renderAllShapes();
    sound.play();
}

function drawStarByLine(){
    //First line
    let currentStarX = -1.9/2+0.0633*(1);
    let currentStarY = 0.988/2-0.0538*(0.988)*(0.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(3);
    currentStarY = 0.988/2-0.0538*(0.988)*(0.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(5);
    currentStarY = 0.988/2-0.0538*(0.988)*(0.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(7);
    currentStarY = 0.988/2-0.0538*(0.988)*(0.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(9);
    currentStarY = 0.988/2-0.0538*(0.988)*(0.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(11);
    currentStarY = 0.988/2-0.0538*(0.988)*(0.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);


    //Second line
    currentStarX = -1.9/2+0.0633*(2);
    currentStarY = 0.988/2-0.0538*(0.988)*(1.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(4);
    currentStarY = 0.988/2-0.0538*(0.988)*(1.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(6);
    currentStarY = 0.988/2-0.0538*(0.988)*(1.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(8);
    currentStarY = 0.988/2-0.0538*(0.988)*(1.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(10);
    currentStarY = 0.988/2-0.0538*(0.988)*(1.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);


    //Third line
    currentStarX = -1.9/2+0.0633*(1);
    currentStarY = 0.988/2-0.0538*(0.988)*(2.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(3);
    currentStarY = 0.988/2-0.0538*(0.988)*(2.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(5);
    currentStarY = 0.988/2-0.0538*(0.988)*(2.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(7);
    currentStarY = 0.988/2-0.0538*(0.988)*(2.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(9);
    currentStarY = 0.988/2-0.0538*(0.988)*(2.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);

    currentStarX = -1.9/2+0.0633*(11);
    currentStarY = 0.988/2-0.0538*(0.988)*(2.5);
    tempStar = new Star();
    tempStar.position[0] = currentStarX;
    tempStar.position[1] = currentStarY;
    tempStar.color=[1.0,1.0,1.0,1.0];
    tempStar.size = 3;
    tempStar.numSide = 5;
    tempStar.update();
    g_shapeList.push(tempStar);
}