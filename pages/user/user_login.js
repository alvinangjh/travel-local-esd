function login() {
	var url = "php/objects/userLogin.php";

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
