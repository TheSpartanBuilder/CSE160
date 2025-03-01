class TriangularPrism extends Cylinder {
    constructor() {
        super();
        this.type = "triangular_prism";
        this.sides = 3;
        this.textureNum = -2;
        this.upCircleVertex = generatePentagonVertices(this.x_cordinate,this.y_cordinate,this.sides,this.size);
    }
}