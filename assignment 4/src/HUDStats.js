/**
 * This are the reference that I have used for this class:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
 * https://rodger.global-linguist.com/webgl/ch10/HUD.html
 * https://sites.google.com/site/webglbook/home/9-various-techniques
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
 */
class HUDStates{
    constructor(theAimLab=null)
    {
        this.hud = document.getElementById('HUDStats'); 
        this.ctx = this.hud.getContext('2d');
        this.theAimLab = theAimLab;
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.hud.width, this.hud.height);
    }

    render()
    {
        this.ctx.clearRect(0, 0, this.hud.width, this.hud.height);
        this.ctx.beginPath();
        this.ctx.font = '18px "Times New Roman"';
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillText("Target hit: "+this.theAimLab.getScore(),0,20);
        this.ctx.fillText("Total shots fired: "+this.theAimLab.getTotalFired(),0,38);
        this.ctx.fillText("Accuracy: "+this.theAimLab.getAcuracy()*100+"%",0,56);
    }
}