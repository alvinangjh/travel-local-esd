function call_poi_manager(keyword, categories){
    var base_url = 'http://localhost:8080/api/managePOI/search/';
    var hg_list = [];
    var stb_list = [];
    var request = new XMLHttpRequest();
    request.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(request.responseText);
            var new_str = '';
            if(Array.isArray(data.hgData)){
                for(hg of data.hgData){
                    new_str += parsing_data(hg,'HG')
                    hg_list.push(hg);
                }
            }
            if(Array.isArray(data.stbData)){
                for(stb of data.stbData){
                    new_str += parsing_data(stb,'TA')           
                    stb_list.push(stb);
                }
            }
            document.getElementById("insert_poi_result").innerHTML = new_str + "</div> </div>";

            stb_list = JSON.stringify(stb_list);
            hg_list = JSON.stringify(hg_list);
            
            sessionStorage.setItem('stb_list', stb_list);
            sessionStorage.setItem('hg_list', hg_list);
        


        } else if (this.readyState == 4) {
			var new_str = "<span class='display-4'>No search result has been found</span>";
			document.getElementById("insert_poi_result").innerHTML = new_str;
		}
    }

	if(typeof(keyword) == null){
		keyword = ''
	}

    var url = base_url + keyword + "?userID=" + sessionStorage.getItem("userID")

    request.open("GET", url, true);

	request.send();
}


function parsing_data(data, type_of_data){
    var name = data.name;
    var imageURL = data.imageUrl;
    var locCategory = data.locCategory;
    var desc = data.description;
    var poiUUID = data.poiUUID;

    poi_html = display_poi(name,imageURL, poiUUID, locCategory, desc, type_of_data);

    return poi_html;    

}   



function display_poi(name, image_uuid, uuid, category, description, type_of_data) {
	const apiKey = "i9IigYi6bl70KMqOcpewpzHHQ2NanEqx";
	// console.log(type_of_data)
	// var category_type = type_of_dataset(category);

    if(type_of_data == 'TA'){
	    var image_link = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + image_uuid + "?apikey=" + apiKey;
    }
    else {
        var image_link = '../../images/' + image_uuid;
    }

	var search_poi_html = `
	                    <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-5">
                                    <img src="${image_link}" class="card-img stretched-link " onclick="redirect('${uuid}','${category}','${type_of_data}')" alt="${name}" style='height:250px;'>                                 
                                </div>
                                <div class="col-md-7 w-100">
                                    <div class="card-body">
                                        <h5 class="card-title">${name}</h5>
                                        <p class="card-text">${description}</p>
                                        <a onclick="redirect('${uuid}','${category}','${type_of_data}')" class="btn btn-danger stretched-link">More details</a>     
                                    </div>
                                </div>
                            </div>
                        </div>`;

	return search_poi_html;
}


function search_onload() {
	checkUser();

	if(new URL(window.location.href).searchParams.get("keyword") == null){
		window.location.href = "search.html?keyword=" + "&userID=" + sessionStorage.getItem("userID")
	}
	document.getElementById("searching_poi").value = new URL(window.location.href).searchParams.get("keyword");
	var keyword = new URL(window.location.href).searchParams.get("keyword");
	document.getElementById("insert_search_title").innerHTML = keyword;
	call_poi_manager(keyword, "all");
}

function checkUser() {
	if (sessionStorage.getItem("userID") === null) {
		window.location.href = "../../index.html";
	} else {
		document.getElementById("signOutDiv").setAttribute("style", "display:block;");
		document.getElementById("signUpDiv").setAttribute("style", "display:none;");
	}
}

function logOut() {
	window.location.href = "../../index.html";
	sessionStorage.clear();
}

function filter() {
	var checkboxes = document.getElementsByName("categories");
	var categories_array = [];

	for (var checkbox of checkboxes) {
		if (checkbox.checked) {
			categories_array.push(checkbox.getAttribute("value"));
		}
	}

	if (document.getElementById("tourist_attractions").checked) {

		let data = sessionStorage.getItem('stb_list');
		data = JSON.parse(data);

		new_str = ''
		for(i=0; data.length > i;i++){
			if((categories_array.includes(data[i].locCategory)) || (categories_array.length == 0)){
				new_str += parsing_data(data[i], 'TA');
			}
		}
		document.getElementById("insert_poi_result").innerHTML = new_str + "</div> </div>";

	} 
	
	else if(document.getElementById("hidden_gem").checked) {

        let data = sessionStorage.getItem('hg_list');
        data = JSON.parse(data);

        new_str = ''
        for(i=0; data.length > i;i++){
            if((categories_array.includes(data[i].locCategory)) || (categories_array.length == 0)){
		        new_str += parsing_data(data[i], 'HG');
            }
        }	
        document.getElementById("insert_poi_result").innerHTML = new_str + "</div> </div>";
	}
	else{

		let data_hg = sessionStorage.getItem('hg_list');
		let data_ta = sessionStorage.getItem('stb_list');
        data_hg = JSON.parse(data_hg);
		data_ta = JSON.parse(data_ta);

        new_str = ''
        for(i=0; data_hg.length > i;i++){
            if((categories_array.includes(data_hg[i].locCategory)) || (categories_array.length == 0)){
		        new_str += parsing_data(data_hg[i], 'HG');
            }
        }

		for(i=0; data_ta.length > i;i++){
            if((categories_array.includes(data_ta[i].locCategory)) || (categories_array.length == 0)){
		        new_str += parsing_data(data_ta[i], 'TA');
            }
        }

		document.getElementById("insert_poi_result").innerHTML = new_str + "</div> </div>";

	}
}

