exports.init=function(displayer,map,side){
	exports.bigBot=new displayer.map.BigRobot(200,200,0,[175,125,0]);
	map.connect("bigbot",exports.bigBot);
}
exports.place=function(x,y,r){
	exports.bigBot.x = x;
	exports.bigBot.y = y;
	exports.bigBot.r = r;
}