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

/* Retrieve all activities under the same itinerary */
function retrieveActivity() {
	/* Check if sessionStorage exist for userID
	If not send the user back to login html */
	checkUser();

	var itineraryID = new URL(window.location.href).searchParams.get("id");

	var activities = [];
	var baseUrl = "http://localhost:8080/api/manageItinerary/itr/allEvents/" + itineraryID + "?userID=" + sessionStorage.getItem("userID");

	$.ajax({
		url: baseUrl,
		type: "GET",
		dataType: "json",
	}).done(function (responseText) {
		var eventData = responseText["eventData"];
		const datetimes = [eventData[0]]

		const sorted = datetimes[0].sort((a, b) => {
			const aDate = new Date(moment(a.eventDate).format("DD MMM YYYY") + " " + a.startTime);
			const bDate = new Date(moment(b.eventDate).format("DD MMM YYYY") + " " + b.startTime);
			return aDate.getTime() - bDate.getTime();
		});
		
		for (item of sorted) {
			var activity = {
				activityID: item.eventID,
				poiUUID: item.poiUUID,
				startTime: item.startTime,
				endTime: item.endTime,
				activityDate: item.eventDate,
				locType: item.locType,
				locDataset: item.locCategory,
				locDesc: item["POIDetails"].description,
				openingHour: item["POIDetails"].openTime,
				closingHour: item["POIDetails"].closeTime,
				latitude: item["POIDetails"].latitude,
				longitude: item["POIDetails"].longitude,
				locTitle: item["POIDetails"].name,
				imageUrl: item["POIDetails"].imageUrl,
			};
			activities.push(activity);
		}

		generateDay(itineraryID, activities);
	});
}

