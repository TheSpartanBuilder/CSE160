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

        // Setting objects
        this.body = new Cube();
        this.outerBody = new Cube();
        this.leftLegUp = new Cube();
        this.leftLegDown = new Cube();
        this.leftFeet = new Cube();
        this.rightLegUp = new Cube();
        this.rightLegDown = new Cube();
        this.rightFeet = new Cube();
        this.leftArmUp = new Cube();
        this.leftArmDown = new Cube();
        this.leftHand = new Cube();
        this.rightArmUp = new Cube();
        this.rightArmDown = new Cube();
        this.rightHand = new Cube();
        this.firstTail = new Cylinder();
        this.secondTail = new Cylinder();
        this.thirdTail = new Cylinder();
        this.forthTail = new Cylinder();
        this.fithTail = new Cylinder();
        this.sixthTail = new Cylinder();
        this.head = new Cube();
        this.mouth = new Cube();
        this.nose = new Cube();
        this.leftEye = new Cube();
        this.leftPupilOutside = new Cube();
        this.leftPupil = new Cube();
        this.rightEye = new Cube();
        this.rightPupilOutside = new Cube();
        this.rightPupil = new Cube();
        this.firstLeftWhisker = new Cube();
        this.secondLeftWhisker = new Cube();
        this.thirdLeftWhisker = new Cube();
        this.firstRightWhisker = new Cube();
        this.secondRighWhisker = new Cube();
        this.thirdRightWhisker = new Cube();
        this.leftEar = new TriangularPrism();
        this.leftInnerEar = new TriangularPrism();
        this.rightEar = new TriangularPrism();
        this.rightInnerEar = new TriangularPrism();
    }

    render() {
        this.body.color = this.darkGray.slice();
        this.body.matrix.scale(0.25,0.45,0.2);
        this.body.matrix.translate(-.50,-.45,0);
        let bodyMatrix = new Matrix4(this.body.matrix);
        this.body.render();

        this.outerBody.color = this.lightGray.slice();
        this.outerBody.matrix = new Matrix4(bodyMatrix);
        this.outerBody.matrix.scale(1.2,1.2,1.2);
        this.outerBody.matrix.translate(-0.08,-0.08,0.1);
        this.outerBody.render();

        

        // Left leg component
        // let leftLegUp = new Cube();
        this.leftLegUp.matrix.setIdentity();
        this.leftLegUp.color = this.lightGray.slice();
        this.leftLegUp.matrix.setTranslate(-0.14,-0.2,0.07);
        this.leftLegUp.matrix.rotate(g_leftUpperLegAngle,1,0,0);
        //eftLegUp.matrix.scale(0.12,0.3,0.13);
        let letUpLegMatrix = new Matrix4(this.leftLegUp.matrix);
        this.leftLegUp.matrix.scale(1,-1,1);
        matrixScaleMass(this.leftLegUp.matrix, this.legUpDimention)
        // let letUpLegMatrix = new Matrix4(leftLegUp.matrix);
        this.leftLegUp.render();

        // let leftLegDown = new Cube();
        this.leftLegDown.color = this.lightGray.slice();
        // leftLegDown.matrix.translate(0,-0.8,0);
        this.leftLegDown.matrix = new Matrix4(letUpLegMatrix);
        // leftLegDown.matrix.multiply(letUpLegMatrix);
        this.leftLegDown.matrix.scale(1,-1,1);
        this.leftLegDown.matrix.translate(0,0.3,0);
        this.leftLegDown.matrix.rotate(g_leftLowerLegSlideAngle,1,0,0);
        let leftDownMatrix = new Matrix4(this.leftLegDown.matrix);
        matrixScaleMass(this.leftLegDown.matrix,this.legDownDimention);
        this.leftLegDown.render();

        // let leftFeet = new Cube();
        this.leftFeet.color = this.feetColor.slice();
        this.leftFeet.matrix = new Matrix4(leftDownMatrix);
        this.leftFeet.matrix.scale(1,1,-1);
        this.leftFeet.matrix.translate(-0.02,0.29,-0.15);
        this.leftFeet.matrix.rotate(g_leftFeetSlideAngle,1,0,0);
        matrixScaleMass(this.leftFeet.matrix,this.feetSize);
        this.leftFeet.render();


        
        // Right Leg compoment
        // let rightLegUp = new Cube();
        this.rightLegUp.color = this.lightGray.slice();
        this.rightLegUp.matrix.setTranslate(0.02,-0.2,0.07);
        this.rightLegUp.matrix.rotate(g_rightUpperLegAngle,1,0,0);
        let rightUpLegMatrix = new Matrix4(this.rightLegUp.matrix);
        this.rightLegUp.matrix.scale(1,-1,1);
        matrixScaleMass(this.rightLegUp.matrix, this.legUpDimention)
        this.rightLegUp.render();

        // let rightLegDown = new Cube();
        this.rightLegDown.color = this.lightGray.slice();
        this.rightLegDown.matrix = new Matrix4(rightUpLegMatrix);
        this.rightLegDown.matrix.scale(1,-1,1);
        this.rightLegDown.matrix.translate(0,0.3,0);
        this.rightLegDown.matrix.rotate(g_rightLowerLegSlideAngle,1,0,0);
        let rightDownMatrix = new Matrix4(this.rightLegDown.matrix);
        matrixScaleMass(this.rightLegDown.matrix,this.legDownDimention);
        this.rightLegDown.render();

        // let rightFeet = new Cube();
        this.rightFeet.color = this.feetColor.slice();
        this.rightFeet.matrix = new Matrix4(rightDownMatrix);
        this.rightFeet.matrix.scale(1,1,-1);
        this.rightFeet.matrix.translate(-0.02,0.29,-0.15);
        this.rightFeet.matrix.rotate(g_rightFeetSlideAngle,1,0,0);
        matrixScaleMass(this.rightFeet.matrix,this.feetSize);
        this.rightFeet.render();


        
        // Left arm compoment
        // let leftArmUp = new Cube();
        this.leftArmUp.color = this.lightGray;
        this.leftArmUp.matrix.setTranslate(-0.265,0.2,0.07);
        this.leftArmUp.matrix.rotate(g_leftUpperArmSlideAngle,1,0,0);
        let leftArmUpMatrix = new Matrix4(this.leftArmUp.matrix);
        this.leftArmUp.matrix.scale(1,-1,1);
        matrixScaleMass(this.leftArmUp.matrix, this.armUpDimention)
        this.leftArmUp.render();

        // let leftArmDown = new Cube();
        this.leftArmDown.color = this.lightGray.slice();
        // leftLegDown.matrix.translate(0,-0.8,0);
        this.leftArmDown.matrix = new Matrix4(leftArmUpMatrix);
        // leftLegDown.matrix.multiply(letUpLegMatrix);
        this.leftArmDown.matrix.scale(1,-1,1);
        this.leftArmDown.matrix.translate(0,0.25,0);
        this.leftArmDown.matrix.rotate(-g_leftLowerArmSlideAngle,1,0,0);
        let leftArmDownMatrix = new Matrix4(this.leftArmDown.matrix);
        matrixScaleMass(this.leftArmDown.matrix,this.armUpDimention);
        this.leftArmDown.render();

        // let leftHand = new Cube();
        this.leftHand.color = this.handColor.slice();
        this.leftHand.matrix = new Matrix4(leftArmDownMatrix);
        this.leftHand.matrix.scale(1,1,-1);
        this.leftHand.matrix.translate(-0.02,0.29,-0.14);
        this.leftHand.matrix.rotate(g_leftHandSlideAngle,1,0,0);
        matrixScaleMass(this.leftHand.matrix,this.handSize);
        this.leftHand.render();



        // Right arm component
        // let rightArmUp = new Cube();
        this.rightArmUp.color = this.lightGray;
        this.rightArmUp.matrix.setTranslate(0.15,0.2,0.07);
        this.rightArmUp.matrix.rotate(g_rightUpperArmSlideAngle,1,0,0);
        let rightArmUpMatrix = new Matrix4(this.rightArmUp.matrix);
        this.rightArmUp.matrix.scale(1,-1,1);
        matrixScaleMass(this.rightArmUp.matrix, this.armUpDimention)
        this.rightArmUp.render();

        // let rightArmDown = new Cube();
        this.rightArmDown.color = this.lightGray.slice();
        // leftLegDown.matrix.translate(0,-0.8,0);
        this.rightArmDown.matrix = new Matrix4(rightArmUpMatrix);
        // leftLegDown.matrix.multiply(letUpLegMatrix);
        this.rightArmDown.matrix.scale(1,-1,1);
        this.rightArmDown.matrix.translate(0,0.25,0);
        this.rightArmDown.matrix.rotate(-g_rightLowerArmSlideAngle,1,0,0);
        let rightArmDownMatrix = new Matrix4(this.rightArmDown.matrix);
        matrixScaleMass(this.rightArmDown.matrix,this.armUpDimention);
        this.rightArmDown.render();

        // let rightHand = new Cube();
        this.rightHand.color = this.handColor.slice();
        this.rightHand.matrix = new Matrix4(rightArmDownMatrix);
        this.rightHand.matrix.scale(1,1,-1);
        this.rightHand.matrix.translate(-0.02,0.29,-0.14);
        this.rightHand.matrix.rotate(g_rightHandSlideAngle,1,0,0);
        matrixScaleMass(this.rightHand.matrix,this.handSize);
        this.rightHand.render();



        // Tail
        // let firstTail = new Cylinder();
        this.firstTail.color = this.tailColor.slice();
        this.firstTail.matrix.setTranslate(0,-0.15,0.23);
        this.firstTail.matrix.rotate(45,1,0,0);
        matrixScaleMass(this.firstTail.matrix,this.tailSize);
        let firstTailMatrix = new Matrix4(this.firstTail.matrix);
        this.firstTail.render();

        // let secondTail = new Cylinder();
        this.secondTail.color = this.tailColor.slice();
        this.secondTail.matrix = new Matrix4(firstTailMatrix);
        this.secondTail.matrix.translate(0,0,0.3);
        this.secondTail.matrix.rotate(-15,1,0,0);
        this.secondTail.matrix.scale(0.8,0.8,1);
        let secondTailMatrix = new Matrix4(this.secondTail.matrix);
        this.secondTail.render();

        // let thirdTail = new Cylinder();
        this.thirdTail.color = this.tailColor.slice();
        this.thirdTail.matrix = new Matrix4(secondTailMatrix);
        this.thirdTail.matrix.translate(0,0,0.3);
        this.thirdTail.matrix.rotate(-15,1,0,0);
        this.thirdTail.matrix.scale(0.8,0.8,1);
        let thirdTailMatrix = new Matrix4(this.thirdTail.matrix);
        this.thirdTail.render();

        // let forthTail = new Cylinder();
        this.forthTail.color = this.tailColor.slice();
        this.forthTail.matrix = new Matrix4(thirdTailMatrix);
        this.forthTail.matrix.translate(0,0,0.3);
        this.forthTail.matrix.rotate(15,1,0,0);
        this.forthTail.matrix.scale(0.8,0.8,1);
        let forthTailMatrix = new Matrix4(this.forthTail.matrix);
        this.forthTail.render();

        // let fithTail = new Cylinder();
        this.fithTail.color = this.tailColor.slice();
        this.fithTail.matrix = new Matrix4(forthTailMatrix);
        this.fithTail.matrix.translate(0,0,0.3);
        this.fithTail.matrix.rotate(15,1,0,0);
        this.fithTail.matrix.scale(0.8,0.8,1);
        let fithTailMatrix = new Matrix4(this.fithTail.matrix);
        this.fithTail.render();

        // let sixthTail = new Cylinder();
        this.sixthTail.color = this.tailTipColor.slice();
        this.sixthTail.matrix = new Matrix4(fithTailMatrix);
        this.sixthTail.matrix.translate(0,0,0.3);
        this.sixthTail.matrix.rotate(15,1,0,0);
        this.sixthTail.matrix.scale(0.8,0.8,1);
        this.sixthTail.render();



        // Head component
        // let head = new Cube();
        this.head.color = this.lightGray;
        this.head.matrix.translate(-0.17,0.29,-0.03);
        this.head.matrix.rotate(g_headXSlideAngle,1,0,0);
        this.head.matrix.rotate(g_headYSlideAngle,0,1,0);
        let headMatrix = new Matrix4(this.head.matrix);
        matrixScaleMass(this.head.matrix,this.headSize);
        this.head.render();

        // let mouth = new Cube();
        this.mouth.matrix = new Matrix4(headMatrix);
        this.mouth.matrix.translate(0.025,-0.02,-0.02);
        matrixScaleMass(this.mouth.matrix,this.mouthSize);
        this.mouth.color = this.mouthColor;
        // matrixScaleMass(mouth.matrix,this.mouthSize);
        this.mouth.render();

        // let nose = new Cube();
        this.nose.color = this.noseColor;
        this.nose.matrix = new Matrix4(headMatrix);
        this.nose.matrix.translate(0.12,0.05,-0.05);
        matrixScaleMass(this.nose.matrix,this.noseSize);
        this.nose.render();

        // let leftEye = new Cube();
        this.leftEye.color = this.eyeColor;
        this.leftEye.matrix = new Matrix4(headMatrix);
        this.leftEye.matrix.translate(0.07,0.13,-0.02);
        matrixScaleMass(this.leftEye.matrix,this.eyeSize);
        this.leftEye.render();

        // let leftPupilOutside = new Cube();
        this.leftPupilOutside.color = this.pupilOutsideColor;
        this.leftPupilOutside.matrix = new Matrix4(headMatrix);
        this.leftPupilOutside.matrix.translate(0.09,0.13,-0.03);
        matrixScaleMass(this.leftPupilOutside.matrix,this.pupilOutsideSize);
        this.leftPupilOutside.render();

        // let leftPupil = new Cube();
        this.leftPupil.color = this.pupilColor;
        this.leftPupil.matrix = new Matrix4(headMatrix);
        this.leftPupil.matrix.translate(0.095,0.135,-0.04);
        matrixScaleMass(this.leftPupil.matrix,this.pupilSize);
        this.leftPupil.render();

        // let rightEye = new Cube();
        this.rightEye.color = this.eyeColor;
        this.rightEye.matrix = new Matrix4(headMatrix);
        this.rightEye.matrix.translate(0.195,0.13,-0.02);
        matrixScaleMass(this.rightEye.matrix,this.eyeSize);
        this.rightEye.render();

        // let rightPupilOutside = new Cube();
        this.rightPupilOutside.color = this.pupilOutsideColor;
        this.rightPupilOutside.matrix = new Matrix4(headMatrix);
        this.rightPupilOutside.matrix.translate(0.195,0.13,-0.03);
        matrixScaleMass(this.rightPupilOutside.matrix,this.pupilOutsideSize);
        this.rightPupilOutside.render();

        // let rightPupil = new Cube();
        this.rightPupil.color = this.pupilColor;
        this.rightPupil.matrix = new Matrix4(headMatrix);
        this.rightPupil.matrix.translate(0.2,0.135,-0.04);
        matrixScaleMass(this.rightPupil.matrix,this.pupilSize);
        this.rightPupil.render();



        // whiskers
        // let firstLeftWhisker = new Cube();
        this.firstLeftWhisker.color = this.whiskerColor;
        this.firstLeftWhisker.matrix = new Matrix4(headMatrix);
        this.firstLeftWhisker.matrix.translate(0.1,0.05,-0.03);
        this.firstLeftWhisker.matrix.rotate(70,0,0,1);
        matrixScaleMass(this.firstLeftWhisker.matrix,this.whiskerSize);
        this.firstLeftWhisker.render();

        // let secondLeftWhisker = new Cube();
        this.secondLeftWhisker.color = this.whiskerColor;
        this.secondLeftWhisker.matrix = new Matrix4(headMatrix);
        this.secondLeftWhisker.matrix.translate(0.1,0.05,-0.03);
        this.secondLeftWhisker.matrix.rotate(90,0,0,1);
        matrixScaleMass(this.secondLeftWhisker.matrix,this.whiskerSize);
        this.secondLeftWhisker.render();

        // let thirdLeftWhisker = new Cube();
        this.thirdLeftWhisker.color = this.whiskerColor;
        this.thirdLeftWhisker.matrix = new Matrix4(headMatrix);
        this.thirdLeftWhisker.matrix.translate(0.1,0.05,-0.03);
        this.thirdLeftWhisker.matrix.rotate(110,0,0,1);
        matrixScaleMass(this.thirdLeftWhisker.matrix,this.whiskerSize);
        this.thirdLeftWhisker.render();

        // let firstRightWhisker = new Cube();
        this.firstRightWhisker.color = this.whiskerColor;
        this.firstRightWhisker.matrix = new Matrix4(headMatrix);
        this.firstRightWhisker.matrix.translate(0.25,0.06,-0.03);
        this.firstRightWhisker.matrix.rotate(250,0,0,1);
        matrixScaleMass(this.firstRightWhisker.matrix,this.whiskerSize);
        this.firstRightWhisker.render();

        // let secondRighWhisker = new Cube();
        this.secondRighWhisker.color = this.whiskerColor;
        this.secondRighWhisker.matrix = new Matrix4(headMatrix);
        this.secondRighWhisker.matrix.translate(0.25,0.06,-0.03);
        this.secondRighWhisker.matrix.rotate(270,0,0,1);
        matrixScaleMass(this.secondRighWhisker.matrix,this.whiskerSize);
        this.secondRighWhisker.render();

        // let thirdRightWhisker = new Cube();
        this.thirdRightWhisker.color = this.whiskerColor;
        this.thirdRightWhisker.matrix = new Matrix4(headMatrix);
        this.thirdRightWhisker.matrix.translate(0.25,0.06,-0.03);
        this.thirdRightWhisker.matrix.rotate(290,0,0,1);
        matrixScaleMass(this.thirdRightWhisker.matrix,this.whiskerSize);
        this.thirdRightWhisker.render();


        
        // Ear

        // let leftEar = new TriangularPrism();
        this.leftEar.color = this.earColor;
        this.leftEar.matrix = new Matrix4(headMatrix);
        this.leftEar.matrix.translate(0.023,0.323,0.2);
        this.leftEar.matrix.rotate(18,0,0,1);
        matrixScaleMass(this.leftEar.matrix,this.earSize);
        this.leftEar.render();

        // let leftInnerEar = new TriangularPrism();
        this.leftInnerEar.color = this.innerEarColor;
        this.leftInnerEar.matrix = new Matrix4(headMatrix);
        this.leftInnerEar.matrix.translate(0.015,0.33,0.17);
        this.leftInnerEar.matrix.rotate(18,0,0,1);
        matrixScaleMass(this.leftInnerEar.matrix,this.innerEarSize);
        this.leftInnerEar.render();

        // let rightEar = new TriangularPrism();
        this.rightEar.color = this.earColor;
        this.rightEar.matrix = new Matrix4(headMatrix);
        this.rightEar.matrix.translate(0.33,0.323,0.2);
        this.rightEar.matrix.rotate(360-18,0,0,1);
        matrixScaleMass(this.rightEar.matrix,this.earSize);
        this.rightEar.matrix.scale(-1,1,1);
        this.rightEar.render();

        // let rightInnerEar = new TriangularPrism();
        this.rightInnerEar.color = this.innerEarColor;
        this.rightInnerEar.matrix = new Matrix4(headMatrix);
        this.rightInnerEar.matrix.translate(0.335,0.33,0.17);
        this.rightInnerEar.matrix.rotate(360-18,0,0,1);
        matrixScaleMass(this.rightInnerEar.matrix,this.innerEarSize);
        this.rightInnerEar.matrix.scale(-1,1,1);
        this.rightInnerEar.render();
    }
}

function matrixScaleMass(matrix,value) {
    matrix.scale(value[0],value[1],value[2]);
}