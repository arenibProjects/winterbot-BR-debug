var XCom = require("./XCom");
var xCom = new XCom.XCom();

//map
var map = new displayer.map.Map();
var mapcol = new displayer.Col(4,6,12);
displayer.mainFrame.addChild(mapcol);
mapcol.addChild(map);

//Position
var placementCard = new displayer.TextCard();
var placementCardCol = new displayer.Col(4,6,12);
displayer.mainFrame.addChild(placementCardCol);
placementCardCol.addChild(placementCard);
var placementCardTitle = new displayer.Title();
placementCardTitle.text="Position";
placementCard.addChild(placementCardTitle);
var placementCardDisplays=[];
for(var i=0;i<3;i++){
	placementCardDisplays.push(makeDataRow(placementCard,["X","Y","A"],v=>{alert(v);}));
}
function makeDataRow(parent,texts,action){
	var row = new displayer.Row();
		parent.addChild(row);
	var text = new displayer.Input();
		var textcol = new displayer.Col(4,4,4);
		row.addChild(textcol);
		textcol.addChild(text);
		text.value=0;
		text.disabled=true;
	var input = new displayer.Input();
		var inputcol = new displayer.Col(4,4,4);
		row.addChild(inputcol);
		inputcol.addChild(input);
		input.text=texts[i];
	var button = new displayer.Button();
		button.text="update";
		button.action=()=>{action(isNaN(parseFloat(input.value))?parseFloat(text.value):parseFloat(input.value));};
		var buttoncol = new displayer.Col(4,4,4);
		row.addChild(buttoncol);
		buttoncol.addChild(button);
	return text;
}

map.objects["bigbot"]=new displayer.map.BigRobot(200,200,0,[255,255,0]);

//awaiting devices
Promise.all([xCom.whenConOpen("motionbase")]).then(()=>{
	console.log("all devices ready");
	xCom.send(["GOTO",0,0,0],"motionbase");
	xCom.addCommand("ONSPOT",(com,con)=>{
		console.log(con+" gone ONSPOT");
	})
	xCom.addCommand("POS",(com,con)=>{
		map.objects["bigbot"].x = parseInt(com[1]);
		map.objects["bigbot"].y = parseInt(com[2]);
		map.objects["bigbot"].r = parseInt(com[3]);
		map.update();
		console.log("pos");
	})
});