/* Generate the skeleton for all the days of the itinerary */
function generateDay(itineraryID, activities) {

	var baseUrl = "http://localhost:8080/api/manageItinerary/itr/allEvents/" + itineraryID + "?userID=" + sessionStorage.getItem("userID");

	$.ajax({
		url: baseUrl,
		type: "GET",
		dataType: "json",
	}).done(function (responseText) {
		var result = responseText["itiData"];

		document.getElementById("siteHeader").innerText = result.name;
		document.getElementById("itineraryTheme").href = "itinerary_" + result.theme.toLowerCase() + ".css";
		document.getElementById(
			"itinerary_name"
		).innerHTML = `${result.name} <button id="btnEditTitle" class="btn btn-lg p-0" data-toggle="modal" data-target="#editItineraryModal"><i class="icon fas fa-edit pb-2" style="height: 100%"></i></button>`;
		$("#tbItineraryTitle").val(result.name);
		document.getElementById("itinerary_date").innerText =
			moment(result.startDate).format("ddd, DD MMM YYYY") + " - " + moment(result.endDate).format("ddd, DD MMM YYYY");

		var dateArray = getDates(new Date(result.startDate), new Date(result.endDate));

		/* Assign correct icons according to the itinerary type/theme */
		for (var i = 0; i < dateArray.length; i++) {
			var formattedDate = moment(dateArray[i]).format("DD-MM-YYYY");
			var itineraryDays = document.getElementById("itinerary_days");

			if (result.theme.toLowerCase() == "romantic") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-heart"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result.theme.toLowerCase() == "family") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-home"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result.theme.toLowerCase() == "nature") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-leaf"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result.theme.toLowerCase() == "casual") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-shoe-prints"></i> 
			Day ${i + 1}</a></h5>`;
			}
		}

		populateItinerary(activities, result.startDate, result.endDate);
	});
}

/* Retrieve all the activities in the itinerary from TIH API or MySQL */
function populateItinerary(activities, startDate, endDate) {
	var str = "";

	var dateArray = getDates(new Date(startDate), new Date(endDate));

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
		if (activities[i].locType == "HG") {
			var activityID = activities[i].eventID;
			var locTitle = activities[i].locTitle;
			var locDesc = activities[i].locDesc;
			var poiUUID = activities[i].poiUUID;
			var activityDate = activities[i].activityDate;

			var dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + activities[i].latitude + "," + activities[i].longitude;

			var imageUrl = activities[i].imageUrl;

			var startTime = moment(activities[i].startTime, "HH:mm:ss A").format("hh:mm A");
			var endTime = moment(activities[i].endTime, "HH:mm:ss A").format("hh:mm A");

			var openingHour = "N/A";
			var closingHour = "N/A";

			if (activities[i].startTime != "") {
				openingHour = moment(activities[i].openingHour, "HH:mm").format("hh:mm A");
			}

			if (activities[i].endTime != "") {
				closingHour = moment(activities[i].closingHour, "HH:mm").format("hh:mm A");
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
								<p id="${activityID}" class="itineraryTime"><medium class="text-muted">${startTime} - ${endTime}</medium></p>
						</div>

						<div class="col-md-4 my-auto">
								<img src="../../images/${imageUrl}" class="card-img" width="478px"/>
						</div>

						<div class="col-md-6">
							<div class="card-body">
								<h5 id="poiTitle" class="card-title"><a href="../search/specific_gem_design.html?locID=${poiUUID}&locType=HG">${locTitle}</a></h5>
								<p class="card-text mb-2">
									<p class="mb-1"><medium class="text-muted"><i class="far fa-clock"></i> Opening Hours: ${openingHour} - ${closingHour}</medium></p>
									<p class="mb-0"><medium class="text-muted"><i class="fas fa-car"></i><a href="${dirUrl}" target="_blank"> How to get to there?</a></medium></p>
								</p>
								<p class="card-text text-justify">
								${locDesc}
								</p>

								<button class="btn btn-outline-secondary" style="width: 100px;" id="activity${activityID}" data-toggle="modal" data-target="#activityModal${activityID}">Change</button>
								<button class="btn btn-outline-danger"style="width: 100px;" id="remove${activityID}" data-toggle="modal" data-target="#removeModal${activityID}">Remove</button>

							</div>
						</div>
					</div>

					<div class="modal fade" id="activityModal${activityID}" tabindex="-1" role="dialog">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="lblActivityModal${activityID}">${locTitle}</h5>
								<button type="button" class="close" data-dismiss="modal">
								<span>&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="form-row">
									<div class="form-group col-md-12">
										<label for="ddlDate${activityID}">Date of Activity</label>
										<select class="form-control" id="ddlDate${activityID}">
										</select>
									</div>
									<div class="form-group col-md-6">
										<label for="tbStartTime${activityID}">Start Time</label>
										<input id="tbStartTime${activityID}" type="text" class="form-control" value="${startTime}" />
									</div>
									<div class="form-group col-md-6">
										<label for="tbEndTime${activityID}">End Time</label>
										<input id="tbEndTime${activityID}" type="text" class="form-control" value="${endTime}" />
									</div>
									<div class="form-group col-md-12">
										<div id="conflictAlert${activityID}" class="alert alert-danger mb-0" role="alert" style="display: none;">
											Your start/end time conflict with your existing itinerary!
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-danger" onclick="editActivity(${activityID})">Save Changes</button>
							</div>
							</div>
						</div>
					</div>

					<div class="modal fade" id="removeModal${activityID}" tabindex="-1">
					
						<div class="modal-dialog">
							<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="lblRemoveModal${activityID}">Delete Activity</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								Are you sure? This action cannot be undone.
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-danger" onclick="deleteActivity(${activityID})">Confirm Delete</button>
							</div>
							</div>
						</div>
					</div>
				</div>

				<!-- <div class="bg-white text-dark mt-1 mb-1">
					<div class="pl-5">
						<a href="${dirUrl}" class="mt-2"><medium>How to get to ${locTitle}?</medium></a>
					</div>
				</div> -->`;

			$("#" + moment(activityDate).format("DD-MM-YYYY")).append(str);

			$("#tbStartTime" + activityID).timepicker({
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

			$("#tbEndTime" + activityID).timepicker({
				timeFormat: "hh:mm p",
				interval: 15,
				zindex: 3500,
				defaultTime: endTime,
				minTime: openingHour,
				maxTime: closingHour,
				dropdown: true,
				scrollbar: false,
			});

			var select = document.getElementById("ddlDate" + activityID);

			for (var j = 0; j < dateArray.length; j++) {
				var formattedDate = moment(dateArray[j]).format("DD MMM YYYY");
				var otherFormatDate = moment(dateArray[j]).format("YYYY-MM-DD");

				var elem = document.createElement("option");
				elem.textContent = formattedDate;
				elem.value = otherFormatDate;
				select.appendChild(elem);

				if (otherFormatDate == activityDate) {
					elem.selected = true;
				}
			}

		} else {
			var activityID = activities[i].eventID;
			var locTitle = activities[i].locTitle;
			var locDesc = activities[i].locDesc;
			var poiUUID = activities[i].poiUUID;
			var activityDate = activities[i].activityDate;
			var locDataset = activities[i].locCategory;

			var dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + activities[i].latitude + "," + activities[i].longitude;

			var imageUrl = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + activities[i].imageUrl + "?apikey=jKNTmdblMsxZWS3mrwmxz7i5fujbBlZU";

			var startTime = moment(activities[i].startTime, "HH:mm:ss A").format("hh:mm A");
			var endTime = moment(activities[i].endTime, "HH:mm:ss A").format("hh:mm A");

			var openingHour = "N/A";
			var closingHour = "N/A";

			if (activities[i].openingHour != "") {
				openingHour = moment(activities[i].openingHour, "hh:mm A").format("hh:mm A");
			}

			if (activities[i].closingHour != "") {
				closingHour = moment(activities[i].closingHour, "hh:mm A").format("hh:mm A");
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
							<p id="${activityID}" class="itineraryTime"><medium class="text-muted">${startTime} - ${endTime}</medium></p>
					</div>

					<div class="col-md-4 my-auto">
							<img src="${imageUrl}" class="card-img" width="478px"/>
					</div>

					<div class="col-md-6">
						<div class="card-body">
							<h5 id="poiTitle" class="card-title"><a href="../search/specific_poi_design.html?uuid=${poiUUID}&type=${locDataset}&locType=TA">${locTitle}</a></h5>
							<p class="card-text mb-2">
								<p class="mb-1"><medium class="text-muted"><i class="far fa-clock"></i> Opening Hours: ${openingHour} - ${closingHour}</medium></p>
								<p class="mb-0"><medium class="text-muted"><i class="fas fa-car"></i><a href="${dirUrl}" target="_blank"> How to get to there?</a></medium></p>
							</p>
							<p class="card-text text-justify">
								${locDesc}
							</p>

							<button class="btn btn-outline-secondary" style="width: 100px;" id="activity${activities[i].activityID}" data-toggle="modal" data-target="#activityModal${activityID}">Change</button>
							<button class="btn btn-outline-danger"style="width: 100px;" id="remove${activities[i].activityID}" data-toggle="modal" data-target="#removeModal${activityID}">Remove</button>

						</div>
					</div>
				</div>

				<div class="modal fade" id="activityModal${activityID}" tabindex="-1" role="dialog">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="lblActivityModal${activityID}">${locTitle}</h5>
							<button type="button" class="close" data-dismiss="modal">
							<span>&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="form-row">
								<div class="form-group col-md-12">
									<label for="ddlDate${activityID}">Date of Activity</label>
									<select class="form-control" id="ddlDate${activityID}">
									</select>
								</div>
								<div class="form-group col-md-6">
									<label for="tbActivity${activityID}">Start Time</label>
									<input id="tbStartTime${activityID}" class="timepicker form-control" value="${startTime}" />
								</div>
								<div class="form-group col-md-6">
									<label for="tbActivity${activityID}">End Time</label>
									<input id="tbEndTime${activityID}" type="text" class="timepicker form-control" value="${endTime}" />
								</div>
								<div class="form-group col-md-12">
									<div id="conflictAlert${activityID}" class="alert alert-danger mb-0" role="alert" style="display: none;">
										Your start/end time is invalid!
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-danger" onclick="editActivity(${activityID})">Save Changes</button>
						</div>
						</div>
					</div>
				</div>

				<div class="modal fade" id="removeModal${activityID}" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="lblRemoveModal${activityID}">Delete Activity</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							Are you sure? This action cannot be undone.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-danger" onclick="deleteActivity(${activityID})">Confirm Delete</button>
						</div>
						</div>
					</div>
				</div>
			</div>`;

			$("#" + moment(activityDate).format("DD-MM-YYYY")).append(str);

			var select = document.getElementById("ddlDate" + activityID);

			/* Populate the dates available to choose from when user wants to edit the activity */
			for (var j = 0; j < dateArray.length; j++) {
				var formattedDate = moment(dateArray[j]).format("DD MMM YYYY");
				var otherFormatDate = moment(dateArray[j]).format("YYYY-MM-DD");

				var elem = document.createElement("option");
				elem.textContent = formattedDate;
				elem.value = otherFormatDate;
				select.appendChild(elem);

				if (otherFormatDate == activityDate) {
					elem.selected = true;
				}
			}

			/* Timepicker initialization */
			$("#tbStartTime" + activityID).timepicker({
				timeFormat: "hh:mm p",
				interval: 15,
				defaultTime: startTime,
				minTime: "09:00 AM",
				maxTime: "02:00 PM",
				dropdown: true,
				dynamic: false,
				scrollbar: false,
				zindex: 3500,
			});

			$("#tbEndTime" + activityID).timepicker({
				timeFormat: "hh:mm p",
				interval: 15,
				defaultTime: endTime,
				minTime: openingHour,
				maxTime: closingHour,
				dropdown: true,
				dynamic: false,
				scrollbar: false,
				zindex: 3500,
			});
		}
	}
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

/* Allow the user to edit activity based on time and date */
function editActivity(clicked_id) {
	var baseUrl = "http://localhost:8080/api/itinerary/event/update/" + clicked_id;
	var ddlDate = document.getElementById("ddlDate" + clicked_id);
	var startTime = document.getElementById("tbStartTime" + clicked_id).value;
	var endTime = document.getElementById("tbEndTime" + clicked_id).value;

	var checkValid = moment(startTime, "hh:mm A").isBefore(moment(endTime, "hh:mm A"));

	/* before allowing edit, check if time set is valid */
	if (checkValid == true) {
		document.getElementById("conflictAlert" + clicked_id).style.display = "none";

		$.ajax({
			url: baseUrl,
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify({
				eventDate: ddlDate.options[ddlDate.selectedIndex].value,
				startTime: moment(startTime, "hh:mm A").format("HH:mm"),
				endTime: moment(endTime, "hh:mm A").format("HH:mm"),
			}),
		}).done(function (responseText) {
			if (responseText["code"] == 200) {
				window.location.reload();
			}
		});
	} else {
		document.getElementById("conflictAlert" + clicked_id).style.display = "";
	}
}

/* delete activity */
function deleteActivity(clicked_id) {
	var baseUrl = "http://localhost:8080/api/itinerary/event/delete/" + clicked_id;

	$.ajax({
		url: baseUrl,
		method: "DELETE",
	}).done(function (responseText) {
		if (responseText["code"] == 200) {
			window.location.reload();
		}
	});
}

/* Edit itinerary title */
function editItinerary() {
	var itineraryID = new URL(window.location.href).searchParams.get("id");
	var baseUrl = "http://localhost:8080/api/itinerary/itinerary/update/" + itineraryID;

	$.ajax({
		url: baseUrl,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify({ name: $("#tbItineraryTitle").val() }),
	}).done(function (responseText) {
		if (responseText["code"] == 200) {
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
