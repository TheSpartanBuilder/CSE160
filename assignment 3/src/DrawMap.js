class DrawMap
{
    constructor(map=null,yLevel=null,textureConfig=null)
    {
        this.map = map;
        this.width = null;
        this.length = null;
        if(yLevel==null) this.yLevel = 0; 
        else this.yLevel=yLevel;
        if(map != null)
        {
            this.width = map[0].length;
            this.length = map.length;
        }
        this.renderQueue = [];
        this.size = 0.4;
        this.textureConfig = textureConfig;
    }

    mapUpdate()
    {
        for(let i = 0; i < this.width; i++)
        {
            for(let j = 0; j < this.length; j++)
            {
                if(this.map[i][j]==1)
                {
                    // console.log(this.map[i][j]);
                    let body = new CubeTextureInUse(this.textureConfig);
                    body.matrix.translate(0,this.yLevel,0);
                    body.matrix.scale(this.size,this.size,this.size);
                    body.matrix.translate(i-this.width/2,0,j-this.length/2);
                    this.renderQueue.push(body);
                }
            }
        }
    }

    renderTexture(config)
    {
        for(let i = 0; i < this.renderQueue.length;i++)
        {
            this.renderQueue[i].inputTexture(config);
            this.renderQueue[i].renderFaster();
        }
    }

    render()
    {
        for(let i = 0; i < this.renderQueue.length;i++)
        {
            this.renderQueue[i].renderFaster();
        }
    }
}