function new_search() {
    var checkboxes = document.getElementsByName("categories");
    var categories_array = [];

    for (var checkbox of checkboxes) {
        if (checkbox.checked) {
            categories_array.push(checkbox.getAttribute("value"));
        }
    }
    if (history.pushState) {
        var newUrl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?keyword=" +
            document.getElementById("searching_poi").value
			+ "&userID=" + sessionStorage.getItem("userID");
        window.history.pushState({ path: newUrl }, "", newUrl);
    }

    // document.getElementById("insert_search_title").innerHTML = new URL(window.location.href).searchParams.get("keyword");
    // var keyword = new URL(window.location.href).searchParams.get("keyword");
    // call_poi_manager(keyword, categories_array);
	window.location.href = window.location.href;
    
}

function redirect(uuid, category, type_of_data) {
	window.location.href = "specific_poi_design.html?uuid=" + uuid + "&category=" + category + "&locType=" + type_of_data;
}


function call_uuid_api(uuid, category, locType) {
	checkUser();

	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(request.responseText).data;
	
			var title = data.name;
			var rating = data.rating;
			var description = data.description;
			var reviews = data.reviews; // arrayF
			var lat = data.latitude;
			var lng = data.longitude;
			var postal = data.postalCode;
			var type_of_poi = data.locCategory;
            var business_hours = {'openTime': data.openTime, 'closeTime' : data.closeTime};
            var hp_contact = data.businessContact;
            var email = data.businessEmail;
            var website = data.businessWeb;
            var image_uuid = data.imageUrl;

			display_specific_poi(
				image_uuid,
				title,
				rating,
				hp_contact,
				description,
				business_hours,
				lat,
				lng,
				postal,
				type_of_poi,
				reviews,
				email,
				website,
				locType
			);
		}
	};

	var base_url = "http://localhost:8080/api/managePOI/search/" 
	var final_url = base_url + locType + '/' + uuid + '/' + category + "?userID=" + sessionStorage.getItem("userID")
    // console.log(final_url)
	request.open("GET", final_url, true);

	request.send();
}

