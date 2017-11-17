var WINDOW_WIDTH = document.documentElement.clientWidth;
var WIDTH_HEIGHT = document.documentElement.clientHeight;




window.onload = function () {
	
	var canvas = document.getElementById('canvas');
	var cxt = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WIDTH_HEIGHT;

	//依次叠加
	// cxt.transform(1,0,0,1,100,200)//水平垂直位移
	// cxt.transform(1.5,0,0,1,0,0)//水平垂直缩放
	// cxt.transform(1,0.3,0,1,0,0)//水平垂直倾斜
	// cxt.setTransform(1,0,0,1,100,0)//重新设定，忽略之前的效果


	// var stop = [0.2,0.4,0.7,1];
	// var color = ['#900','#094','#098','orange'];
	






	// drawRect(cxt,0,0,400,400,'#900')
	// patternCanvas(cxt,0,0,canvas.width,canvas.height)
	// patternImg(cxt,0,0,canvas.width,canvas.height,'bg.jpg')
	
	// strokeRoundRect(cxt,60,60,400,300,10,'#035',10)

	//2048小方格
	// fillRoundRect(cxt,60,60,500,500,20,'#ccc')
	// for (var i = 0; i < 4 ;i++) {
	// 	for (var j = 0; j < 4; j++) {
	// 		fillRoundRect(cxt,80+j*120,80+i*120,100,100,10,'#eee')
		 
	// 	}
	// }






	drowLine(cxt,100,100,200,200,10,"round")
	drowPainter(cxt)
	fillMoon(cxt,2,canvas.width-200,200,120,10,'orange')
	drawLand(cxt,canvas.width/3,canvas.height/2,canvas.width*2/3,canvas.height,canvas.width,canvas.height-100)
	// fillTxt(cxt,'夜晚星空','orange');


	//剪纸效果//图形路径相反
	// cxt.fillStyle ='#035';
	// cxt.shadowColor = '#ccc';
	// cxt.shadowBlur = 10;
	// cxt.shadowOffsetX = 10;
	// cxt.shadowOffsetY = 10;
	// cxt.rect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2)
	// cxt.arc(canvas.width/3,canvas.height/2,canvas.width/19,0,Math.PI*2,true)
	// drawRectPath(cxt,canvas.width*2/5,canvas.height/2,canvas.width/6,canvas.height/6)
	// drawStatPath(cxt,canvas.width*2/3,canvas.height/2,100)
	// cxt.fill()


	
	




	

	

	
	



}


















//矩形绘制
function drawRect(cxt,x,y,width,height,fillColor,strokeColor,lineWidth){
	cxt.strokeStyle = strokeColor;
	cxt.fillStyle = fillColor;
	cxt.lineWidth = lineWidth;

	cxt.beginPath();
	cxt.rect(x,y,width,height);
	cxt.closePath();

	if (fillColor) cxt.fill();
	if (strokeColor) cxt.stroke();	
}
//矩形路径绘制
function drawRectPath(cxt,x,y,width,height){
	cxt.moveTo(x,y);
	cxt.lineTo(x,y+height);
	cxt.lineTo(x+width,y+height);
	cxt.lineTo(x+width,y);


}
//直线绘制
function drowLine(cxt,x,y,width,height,lineWidth,lineCap){
	cxt.beginPath();
	cxt.moveTo(x,y);
	cxt.lineTo(width,height);
	//绘制圆形的线段头尾
	cxt.lineCap = lineCap;//buttt(默认),round,square
	cxt.lineWidth = lineWidth;

	cxt.stroke()
}

//星星绘制
function drawStat(cxt,x,y,r,R,rot){
	cxt.save();
	cxt.translate(x,y);
	cxt.rotate(rot/180*Math.PI);
	// cxt.scale(R,R)

	cxt.fillStyle = '#fb3';
	// cxt.strokeStyle = '#fb5';
	// cxt.lineWidth = 3;
	// cxt.lineJoin = 'round';//miter(默认),round,bevel
	//cxt.miterLimit = 10;(默认)，如果角度越小，miterLimit越大，默认就会变成bevel，如还想要尖角，设置cxt.miterLimit = 20，或者更大

	cxt.beginPath();
	for (var i = 0; i < 5; i++) {
		cxt.lineTo(Math.cos((18+72*i)/180*Math.PI)*R,-Math.sin((18+72*i)/180*Math.PI)*R);
		cxt.lineTo(Math.cos((54+72*i)/180*Math.PI)*r,-Math.sin((54+72*i)/180*Math.PI)*r);
	}
	cxt.closePath();

	cxt.fill();
	// cxt.stroke();
	cxt.restore();
}
//星星路径绘制
function drawStatPath(cxt,x,y,R,rot){

	cxt.translate(x,y);
	cxt.rotate(rot/180*Math.PI);
	cxt.scale(R,R)

	for (var i = 0; i < 5; i++) {
		if (i == 0 ) cxt.moveTo(Math.cos((18+72*i)/180*Math.PI),-Math.sin((18+72*i)/180*Math.PI));
		cxt.lineTo(Math.cos((18+72*i)/180*Math.PI),-Math.sin((18+72*i)/180*Math.PI));
		cxt.lineTo(Math.cos((54+72*i)/180*Math.PI)/2,-Math.sin((54+72*i)/180*Math.PI)/2);
	}

	
}


