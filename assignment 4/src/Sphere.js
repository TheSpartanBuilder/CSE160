class Sphere{
    constructor()
    {
        this.type='sphere';
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.v = [];
        this.uv = [];
        this.colorArray = [];
        this.detail = 25;
    }

    update()
    {
        this.v = [];
        this.uv = [];
        this.colorArray = [];

        var d = Math.PI/this.detail;
        var dd = Math.PI/this.detail;

        for (var t=0; t<Math.PI; t+=d)
        {
            for (var r=0; r<(2*Math.PI); r += d)
            {
                var p1 = [sin(t)*cos(r), sin(t)*sin(r),cos(t)];

                var p2 = [sin(t+dd)*cos(r), sin(t+dd)*sin(r),cos(t+dd)];
                var p3 = [sin(t)*cos(r+dd), sin(t)*sin(r+dd),cos(t)];
                var p4 = [sin(t+dd)*cos(r+dd),sin(t+dd)*sin(r+dd),cos(t+dd)];
                

                var uv1 = [t/Math.PI, r/(2*Math.PI)];
                var uv2 = [(t+dd)/Math.PI, r/(2*Math.PI)];
                var uv3 = [t/Math.PI, (r+dd)/(2*Math.PI)];
                var uv4 = [(t+dd)/Math.PI, (r+dd)/(2*Math.PI)];

                var v = [];
                var uv = [];
                v=v.concat(p1); uv=uv.concat(uv1);
                v=v.concat(p2); uv=uv.concat(uv2);
                v=v.concat(p4); uv=uv.concat(uv4);

                // gl.uniform4f(u_FragColor,1,1,1,1);
                // drawTriangle3DUVNormal(v,uv,v);
                this.v = this.v.concat(v);
                this.uv = this.uv.concat(uv);
                this.colorArray = this.colorArray.concat(this.color, this.color, this.color);

                var v = [];
                var uv = [];
                v=v.concat(p1); uv=uv.concat(uv1);
                v=v.concat(p4); uv=uv.concat(uv4);
                v=v.concat(p3); uv=uv.concat(uv3);

                // gl.uniform4f(u_FragColor,1,0,0,1);
                // drawTriangle3DUVNormal(v,uv,v);
                this.v = this.v.concat(v);
                this.uv = this.uv.concat(uv);
                this.colorArray = this.colorArray.concat(this.color, this.color, this.color);
            }
        }
        // console.log(`Vertices: ${this.v.length}, Colors: ${this.colorArray.length}, Normals: ${this.v.length}`);
        // if (this.v.length !== this.colorArray.length / 4 || this.v.length !== this.v.length) {
        //     console.error("Mismatched buffer sizes!");
        // }
    }

    renderFast() {
        var rgba = this.color;

        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);

        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // drawTriangle3DBatchColorNormal(this.v,this.color,this.v);
        drawTriangle3DBatchColorNormalUV(this.v,this.colorArray,this.v,this.uv);
        // drawTriangle3DBatchUVNormal(this.v,this.uv,this.v);
    }

    render() {
        var rgba = this.color;

        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);

        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        var d = Math.PI/25;
        var dd = Math.PI/25;

        for (var t=0; t<Math.PI; t+=d)
        {
            for (var r=0; r<(2*Math.PI); r += d)
            {
                var p1 = [sin(t)*cos(r), sin(t)*sin(r),cos(t)];

                var p2 = [sin(t+dd)*cos(r), sin(t+dd)*sin(r),cos(t+dd)];
                var p3 = [sin(t)*cos(r+dd), sin(t)*sin(r+dd),cos(t)];
                var p4 = [sin(t+dd)*cos(r+dd),sin(t+dd)*sin(r+dd),cos(t+dd)];
                

                var uv1 = [t/Math.PI, r/(2*Math.PI)];
                var uv2 = [(t+dd)/Math.PI, r/(2*Math.PI)];
                var uv3 = [t/Math.PI, (r+dd)/(2*Math.PI)];
                var uv4 = [(t+dd)/Math.PI, (r+dd)/(2*Math.PI)];

                var v = [];
                var uv = [];
                v=v.concat(p1); uv=uv.concat(uv1);
                v=v.concat(p2); uv=uv.concat(uv2);
                v=v.concat(p4); uv=uv.concat(uv4);

                gl.uniform4f(u_FragColor,1,1,1,1);
                drawTriangle3DUVNormal(v,uv,v);

                var v = [];
                var uv = [];
                v=v.concat(p1); uv=uv.concat(uv1);
                v=v.concat(p4); uv=uv.concat(uv4);
                v=v.concat(p3); uv=uv.concat(uv3);

                gl.uniform4f(u_FragColor,1,0,0,1);
                drawTriangle3DUVNormal(v,uv,v);
            }
        }

        // drawTriangle3DBatchColorNormal(this.v,this.color,this.v);
        // drawTriangle3DBatchColorNormalUV(this.v,this.colorArray,this.v,this.uv);
        // drawTriangle3DBatchUVNormal(this.v,this.uv,this.v);
    }
}

function sin(input)
{
    return Math.sin(input);
}

function cos(input)
{
    return Math.cos(input);
}