const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const canvasSub=document.getElementById("canvasSub");
const ctxSub=canvasSub.getContext("2d");
var character=[{x:(canvas.width-20)/2,y:(canvas.height-20)/2,width:20,height:20,color:"#0000FF",spin:false,
                collisionRange:{all:false,part:false},backdirection:0,accelerationB:[0]}],
    stage=[{x:0,y:-250,width:250,height:2050,color:"#FFFF00",spin:true},
           {x:-750,y:-250,width:1000,height:250,color:"#FFFF00",spin:true},
           {x:-750,y:-750,width:250,height:750,color:"#FFFF00",spin:true},
           {x:-1250,y:-750,width:750,height:250,color:"#FFFF00",spin:true},
           {x:-1250,y:-750,width:250,height:500,color:"#FFFF00",spin:true},
           {x:-2000,y:-500,width:1000,height:250,color:"#FFFF00",spin:true},
           {x:-2000,y:-1500,width:250,height:1250,color:"#FFFF00",spin:true},
           {x:-2000,y:-1500,width:500,height:250,color:"#FFFF00",spin:true},
           {x:-1750,y:-1425,width:1500,height:100,color:"#FFFF00",spin:true},
           {x:-500,y:-1500,width:250,height:250,color:"#FFFF00",spin:true},
           {x:-500,y:-1500,width:750,height:100,color:"#FFFF00",spin:true},
           {x:0,y:-1500,width:250,height:250,color:"#FFFF00",spin:true},
           {x:0,y:-1350,width:600,height:100,color:"#FFFF00",spin:true},
           {x:500,y:-1350,width:100,height:600,color:"#FFFF00",spin:true},
           {x:500,y:-1000,width:1000,height:250,color:"#FFFF00",spin:true},
           {x:1200,y:-1000,width:300,height:500,color:"#FFFF00",spin:true},
           {x:1200,y:-750,width:60,height:750,color:"#FFFF00",spin:true},
           {x:1320,y:-750,width:60,height:750,color:"#FFFF00",spin:true},
           {x:1440,y:-750,width:60,height:750,color:"#FFFF00",spin:true},
           {x:1200,y:-250,width:300,height:250,color:"#FFFF00",spin:true},
           {x:1260,y:-250,width:60,height:750,color:"#FFFF00",spin:true},
           {x:1380,y:-250,width:60,height:750,color:"#FFFF00",spin:true},
           {x:1200,y:250,width:300,height:250,color:"#FFFF00",spin:true},
           {x:1320,y:250,width:60,height:750,color:"#FFFF00",spin:true},
           {x:500,y:750,width:880,height:250,color:"#FFFF00",spin:true},
           {x:500,y:750,width:250,height:750,color:"#FFFF00",spin:true},
           {x:500,y:1250,width:750,height:250,color:"#FFFF00",spin:true},
           {x:1000,y:1250,width:250,height:500,color:"#FFFF00",spin:true},
           {x:950,y:1650,width:250,height:250,color:"#FFFF00",spin:true},
           {x:875,y:1725,width:250,height:250,color:"#FFFF00",spin:true},
           {x:225,y:1775,width:800,height:250,color:"#FFFF00",spin:true},
           {x:125,y:1725,width:250,height:250,color:"#FFFF00",spin:true},
           {x:50,y:1650,width:250,height:250,color:"#FFFF00",spin:true}],
    obstacle=[{x:100,y:1500,width:50,height:50,color:"#FF0000",spin:true},
              {x:50,y:1000,width:50,height:50,color:"#FF0000",spin:true},
              {x:150,y:1000,width:50,height:50,color:"#FF0000",spin:true},
              {x:0,y:500,width:50,height:50,color:"#FF0000",spin:true},
              {x:100,y:500,width:50,height:50,color:"#FF0000",spin:true},
              {x:200,y:500,width:50,height:50,color:"#FF0000",spin:true},
              {x:-1500,y:-1000,width:1500,height:50,color:"#FF0000",spin:true},
              {x:0,y:-1000,width:50,height:500,color:"#FF0000",spin:true},
              {x:0,y:-500,width:350,height:50,color:"#FF0000",spin:true},
              {x:350,y:-500,width:50,height:2100,color:"#FF0000",spin:true},
              {x:350,y:1600,width:500,height:50,color:"#FF0000",spin:true}],
    press={up:false,down:false,right:false,left:false},
    entire={x:131,y:0,direction:0,accelerationD:0,accelerationM:[0]},
    interval;
