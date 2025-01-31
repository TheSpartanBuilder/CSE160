class Tom {
    constructor() {
        this.type = "tom";
        this.darkGray = [0.35,0.35,0.35,1];
        this.lightGray = [0.45,0.45,0.45,1];
        this.legUpDimention = [0.12,0.3,0.13];
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

        let leftLegUp = new Cube();
        leftLegUp.color = this.lightGray.slice();
        // leftLegUp.matrix.scale(0.12,0.35,0.13);
        leftLegUp.matrix.setTranslate(-0.15,-0.45,0.6);
        leftLegUp.matrix.rotate(g_magentaAngle,1,0,0);
        //eftLegUp.matrix.scale(0.12,0.3,0.13);
        let letUpLegMatrix = new Matrix4(leftLegUp.matrix);
        matrixScaleMass(leftLegUp.matrix, this.legUpDimention)
        // let letUpLegMatrix = new Matrix4(leftLegUp.matrix);
        leftLegUp.render();

        let rightLegUp = new Cube();
        rightLegUp.color = this.lightGray.slice();
        // rightLegUp.matrix.scale(0.12,0.35,0.13);
        matrixScaleMass(rightLegUp.matrix,this.legUpDimention);
        rightLegUp.matrix.translate(0.15,-1.45,0.6);
        let rightUpLegMatrix = new Matrix4(rightLegUp.matrix);
        //rightLegUp.render();

        let leftLegDown = new Cube();
        leftLegDown.color = this.lightGray.slice();
        // leftLegDown.matrix.translate(0,-0.8,0);
        leftLegDown.matrix = new Matrix4(letUpLegMatrix);
        // leftLegDown.matrix.multiply(letUpLegMatrix);
        leftLegDown.matrix.translate(0,0.5,0);
        leftLegDown.matrix.rotate(g_yellowAngle,1,0,0);
        matrixScaleMass(leftLegDown.matrix,this.legDownDimention);
        leftLegDown.render();

        let rightLegDown = new Cube();
        rightLegDown.color = this.lightGray.slice();
        // rightLegDown.matrix = new Matrix4(rightUpLegMatrix);
        rightLegDown.matrix.translate(0,-0.8,0);
        // rightLegDown.render();
    }
}

function matrixScaleMass(matrix,value) {
    matrix.scale(value[0],value[1],value[2]);
}