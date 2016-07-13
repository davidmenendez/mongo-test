var form = document.querySelector('#band-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
	e.preventDefault();
	var http = new XMLHttpRequest();
	var url = '/bands/';
	var data = {
		name: document.querySelector('#band-name').value,
		genre: document.querySelector('#band-genre').value
	};

	http.onreadystatechange = function() {
		if (http.readyState === XMLHttpRequest.DONE) {
			if (http.status === 200) {
				refresh();
			} else {
				console.log('There was a problem with the request.');
			}
		}
	}

	http.open('POST', url);
	http.setRequestHeader('Content-Type', 'application/json');
	http.send(JSON.stringify(data));
}

function refresh() {
	var http = new XMLHttpRequest();
	var url = '/bands/';

	http.onreadystatechange = function() {
		if (http.readyState === XMLHttpRequest.DONE) {
			if (http.status === 200) {
				rebuild(http.responseText);
			} else {
				console.log('There was a problem with the request.');
			}
		}
	}

	http.open('GET', url);
	http.setRequestHeader('Content-Type', 'application/json');
	http.send();
}

function rebuild(data) {
	var bandListing = document.querySelector('.band-listing');
	while (bandListing.firstChild) {
		bandListing.removeChild(bandListing.firstChild);
	}

	var bands = JSON.parse(data);
	bands.map(function(band) {
		var div = document.createElement('li');
		div.classList.add('band');
		div.textContent = band.name + ' - ' + band.genre;
		bandListing.appendChild(div);
	});
}