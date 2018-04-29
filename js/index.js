window.onload = function(){
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width = 600;
  const h = canvas.height = 400;
  class Ball{
    constructor(x,y,r){
      this.x = x;
      this.y = y;
      this.r = r;
      // ${~~}转化整数的一种方法，比如：~~true == 1，~~null == 0，~~1.02 = 1
      this.color = 'rgb('+~~Ball.rpFn([0,255])+','+~~Ball.rpFn([0,255])+','+~~Ball.rpFn([0,255])+')';
      return this;
    }
    static rpFn(arr){ //rpFn([1,10])，返回一个1到10范围内的随机数
      let max = Math.max(...arr), //Math.max，获取两个数中的较大数
          min = Math.min(...arr); //由于传进去的是数组，所以要用“...”进行解析
      return Math.random()*(max-min)+min;
    }
    render(ctx){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0,0,this.r,0,2*Math.PI);
      ctx.fill();
      ctx.restore();
      return this;
    }
  }
  // const ball1 = new Ball(100,100,30).render(ctx); //每次刷新页面都都出现一个指定位置和大小、颜色随机的小球
  class SuperBall extends Ball{
    constructor(x,y,z){
      super(x,y,z);
      this.vg = SuperBall.rpFn([2,4]); //子类会继承父类的所有方法
      this.g = SuperBall.rpFn([0.2,0.4]);
      return this;
    }
    move(ctx){
      this.y += this.vg;
      this.vy += this.g;
      let current = this.vy* -0.75;
      if(this.y+this.r>=ctx.canvas.height){
        this.y = ctx.canvas.height - this.r;
        if(Math.abs(current-this.a)<0.01) {return false;}
        this.a = this.y *= -0.75;
      }
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      super.render(ctx);
      return true;
    }
  }
  let ball,timer;
  canvas.onclick = function(e){
    let x = e.offsetX,
        y = e.offsetY;
    let r = ~~Ball.rpFn([25,55]);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ball = new SuperBall(x,y,r).render(ctx);
    ballMove();
  }
  function ballMove(){
    timer = window.requestAnimationFrame(ballMove);
    if(!ball.move(ctx)){
      window.cancelAnimationFrame(timer);
    }
  }
}
