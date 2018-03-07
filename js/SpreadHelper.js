
/* Globals */
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1IcqX-16ldyOVGAVWOhT3fyFAm5fLjcytILSmc7wb9YQ/edit#gid=0';
var tools = [[], [], [], [], [], []]; //'cList', 'pList', 'bList', 'sList', 'eList', 'aList'
var result;

/* Call initialize within this function  */
var myCallback = function (error, options, response) {
	if (!error) {
		getMainTools(response, tools);
		init();
		animate();
		console.log(tools[1]);
	}
}

/* Sort Content */
function getMainTools(data, tools){
	for (var i = 0; i < data.rows.length; i++) {

		var subtoolArray = new Array();
		var parent = data.rows[i].cellsArray[4]; 
		var category = data.rows[i].cellsArray[2];
		var isMain = parseInt(data.rows[i].cellsArray[3]);

		var contentMain =	[	data.rows[i].cellsArray[0], //id
								data.rows[i].cellsArray[1], //name
								data.rows[i].cellsArray[5], //description
								data.rows[i].cellsArray[6], //content
								subtoolArray //Subtool array
							];

		var contentSub =	[	data.rows[i].cellsArray[0], //id
								data.rows[i].cellsArray[1], //name
								data.rows[i].cellsArray[5], //description
								data.rows[i].cellsArray[6] //content
							];

		if (category == 'Counter Principle'){
			if(isMain){
				tools[0].push(contentMain);
			}
			else{
				pushContent(tools[0], parent, contentSub);
			}
		}

		if (category == 'Perspectives'){
			if(isMain){
				tools[1].push(contentMain);
			}
			else{
				pushContent(tools[1], parent, contentSub);
			}
		}

		if (category == 'Body'){
			if(isMain){
				tools[2].push(contentMain);
			}
			else{
				pushContent(tools[2], parent, contentSub);
			}
		}

		if (category == 'Space'){
			if(isMain){
				tools[3].push(contentMain);
			}
			else{
				pushContent(tools[3], parent, contentSub);
			}
		}

		if (category == 'Energy'){
			if(isMain){
				tools[4].push(contentMain);
			}
			else{
				pushContent(tools[4], parent, contentSub);
			}
		}

		if (category == 'Awareness'){
			if(isMain){
				tools[5].push(contentMain);
			}
			else{
				pushContent(tools[5], parent, contentSub);
			}
		}
	}
}

function pushContent(array, item, content){
	for( var i = 0, len = array.length; i < len; i++ ) {
		if( array[i][0] === item) {
		    result = array[i];
		    break;
		}
	}

	if(result[0] == item){
		result[4].push( content );
	}
}

/* Sheetrock tool */
sheetrock({
  url: mySpreadsheet,
  callback: myCallback
});

