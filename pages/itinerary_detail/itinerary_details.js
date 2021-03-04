const apiKey = "jKNTmdblMsxZWS3mrwmxz7i5fujbBlZU";
const dataset = "accommodation,attractions,event,food_beverages,shops,venue,walking_trail";

/* Utilities */

/* Utility function to facilitate finding the days in between two dates */
Date.prototype.addDays = function (days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};

/* Facilitate in finding the days between two dates */
function getDates(startDate, stopDate) {
	var dateArray = new Array();
	var currentDate = startDate;
	while (currentDate <= stopDate) {
		dateArray.push(currentDate);
		currentDate = currentDate.addDays(1);
	}
	return dateArray;
}

/* Save the theme that users select in the theme modal */
function changeTheme() {
	var clicked_id = $("input:radio[name=rdBtnTheme]:checked").val();
	var baseUrl = "../../php/objects/itineraryThemeUpdate.php";
	var itineraryID = new URL(window.location.href).searchParams.get("id");

	if (clicked_id == "nature") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-leaf";
		}
	} else if (clicked_id == "family") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-home";
		}
	} else if (clicked_id == "romantic") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-heart";
		}
	} else if (clicked_id == "casual") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-shoe-prints";
		}
	}

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { itinerary_id: itineraryID, itinerary_theme: clicked_id },
	}).done(function (responseText) {
		$("#themeModal").modal("hide");
	});
}

/* Retrieve all activities under the same itinerary */
function retrieveActivity() {
	/* Check if sessionStorage exist for userID
	If not send the user back to login html */
	checkUser();

	var itineraryID = new URL(window.location.href).searchParams.get("id");
	var ownParam = new URL(window.location.href).searchParams.get("own");
	var baseUrl = "../../php/objects/itineraryCopy.php";

	/* If the itinerary does not belong to the user, allow only specific buttons */
	if (ownParam.toLowerCase() != "yes") {
		$("#btnCopy").attr("style", "display:''");
		$("#btnChangeTheme").attr("style", "display:none");
		$("#btnAddNewActivity").attr("style", "display:none");
	} else {
		$("#btnCopy").attr("style", "display:none");
		$("#btnChangeTheme").attr("style", "display:''");
		$("#btnAddNewActivity").attr("style", "display:''");
	}

	var activities = [];
	var baseUrl = "../../php/objects/activityRetrieve.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		dataType: "json",
		data: { itinerary_id: itineraryID },
	}).done(function (responseText) {
		var data = responseText;

		/* Sort activities based on start time (earliest first) */
		var sorted = data.sort((a, b) => {
			return a.startTime.localeCompare(b.startTime);
		});

		for (item of sorted) {
			var activity = {
				activityID: item.activityID,
				poiUUID: item.poiUUID,
				startTime: item.startTime,
				endTime: item.endTime,
				activityDate: item.activityDate,
				locType: item.locType,
				locDataset: item.locDataset,
			};

			activities.push(activity);
		}

		generateDay(itineraryID, activities);
	});
}

