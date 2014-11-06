(function($) {
	$.fn.webbyLabSort = function() {


		console.time("a"); //------------measurement of performance----------------------
		var dataTable = new Table(this.children()); //create new object of the table
		var arrFilds = []; //array, wich stores a sort oder
		console.timeEnd("a"); //---------measurement of performance----------------------

		this.children().eq(0).click(function(event) { //click on the element of thead(delegation)
			console.time("b"); //--------measurement of performance----------------------
			var target = event.target;
			var colName = $(target).toggleClass("active").html();

			if ($(target).hasClass('active')) {
				arrFilds.push(colName);
			} else {
				for (var i = 0; i < arrFilds.length; i++) {
					if (arrFilds[i] === colName) {
						arrFilds.splice(i, 1);
						break;
					};
				};
			};

			dataTable.sortTable(arrFilds);
			dataTable.refreshTable();
			console.timeEnd("b"); //------measurement of performance----------------------
		});
	};
})(jQuery);

function Table(tableLinkChildren) { //class for tables creating
	this.table = []; //array for data of the table
	this.tbody = tableLinkChildren[1];
	var tableHead = tableLinkChildren[0].children[0];
	var tdArr = tableLinkChildren[1].children;
	for (var i = 0; i < tdArr.length; i++) { //convert rows into objects
		this.table.push(addTrObj(tdArr[i].children, tableHead.children));
	};
}

Table.prototype.sortTable = function(titleArr) { //Sorting of tables 
	var arrForSort = [];
	for (key in this.table[0]) {
		arrForSort.push(key);
	};
	titleArr = defaultCheck(titleArr, arrForSort);
	for (var i = titleArr.length - 1; i >= 0; i--) {
		this.sortingByType(titleArr[i]);
	};
};

Table.prototype.sortingByType = function(title) { //selecting sorting function for different types
	if (isNaN(parseInt(this.table[1][title], 10))) {
		this.table = mergeSort(this.table, stringComparer(title));
		// this.table.sort(sortByString(title)); //works only in FF, because FF use mergeSort, wich is stable
	} else {
		this.table = mergeSort(this.table, numberComparer(title));
		// this.table.sort(sortByNumber(title)); //works only in FF, because FF use mergeSort, wich is stable
	};
};

Table.prototype.refreshTable = function() { //refresh DOM data
	var innerData = '';
	for (var i = 0; i < this.table.length; i++) {
		innerData += "<tr>";
		for (var key in this.table[i]) {
			innerData += "<td>" + this.table[i][key] + "</td>";
		}
		innerData += "</tr>";
	};
	$(this.tbody).html('').append(innerData);
}

function addTrObj(tdStr, headNames) { //get object from row of the table
	var obj = {};
	for (var i = 0; i < headNames.length; i++) {
		obj[$(headNames).eq(i).html()] = $(tdStr).eq(i).html();
	};
	return obj;
}

function mergeSort(a, func) { //merginSort function
	if (a.length <= 1) {
		return a;
	}
	var mid = Math.round((a.length / 2));
	var left = a.slice(0, mid);
	var right = a.slice(mid);
	return merge(mergeSort(left, func), mergeSort(right, func), func);
}

function merge(left, right, func) { //mergin for merginSort 
	var sorted = [];
	while (left.length > 0 && right.length > 0) {
		if ((func(left[0], right[0])) <= 0) {
			sorted.push(left.shift());
		} else {
			sorted.push(right.shift());
		}
	}
	return sorted.concat(left, right);
}

function defaultCheck(titleArr, standardArr) { //Default sorting for the table
	titleStandartArr = titleArr.slice(0);

	for (var i = 0; i < standardArr.length; i++) {
		if (titleStandartArr.indexOf(standardArr[i]) < 0) titleStandartArr.push(standardArr[i]);
	};
	return titleStandartArr;
}

var numberComparer = function(field) { //sorting numbers function

	return function(a, b) {
		return a[field] - b[field];
	}
}

var stringComparer = function(field) { //sorting strings function 

	return function(a, b) {
		return (a[field] < b[field]) ? -1 : ((a[field] > b[field]) ? 1 : 0);
	}
}