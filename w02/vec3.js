class Vec3
{
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;     
    }

    Min()
    {
        var min = Math.min(this.x,this.y,this.z);
        return min;
    }
    
    Max()
    {   var max = Math.max(this.x,this.y,this.z);
        return max;
    }

    Mid()
    {
        this.mid = eval(this.x) + eval(this.y) + eval(this.z) - Math.max(this.x,this.y,this.z) - Math.min(this.x,this.y,this.z); 
        return this.mid;
    }

    sum( x, y, z)
    {
        return this.x + this.y + this.z;
    }
    
    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
}