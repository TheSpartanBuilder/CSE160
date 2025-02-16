class AimLab
{
    constructor()
    {
        this.totalFired = 0;
        this.hit = 0;
        this.xBoundary = [-12,12];
        this.yBoundary = [0,4];
        this.zBoundary = [-10,12]
        this.currentTargetLocation = this.generateTargetLocation();
        this.hitSound = new Audio("../Sound/hitmarker_2.mp3");
    }

    reset()
    {
        this.totalFired = 0;
        this.hit = 0;
        this.currentTargetLocation = this.generateTargetLocation();
    }

    getScore()
    {
        return this.hit;
    }

    getTotalFired()
    {
        return this.totalFired;
    }

    getAcuracy()
    {
        return this.hit/this.totalFired;
    }

    getMissed()
    {
        return this.totalFired-this.hit;
    }

    /*
    https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    */
    generateTargetLocation()
    {
        let x = Math.floor(Math.random() * (this.xBoundary[0] - this.xBoundary[1]) + this.xBoundary[1]);
        let y = Math.floor(Math.random() * (this.yBoundary[0] - this.yBoundary[1] + 1) + this.yBoundary[1]);
        let z = Math.floor(Math.random() * (this.zBoundary[0] - this.zBoundary[1]) + this.zBoundary[1]);
        // console.log(x,y,z);
        return [x*0.4,y,z*0.4];
    }

    shoot()
    {
        if(!aimLabRender || !mouseLock) return;
        // console.log(this.currentTargetLocation);
        this.totalFired ++;
        if(handleShoot())
        {
            this.hitSound.play();
            this.hit++;
            this.currentTargetLocation = this.generateTargetLocation();
        }
    }
}