function display_specific_poi(
	image_uuid,
	title,
	rating,
	hp_contact,
	description,
	business_hours,
	lat,
	lng,
	postal,
	type_of_poi,
	reviews,
	email,
	website,
	locType
) {
	var insert_poi = document.getElementById("insert_poi");
	const apiKey = "i9IigYi6bl70KMqOcpewpzHHQ2NanEqx";
	var map_link = call_onemap_api(lat, lng, postal);
	
	if(locType == 'TA'){
		var image_link = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + image_uuid + "?apikey=" + apiKey;
	}
	else{
		var image_link = '../../images/' + image_uuid;
	}

	insert_poi.setAttribute("style", "width:80%; margin:auto;");
	// insert_poi.setAttribute('class','row');

	document.getElementById("siteTitle").innerText = title;

	var poi_html = `<div class='mt-4'>                 
                                    <div id='title'>
										<p class='h2'>${title}</p>
										<h5 class='text-muted'>${type_of_poi}</h5>
                                    </div>
                            </div>
                            <div id='poi_category' class='row'>
                                    <h4 class='col-4 text-muted'> ${creating_stars_html(Math.floor(rating))}</h4>
                            </div>
                        
                            <div class='row'>
                                <div class='col-7'>
                                    <div id='poi_image'>
                                        <img src="${image_link}" alt="${title}" class="img-thumbnail" style='width: 100%; height: 100%;'>
                                    </div>
                                    <div id='poi_description'>
                                        <p>${description}</p>
                                    </div>
                                </div>
                                

                            <div class='col'>

                                <div id='poi_business_hours'>
                                    <h6>Business Hours</h6>
                                    <p>Opening hours: ${business_hours["openTime"]} - ${business_hours["closeTime"]}</p> <br>
                                </div>
                                <div id='poi_contact'>
                                    <h6>Contact</h6>
                                    <p>Email: ${email} </br>
                                    Phone: ${hp_contact} </br>
                                    Website: ${website}</p> 
                                </div>
                                <div id='poi_itinerary_creation' style='width: 100%;'>
                                    <h6>Create an itinerary with ${title}</h6>
                                    <button type="button" class="btn btn-danger btn-block w-50" onclick="startPlanning()">Start Planning</button>
                                </div>
                                <div id='onemap_image' class='mt-3'>
                                    <img src='${map_link}' alt='map' class="img-thumbnail">
                                </div>
                            </div>
                        </div>`;

	insert_poi.innerHTML = poi_html + review_section(reviews, rating);
	window.scrollTo(0, 0);

	var startTime = moment(business_hours["openTime"], "hh:mm A").format("HH:mm");
	var endTime = moment(business_hours["closeTime"], "hh:mm A").format("HH:mm");
	
	if (startTime > endTime) {
		$("#startTime").timepicker({
			timeFormat: "hh:mm p",
			interval: 15,
			defaultTime: startTime,
			minTime: startTime,
			maxTime: "11:45 PM",
			dropdown: true,
			dynamic: true,
			scrollbar: false,
			zindex: 3500,
		});

		$("#endTime").timepicker({
			timeFormat: "hh:mm p",
			interval: 15,
			defaultTime: "11:45 PM",
			minTime: startTime,
			maxTime: "11:45 PM",
			dropdown: true,
			dynamic: true,
			scrollbar: false,
			zindex: 3500,
		});
	} else {
		$("#startTime").timepicker({
			timeFormat: "hh:mm p",
			interval: 15,
			defaultTime: startTime,
			minTime: startTime,
			maxTime: endTime,
			dropdown: true,
			dynamic: true,
			scrollbar: false,
			zindex: 3500,
		});

		$("#endTime").timepicker({
			timeFormat: "hh:mm p",
			interval: 15,
			defaultTime: endTime,
			minTime: startTime,
			maxTime: endTime,
			dropdown: true,
			dynamic: true,
			scrollbar: false,
			zindex: 3500,
		});
	}
	// $("#startTime").timepicker("option", "minTime", startTime);
	// $("#startTime").timepicker("option", "defaultTime", startTime);
}

function call_onemap_api(lat, lng, postal) {
	var layerchosen = "layerchosen=default";
	var new_lat = "&lat=" + lat;
	var new_lng = "&lng=" + lng;
	var new_postal = "&postal=" + postal;
	var zoom = "&zoom=17"; // 11-19
	var width = "&width=512"; //128 - 512
	var height = "&height=512"; //128-512
	var points = `&points=[${lat},${lng},"255,255,178","A"]`; //optional, to have a pointer on the map

	var onemap_image =
		`https://developers.onemap.sg/commonapi/staticmap/getStaticImage?` +
		layerchosen +
		new_lat +
		new_lng +
		new_postal +
		zoom +
		width +
		height +
		points;

	return onemap_image;
}


function review_section(reviews, rating) {
	var number = Math.floor(rating); // integer only please jerriel, i wanna cyr
	var header_html = "";

	if (reviews != null) {
		header_html += creating_reviews_html(reviews);
	}

	return header_html;
	// document.getElementById('insert_poi').innerHTML = header_html;
}

function creating_stars_html(number) {
	var stars_html = "";
	for (i = 0; i < number; i++) {
		stars_html += ` 			
					<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
					  <span class="fas fa-star" aria-hidden="true"></span>
					</button>`;
	}
	for (i = 0; i < 5 - number; i++) {
		stars_html += `
                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                            <span class="fas fa-star" aria-hidden="true"></span>
                        </button>`;
	}
	return stars_html;
}

function creating_reviews_html(reviews) {
	var reviews_html = `<div class="row">
                                <div class="col-sm-12">
                                    <hr/>
                                    <div class="review-block">`;

	for (j = 0; j < reviews.length; j++) {
		// var temp = reviews[j]['time'].split('T');
		// var date = temp[0];
		// var time = temp[1].slice(0,temp[1].length-1);
		var title = reviews[j].text.split(".")[0];
		reviews_html += `<div class="row">
                                        <div class="col-sm-3">
                                            <img src="${reviews[j].profilePhoto}" class="img-rounded" style='width: 100px; height: 100px;'>
                                            <div class="review-block-name ml-3"><a href="${reviews[j].authorURL}">${reviews[j].authorName}</a></div>
                                            <div class="review-block-date"><br/></div>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="review-block-rate">`;
		reviews_html += creating_stars_html(Math.floor(reviews[j].rating));
		reviews_html += `</div>
                                            <div class="review-block-title">${title}</div>
                                            <div class="review-block-description">${reviews[j].text}</div>
                                        </div>
                                    </div>
                                    <hr/>`;
	}
	reviews_html += `				</div>
                                </div>
                            </div>
                        </div>`;

	return reviews_html;
}

