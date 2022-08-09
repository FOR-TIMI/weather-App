// Setting the sidebar toggle
const menuToggle = $('#menu-toggle');
const sideBar = $('.sidebar');
const searchForm = $('.search-form');
const searchButtonIcon = $('.ti-search');



$('.current-date').text(moment().format('dddd MMMM Do'))

menuToggle.on("click", function(){
    sideBar.toggleClass('active'); 
}) 

searchButtonIcon.on("click", function(){
    sideBar.toggleClass('active'); 
}) 


const countryList = [
	'Afghanistan',
	'Albania',
	'Algeria',
	'Andorra',
	'Angola',
	'Anguilla',
	'Antigua &amp; Barbuda',
	'Argentina',
	'Armenia',
	'Aruba',
	'Australia',
	'Austria',
	'Azerbaijan',
	'Bahamas',
	'Bahrain',
	'Bangladesh',
	'Barbados',
	'Belarus',
	'Belgium',
	'Belize',
	'Benin',
	'Bermuda',
	'Bhutan',
	'Bolivia',
	'Bosnia &amp; Herzegovina',
	'Botswana',
	'Brazil',
	'British Virgin Islands',
	'Brunei',
	'Bulgaria',
	'Burkina Faso',
	'Burundi',
	'Cambodia',
	'Cameroon',
	'Canada',
	'Cape Verde',
	'Cayman Islands',
	'Chad',
	'Chile',
	'China',
	'Colombia',
	'Congo',
	'Cook Islands',
	'Costa Rica',
	'Cote D Ivoire',
	'Croatia',
	'Cruise Ship',
	'Cuba',
	'Cyprus',
	'Czech Republic',
	'Denmark',
	'Djibouti',
	'Dominica',
	'Dominican Republic',
	'Ecuador',
	'Egypt',
	'El Salvador',
	'Equatorial Guinea',
	'Estonia',
	'Ethiopia',
	'Falkland Islands',
	'Faroe Islands',
	'Fiji',
	'Finland',
	'France',
	'French Polynesia',
	'French West Indies',
	'Gabon',
	'Gambia',
	'Georgia',
	'Germany',
	'Ghana',
	'Gibraltar',
	'Greece',
	'Greenland',
	'Grenada',
	'Guam',
	'Guatemala',
	'Guernsey',
	'Guinea',
	'Guinea Bissau',
	'Guyana',
	'Haiti',
	'Honduras',
	'Hong Kong',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iran',
	'Iraq',
	'Ireland',
	'Isle of Man',
	'Israel',
	'Italy',
	'Jamaica',
	'Japan',
	'Jersey',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'Kuwait',
	'Kyrgyz Republic',
	'Laos',
	'Latvia',
	'Lebanon',
	'Lesotho',
	'Liberia',
	'Libya',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Macau',
	'Macedonia',
	'Madagascar',
	'Malawi',
	'Malaysia',
	'Maldives',
	'Mali',
	'Malta',
	'Mauritania',
	'Mauritius',
	'Mexico',
	'Moldova',
	'Monaco',
	'Mongolia',
	'Montenegro',
	'Montserrat',
	'Morocco',
	'Mozambique',
	'Namibia',
	'Nepal',
	'Netherlands',
	'Netherlands Antilles',
	'New Caledonia',
	'New Zealand',
	'Nicaragua',
	'Niger',
	'Nigeria',
	'Norway',
	'Oman',
	'Pakistan',
	'Palestine',
	'Panama',
	'Papua New Guinea',
	'Paraguay',
	'Peru',
	'Philippines',
	'Poland',
	'Portugal',
	'Puerto Rico',
	'Qatar',
	'Reunion',
	'Romania',
	'Russia',
	'Rwanda',
	'Saint Pierre &amp; Miquelon',
	'Samoa',
	'San Marino',
	'Satellite',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Seychelles',
	'Sierra Leone',
	'Singapore',
	'Slovakia',
	'Slovenia',
	'South Africa',
	'South Korea',
	'Spain',
	'Sri Lanka',
	'St Kitts and Nevis',
	'St Lucia',
	'St Vincent',
	'St. Lucia',
	'Sudan',
	'Suriname',
	'Swaziland',
	'Sweden',
	'Switzerland',
	'Syria',
	'Taiwan',
	'Tajikistan',
	'Tanzania',
	'Thailand',
	"Timor L'Este",
	'Togo',
	'Tonga',
	'Trinidad &amp; Tobago',
	'Tunisia',
	'Turkey',
	'Turkmenistan',
	'Turks &amp; Caicos',
	'Uganda',
	'Ukraine',
	'United Arab Emirates',
	'United Kingdom',
	'Uruguay',
	'Uzbekistan',
	'Venezuela',
	'Vietnam',
	'Virgin Islands (US)',
	'Yemen',
	'Zambia',
	'Zimbabwe'
];


