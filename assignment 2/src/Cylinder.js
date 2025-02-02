class Cylinder {
    constructor() {
        this.type = "cylinder";
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.upCircleVertex = [];
        this.downCircleVertex = [];
    }

    render() {
        generatePentagonVertices(0,0.5,20,5);
    }
}

