class Tom {
    constructor() {
        this.type = "tom";
        this.darkGray = [0.35,0.35,0.35,1];
        this.lightGray = [0.45,0.45,0.45,1];
        this.feetColor = [0.85,0.85,0.85];
        this.legUpDimention = [0.12,0.3,0.13];
        this.feetSize = [0.16,0.08,0.2];
        this.legDownDimention = this.legUpDimention;
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
    }
}

function matrixScaleMass(matrix,value) {
    matrix.scale(value[0],value[1],value[2]);
}