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

navigator.geolocation.getCurrentPosition(success, error);

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
let currentlongitude
let currentlatitude
//Current Location
function success(pos) {
	let {longitude, latitude} = pos.coords;
	console.log(`${latitude}, ${longitude}`) 
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${latitude}&appid=2e1ebfe75535cfe66e25a2a55515c1e0`)
  }
  
  function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  
  

  console.log(currentlongitude,currentlatitude)
// listItem.innerHTML = `<i class="ti ti-recent"></i>${word}<i class="ti ti-cancel"></i>`

const searchInput = document.querySelector(".search-input");

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
			    listItem.setAttribute("type", "submit");
				//To make the matched part as bold
				let locationPin = `<i class="ti ti-pin"></i>`
				let word = `<b>${countryList[i].substr(0,searchInput.value.length)}</b>`;
				word += countryList[i].substr(searchInput.value.length);
                listItem.innerHTML = locationPin + word
				document.querySelector(".suggestion-list").appendChild(listItem)
				}
			
		}
	}
})

function displayName(value){
	searchInput.value = value;
    removeElements()
}

function removeElements(){


let suggestions = document.querySelectorAll('.suggestion-item');
if(suggestions){
	for(el of suggestions){
		el.remove();
	}
}

}
