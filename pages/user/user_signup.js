function register() {
	var user = {
		firstName: document.getElementById("inputFirstName").value,
		lastName: document.getElementById("inputLastName").value,
		email: document.getElementById("inputEmail").value,
		password: document.getElementById("inputPassword").value,
	};

	// (locID, locTitle, locAddress, locPostalCode, locDesc, recDuration, rating, imageUrl, createdBy)

	var data = JSON.stringify(user);
	var url = "../../php/objects/UserTest.php";
	var request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var status = request.responseText;

			if (status == "Success") {
				$("#registermodal").modal("show");
			}
		}
	};

	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(data);
}

function reset() {
	var email = $("#inputEmail").val();
	var pw = $("#inputPassword").val();
	var cfmPw = $("#inputCfmPassword").val();

	if (pw != cfmPw) {
		$("#conflictAlert").attr("style", "display: ''");
	} else {
		$("#conflictAlert").attr("style", "display: none");

		var user = {
			email: email,
			pw: cfmPw,
		};

		var data = JSON.stringify(user);
		var url = "../../php/objects/userPwUpdate.php";
		var request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				$("#resetModal").modal("show");
			}
		};

		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		request.send(data);
	}
}