function draw(obj,ifAdjustment,magnification,adjustment,map,sbCanvas,sbCtx,positionAdjustment){
    var copyObj=JSON.parse(JSON.stringify(obj));
    copyObj.spin=copyObj.spin&&!map;
    if (ifAdjustment){
        copyObj.x+=entire.x;
        copyObj.y+=entire.y;
    }
    for (n=0;n<character.length;n++){
        if (obj==character[0]&&map){
            copyObj.x-=copyObj.width*5;copyObj.width+=copyObj.width*10;
            copyObj.y-=copyObj.height*5;copyObj.height+=copyObj.height*10;
        }
    }
    var point=[{x:copyObj.x+copyObj.width,y:copyObj.y},{x:copyObj.x+copyObj.width,y:copyObj.y+copyObj.height},
               {x:copyObj.x,y:copyObj.y+copyObj.height},{x:copyObj.x,y:copyObj.y}];
    for (n=0;n<4;n++){
        point[n].x/=positionAdjustment;point[n].y/=positionAdjustment;
    }
    if (copyObj.spin){
        var pLength=[((point[0].x-sbCanvas.width/2)**2+(point[0].y-sbCanvas.height/2)**2)**0.5,
                     ((point[1].x-sbCanvas.width/2)**2+(point[1].y-sbCanvas.height/2)**2)**0.5,
                     ((point[2].x-sbCanvas.width/2)**2+(point[2].y-sbCanvas.height/2)**2)**0.5,
                     ((point[3].x-sbCanvas.width/2)**2+(point[3].y-sbCanvas.height/2)**2)**0.5],
            pDirection=[Math.atan2(point[0].y-sbCanvas.height/2,point[0].x-sbCanvas.width/2),
                     Math.atan2(point[1].y-sbCanvas.height/2,point[1].x-sbCanvas.width/2),
                     Math.atan2(point[2].y-sbCanvas.height/2,point[2].x-sbCanvas.width/2),
                     Math.atan2(point[3].y-sbCanvas.height/2,point[3].x-sbCanvas.width/2)];
        for (n=0;n<4;n++){
            point[n].x=sbCanvas.width/2+pLength[n]*Math.cos(pDirection[n]+entire.direction);
            point[n].y=sbCanvas.height/2+pLength[n]*Math.sin(pDirection[n]+entire.direction);
        }
    }
    for (n=0;n<4;n++){
        point[n].x=point[n].x/magnification+adjustment.x;point[n].y=point[n].y/magnification+adjustment.y;
    }
    sbCtx.beginPath();
    sbCtx.moveTo(point[3].x,point[3].y);
    for (n=0;n<4;n++){
        sbCtx.lineTo(point[n].x,point[n].y);
    }
    sbCtx.fillStyle=copyObj.color;
    sbCtx.fill();
    sbCtx.closePath();
}
function entireMove(condition,pm,acceleration,valueAcceleration,direction){
    var magnification=2;
    if (character[0].collisionRange.all){
        magnification=1;
    }
    if (condition){
        if (acceleration){
            if (valueAcceleration[0]<5){
                valueAcceleration[0]+=pm/magnification;
            }
        }else{
            if (valueAcceleration[0]>0.1){
                valueAcceleration[0]-=0.075*magnification;
            }else{
                valueAcceleration[0]=10*pm;
            }
        }
    }else if (acceleration){
        if (Math.abs(valueAcceleration[0])>0.1){
            valueAcceleration[0]+=pm/2*magnification*-Math.sign(valueAcceleration[0]);
        }else{
            valueAcceleration[0]=0;
        }
    }
    var moveLimit=2*magnification;
    entire.x+=valueAcceleration[0]*Math.sin(direction)/moveLimit;
    entire.y+=valueAcceleration[0]*Math.cos(direction)/moveLimit;
}
    
