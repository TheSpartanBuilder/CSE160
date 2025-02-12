class Camera {
    constructor() {
        this.stepSize = 0.1;
        this.turnAngle = 5;  
        this.g_eye=[0,0,-1];
        this.g_at=[0,0,0];
        this.g_up=[0,1,0];
    }

    moveForward() {
        this.cameraForwardAdvance(this.stepSize);
    }
    
    moveBackword() {
        this.cameraBackwordAdvance(this.stepSize);
    }
    
    moveLeft() {
        this.cameraLeftRightAdvance(this.stepSize,-1);
    }
    
    moveRight() {
        this.cameraLeftRightAdvance(this.stepSize,1);
    }
    
    panLeft() {
        this.cameraTurnAdvance(this.turnAngle,-1);
    }
    
    panRight() {
        this.cameraTurnAdvance(this.turnAngle,1);
    }
    
    
    
    
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
}