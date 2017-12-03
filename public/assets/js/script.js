	// "table" means Calendar
	// "tr" means Table Row
	// "td" means Table Data

window.onload = function() {
	var d 			= new Date();
	var month_name 	= [
	'January', 'February','March','April','May','June','July','August','September','October','November','December'
	];
	var month 		= d.getMonth();
	var year 		= d.getFullYear();
	var first_date 	= month_name[month] + "" + 1 + "" + year;
	var tmp 		= new Date(first_date).toDateString();
	var first_day	= tmp.substring(0, 3);
	var day_name	= [
	'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
	];
	var day_no		= day_name.indexOf(first_day);
	var days		= new Date(year, month+1, 0).getDate();
	var calendar 	= get_calendar(day_no, days);

	document.getElementById("calendar-month-year").innerHTML() = month_name[month] + "" + year;

	document.getElementById("calendar-dates").appendChild(calendar);
}

function get_calendar(day_no, days) {
	var table 	= document.createElement('table');
	var tr 		= document.createElement('tr');

	// First Row: Days of the Week
	for (var i = 0; i <= 6; i++) {
		var td = document.createElement('td');
		td.innerHTML() = "SMTWTFS"[i];
		tr.appendChild(td);
	}
	table.appendChild(tr);

	
	// Second Row: Days of the Month
	tr = document.createElement('tr');

	for (var i = 0; i <= 6; i++) {
		if(i == day_no) {
			break;
		}
		var td = document.createElement('td');
		td.innerHTML() = "";
		tr.appendChild(td);
	}

	var count = 1;
	for (var i; i <= 6; i++) {
		var td = document.createElement('td');
		td.innerHTML() = count;
		count++;
		tr.appendChild(td);
	}
	table.appendChild(tr);

	
	// The remaining rows: Days of the month
	for (var r = 3; r <= 6; r++) {
		tr = document.createElement('tr');
		for (var i = 0; i <= 6; i++) {
			if (count > days) {
				table.appendChild(tr);
				return table;
			}
			var td = document.createElement('td');
			td.innerHTML() = count;
			count++;
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}