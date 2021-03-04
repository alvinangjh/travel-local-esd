function login() {
	var url = "php/objects/UserTestLogin.php";
	// var request = new XMLHttpRequest();

	// request.onreadystatechange = function () {
	// 	if (request.readyState == 4 && request.status == 200) {
	// 		var status = request.responseText;

	// 		if (status == "Success") {
	// 		}
	// 	}
	// };

	// request.open("POST", url, true);
	// request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	// request.send(user);

	$.ajax({
		url: url,
		type: "POST",
		data: {
			email: document.getElementById("email").value,
			password: document.getElementById("password").value,
		},
	}).done(function (responseText) {
		console.log(responseText);
		var result = JSON.parse(responseText);
		

		if (result["status"].toLowerCase() == "fail") {
			document.getElementById("error_msg").setAttribute("style", "display:block;");
		} else {
			sessionStorage.setItem("userID", result["userID"]);
			window.location.href = "pages/home/homepage.html";
		}
	});
}