function redirect_to_search_page(keyword) {
	window.location.href = "search.html?keyword=" + keyword;
}

function startPlanning() {
	var url = "http://localhost:8080/api/itinerary/itinerary/all/" + sessionStorage.getItem("userID") + "?userID=" + sessionStorage.getItem("userID");

	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			$("#ddlActivityDate").empty();
			$("#ddlItinerary").empty();
			var data = JSON.parse(request.responseText).data;
			// console.log(data)
			if (data.length == 0) {
				$("#emptyModal").modal("show");
			} else {
				sessionStorage.setItem("test", request.responseText);
				var selectElem = document.getElementById("ddlItinerary");

				for (item of data) {
					var el = document.createElement("option");
					el.textContent = item.name;
					el.value = item.itineraryID;
					selectElem.appendChild(el);
				}

				var dateArray = getDates(new Date(data[0].startDate), new Date(data[0].endDate));

				var activityElem = document.getElementById("ddlActivityDate");

				for (var j = 0; j < dateArray.length; j++) {
					var formattedDate = moment(dateArray[j]).format("DD MMM YYYY");
					var otherFormatDate = moment(dateArray[j]).format("YYYY-MM-DD");

					var elem = document.createElement("option");
					elem.textContent = formattedDate;
					elem.value = otherFormatDate;
					activityElem.appendChild(elem);
				}

				$("#exampleModal").modal("show");
			}
		}
	};

	request.open("GET", url, true);

	request.send();
}

function getDates(startDate, stopDate) {
	var dateArray = new Array();
	var currentDate = startDate;
	while (currentDate <= stopDate) {
		dateArray.push(currentDate);
		currentDate = currentDate.addDays(1);
	}
	return dateArray;
}

Date.prototype.addDays = function (days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};

function addActivity() {
	if (new URL(window.location.href).searchParams.get("locID") != null) {
		var poiUUID = new URL(window.location.href).searchParams.get("locID");
	} else {
		var poiUUID = new URL(window.location.href).searchParams.get("uuid");
	}

	var locType = new URL(window.location.href).searchParams.get("locType");
	var selectedItinerary = $("#ddlItinerary :selected").val();
	var startTime = moment($("#startTime").val(), ["hh:mm A"]).format("HH:mm");
	var endTime = moment($("#endTime").val(), ["hh:mm A"]).format("HH:mm");
	var activityDate = $("#ddlActivityDate :selected").val();
	var locDataset = new URL(window.location.href).searchParams.get("category");
	$("#btnGoToItinerary").attr("onclick", "goToItinerary(" + selectedItinerary + ")");

	var checkValid = moment(startTime, "HH:mm").isBefore(moment(endTime, "HH:mm"));

	var url = "http://localhost:8080/api/manageItinerary/itr/addEvent" + "?userID=" + sessionStorage.getItem("userID");

	if (checkValid == true) {
		document.getElementById("conflictAlert").style.display = "none";
		// console.log(selectedItinerary)
		var activity = {
			poiUUID: poiUUID,
			startTime: startTime,
			endTime: endTime,
			eventDate: activityDate,
			locType: locType,
			locCategory: locDataset,
			itineraryID: selectedItinerary,
		};

		var data = JSON.stringify(activity);

		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 201) {
				//hide success modal
				return_data = JSON.parse(request.responseText).code
				if (return_data == 201) {
					$("#exampleModal").modal("hide");
					$("#successModal").modal("show");
				}
			}
		};

		request.open("POST", url, true);

		request.setRequestHeader("Content-type", "application/json;charset=UTF-8");

		request.send(data);
	} else {
		document.getElementById("conflictAlert").style.display = "";
	}
}

function filterActivityDate() {
	var selected = $("#ddlItinerary option:selected").val();
	var data = JSON.parse(sessionStorage.getItem("test")).data;
	// console.log(data)
	for (item of data) {
		if (item.itineraryID == selected) {
			var dateArray = getDates(new Date(item.startDate), new Date(item.endDate));

			$("#ddlActivityDate").empty();

			for (var j = 0; j < dateArray.length; j++) {
				var formattedDate = moment(dateArray[j]).format("DD MMM YYYY");
				var otherFormatDate = moment(dateArray[j]).format("YYYY-MM-DD");

				var elem = document.createElement("option");
				elem.textContent = formattedDate;
				elem.value = otherFormatDate;
				$("#ddlActivityDate").append(elem);
			}
		}
	}
}

function goToItinerary(id) {
	window.location.href = "../itinerary_detail/itinerary_details.html?id=" + id + "&own=yes";
}