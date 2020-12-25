var LOCAL_STORAGE_KEY = 'weightchart.data';

var app = new Vue({
	el: `#app`,
	data: {
		entries: [],
		newDate: '',
		newWeight: 0
	},
	created: function() {
		var cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!cachedData) {
			this.entries = [];
		} else {
			this.entries = JSON.parse(cachedData);
		}
	},
	methods: {
		addWeightInput: function(event) {
			if (this.newDate && this.newWeight) {
				console.log('new date, new weight', this.newDate, this.newWeight);
				
				// push into data array
				this.entries.push({
					date: this.newDate,
					weight: this.newWeight
				});

				// save to localStorage
				localStorage.removeItem(LOCAL_STORAGE_KEY);
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.entries));

				// push into live data
				this.chart.data.labels.push(this.newDate);
				this.chart.data.datasets[0].data.push(this.newWeight);
				this.chart.update();

				// clear values
				this.newDate = '';
				this.newWeight = 0;
			}
		}
	},
	mounted: function() {
		// load chart
		var ctx = document.getElementById('weightChart').getContext('2d');
		this.chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: this.entries.map(function(entry) {
					return entry.date;
				}),
				datasets: [{
					label: 'Your Daily Weigh-In',
					backgroundColor: 'rgb(54, 162, 235)',
					borderColor: 'rgb(54, 162, 235)',
					data: this.entries.map(function(entry) {
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
	}
});