class Tom {
    constructor() {
        this.type = "tom";

        // Color
        this.darkGray = [0.35,0.35,0.35,1];
        this.lightGray = [0.45,0.45,0.45,1];
        this.feetColor = [0.85,0.85,0.85,1];
        this.handColor = this.feetColor;
        this.tailColor = [0.42,0.42,0.42,1];
        this.tailTipColor = [1.0,1.0,1.0,1];
        this.mouthColor = this.feetColor;
        this.noseColor = [0.1,0.1,0.1,1];
        this.eyeColor = [1.0, 0.85, 0.3,1];
        this.pupilColor = [0,0,0,1];
        this.pupilOutsideColor = [99/255, 178/255, 75/255,1];
        this.whiskerColor = [0,0,0,1];
        this.earColor = this.lightGray;
        this.innerEarColor = [1.0, 0.6, 0.7,1];

        // Size 
        this.legUpDimention = [0.12,0.3,0.13];
        this.feetSize = [0.16,0.08,0.2];
        this.handSize = [0.15,0.15,0.15];
        this.mouthSize = [0.30,0.14,0.1];
        this.legDownDimention = this.legUpDimention;
        this.armUpDimention = this.legUpDimention;
        this.tailSize = [0.2,0.2,0.2];
        this.headSize = [0.35,0.35,0.35];
        this.noseSize = [0.1,0.05,0.05];
        this.eyeSize = [0.08,0.16,0.05];
        this.pupilSize = [0.05,0.07,0.05];
        this.pupilOutsideSize = [0.06,0.1,0.05];
        this.whiskerSize = [0.01,0.2,0.01];
        this.earSize = [0.6,0.7,0.1];
        this.innerEarSize = [0.3,0.3,0.1];
    }