//圆角矩形绘制
function fillRoundRect(cxt,x,y,width,height,r,color){
	cxt.save();
	cxt.translate(x,y);
	cxt.fillStyle = color||'black';
	pathRoundRect(cxt,width,height,r);
	cxt.fill()
	cxt.restore();
}
//圆角矩形绘制
function strokeRoundRect(cxt,x,y,width,height,r,color,lineWidth){
	cxt.save();
	cxt.translate(x,y);
	cxt.strokeStyle = color||'black';
	cxt.lineWidth = lineWidth||1;
	pathRoundRect(cxt,width,height,r);
	cxt.stroke()
	cxt.restore();
}

//圆角矩形路径绘制
function pathRoundRect(cxt,width,height,r){
	if (2*r > width || 2*r > height) return
	cxt.beginPath();
	cxt.arc(width-r,height-r,r,0,Math.PI/2);
	cxt.lineTo(r,height);
	cxt.arc(r,height-r,r,Math.PI/2,Math.PI);
	cxt.lineTo(0,r);
	cxt.arc(r,r,r,Math.PI,Math.PI*3/2);
	cxt.lineTo(r,0);
	cxt.arc(width-r,r,r,Math.PI*3/2,Math.PI*2);
	cxt.closePath();
}
//月亮绘制
function fillMoon(cxt,d,x,y,R,a,color){
	cxt.save();
	cxt.translate(x,y);
	cxt.scale(R,R);
	cxt.rotate(a/180*Math.PI)
	cxt.fillStyle = color;
	PathMoon(cxt,d);
	cxt.fill();
	cxt.restore();

}
//月亮路径绘制
function PathMoon(cxt,d){
	cxt.beginPath();
	cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true)
	cxt.moveTo(0,-1);
	// cxt.arcTo(d,0,0,1,dis(0,-1,d,0)/d)//普通圆弧，需计算r
	cxt.quadraticCurveTo(1,0,0,1)//贝塞尔二次曲线
	cxt.closePath();

}
//两点之间的距离
function dis(x1,y1,x2,y2){
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))

}

//草地绘制
function drawLand(cxt,x1,y1,x2,y2,x3,y3){
	var stop = [0.0,1.0];
	var color = ['#580','#030'];

	cxt.save();


	cxt.fillStyle = linearGradient(cxt,0,canvas.height/3,0,canvas.height,stop,color)	
	cxt.beginPath();
	cxt.moveTo(0,canvas.height-100);
	cxt.bezierCurveTo(x1,y1,x2,y2,x3,y3)
	cxt.lineTo(canvas.width,canvas.height);
	cxt.lineTo(0,canvas.height);
	cxt.closePath();
	cxt.fill()
	cxt.restore()

}

//文字书写
function fillTxt(cxt,txt,color){
	cxt.save();
	cxt.font ='90px Arial';
	cxt.fillStyle = color;
	cxt.fillText(txt,10,100);
	cxt.restore();

}



































//线性渐变样式
function linearGradient(cxt,xs,ys,xe,ye,stop,color){
	var linearGrad = cxt.createLinearGradient(xs,ys,xe,ye);
	for (var i = 0; i < stop.length; i++) {
		linearGrad.addColorStop(stop[i],color[i]);	
	}
	return linearGrad;
}
//径向渐变样式
function radialGradient(cxt,xs,ys,r,xe,ye,R,stop,color){
	var radailGrad = cxt.createRadialGradient(xs,ys,r,xe,ye,R);
	for (var i = 0; i < stop.length; i++) {
		radailGrad.addColorStop(stop[i],color[i]);	
	}
	return radailGrad;
}
function patternImg(cxt,x,y,width,height,url){
	var bgImg = new Image();
	bgImg.src = url;
	bgImg.onload = function(){
		var pattern = cxt.createPattern(bgImg,'repeat')
		cxt.fillStyle = pattern;
		cxt.fillRect(x,y,width,height)
	}
	
}
function patternCanvas(cxt,x,y,width,height){
	var backCanvas = createBackgroundCanvas()
	var pattern = cxt.createPattern(backCanvas,'repeat')
	cxt.fillStyle = pattern;
	cxt.fillRect(x,y,width,height)

}
function createBackgroundCanvas(){
 	var canvasBackground = document.createElement('canvas');
 	canvasBackground.width = 100;
 	canvasBackground.height = 100;
 	var cxtBackground = canvasBackground.getContext('2d');
 	drawStat(cxtBackground,50,50,20,40);
 	return canvasBackground

}































//一片星空
function drowPainter(cxt){
	var stop = [0.0,1.0];
	var color = ['#035','black'];
	cxt.fillStyle = radialGradient(cxt,canvas.width/2,canvas.height,0,canvas.width/2,canvas.height,canvas.height,stop,color);
	cxt.fillRect(0,0,canvas.width,canvas.height)
	for(var i = 0; i< 100; i++){
		var r = Math.random()*10+2;
		var x = Math.random()*canvas.width;
		var y = Math.random()*canvas.height*0.63;
		var a = Math.random()*360;
		drawStat(cxt,x,y,r,r/2,a)
	}
}













