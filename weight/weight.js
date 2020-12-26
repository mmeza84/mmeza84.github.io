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
			// make sure we have ids
			this.entries = this.entries.map(function(item, index) {
				if (!Number.isInteger(item.id)) {
					item.id = index;
				}

				return item;
			});
		}
	},
	methods: {
		_pluck: function(array, key) {
			return array.map(function(obj) {
				return obj[key];
			});
		},
		addWeightInput: function(event) {
			// pseudo-validation for now
			if (this.newDate && this.newWeight) {
				// push into data array
				this.entries.push({
					date: this.newDate,
					weight: this.newWeight
				});

				// save to localStorage
				localStorage.removeItem(LOCAL_STORAGE_KEY);
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.entries));

				// re-render
				this.updateGraph();
				
				// clear values
				this.newDate = '';
				this.newWeight = 0;
			}
		},
		deleteEntry: function(index) {
			this.entries.splice(index, 1);
			this.updateGraph();
		},
		editEntry: function(index) {
			alert("Editing is not implemented yet.");
		},
		getLabelsFromList: function() {
			return this._pluck(this.entries, 'date');
		},
		getWeightsFromList: function() {
			return this._pluck(this.entries, 'weight');
		},
		updateGraph: function() {
			// re-calculate chart data from entries
			this.chart.data.labels = this.getLabelsFromList();
			this.chart.data.datasets[0].data = this.getWeightsFromList();
			this.chart.update();
		}
	},
	mounted: function() {
		// load chart
		var ctx = document.getElementById('weightChart').getContext('2d');
		var labels = this.getLabelsFromList();
		var weights = this.getWeightsFromList();
		this.chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: [{
					label: 'Your Daily Weigh-In',
					backgroundColor: 'rgb(54, 162, 235)',
					borderColor: 'rgb(54, 162, 235)',
					data: weights,
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