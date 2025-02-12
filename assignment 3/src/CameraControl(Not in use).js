let stepSize = 0.5;
let turnAngle = 0;      //This angle is in degree

function cameraForward() {
    cameraForwardAdvance(stepSize);
}

function cameraBackword() {
    cameraBackwordAdvance(stepSize);
}

function cameraLeft() {
    cameraLeftRightAdvance(stepSize,1);
}

function cameraRight() {
    cameraLeftRightAdvance(stepSize,-1);
}

function cameraTurnLeft() {
    cameraTurnAdvance(turnAngle,-1);
}

function cameraTurnRight() {
    cameraTurnAdvance(turnAngle,1);
}




function cameraForwardAdvance(amount) {
    let d = new Vector3(g_at).sub(new Vector3(g_eye));
    // console.log(d);
    d = d.normalize();
    for(let i = 0; i < 3; i++)
    {
        g_eye[i] = g_eye[i] + d.elements[i] * amount;
        g_at[i] = g_at[i] + d.elements[i] * amount;
    }
}

function cameraBackwordAdvance(amount) {
    let d = new Vector3(g_at).sub(new Vector3(g_eye));
    // console.log(d);
    d = d.normalize();
    for(let i = 0; i < 3; i++)
    {
        g_eye[i] = g_eye[i] - d.elements[i] * amount;
        g_at[i] = g_at[i] - d.elements[i] * amount;
    }
}

function cameraLeftRightAdvance(amount, direction) {
    let d = new Vector3(g_at).sub(new Vector3(g_eye));
    let left = Vector3.cross(d,new Vector3(g_up));
    left = left.normalize();
    for(let i = 0; i < 3; i++)
    {
        g_eye[i] = g_eye[i] + left.elements[i] * amount * direction;
        g_at[i] = g_at[i] + left.elements[i] * amount * direction;
    }
}

// Camera turn
function cameraTurnAdvance(angle, direction) {
    // console.log(g_at);
    let d = new Vector3(g_at).sub(new Vector3(g_eye));
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
    g_at[0] = g_eye[0] + d.elements[0];
    g_at[2] = g_eye[2] + d.elements[2];
    // console.log(g_at);
}




// This is not working
// function cameraTurnAdvance1(angle, direction) {
//     let d = new Vector3(g_at).sub(new Vector3(g_eye));
//     let rotationMatrix = new Matrix4();
//     rotationMatrix.setRotate(angle*Math.PI/180*direction,g_up[0],g_up[1],g_up[2]);
//     console.log(rotationMatrix);
//     let rotatedD = rotationMatrix.multiplyVector3(d);
//     console.log(rotatedD);
//     for(let i = 0; i < 2; i++)
//     {
//         g_at[i] = g_eye[i] + rotatedD[i];
//     }
// }

// function cameraLeftAdvance(amount) {
//     let d = new Vector3(g_at).sub(new Vector3(g_eye));
//     let left = Vector3.cross(d,new Vector3(g_up));
//     left = left.normalize();
//     for(let i = 0; i < 3; i++)
//     {
//         g_eye[i] = g_eye[i] + left.elements[i] * amount;
//         g_at[i] = g_at[i] + left.elements[i] * amount;
//     }
// }

// function cameraRightAdvance(amount) {
//     let d = new Vector3(g_at).sub(new Vector3(g_eye));
//     let right = Vector3.cross(d,new Vector3(g_up));
//     right = right.normalize();
//     for(let i = 0; i < 3; i++)
//     {
//         g_eye[i] = g_eye[i] - right.elements[i] * amount;
//         g_at[i] = g_at[i] - right.elements[i] * amount;
//     }
// }