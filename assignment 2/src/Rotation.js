//https://www.youtube.com/watch?v=nu2MR1RoFsA
function the90DegreeRotation(vertex,point)
{
    //return [vertex[1]*(point[1]/point[0]),vertex[0]*(-(point[0]/point[1]))];
    let offset = [0-point[0],0-point[1]];
    let rotated = [-(vertex[1] + offset[1]),(vertex[0] + offset[0])];
    return [(rotated[0]-offset[0]),(rotated[1]-offset[1])];
    //return [vertex[1]*((point[0]/point[1])),vertex[0]*(point[1]/point[0])];
}

function the180DegreeRotation(vertex,point)
{
    let first = the90DegreeRotation(vertex,point);
    return the90DegreeRotation(first,point);
}

function the270DegreeRotation(vertex,point)
{
    let first = the90DegreeRotation(vertex,point);
    let second = the90DegreeRotation(first,point);
    return the90DegreeRotation(second,point);
}

function customeRotation(vertex,point,degree)
{
    let offset = [0-point[0],0-point[1]];
    let offset_vertex = [(vertex[0] + offset[0]),(vertex[1] + offset[1])];
    let rotated = [(offset_vertex[0]*Math.cos(degree)-offset_vertex[1]*Math.sin(degree)),(offset_vertex[0]*Math.sin(degree)-offset_vertex[2]*Math.cos(degree))];
    return [(rotated[0]-offset[0]),(rotated[1]-offset[1])];
}