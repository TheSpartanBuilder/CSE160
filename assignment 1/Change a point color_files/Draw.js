function draw()
{
    //g_shapeList.push();

    g_shapeList = []; 
    renderAllShapes();

    /*
    let ractangle1 = new Ractangle();
    ractangle1.position[0] = 0;
    ractangle1.position[1] = -0.95 + 90/13*1/2*1/100;
    ractangle1.width = 190;
    ractangle1.height = 90/13;
    ractangle1.color = [191/225, 10/225, 48/225, 1.0];
    ractangle1.update();
    g_shapeList.push(ractangle1);

    let ractangle2 = new Ractangle();
    ractangle2.position[0] = 0;
    ractangle2.position[1] = -0.95 + 90/13*1/2*1/100 + 90/13*1/100*1;
    ractangle2.width = 190;
    ractangle2.height = 90/13;
    ractangle2.color = [1.0, 1.0, 1.0, 1.0];
    ractangle2.update();
    g_shapeList.push(ractangle2);

    let ractangle3 = new Ractangle();
    ractangle3.position[0] = 0;
    ractangle3.position[1] = -0.95 + 90/13*1/2*1/100 + 90/13*1/100*2;
    ractangle3.width = 190;
    ractangle3.height = 90/13;
    ractangle3.color = [191/225, 10/225, 48/225, 1.0];
    ractangle3.update();
    g_shapeList.push(ractangle3);
    */

    let stripWidth = 190;
    let stripeHeight = 90/13*1;
    let x_position_offset = 0;
    let y_position_offset = 0;

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