function entireSpin(condition,pm){
    if (condition){
        if (Math.abs(entire.accelerationD)<2.5/180*Math.PI){
            entire.accelerationD+=pm;
        }
    }else if (entire.accelerationD/Math.abs(entire.accelerationD)==pm/Math.abs(pm)){
        if (Math.abs(entire.accelerationD)>0.1/180*Math.PI){
            entire.accelerationD-=pm/2;
        }else{
            entire.accelerationD=0;
        }
    }
    entire.direction+=entire.accelerationD/2;
}
function collisionDetection(obj1,obj2){
    var objs=[obj1,obj2],range={all:false,part:false};//copyObj1=JSON.parse(JSON.stringify(obj1)),copyObj2=JSON.parse(JSON.stringify(v));
    objs=JSON.parse(JSON.stringify(objs));
    for (n=0;n<2;n++){
        if (objs[n].spin){
            objs[n].x+=entire.x;
            objs[n].y+=entire.y;
        }
    }
    if (((objs[0].x<objs[1].x&&objs[0].x+objs[0].width>objs[1].x)||(objs[0].x>objs[1].x&&objs[0].x<objs[1].x+objs[1].width))&&
        ((objs[0].y<objs[1].y&&objs[0].y+objs[0].height>objs[1].y)||(objs[0].y>objs[1].y&&objs[0].y<objs[1].y+objs[1].height))){
        range.part=true;
        if ((objs[0].x>objs[1].x&&objs[0].x+objs[0].width<objs[1].x+objs[1].width||objs[0].x<objs[1].x&&objs[0].x+objs[0].width>objs[1].x+objs[1].width)&&
            (objs[0].y>objs[1].y&&objs[0].y+objs[0].height<objs[1].y+objs[1].height||objs[0].y<objs[1].y&&objs[0].y+objs[0].height>objs[1].y+objs[1].height)){
                range.all=true;
        }      
    }
    return(range);
}
function main(){
    character[0].collisionRange={all:false,part:false};
    for (i=0;i<stage.length;i++){
        var range=collisionDetection(character[0],stage[i]);
        character[0].collisionRange.all=character[0].collisionRange.all||range.all;
        character[0].collisionRange.part=character[0].collisionRange.part||range.part;
    }
    for (i=0;i<obstacle.length;i++){
        if (collisionDetection(character[0],obstacle[i]).part){
            var betweenObj={x:entire.x+obstacle[i].x+obstacle[i].width/2-(character[0].x+character[0].width/2),
                            y:entire.y+obstacle[i].y+obstacle[i].height/2-(character[0].y+character[0].height/2),
                            direction:0},
                basisObstacleDirection=Math.atan2(obstacle[i].height,obstacle[i].width)/Math.PI*180;
                obstacleDirection=[basisObstacleDirection,180-basisObstacleDirection,
                                   180+basisObstacleDirection,360-basisObstacleDirection,360];
            betweenObj.direction=Math.atan2(betweenObj.y,betweenObj.x)/Math.PI*180;
            for (n=0;n<5;n++){
                if (Math.abs(betweenObj.direction)<obstacleDirection[n]){
                    character[0].backdirection=90*n*Math.sign(betweenObj.direction);  
                    break;
                }
            }
            if (character[0].backdirection==90||character[0].backdirection==-90||character[0].backdirection==270){
                character[0].backdirection-=90;
                character[0].accelerationB=[Math.abs(1.5*entire.accelerationM[0]*Math.cos(betweenObj.direction))];
            }else{
                character[0].backdirection+=90;
                character[0].accelerationB=[Math.abs(1.5*entire.accelerationM[0]*Math.sin(betweenObj.direction))];
            }
            character[0].backdirection*=Math.PI/180;
            while (collisionDetection(character[0],obstacle[i]).part){
                entire.x+=Math.sin(character[0].backdirection);entire.y+=Math.cos(character[0].backdirection);
            }
        }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctxSub.clearRect(0,0,canvas.width,canvas.height);
    entireMove(press.up,0.125,true,entire.accelerationM,entire.direction);
    entireMove(press.down,-0.125,false,entire.accelerationM,entire.direction);
    entireSpin(press.right,-0.0833/180*Math.PI);
    entireSpin(press.left,0.0833/180*Math.PI);
    for (i=0;i<2;i++){
        entireMove(false,0.125,true,character[0].accelerationB,character[0].backdirection);
    }
    for (i=0;i<stage.length;i++){
        draw(stage[i],true,1,{x:0,y:0},false,canvas,ctx,1);
        draw(stage[i],false,50,{x:448,y:40},true,canvasSub,ctxSub,1);
    }
    for (i=0;i<obstacle.length;i++){
        draw(obstacle[i],true,1,{x:0,y:0},false,canvas,ctx,1);
        draw(obstacle[i],false,50,{x:448,y:40},true,canvasSub,ctxSub,1);
    }
    for (i=0;i<character.length;i++){
        draw(character[i],false,1,{x:0,y:0},false,canvas,ctx,1);
        draw(character[i],true,-50,{x:458,y:48},true,canvasSub,ctxSub,1);
    }
}
document.addEventListener("keydown",keyDownFlag,false);
document.addEventListener("keyup",keyUpFlag,false);
function keyDownFlag(e){
    switch (e.key){
        case "ArrowUp"||"Up":press.up=true;document.body.style.overflow = "hidden";break;
        case "ArrowDown"||"Down":press.down=true;document.body.style.overflow = "hidden";break;
        case "ArrowRight"||"Right":press.right=true;document.body.style.overflow = "hidden";break;
        case "ArrowLeft"||"Left":press.left=true;document.body.style.overflow = "hidden";break;
    }
}
function keyUpFlag(e){
    switch (e.key){
        case "ArrowUp"||"Up":press.up=false;document.body.style.overflow="auto";break;
        case "ArrowDown"||"Down":press.down=false;document.body.style.overflow="auto";break;
        case "ArrowRight"||"Right":press.right=false;document.body.style.overflow="auto";break;
        case "ArrowLeft"||"Left":press.left=false;document.body.style.overflow="auto";break;
    }
}
interval=setInterval(main,10);
interval;
