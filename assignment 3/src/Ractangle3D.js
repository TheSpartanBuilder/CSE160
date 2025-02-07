class Ractangle3D {
    constructor() {
        this.type = "ractangle";
        this.vertexs = [[0,0,0],[0,0,1],[1,0,1],[1,0,0]];
        this.color = [1.0,1.0,1.0,1.0];
    }

    render() {
        gl.uniform4f(u_FragColor,this.color[0],this.color[1],this.color[2],this.color[3]);
        drawTriangle3D([this.vertexs[0][0],this.vertexs[0][1],this.vertexs[0][2],this.vertexs[1][0],this.vertexs[1][1],this.vertexs[1][2],this.vertexs[2][0],this.vertexs[2][1],this.vertexs[2][2]]);
        drawTriangle3D([this.vertexs[2][0],this.vertexs[2][1],this.vertexs[2][2],this.vertexs[3][0],this.vertexs[3][1],this.vertexs[3][2],this.vertexs[0][0],this.vertexs[0][1],this.vertexs[0][2]]);
    }
}

function drawRactangle3D(vertexs) {
    // gl.uniform4f(u_FragColor,color[0],color[1],color[2],this.color[3]);
    drawTriangle3D([vertexs[0][0],vertexs[0][1],vertexs[0][2],vertexs[1][0],vertexs[1][1],vertexs[1][2],vertexs[2][0],vertexs[2][1],vertexs[2][2]]);
    drawTriangle3D([vertexs[2][0],vertexs[2][1],vertexs[2][2],vertexs[3][0],vertexs[3][1],vertexs[3][2],vertexs[0][0],vertexs[0][1],vertexs[0][2]]);
}