//selecting the current day
const searchInput = document.querySelector(".search-input");
const suggestionList = document.querySelector(".suggestion-list")


//Add sugestions
searchInput.addEventListener("keyup",(e) => {
		//to remove all initial suggestions added
		removeElements();

    let results = 0;
	//loop throught the country list
	for(let i = 0; i < countryList.length; i++){


	if(countryList[i].toLowerCase().startsWith(searchInput.value.toLowerCase()) && 
			searchInput.value != "") {
                  
				results++

				if(results < 7){
				//Create a li or suggestion
				const listItem = document.createElement('li');
				//One common class name
				listItem.classList.add("suggestion-item")
                listItem.style.cursor = "pointer";
				listItem.setAttribute("onclick","displayName('"+countryList[i]+"')")
				//To make the matched part as bold
				let locationPin = `<i class="ti ti-pin"></i>`
				let word = `<b>${countryList[i].substr(0,searchInput.value.length)}</b>`;
				word += countryList[i].substr(searchInput.value.length);
                listItem.innerHTML = locationPin + word
				suggestionList.appendChild(listItem)
				}
			
		}
	}
})

const locationText = document.querySelector('.place')

//To display the suggestion or clickability
function displayName(value){
	searchInput.value = value;
    
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&APPID=b3d233c09be1dd283fac50c81f1249cd`)
	.then(result => result.json())
	.then(data => {
		showWeatherData(data)
	 }
		)

	removeElements()
	  
}

const searchContainer = $('.search-form');
const temperatureContainer = $('.temperature-container');


//To make a request to the weather api
searchContainer.on('submit', (e) => {
	e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&APPID=b3d233c09be1dd283fac50c81f1249cd`)
	.then(result => result.json())
	.then(data => {
		showWeatherData(data)
	 }
)})

//To get the most recent data first, rearrange the array from borrom to top
const data = JSON.parse(localStorage.getItem('locations')).reverse()

//To set recents
searchContainer.click(function() {
	removeElements();
	let total = 0

	//To check if the input container is empty on click
	if($('.search-input').val() === ''){
		for(let recentPlace of data){
			//To limit the number of recents displayed on the page
			if(total < 10){
				const listItem = document.createElement('li');
				listItem.classList.add("suggestion-item")
				listItem.style.cursor = "pointer";
				listItem.setAttribute("onclick","displayName('"+recentPlace+"')")
				listItem.innerHTML = `<i class="ti ti-recent"></i><span class="recent-name">${recentPlace}</span>`
				suggestionList.appendChild(listItem);
				total++
			}

		}
	}

});

// To show the data gotten from the api
function showWeatherData(data){
    setLocationInformation(data.name,data.main.temp,data.main.feels_like,data.weather[0])
    setWindSpeed(data.wind.speed, document.querySelector('.wind-speed'))
	setPressure(data.main.pressure, document.querySelector('.pressure'))
    setHumidity(data.main.humidity, document.querySelector('.humidity') )
	requestUVIndex(data.coord,data.name)

}

