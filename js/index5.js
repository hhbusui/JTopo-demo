$(document).ready(function() {
	var canvas = document.getElementById('canvas'),
		stage = new JTopo.Stage(canvas),
		scene = new JTopo.Scene(stage);
	scene.mode = 'select';
	scene.areaSelect = 'false';
	
	
	stage.mode = "edit";
	var node1 = addNode({

		nodeName: "主机：计算机名",
		x: 500,
		y: 300,
		nodeWidth: 100,
		nodeHeight: 100,
		nodeImg: 'server.png',
		nodeFontColor: '#00f',
		scene: scene
	});
	node1.paintAlarmText=function(a){
		//画一个空心圆
		a.beginPath();
		a.arc(10,-20,5,0,360,false);
		a.lineWidth=10;
		a.strokeStyle="green";
		
		a.stroke();//画空心圆
		a.closePath();
	}
	
	
	
	node1.alarm = 'Warrning\nWarrningWa\nrrningWarrningWarrn\ningWarrningWarr'; 
	node1.alarmColor = '255,255,255';
	node1.alarmAlpha = 0;
	//      node1.alarm.fillStyle="0,0,0";
	node1.alarmFont = "12px 宋体";
	node1.alarmAlpha = 0.9;
	node1.alarmFontColor = "0,0,0";

	var node2 = addNode({

		nodeName: "子节点：计算机名",
		x: 200,
		y: 300,
		nodeWidth: 100,
		nodeHeight: 100,
		nodeImg: 'server.png',
		nodeFontColor: '#000',
		scene: scene
	});

	//链接点
	var childNode1 = CircleNode({
		nodeName: '子节点1',
		w: 50,
		h: 50,
		radius: 10,
		fillStyle: '#000',
		nodeImg: 'mycomputer.png',
		x: scene.width,
		y: scene.height,
		scene: scene,
		rootNode: node1

	});
	var childNode1 = CircleNode({
		nodeName: '子节点2',
		w: 50,
		h: 50,
		radius: 10,
		fillStyle: '#000',
		nodeImg: 'mycomputer.png',
		x: scene.width,
		y: scene.height,
		scene: scene,
		rootNode: node1

	});
	var childNode1 = CircleNode({
		nodeName: '子节点2',
		w: 50,
		h: 50,
		radius: 10,
		fillStyle: '#000',
		nodeImg: 'mycomputer.png',
		x: scene.width,
		y: scene.height,
		scene: scene,
		rootNode: node1

	});
	var childNode2 = CircleNode({
		nodeName: '子节点2',
		w: 50,
		h: 50,
		radius: 10,
		fillStyle: '#000',
		nodeImg: 'mycomputer.png',
		x: scene.width,
		y: scene.height,
		scene: scene,
		rootNode: node1

	});

	function addNode(obj) {

		var node = new JTopo.Node(obj.nodeName)
		node.setLocation(obj.x, obj.y);
		node.width = obj.nodeWidth;
		node.height = obj.nodeHeight;
		node.setImage('./img/' + obj.nodeImg); // 设置图片
		node.fontColor = obj.nodeFontColor; // 设置文字颜色
		node.layout = {
			type: 'circle',
			radius: 150
		};
		node.showSelected = true;
		obj.scene.add(node);
		return node;
	}

	function CircleNode(obj) {

		var vmNode = new JTopo.Node(obj.nodeName);
		vmNode.width = obj.w;
		vmNode.height = obj.h;
		vmNode.radius = obj.radius;
		vmNode.fillStyle = obj.fillStyle;
		vmNode.fontColor = "0,0,0";
		vmNode.showSelected = false;
		vmNode.setImage('./img/' + obj.nodeImg); // 设置图片
		vmNode.setLocation(obj.x * Math.random(), obj.y * Math.random());
		obj.scene.add(vmNode);
		//rootNode 根节点  vmNode添加节点
		obj.scene.add(new JTopo.Link(obj.rootNode, vmNode));
		return vmNode;
	}
	JTopo.layout.layoutNode(scene, node1, true);
	
	
	
	
	
	
	
	
	//跟随
	//		scene.addEventListener('mouseup', function(e){
	//          if(e.target && e.target.layout){
	//              JTopo.layout.layoutNode(scene, e.target, true);    
	//          }                
	//      });


	node1.addEventListener('mousemove',function(e){
//		document.querySelector('.shade').style.cssText="display: block;top: '+e.pageY + 30+"px;""';left:'"(e.pageX + 30)+"px;""';";
		
		document.querySelector('.shade').style.cssText='display: block;top:'+(e.pageY+20)+'px;left: '+(e.pageX+20)+'px;';
	});
	node1.addEventListener('mouseout',function(e){
	
		document.querySelector('.shade').style.cssText='display: none;';
	});


	var currentNode = null;

	function handler(event) {
		if(event.button == 2) { // 右键
			// 当前位置弹出菜单（div）
			$("#contextmenu").css({
				top: event.pageY,
				left: event.pageX
			}).show();
		}
	}
	node1.addEventListener('mouseup', function(event) {
		currentNode = this;
		handler(event);
		document.querySelector('.shade').style.cssText='display: none;';
	});
	childNode1.addEventListener('mouseup', function(event) {
		currentNode = this;
		handler(event);
		document.querySelector('.shade').style.cssText='display: none;';
	});

	stage.click(function(event) {
		
		if(event.button == 0) { // 右键
			// 关闭弹出菜单（div）
			$("#contextmenu").hide();
			
		}
	});
	
	
	
	
	
	
	$("#contextmenu a").click(function() {
		var text = $(this).text();
		if(text=='开机'){
			currentNode.alert("计算机名");
		}
		if(text=='关机'){
			currentNode.alert("计算机名");
		}
//		if(text == '删除该节点') {
//
//			scene.remove(currentNode);
//			//						currentNode = null;
//
//		}
//		if(text == '撤销上一次操作') {
//			currentNode.restore();
//		} else {
//			currentNode.save();
//
//		}
//
//		if(text == '更改颜色') {
//			currentNode.fillColor = JTopo.util.randomColor();
//			console.log(JTopo.util.randomColor())
//		} else if(text == '顺时针旋转') {
//			currentNode.rotate += 0.5;
//		} else if(text == '逆时针旋转') {
//			currentNode.rotate -= 0.5;
//		} else if(text == '放大') {
//			currentNode.scaleX += 0.2;
//			currentNode.scaleY += 0.2;
//		} else if(text == '缩小') {
//			currentNode.scaleX -= 0.2;
//			currentNode.scaleY -= 0.2;
//		}
		document.querySelector('.shade').style.cssText='display: none;';
		$("#contextmenu").hide();
	});

	//				var nodeFrom = new JTopo.Node("from");
	//				nodeFrom.setLocation(20, 20);
	//				scene.add(nodeFrom);
	//		
	//				var nodeTo = new JTopo.Node("To");
	//				nodeTo.setLocation(820, 500);
	//				scene.add(nodeTo);
	//				
	//				function nodeFrom(obj){
	//					
	//					
	//				}
	//				
	//				addLink(node1,node2,scene);
	//				function addLink(nodeFrom,nodeTo,scene){
	//					var link = new JTopo.Link(nodeFrom, nodeTo); // 增加连线
	//					scene.add(link);
	//				}			

	/*var canvas = document.getElementById('canvas'),
		stage = new JTopo.Stage(canvas),
		scene = new JTopo.Scene(stage);
	var server = 'server.png',
		commputer = 'computer.png',
		fontColor = '(230, 35, 35)';
//	stage.add(scene);	
//	 scene.background = './img/bg.jpg';
	
	function Node(obj)
	{
		var node = new JTopo.Node(obj.nodeName);
		node.setLocation(obj.x,obj.y);
		node.width = obj.w;
		node.height = obj.h;
		node.backgroundColor='(230, 35, 35)';
		node.setImage('./img/'+obj.img);
		scene.add(node);
		return node;
	}
	function CircleNode(obj){
		var vmNode = new JTopo.CircleNode(obj.nodeName);
		vmNode.width=obj.w;
		vm.Node.height=obj.h;
        vmNode.radius = obj.radius;
        vmNode.fillStyle = obj.fillStyle;
        vmNode.setLocation(obj.x * Math.random(), obj.y * Math.random());
        scene.add(vmNode); 
        //rootNode 根节点  vmNode添加节点
        scene.add(new JTopo.Link(obj.rootNode, obj.vmNode));    
        return vmNode;
	}
	var node1 = Node({
		nodeName:'root',
		x:500,
		y:200,
		w:100,
		h:100,
		img:server
	});
		*/

});