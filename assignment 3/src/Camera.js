class Camera {
    constructor() {
        this.stepSize = 0.1;
        this.turnAngle = 5;  
        this.g_eye=[0,0,-1];
        this.g_at=[0,0,0];
        this.g_up=[0,1,0];
        this.verticalAngle = 0;
        this.fly = false;
        this.sensitivity = 0.3;
    }

    // Normal API
    moveForward() {
        if(this.fly)
        {
            this.cameraForwardAdvance(this.stepSize);
        }
        else
        {
            this.cameraTurnVerticalAdvanceMatrix(-this.verticalAngle,1);
            this.cameraForwardAdvance(this.stepSize);
            this.cameraTurnVerticalAdvanceMatrix(this.verticalAngle,1);
        }
    }
    
    moveBackword() {
        if(this.fly)
        {
            this.cameraBackwordAdvance(this.stepSize);
        }
        else
        {
            this.cameraTurnVerticalAdvanceMatrix(-this.verticalAngle,1);
            this.cameraBackwordAdvance(this.stepSize);
            this.cameraTurnVerticalAdvanceMatrix(this.verticalAngle,1);
        }
    }
    
    moveLeft() {
        if(this.fly)
        {
            this.cameraLeftRightAdvance(this.stepSize,-1);
        }
        else
        {
            this.cameraTurnVerticalAdvanceMatrix(-this.verticalAngle,1);
            this.cameraLeftRightAdvance(this.stepSize,-1);
            this.cameraTurnVerticalAdvanceMatrix(this.verticalAngle,1);
        }
    }
    
    moveRight() {
        if(this.fly)
        {
            this.cameraLeftRightAdvance(this.stepSize,1);
        }
        else
        {
            this.cameraTurnVerticalAdvanceMatrix(-this.verticalAngle,1);
            this.cameraLeftRightAdvance(this.stepSize,1);
            this.cameraTurnVerticalAdvanceMatrix(this.verticalAngle,1);
        }
    }
    
    panLeft() {
        // this.cameraTurnAdvance(this.turnAngle,-1);
        this.cameraTurnAdvanceMatrix(this.turnAngle,1);
    }
    
    panRight() {
        // this.cameraTurnAdvance(this.turnAngle,1);
        this.cameraTurnAdvanceMatrix(this.turnAngle,-1);
    }

    panUp() {
        if(this.verticalAngle >= 85)
        {
            return;
        }
        this.verticalAngle = this.verticalAngle + this.turnAngle;
        // this.cameraTurnVerticalAdvance(this.turnAngle,-1);
        this.cameraTurnVerticalAdvanceMatrix(this.turnAngle,1);
    }

    panDown() {
        if(this.verticalAngle <= -85)
        {
            return;
        }
        this.verticalAngle = this.verticalAngle - this.turnAngle;
        // this.cameraTurnVerticalAdvance(this.turnAngle,1);
        this.cameraTurnVerticalAdvanceMatrix(this.turnAngle,-1);
    }



    panLeftRight(amount) {
        let finalAnlge = amount*this.sensitivity;
        this.cameraTurnAdvanceMatrix(finalAnlge,-1);
    }
    
    panUpDown(amount) {
        let finalAnlge = Math.min(-amount*this.sensitivity,70);
        if(this.verticalAngle >= 80 && finalAnlge > 0 || this.verticalAngle <= -80 && finalAnlge < 0)
        {
            // console.log(this.verticalAngle,finalAnlge);
            return;
        }
        this.verticalAngle = this.verticalAngle + finalAnlge;
        // this.cameraTurnVerticalAdvance(this.turnAngle,-1);
        if(this.verticalAngle >= 80 || this.verticalAngle <= -80)
        {
            // console.log(this.verticalAngle,finalAnlge);
            return;
        }
        this.cameraTurnVerticalAdvanceMatrix(finalAnlge,1);
    }
    
    
    
    // Internal function
    cameraForwardAdvance(amount) {
        let d = new Vector3(this.g_at).sub(new Vector3(this.g_eye));
        // console.log(d);
        d = d.normalize();
        for(let i = 0; i < 3; i++)
        {
            this.g_eye[i] = this.g_eye[i] + d.elements[i] * amount;
            this.g_at[i] = this.g_at[i] + d.elements[i] * amount;
        }
    }
    
    cameraBackwordAdvance(amount) {
        let d = new Vector3(this.g_at).sub(new Vector3(this.g_eye));
        // console.log(d);
        d = d.normalize();
        for(let i = 0; i < 3; i++)
        {
            this.g_eye[i] = this.g_eye[i] - d.elements[i] * amount;
            this.g_at[i] = this.g_at[i] - d.elements[i] * amount;
        }
    }
    
    cameraLeftRightAdvance(amount, direction) {
        let d = new Vector3(this.g_at).sub(new Vector3(this.g_eye));
        let left = Vector3.cross(d,new Vector3(this.g_up));
        left = left.normalize();
        for(let i = 0; i < 3; i++)
        {
            this.g_eye[i] = this.g_eye[i] + left.elements[i] * amount * direction;
            this.g_at[i] = this.g_at[i] + left.elements[i] * amount * direction;
        }
    }
    
    // Camera turn
    cameraTurnAdvance(angle, direction) {
        // console.log(g_at);
        let d = new Vector3(this.g_at).sub(new Vector3(this.g_eye));
        // console.log(d.elements);
        let dx2 = Math.pow(d.elements[0],2);
        let dy2 = Math.pow(d.elements[2],2);
        let r = Math.pow(dx2+dy2,1/2);
        // console.log(r);
        let theta = Math.atan2(d.elements[2],d.elements[0]);
        theta = theta + angle * Math.PI/180 * direction;
        d.elements[0] = r * Math.cos(theta);
        d.elements[2] = r * Math.sin(theta);
        // console.log(d.elements);
        this.g_at[0] = this.g_eye[0] + d.elements[0];
        this.g_at[2] = this.g_eye[2] + d.elements[2];
        // console.log(g_at);
    }

    cameraTurnVerticalAdvance(angle, direction) {
        // console.log(g_at);
        let d = new Vector3(this.g_at).sub(new Vector3(this.g_eye));
        // console.log(d.elements);
        let dx2 = Math.pow(d.elements[1],2);
        let dy2 = Math.pow(d.elements[2],2);
        let r = Math.pow(dx2+dy2,1/2);
        // console.log(r);
        let theta = Math.atan2(d.elements[2],d.elements[1]);
        theta = theta + angle * Math.PI/180 * direction;
        d.elements[1] = r * Math.cos(theta);
        d.elements[2] = r * Math.sin(theta);
        // console.log(d.elements);
        this.g_at[1] = this.g_eye[1] + d.elements[1];
        this.g_at[2] = this.g_eye[2] + d.elements[2];
        // console.log(g_at);
    }

    cameraTurnAdvanceMatrix(angle, direction) {
        let f = new Vector3(this.g_at).sub(new Vector3(this.g_eye));
        let rotationMatrix = new Matrix4().setRotate(angle*direction,this.g_up[0],this.g_up[1],this.g_up[2]);
        let f_prime = rotationMatrix.multiplyVector3(f);
        for(let i = 0; i < 3; i++)
        {
            this.g_at[i] = this.g_eye[i] + f_prime.elements[i];
        }
    }

    cameraTurnVerticalAdvanceMatrix(angle, direction) {
        let f = new Vector3(this.g_at).sub(new Vector3(this.g_eye));
        let left = Vector3.cross(f,new Vector3(this.g_up));
        let rotationMatrix = new Matrix4().setRotate(angle*direction,left.elements[0],left.elements[1],left.elements[2]);
        let f_prime = rotationMatrix.multiplyVector3(f);
        for(let i = 0; i < 3; i++)
        {
            this.g_at[i] = this.g_eye[i] + f_prime.elements[i];
        }
    }

    cameraReset() {
        this.stepSize = 0.1;
        this.turnAngle = 5;  
        this.g_eye=[0,0,-1];
        this.g_at=[0,0,0];
        this.g_up=[0,1,0];
        this.verticalAngle = 0;
        this.fly = false;
    }



    // Old
    moveForwardOld() {
        this.cameraForwardAdvance(this.stepSize);
    }
    
    moveBackwordOld() {
        this.cameraBackwordAdvance(this.stepSize);
    }
    
    moveLeftOld() {
        this.cameraLeftRightAdvance(this.stepSize,-1);
    }
    
    moveRightOld() {
        this.cameraLeftRightAdvance(this.stepSize,1);
    }
    
    panLeftOld() {
        this.cameraTurnAdvance(this.turnAngle,-1);
    }
    
    panRightOld() {
        this.cameraTurnAdvance(this.turnAngle,1);
    }
}