// To remove all previously suggested elemts
function removeElements(){
let suggestions = document.querySelectorAll('.suggestion-item');
if(suggestions){
	for(el of suggestions){
		el.remove();
	}
}

}

//To set location Information
function setLocationInformation(locationName,currentTemperature,feelsLike,weather){
	locationText.innerHTML =`<h5 class="card-title m-0"> <i class="ti ti-pin"></i>${locationName}</h5>`
    $('.temperature-container').html( `<p class="temperature m-0">${currentTemperature}°C</p>
											<p>${weather.main}</p>
									<p class=""> Feels like ${feelsLike}°C</p>
									`)
   $('.main-img').attr("src",`https://openweathermap.org/img/wn/${weather.icon}@2x.png`)
									 

						   
}

//To set wind speed
function setWindSpeed(windSpeed,el){
	el.innerHTML = `<p class="card-text ms-2">${windSpeed} <span class="ml-1">m/s<span></p>`
}

//To set pressure
function setPressure(pressure,el){
	                    el.innerHTML = `<p class="card-text ms-2">${pressure} <span class="ml-1">hPa<span></p>`
}

//To set humidity
function setHumidity(humidity,el){
     el.innerHTML = `<p class="card-text ms-2">${humidity}%</p>`
}

//Request uv index
function requestUVIndex(coordinates,name){
   
  const {lon, lat} = coordinates;
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b3d233c09be1dd283fac50c81f1249cd&exclude=hourly&unit=metric`)
	.then(result => result.json())
	.then(data => {
        setDaysAfter(data.daily)
        setUV(data.current.uvi)
		saveData(name,lon,lat);
    })

}

// To display uv index on the page
function setUV(uvData){
	if(uvData >= 8 ){
		icon = `<i class="red-triangle"></i>`
	}
	else{
		icon = `<i class="green-triangle"></i>`
	}
	document.querySelector('.uv-index').innerHTML = `${icon}
	                                                <p class="card-text ms-2">${uvData}</p>`
}

//To set upcoming days
function setDaysAfter(data){



	$('#upcoming-days .row').html(data.map((day,index) => {
		if(index > 0 && index < 6){

			let date = new Date(day.dt * 1000);
			let  dateToString = date.toDateString().trim().split(' ')


			return `<div class="col my-1">
			             <div class="card" >
							<div class="card-body">
								
								<div class="d-flex justify-content-center align-items-center">
								    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
									<div class="card-head">
										<h5 class="card-title d-flex align-items-center text-center">${dateToString[0]}</h5>
										<h6 class="card-subtitle mb-2 text-center">${dateToString[2]},${dateToString[1]}</h6>
									</div>

								</div>
								<div>
								<div class="d-flex flex-column align-items-center">
									<div class="info-box">
										<p><b>pressure</b> - ${day.pressure}mb</p>
									</div>
									<div class="info-box">
										<p> <b>wind</b> - ${day.wind_speed} m/s</p>
										<p></p>
									</div>
									<div class="info-box">
										<p> <b>Humidity</b> - ${day.humidity}% </p>
									</div>
									<div class="info-box">
										<p> <b>High</b> - ${day.temp.max}&deg;C </p>
									</div>
									<div class="info-box">
										<p> <b>low</b> - ${day.temp.min}&deg;C</p>
									</div>
								
								</div>
								<div>
									<p class="card-temperature">${day.feels_like.day}&deg;C</p>
								</div>

								</div>
			  				</div>
						</div>
					</div>`
		}}).join(' ')
	)
    






	

}

//To save to recents
function saveData(name){

	if(localStorage.getItem('locations') == null){
		localStorage.setItem('locations','[]')
	}
  

	var oldLocation = JSON.parse(localStorage.getItem('locations'));


	if(!oldLocation.includes(name)){
			oldLocation.push(name);
	}
	

	//Save the old + new data;
	localStorage.setItem('locations', JSON.stringify(oldLocation));
  } 



