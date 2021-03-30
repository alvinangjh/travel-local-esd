/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */

/* Display uploaded image */
var loadFile = function (event) {
	var image = document.getElementById("output");
	image.src = URL.createObjectURL(event.target.files[0]);
};

/* Initialize timepicker */
$("#openTime").timepicker({
	timeFormat: "hh:mm p",
	interval: 15,
	dropdown: true,
	scrollbar: false,
	zindex: 3500,
	change: function (selected) {
		$("#endTime").timepicker("option", "minTime", $("#startTime").val());
	},
});

/* Initialize timepicker */
$("#closeTime").timepicker({
	timeFormat: "hh:mm p",
	interval: 15,
	zindex: 3500,
	dropdown: true,
	scrollbar: false,
	change: function (selected) {
		$("#startTime").timepicker("option", "maxTime", $("#endTime").val());
	},
});

/* Once customer input postal code, fillAddress function will retrieve address from one map and auto-fill the address textbox */
function fillAddress() {
	var searchval = document.getElementById("locPostalCode").value; /* Retrieve postal code */
	// console.log(searchval);
	if (searchval.length == 0) { /* If postal code is not filled, return empty string */
		document.getElementById("locAddress").value = "";
	}

	// Step 1
	var request = new XMLHttpRequest();

	// Step 2
	// Register function
	request.onreadystatechange = function () {
		// Step 5
		if (request.readyState == 4 && request.status == 200) {
			// Response is ready
			//console.log(request.responseText);

			// Convert API response to JavaScript JSON object
			var json_obj = JSON.parse(request.responseText);

			// Call HELPER function to retrieve Postal Code
			var address = json_obj.results;

			document.getElementById("locAddress").value = address[0]["ADDRESS"];
			document.getElementById("lat").value = address[0]["LATITUDE"];
			document.getElementById("lon").value = address[0]["LONGITUDE"];
		}
	};

	// Step 3
	var base_url = "https://developers.onemap.sg/commonapi/search";
	var final_url = base_url + "?searchVal=" + searchval + "&returnGeom=Y&getAddrDetails=Y&pageNum=1";
	request.open("GET", final_url, true);

	// Step 4
	request.send();
}

/* Enable address text box if checkbox is checked */
function EnableDisableTextBox(addressChkBox) {
	if (addressChkBox.checked == true) {
		$("#locAddress").attr("readonly", false);
	} else {
		$("#locAddress").attr("readonly", true);
	}
}

/* Send custom location details to PHP using AJAX */
function insert_poi() {
	userID = sessionStorage.getItem("userID");
	var url = "http://localhost:8080/api/managePOI/poi/create?userID="+userID;
	img = document.getElementById("imageUrl").files[0].name; //get image file name
	data = {
		name: $("#locTitle").val(),
		address: $("#locAddress").val(),
		postalCode: $("#locPostalCode").val(),
		description: $("#locDesc").val(),
		locCategory: $("#categories").val(),
		rating: $('input[name="rate"]:checked').val(),
		imageUrl: img,
		latitude: $("#lat").val(),
		longitude: $("#lon").val(),
		theme: $("#venueType").val(),
		businessContact: $("#businessContact").val(),
		businessEmail: $("#businessEmail").val(),
		openTime: $("#openTime").val(),
		closeTime: $("#closeTime").val(),
		businessWeb: $("#businessWeb").val(),
	}

	var to_send = JSON.stringify(data);
	$.ajax({
		url: url,
		type: "POST",
		contentType: 'application/json',
		data: to_send,
	}).done(function (responseText) {
		// console.log(responseText);
		if (responseText["code"] == 201) {
			$("#successModal").modal("show"); //Display modal if success
		}
	});

}

function redirect_to_poi(keyword) {
	window.location.href = "../search/search.html?keyword=" + keyword;
}


/* Check if sessionStorage userID exist, if not send to login page */
function checkUser() {
	if (sessionStorage.getItem("userID") === null) {
		window.location.href = "../../index.html";
	} else {
		document.getElementById("signOutDiv").setAttribute("style", "display:block;");
		document.getElementById("signUpDiv").setAttribute("style", "display:none;");
	}
}

/* Clear sessionStorage once user log out */
function logOut() {
	window.location.href = "../../index.html";
	sessionStorage.clear();
}
