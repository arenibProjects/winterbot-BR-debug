var XCom = require("./backend-libs/XCom");
var mapModule = require("./modules/map");
var loaderModule = require("./modules/loader");
var myBotModule = require("./modules/myBot");
var posCardModule = require("./modules/posCard");

var xCom = new XCom.XCom();

// ===== DISPLAY ===== //
//loader
loaderModule.init(displayer);
//map
mapModule.init(displayer);

//Position
posCardModule.init(displayer,xCom);
// ===== EVENTS ===== //
var readyPromise = Promise.all([xCom.whenConOpen("motionbase")]);


// ===== ACTIONS ===== //

//debug
readyPromise.then(()=>{
	xCom.addCommand("SCRAMBLED",(com,con)=>{
		alert("scrambled");
	})
});

//loader dismissal
readyPromise.then(()=>{
	console.log("all devices ready");
	loaderModule.hide(); // hide loader
});

// bigRobot update
myBotModule.init(displayer,mapModule,false);
readyPromise.then(()=>{
	xCom.addCommand("POS",(com,con)=>{
		myBotModule.place(parseFloat(com[1]),parseFloat(com[2]),parseFloat(com[3]));
		mapModule.update();
	});
});

//position
readyPromise.then(()=>{
	xCom.addCommand("POS",(com,con)=>{
		posCardModule.place(com[1],com[2],com[3]);
	})
});

//launch periodics
readyPromise.then(()=>{
	xCom.send(["+POS"],"motionbase");
});