/* Generate the skeleton for all the days of the itinerary */
function generateDay(itineraryID, activities) {
	var itineraryID = itineraryID;
	var baseUrl = "../../php/objects/itineraryRetrieve.php";
	var ownParam = new URL(window.location.href).searchParams.get("own");

	$.ajax({
		url: baseUrl,
		type: "POST",
		dataType: "json",
		data: { itinerary_id: itineraryID },
	}).done(function (responseText) {
		var result = responseText;

		document.getElementById("rdBtn" + result[0].itineraryType.charAt(0).toUpperCase() + result[0].itineraryType.slice(1)).checked = true;

		document.getElementById("siteHeader").innerText = result[0].name;
		document.getElementById("itineraryTheme").href = "itinerary_" + result[0].itineraryType.toLowerCase() + ".css";
		document.getElementById(
			"itinerary_name"
		).innerHTML = `${result[0].name} <button id="btnEditTitle" class="btn btn-lg p-0" data-toggle="modal" data-target="#editItineraryModal"><i class="icon fas fa-edit pb-2" style="height: 100%"></i></button>`;
		$("#tbItineraryTitle").val(result[0].name);
		document.getElementById("itinerary_date").innerText = result[0].startDate + " - " + result[0].endDate;

		var dateArray = getDates(new Date(result[0].startDate), new Date(result[0].endDate));

		/* Assign correct icons according to the itinerary type/theme */
		for (var i = 0; i < dateArray.length; i++) {
			var formattedDate = moment(dateArray[i]).format("DD-MM-YYYY");
			var itineraryDays = document.getElementById("itinerary_days");

			//romantic: heart
			//family: home
			//nature: leaf
			//casual: footstep

			if (result[0].itineraryType.toLowerCase() == "romantic") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-heart"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result[0].itineraryType.toLowerCase() == "family") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-home"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result[0].itineraryType.toLowerCase() == "nature") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-leaf"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result[0].itineraryType.toLowerCase() == "casual") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-shoe-prints"></i> 
			Day ${i + 1}</a></h5>`;
			}
		}

		if (ownParam.toLowerCase() != "yes") {
			$("#btnEditTitle").attr("style", "display:none");
		} else {
			$("#btnEditTitle").attr("style", "display:''");
		}

		populateItinerary(activities, result[0].startDate, result[0].endDate);
	});
}

/* Retrieve all the activities in the itinerary from TIH API or MySQL */
function populateItinerary(activities, startDate, endDate) {
	var str = "";

	var dateArray = getDates(new Date(startDate), new Date(endDate));
	var ownParam = new URL(window.location.href).searchParams.get("own");

	/* Generate the individual day skeleteon, "Day 1", "Day 2", etc. */
	for (var i = 0; i < dateArray.length; i++) {
		var entrySection = document.getElementById("entry_section");
		var formattedDate = moment(dateArray[i]).format("DD-MM-YYYY");
		let str = `<div id="${formattedDate}" class="mb-2"><div class="dailyDiv shadow p-2 mb-0">
		<h3 class="text-center">Day ${i + 1}</h3></div></div>`;
		entrySection.innerHTML += str;
	}

	/* For each activity, generate the details needed and image */
	for (var i = 0; i < activities.length; i++) {
		(function (i) {
			if (activities[i].locType == "HG") {
				var baseUrl = "../../php/objects/locationRetrieve.php";
				$.ajax({
					url: baseUrl,
					type: "POST",
					data: { location_id: activities[i].poiUUID },
					success: function (responseText) {
						var data = JSON.parse(responseText);

						var dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + data[0]["latitude"] + "," + data[0]["longitude"];

						var imageUrl = data[0]["imageUrl"];

						var startTime = moment(activities[i].startTime, "HH:mm:ss A").format("hh:mm A");
						var endTime = moment(activities[i].endTime, "HH:mm:ss A").format("hh:mm A");

						var openingHour = "N/A";
						var closingHour = "N/A";

						if (data[0]["startTime"] != "") {
							openingHour = moment(data[0]["startTime"], "HH:mm").format("hh:mm A");
						}

						if (data[0]["endTime"] != "") {
							closingHour = moment(data[0]["endTime"], "HH:mm").format("hh:mm A");
						}

						var ms = moment(endTime, "hh:mm A").diff(moment(startTime, "hh:mm A"));
						var d = moment.duration(ms);
						var hours = parseInt(d.asHours());
						var minutes = parseInt(d.asMinutes()) % 60;
						var totalDuration = "";

						if (hours != 0) {
							totalDuration = hours + " hrs " + minutes + " mins";
						} else {
							totalDuration = minutes + " mins";
						}

						str = `
							<div class="card mb-2 rounded-0" >
								<div class="row no-gutters">
									<div class="col-md-2 text-center my-auto">
											<h5>${totalDuration}</h5>
											<p id="${activities[i].activityID}" class="itineraryTime"><medium class="text-muted">${startTime} - ${endTime}</medium></p>
									</div>

									<div class="col-md-4 my-auto">
											<img src="../../images/${imageUrl}" class="card-img" width="478px"/>
									</div>

									<div class="col-md-6">
										<div class="card-body">
											<h5 id="poiTitle" class="card-title"><a href="../search/specific_gem_design.html?locID=${activities[i].poiUUID}&locType=HG">${data[0]["locTitle"]}</a></h5>
											<p class="card-text mb-2">
												<p class="mb-1"><medium class="text-muted"><i class="far fa-clock"></i> Opening Hours: ${openingHour} - ${closingHour}</medium></p>
												<p class="mb-0"><medium class="text-muted"><i class="fas fa-car"></i><a href="${dirUrl}" target="_blank"> How to get to there?</a></medium></p>
											</p>
											<p class="card-text text-justify">
											${data[0]["locDesc"]}
											</p>

											<button class="btn btn-outline-secondary" style="width: 100px;" id="activity${activities[i].activityID}" data-toggle="modal" data-target="#activityModal${activities[i].activityID}">Change</button>
											<button class="btn btn-outline-danger"style="width: 100px;" id="remove${activities[i].activityID}" data-toggle="modal" data-target="#removeModal${activities[i].activityID}">Remove</button>

										</div>
									</div>
								</div>

								<div class="modal fade" id="activityModal${activities[i].activityID}" tabindex="-1" role="dialog">
									<div class="modal-dialog" role="document">
										<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="lblActivityModal${activities[i].activityID}">${data[0]["locTitle"]}</h5>
											<button type="button" class="close" data-dismiss="modal">
											<span>&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="form-row">
												<div class="form-group col-md-12">
													<label for="ddlDate${activities[i].activityID}">Date of Activity</label>
													<select class="form-control" id="ddlDate${activities[i].activityID}">
													</select>
												</div>
												<div class="form-group col-md-6">
													<label for="tbStartTime${activities[i].activityID}">Start Time</label>
													<input id="tbStartTime${activities[i].activityID}" type="text" class="form-control" value="${activities[i].startTime}" />
												</div>
												<div class="form-group col-md-6">
													<label for="tbEndTime${activities[i].activityID}">End Time</label>
													<input id="tbEndTime${activities[i].activityID}" type="text" class="form-control" value="${activities[i].endTime}" />
												</div>
												<div class="form-group col-md-12">
													<div id="conflictAlert${activities[i].activityID}" class="alert alert-danger mb-0" role="alert" style="display: none;">
														Your start/end time conflict with your existing itinerary!
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
											<button type="button" class="btn btn-danger" onclick="editActivity(${activities[i].activityID})">Save Changes</button>
										</div>
										</div>
									</div>
								</div>

								<div class="modal fade" id="removeModal${activities[i].activityID}" tabindex="-1">
								
									<div class="modal-dialog">
										<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="lblRemoveModal${activities[i].activityID}">Delete Activity</h5>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											Are you sure? This action cannot be undone.
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
											<button type="button" class="btn btn-danger" onclick="deleteActivity(${activities[i].activityID})">Confirm Delete</button>
										</div>
										</div>
									</div>
								</div>
							</div>

							<!-- <div class="bg-white text-dark mt-1 mb-1">
								<div class="pl-5">
									<a href="${dirUrl}" class="mt-2"><medium>How to get to ${data[0].locTitle}?</medium></a>
								</div>
							</div> -->`;

						document.getElementById(moment(activities[i].activityDate).format("DD-MM-YYYY")).innerHTML += str;

						setTimeout(function () {
							$("#tbStartTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								defaultTime: startTime,
								minTime: data[0]["startTime"],
								maxTime: data[0]["endTime"],
								dropdown: true,
								dynamic: false,
								scrollbar: false,
								zindex: 3500,
							});

							$("#tbEndTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								zindex: 3500,
								defaultTime: endTime,
								minTime: data[0]["startTime"],
								maxTime: data[0]["endTime"],
								dropdown: true,
								scrollbar: false,
								// change: function (time) {
								// 	$("#tbStartTime" + activities[i].activityID).timepicker("option", "maxTime", time);
								// },
							});
						}, 300);

						var select = document.getElementById("ddlDate" + activities[i].activityID);

						for (var j = 0; j < dateArray.length; j++) {
							var formattedDate = moment(dateArray[j]).format("DD MMM YYYY");
							var otherFormatDate = moment(dateArray[j]).format("YYYY-MM-DD");

							var elem = document.createElement("option");
							elem.textContent = formattedDate;
							elem.value = otherFormatDate;
							select.appendChild(elem);

							if (otherFormatDate == activities[i].activityDate) {
								elem.selected = true;
							}
						}

						if (ownParam.toLowerCase() != "yes") {
							$("#activity" + activities[i].activityID).attr("style", "display:none");
							$("#remove" + activities[i].activityID).attr("style", "display:none");
						} else {
							$("#activity" + activities[i].activityID).attr("style", "display:''");
							$("#remove" + activities[i].activityID).attr("style", "display:''''");
						}
					},
				});

				sleep(300);
			} else {
				var baseUrl = "https://tih-api.stb.gov.sg/content/v1/";
				var finalUrl = baseUrl + activities[i].locDataset + "?uuid=" + activities[i].poiUUID + "&apikey=" + apiKey;

				$.ajax({
					url: finalUrl,
					type: "GET",
					success: function (responseText) {
						var data = responseText;
						console.log(data);
						var dirUrl =
							"https://www.google.com/maps/dir/?api=1&destination=" +
							data.data[0].location.latitude +
							"," +
							data.data[0].location.longitude;

						var imageUUID = data.data[0].images[0].uuid;
						var imageUrl = "";

						callImage(imageUUID, function (url) {
							imageUrl = url;
						});

						var startTime = moment(activities[i].startTime, "HH:mm:ss A").format("hh:mm A");
						var endTime = moment(activities[i].endTime, "HH:mm:ss A").format("hh:mm A");

						var openingHour = "N/A";
						var closingHour = "N/A";

						if (data.data[0].businessHour[0]["openTime"] != "") {
							openingHour = moment(data.data[0].businessHour[0]["openTime"], "HH:mm").format("hh:mm A");
						}

						if (data.data[0].businessHour[0]["closeTime"] != "") {
							closingHour = moment(data.data[0].businessHour[0]["closeTime"], "HH:mm").format("hh:mm A");
						}

						var ms = moment(endTime, "hh:mm A").diff(moment(startTime, "hh:mm A"));
						var d = moment.duration(ms);
						var hours = parseInt(d.asHours());
						var minutes = parseInt(d.asMinutes()) % 60;
						var totalDuration = "";

						if (hours != 0) {
							totalDuration = hours + " hrs " + minutes + " mins";
						} else {
							totalDuration = minutes + " mins";
						}

						str = `
								<div class="card mb-2 rounded-0" >
									<div class="row no-gutters">
										<div class="col-md-2 text-center my-auto">
												<h5>${totalDuration}</h5>
												<p id="${activities[i].activityID}" class="itineraryTime"><medium class="text-muted">${startTime} - ${endTime}</medium></p>
										</div>

										<div class="col-md-4 my-auto">
												<img src="${imageUrl}" class="card-img" width="478px"/>
										</div>

										<div class="col-md-6">
											<div class="card-body">
												<h5 id="poiTitle" class="card-title"><a href="../search/specific_poi_design.html?uuid=${activities[i].poiUUID}&type=${activities[i].locDataset}&locType=TA">${data.data[0].name}</a></h5>
												<p class="card-text mb-2">
													<p class="mb-1"><medium class="text-muted"><i class="far fa-clock"></i> Opening Hours: ${openingHour} - ${closingHour}</medium></p>
													<p class="mb-0"><medium class="text-muted"><i class="fas fa-car"></i><a href="${dirUrl}" target="_blank"> How to get to there?</a></medium></p>
												</p>
												<p class="card-text text-justify">
													${data.data[0].description}
												</p>

												<button class="btn btn-outline-secondary" style="width: 100px;" id="activity${activities[i].activityID}" data-toggle="modal" data-target="#activityModal${activities[i].activityID}">Change</button>
												<button class="btn btn-outline-danger"style="width: 100px;" id="remove${activities[i].activityID}" data-toggle="modal" data-target="#removeModal${activities[i].activityID}">Remove</button>

											</div>
										</div>
									</div>

									<div class="modal fade" id="activityModal${activities[i].activityID}" tabindex="-1" role="dialog">
										<div class="modal-dialog" role="document">
											<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title" id="lblActivityModal${activities[i].activityID}">${data.data[0].name}</h5>
												<button type="button" class="close" data-dismiss="modal">
												<span>&times;</span>
												</button>
											</div>
											<div class="modal-body">
												<div class="form-row">
													<div class="form-group col-md-12">
														<label for="ddlDate${activities[i].activityID}">Date of Activity</label>
														<select class="form-control" id="ddlDate${activities[i].activityID}">
														</select>
													</div>
													<div class="form-group col-md-6">
														<label for="tbActivity${activities[i].activityID}">Start Time</label>
														<input id="tbStartTime${activities[i].activityID}" type="text" class="form-control" value=${activities[i].startTime} />
													</div>
													<div class="form-group col-md-6">
														<label for="tbActivity${activities[i].activityID}">End Time</label>
														<input id="tbEndTime${activities[i].activityID}" type="text" class="form-control" value=${activities[i].endTime} />
													</div>
													<div class="form-group col-md-12">
														<div id="conflictAlert${activities[i].activityID}" class="alert alert-danger mb-0" role="alert" style="display: none;">
															Your start/end time is invalid!
														</div>
													</div>
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
												<button type="button" class="btn btn-danger" onclick="editActivity(${activities[i].activityID})">Save Changes</button>
											</div>
											</div>
										</div>
									</div>

									<div class="modal fade" id="removeModal${activities[i].activityID}" tabindex="-1">
										<div class="modal-dialog">
											<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title" id="lblRemoveModal${activities[i].activityID}">Delete Activity</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body">
												Are you sure? This action cannot be undone.
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
												<button type="button" class="btn btn-danger" onclick="deleteActivity(${activities[i].activityID})">Confirm Delete</button>
											</div>
											</div>
										</div>
									</div>
								</div>

								<!-- <div class="bg-white text-dark mt-1 mb-1">
									<div class="pl-5">
										<a href="${dirUrl}" class="mt-2"><medium>How to get to ${data.data[0].name}?</medium></a>
									</div>
								</div> -->`;

						document.getElementById(moment(activities[i].activityDate).format("DD-MM-YYYY")).innerHTML += str;

						var select = document.getElementById("ddlDate" + activities[i].activityID);

						/* Populate the dates available to choose from when user wants to edit the activity */
						for (var j = 0; j < dateArray.length; j++) {
							var formattedDate = moment(dateArray[j]).format("DD MMM YYYY");
							var otherFormatDate = moment(dateArray[j]).format("YYYY-MM-DD");

							var elem = document.createElement("option");
							elem.textContent = formattedDate;
							elem.value = otherFormatDate;
							select.appendChild(elem);

							if (otherFormatDate == activities[i].activityDate) {
								elem.selected = true;
							}
						}

						/* Timepicker initialization */
						setTimeout(function () {
							$("#tbStartTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								defaultTime: startTime,
								minTime: openingHour,
								maxTime: closingHour,
								dropdown: true,
								dynamic: false,
								scrollbar: false,
								zindex: 3500,
							});

							$("#tbEndTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								zindex: 3500,
								defaultTime: endTime,
								minTime: openingHour,
								maxTime: closingHour,
								dropdown: true,
								scrollbar: false,
								// change: function (time) {
								// 	$("#tbStartTime" + activities[i].activityID).timepicker("option", "maxTime", time);
								// },
							});
						}, 300);

						/* Disable editing features if user do not own the itinerary */
						if (ownParam.toLowerCase() != "yes") {
							$("#activity" + activities[i].activityID).attr("style", "display:none");
							$("#remove" + activities[i].activityID).attr("style", "display:none");
						} else {
							$("#activity" + activities[i].activityID).attr("style", "display:''");
							$("#remove" + activities[i].activityID).attr("style", "display:''");
						}
					},
				});

				/* delay to allow async to finish before moving on (sequence matter) */
				sleep(300);
			}
		})(i);
	}
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

/* Call the image from another TIH API */
function callImage(imageUUID, callback) {
	var base_url = "https://tih-api.stb.gov.sg/media/v1/image/uuid/";
	var final_url = base_url + imageUUID + "?apikey=" + apiKey;

	var request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var data = JSON.parse(request.responseText);
			var imageUrl = data.data.url;

			if (callback) {
				callback(imageUrl + "?apikey=" + apiKey);
			}
		}
	};

	request.open("GET", final_url, false);
	request.send();
}

/* Allow the user to edit activity based on time and date */
function editActivity(clicked_id) {
	var baseUrl = "../../php/objects/activityUpdate.php";
	var ddlDate = document.getElementById("ddlDate" + clicked_id);
	var startTime = document.getElementById("tbStartTime" + clicked_id).value;
	var endTime = document.getElementById("tbEndTime" + clicked_id).value;

	var checkValid = moment(startTime, "hh:mm A").isBefore(moment(endTime, "hh:mm A"));

	/* before allowing edit, check if time set is valid */
	if (checkValid == true) {
		document.getElementById("conflictAlert" + clicked_id).style.display = "none";

		$.ajax({
			url: baseUrl,
			type: "POST",
			dataType: "json",
			data: {
				activityID: clicked_id,
				activityDate: ddlDate.options[ddlDate.selectedIndex].value,
				startTime: moment(startTime, "hh:mm A").format("HH:mm"),
				endTime: moment(endTime, "hh:mm A").format("HH:mm"),
			},
		}).done(function (responseText) {
			if (responseText == 1) {
				window.location.reload();
			}
		});
	} else {
		document.getElementById("conflictAlert" + clicked_id).style.display = "";
	}
}

/* delete activity */
function deleteActivity(clicked_id) {
	var baseUrl = "../../php/objects/activityDelete.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { activity_id: clicked_id },
	}).done(function (responseText) {
		if (responseText == 1) {
			window.location.reload();
		}
	});
}

/* Show the print display */
function display() {
	window.print();
}

/* Shareable link */
function shareItinerary() {
	$("#successLink").attr("style", "display:none");
	$("#shareModal").modal("show");
	$("#tbShareLink").val(window.location.href.split("&")[0] + "&own=no");
}

/* Shareable link */
function copyLink() {
	/* Get the text field */
	var copyText = document.getElementById("tbShareLink");

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	/* Copy the text inside the text field */
	document.execCommand("copy");

	$("#successLink").attr("style", "display:''");
}

/* Allow user to copy itinerary and save as their own */
function copyItinerary() {
	var idParam = new URL(window.location.href).searchParams.get("id");
	var baseUrl = "../../php/objects/itineraryCopy.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { itinerary_id: idParam, userID: sessionStorage.getItem("userID") },
	}).done(function (responseText) {
		var url = "itinerary_details.html?id=" + responseText + "&own=yes";
		$("#copyStatusTitle").html("Success");
		$("#copyStatusMsg").html("This itinerary has been successfully copied to your profile.");
		$("#copySuccessModal").modal("show");
		$("#btnGoToCopied").attr("onclick", "redirectCopied(" + responseText + ")");
	});
}

function redirectCopied(id) {
	window.location.href = "itinerary_details?id=" + id + "&own=yes";
}

/* Edit itinerary title */
function editItinerary() {
	var idParam = new URL(window.location.href).searchParams.get("id");
	var baseUrl = "../../php/objects/itineraryUpdateName.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { itinerary_id: idParam, name: $("#tbItineraryTitle").val() },
	}).done(function (responseText) {
		if (responseText == 1) {
			window.location.reload();
		}
	});
}

/* Search result */
function redirect_to_poi(keyword) {
	window.location.href = "../search/search.html?keyword=" + keyword;
}

/* Check if sessionStorage exist */
function checkUser() {
	if (sessionStorage.getItem("userID") === null) {
		window.location.href = "../../index.html";
	} else {
		document.getElementById("signOutDiv").setAttribute("style", "display:block;");
		document.getElementById("signUpDiv").setAttribute("style", "display:none;");
	}
}

/* Clear sessionStorage upon log out */
function logOut() {
	window.location.href = "../../index.html";
	sessionStorage.clear();
}
