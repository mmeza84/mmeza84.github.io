var loadedData;
var chart;

document.addEventListener('DOMContentLoaded', function() {
	// fetch data
	var cachedData = localStorage.getItem('weightchart.data');
	if (!cachedData) {
		//mock data
		loadedData = [];
	} else {
		loadedData = JSON.parse(cachedData);
	}

	// render chart
	var ctx = document.getElementById('weightChart').getContext('2d');
	chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: loadedData.map(function(entry) {
				return entry.date;
			}),
			datasets: [{
				label: 'Your Daily Weigh-In',
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgb(54, 162, 235)',
				data: loadedData.map(function(entry) {
					return entry.weight;
				}),
				fill: false
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Weight Chart'
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Date'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Weight'
					}
				}]
			}
		}
	});
});

function addWeightInput() {
	var dateInput = document.getElementById('weighInDate');
	var weightInput = document.getElementById('weighInValue');

	if (dateInput.value && weightInput.value) {
		var date = dateInput.value;
		var weight = weightInput.value;

		// push into data array
		loadedData.push({
			date,
			weight
		});

		// TODO save to localStorage

		// push into live data
		chart.data.labels.push(dateInput.value);
		chart.data.datasets[0].data.push(weightInput.value);
		chart.update();

		// clear values
		dateInput.value = '';
		weightInput.value = '';
	}

	return false;
}