    render() {
        let body = new Cube();
        body.color = this.darkGray.slice();
        body.matrix.scale(0.25,0.45,0.2);
        body.matrix.translate(-.50,-.45,0);
        let bodyMatrix = new Matrix4(body.matrix);
        body.render();

        let outerBody = new Cube();
        outerBody.color = this.lightGray.slice();
        outerBody.matrix = new Matrix4(bodyMatrix);
        outerBody.matrix.scale(1.2,1.2,1.2);
        outerBody.matrix.translate(-0.08,-0.08,0.1);
        outerBody.render();

        

        // Left leg component
        let leftLegUp = new Cube();
        leftLegUp.color = this.lightGray.slice();
        // leftLegUp.matrix.scale(0.12,0.35,0.13);
        // leftLegUp.matrix.setTranslate(-0.15,-0.45,0.07);
        // leftLegUp.matrix.setTranslate(-0.14,-0.4,0.2);
        leftLegUp.matrix.setTranslate(-0.14,-0.2,0.07);
        leftLegUp.matrix.rotate(g_leftUpperLegAngle,1,0,0);
        //eftLegUp.matrix.scale(0.12,0.3,0.13);
        let letUpLegMatrix = new Matrix4(leftLegUp.matrix);
        leftLegUp.matrix.scale(1,-1,1);
        matrixScaleMass(leftLegUp.matrix, this.legUpDimention)
        // let letUpLegMatrix = new Matrix4(leftLegUp.matrix);
        leftLegUp.render();

        let leftLegDown = new Cube();
        leftLegDown.color = this.lightGray.slice();
        // leftLegDown.matrix.translate(0,-0.8,0);
        leftLegDown.matrix = new Matrix4(letUpLegMatrix);
        // leftLegDown.matrix.multiply(letUpLegMatrix);
        leftLegDown.matrix.scale(1,-1,1);
        leftLegDown.matrix.translate(0,0.3,0);
        leftLegDown.matrix.rotate(g_leftLowerLegSlideAngle,1,0,0);
        let leftDownMatrix = new Matrix4(leftLegDown.matrix);
        matrixScaleMass(leftLegDown.matrix,this.legDownDimention);
        leftLegDown.render();

        let leftFeet = new Cube();
        leftFeet.color = this.feetColor.slice();
        leftFeet.matrix = new Matrix4(leftDownMatrix);
        leftFeet.matrix.scale(1,1,-1);
        leftFeet.matrix.translate(-0.02,0.29,-0.15);
        leftFeet.matrix.rotate(g_leftFeetSlideAngle,1,0,0);
        matrixScaleMass(leftFeet.matrix,this.feetSize);
        leftFeet.render();


        
        // Right Leg compoment
        let rightLegUp = new Cube();
        rightLegUp.color = this.lightGray.slice();
        rightLegUp.matrix.setTranslate(0.02,-0.2,0.07);
        rightLegUp.matrix.rotate(g_rightUpperLegAngle,1,0,0);
        let rightUpLegMatrix = new Matrix4(rightLegUp.matrix);
        rightLegUp.matrix.scale(1,-1,1);
        matrixScaleMass(rightLegUp.matrix, this.legUpDimention)
        rightLegUp.render();

        let rightLegDown = new Cube();
        rightLegDown.color = this.lightGray.slice();
        rightLegDown.matrix = new Matrix4(rightUpLegMatrix);
        rightLegDown.matrix.scale(1,-1,1);
        rightLegDown.matrix.translate(0,0.3,0);
        rightLegDown.matrix.rotate(g_rightLowerLegSlideAngle,1,0,0);
        let rightDownMatrix = new Matrix4(rightLegDown.matrix);
        matrixScaleMass(rightLegDown.matrix,this.legDownDimention);
        rightLegDown.render();

        let rightFeet = new Cube();
        rightFeet.color = this.feetColor.slice();
        rightFeet.matrix = new Matrix4(rightDownMatrix);
        rightFeet.matrix.scale(1,1,-1);
        rightFeet.matrix.translate(-0.02,0.29,-0.15);
        rightFeet.matrix.rotate(g_rightFeetSlideAngle,1,0,0);
        matrixScaleMass(rightFeet.matrix,this.feetSize);
        rightFeet.render();


        
        // Left arm compoment
        let leftArmUp = new Cube();
        leftArmUp.color = this.lightGray;
        leftArmUp.matrix.setTranslate(-0.265,0.2,0.07);
        leftArmUp.matrix.rotate(g_leftUpperArmSlideAngle,1,0,0);
        let leftArmUpMatrix = new Matrix4(leftArmUp.matrix);
        leftArmUp.matrix.scale(1,-1,1);
        matrixScaleMass(leftArmUp.matrix, this.armUpDimention)
        leftArmUp.render();

        let leftArmDown = new Cube();
        leftArmDown.color = this.lightGray.slice();
        // leftLegDown.matrix.translate(0,-0.8,0);
        leftArmDown.matrix = new Matrix4(leftArmUpMatrix);
        // leftLegDown.matrix.multiply(letUpLegMatrix);
        leftArmDown.matrix.scale(1,-1,1);
        leftArmDown.matrix.translate(0,0.25,0);
        leftArmDown.matrix.rotate(-g_leftLowerArmSlideAngle,1,0,0);
        let leftArmDownMatrix = new Matrix4(leftArmDown.matrix);
        matrixScaleMass(leftArmDown.matrix,this.armUpDimention);
        leftArmDown.render();

        let leftHand = new Cube();
        leftHand.color = this.handColor.slice();
        leftHand.matrix = new Matrix4(leftArmDownMatrix);
        leftHand.matrix.scale(1,1,-1);
        leftHand.matrix.translate(-0.02,0.29,-0.14);
        leftHand.matrix.rotate(g_leftHandSlideAngle,1,0,0);
        matrixScaleMass(leftHand.matrix,this.handSize);
        leftHand.render();



        // Right arm component
        let rightArmUp = new Cube();
        rightArmUp.color = this.lightGray;
        rightArmUp.matrix.setTranslate(0.15,0.2,0.07);
        rightArmUp.matrix.rotate(g_rightUpperArmSlideAngle,1,0,0);
        let rightArmUpMatrix = new Matrix4(rightArmUp.matrix);
        rightArmUp.matrix.scale(1,-1,1);
        matrixScaleMass(rightArmUp.matrix, this.armUpDimention)
        rightArmUp.render();

        let rightArmDown = new Cube();
        rightArmDown.color = this.lightGray.slice();
        // leftLegDown.matrix.translate(0,-0.8,0);
        rightArmDown.matrix = new Matrix4(rightArmUpMatrix);
        // leftLegDown.matrix.multiply(letUpLegMatrix);
        rightArmDown.matrix.scale(1,-1,1);
        rightArmDown.matrix.translate(0,0.25,0);
        rightArmDown.matrix.rotate(-g_rightLowerArmSlideAngle,1,0,0);
        let rightArmDownMatrix = new Matrix4(rightArmDown.matrix);
        matrixScaleMass(rightArmDown.matrix,this.armUpDimention);
        rightArmDown.render();

        let rightHand = new Cube();
        rightHand.color = this.handColor.slice();
        rightHand.matrix = new Matrix4(rightArmDownMatrix);
        rightHand.matrix.scale(1,1,-1);
        rightHand.matrix.translate(-0.02,0.29,-0.14);
        rightHand.matrix.rotate(g_rightHandSlideAngle,1,0,0);
        matrixScaleMass(rightHand.matrix,this.handSize);
        rightHand.render();



        // Tail
        let firstTail = new Cylinder();
        firstTail.color = this.tailColor.slice();
        firstTail.matrix.translate(0,-0.15,0.23);
        firstTail.matrix.rotate(45,1,0,0);
        matrixScaleMass(firstTail.matrix,this.tailSize);
        let firstTailMatrix = new Matrix4(firstTail.matrix);
        firstTail.render();

        let secondTail = new Cylinder();
        secondTail.color = this.tailColor.slice();
        secondTail.matrix = new Matrix4(firstTailMatrix);
        secondTail.matrix.translate(0,0,0.3);
        secondTail.matrix.rotate(-15,1,0,0);
        secondTail.matrix.scale(0.8,0.8,1);
        let secondTailMatrix = new Matrix4(secondTail.matrix);
        secondTail.render();

        let thirdTail = new Cylinder();
        thirdTail.color = this.tailColor.slice();
        thirdTail.matrix = new Matrix4(secondTailMatrix);
        thirdTail.matrix.translate(0,0,0.3);
        thirdTail.matrix.rotate(-15,1,0,0);
        thirdTail.matrix.scale(0.8,0.8,1);
        let thirdTailMatrix = new Matrix4(thirdTail.matrix);
        thirdTail.render();

        let forthTail = new Cylinder();
        forthTail.color = this.tailColor.slice();
        forthTail.matrix = new Matrix4(thirdTailMatrix);
        forthTail.matrix.translate(0,0,0.3);
        forthTail.matrix.rotate(15,1,0,0);
        forthTail.matrix.scale(0.8,0.8,1);
        let forthTailMatrix = new Matrix4(forthTail.matrix);
        forthTail.render();

        let fithTail = new Cylinder();
        fithTail.color = this.tailColor.slice();
        fithTail.matrix = new Matrix4(forthTailMatrix);
        fithTail.matrix.translate(0,0,0.3);
        fithTail.matrix.rotate(15,1,0,0);
        fithTail.matrix.scale(0.8,0.8,1);
        let fithTailMatrix = new Matrix4(fithTail.matrix);
        fithTail.render();

        let sixthTail = new Cylinder();
        sixthTail.color = this.tailTipColor.slice();
        sixthTail.matrix = new Matrix4(fithTailMatrix);
        sixthTail.matrix.translate(0,0,0.3);
        sixthTail.matrix.rotate(15,1,0,0);
        sixthTail.matrix.scale(0.8,0.8,1);
        sixthTail.render();



        // Head component
        let head = new Cube();
        head.color = this.lightGray;
        head.matrix.translate(-0.17,0.29,-0.03);
        head.matrix.rotate(g_headXSlideAngle,1,0,0);
        head.matrix.rotate(g_headYSlideAngle,0,1,0);
        let headMatrix = new Matrix4(head.matrix);
        matrixScaleMass(head.matrix,this.headSize);
        head.render();

        let mouth = new Cube();
        mouth.matrix = new Matrix4(headMatrix);
        mouth.matrix.translate(0.025,-0.02,-0.02);
        matrixScaleMass(mouth.matrix,this.mouthSize);
        mouth.color = this.mouthColor;
        // matrixScaleMass(mouth.matrix,this.mouthSize);
        mouth.render();

        let nose = new Cube();
        nose.color = this.noseColor;
        nose.matrix = new Matrix4(headMatrix);
        nose.matrix.translate(0.12,0.05,-0.05);
        matrixScaleMass(nose.matrix,this.noseSize);
        nose.render();

        let leftEye = new Cube();
        leftEye.color = this.eyeColor;
        leftEye.matrix = new Matrix4(headMatrix);
        leftEye.matrix.translate(0.07,0.13,-0.02);
        matrixScaleMass(leftEye.matrix,this.eyeSize);
        leftEye.render();

        let leftPupilOutside = new Cube();
        leftPupilOutside.color = this.pupilOutsideColor;
        leftPupilOutside.matrix = new Matrix4(headMatrix);
        leftPupilOutside.matrix.translate(0.09,0.13,-0.03);
        matrixScaleMass(leftPupilOutside.matrix,this.pupilOutsideSize);
        leftPupilOutside.render();

        let leftPupil = new Cube();
        leftPupil.color = this.pupilColor;
        leftPupil.matrix = new Matrix4(headMatrix);
        leftPupil.matrix.translate(0.095,0.135,-0.04);
        matrixScaleMass(leftPupil.matrix,this.pupilSize);
        leftPupil.render();

        let rightEye = new Cube();
        rightEye.color = this.eyeColor;
        rightEye.matrix = new Matrix4(headMatrix);
        rightEye.matrix.translate(0.195,0.13,-0.02);
        matrixScaleMass(rightEye.matrix,this.eyeSize);
        rightEye.render();

        let rightPupilOutside = new Cube();
        rightPupilOutside.color = this.pupilOutsideColor;
        rightPupilOutside.matrix = new Matrix4(headMatrix);
        rightPupilOutside.matrix.translate(0.195,0.13,-0.03);
        matrixScaleMass(rightPupilOutside.matrix,this.pupilOutsideSize);
        rightPupilOutside.render();

        let rightPupil = new Cube();
        rightPupil.color = this.pupilColor;
        rightPupil.matrix = new Matrix4(headMatrix);
        rightPupil.matrix.translate(0.2,0.135,-0.04);
        matrixScaleMass(rightPupil.matrix,this.pupilSize);
        rightPupil.render();



        // whiskers
        let firstLeftWhisker = new Cube();
        firstLeftWhisker.color = this.whiskerColor;
        firstLeftWhisker.matrix = new Matrix4(headMatrix);
        firstLeftWhisker.matrix.translate(0.1,0.05,-0.03);
        firstLeftWhisker.matrix.rotate(70,0,0,1);
        matrixScaleMass(firstLeftWhisker.matrix,this.whiskerSize);
        firstLeftWhisker.render();

        let secondLeftWhisker = new Cube();
        secondLeftWhisker.color = this.whiskerColor;
        secondLeftWhisker.matrix = new Matrix4(headMatrix);
        secondLeftWhisker.matrix.translate(0.1,0.05,-0.03);
        secondLeftWhisker.matrix.rotate(90,0,0,1);
        matrixScaleMass(secondLeftWhisker.matrix,this.whiskerSize);
        secondLeftWhisker.render();

        let thirdLeftWhisker = new Cube();
        thirdLeftWhisker.color = this.whiskerColor;
        thirdLeftWhisker.matrix = new Matrix4(headMatrix);
        thirdLeftWhisker.matrix.translate(0.1,0.05,-0.03);
        thirdLeftWhisker.matrix.rotate(110,0,0,1);
        matrixScaleMass(thirdLeftWhisker.matrix,this.whiskerSize);
        thirdLeftWhisker.render();

        let firstRightWhisker = new Cube();
        firstRightWhisker.color = this.whiskerColor;
        firstRightWhisker.matrix = new Matrix4(headMatrix);
        firstRightWhisker.matrix.translate(0.25,0.06,-0.03);
        firstRightWhisker.matrix.rotate(250,0,0,1);
        matrixScaleMass(firstRightWhisker.matrix,this.whiskerSize);
        firstRightWhisker.render();

        let secondRighWhisker = new Cube();
        secondRighWhisker.color = this.whiskerColor;
        secondRighWhisker.matrix = new Matrix4(headMatrix);
        secondRighWhisker.matrix.translate(0.25,0.06,-0.03);
        secondRighWhisker.matrix.rotate(270,0,0,1);
        matrixScaleMass(secondRighWhisker.matrix,this.whiskerSize);
        secondRighWhisker.render();

        let thirdRightWhisker = new Cube();
        thirdRightWhisker.color = this.whiskerColor;
        thirdRightWhisker.matrix = new Matrix4(headMatrix);
        thirdRightWhisker.matrix.translate(0.25,0.06,-0.03);
        thirdRightWhisker.matrix.rotate(290,0,0,1);
        matrixScaleMass(thirdRightWhisker.matrix,this.whiskerSize);
        thirdRightWhisker.render();

        let leftEar = new TriangularPrism();
        leftEar.color = this.earColor;
        leftEar.matrix = new Matrix4(headMatrix);
        leftEar.matrix.translate(0.023,0.323,0.2);
        leftEar.matrix.rotate(18,0,0,1);
        matrixScaleMass(leftEar.matrix,this.earSize);
        leftEar.render();

        let leftInnerEar = new TriangularPrism();
        leftInnerEar.color = this.innerEarColor;
        leftInnerEar.matrix = new Matrix4(headMatrix);
        leftInnerEar.matrix.translate(0.015,0.33,0.17);
        leftInnerEar.matrix.rotate(18,0,0,1);
        matrixScaleMass(leftInnerEar.matrix,this.innerEarSize);
        leftInnerEar.render();

        let rightEar = new TriangularPrism();
        rightEar.color = this.earColor;
        rightEar.matrix = new Matrix4(headMatrix);
        rightEar.matrix.translate(0.33,0.323,0.2);
        rightEar.matrix.rotate(360-18,0,0,1);
        matrixScaleMass(rightEar.matrix,this.earSize);
        rightEar.matrix.scale(-1,1,1);
        rightEar.render();

        let rightInnerEar = new TriangularPrism();
        rightInnerEar.color = this.innerEarColor;
        rightInnerEar.matrix = new Matrix4(headMatrix);
        rightInnerEar.matrix.translate(0.335,0.33,0.17);
        rightInnerEar.matrix.rotate(360-18,0,0,1);
        matrixScaleMass(rightInnerEar.matrix,this.innerEarSize);
        rightInnerEar.matrix.scale(-1,1,1);
        rightInnerEar.render();
    }
}

function matrixScaleMass(matrix,value) {
    matrix.scale(value[0],value[1],value[2]);
}