var Game = new Vue({
	el: '#app',
	data() {
		return {
			currentRuntime: "00:00",
			gameName: "VueTest",
			gameStopped: true,
			statusMessages: [],
			ourTeam: "Sao Paulo TX",
			theirTeam: "Sting",
			ourScore: 0,
			theirScore: 0,
			timerStart: 0
		};
	},
	methods: {
		resetGameData() {
			if (confirm("Are you sure? You'll lose all current game data.")) {
				this.ourScore = 0;
				this.theirScore = 0;
				this.currentRuntime = "00:00";
				this.statusMessages = [];

			}
		},
		incrementTheirTeam() {
			this.theirScore += 1;
			this.statusMessages.push({
				message: `${this.theirTeam} scored (${this.getCurrentDuration()}).`,
				className: "score their-score"
			});
		},
		incrementOurTeam() {
			this.ourScore += 1;
			this.statusMessages.push({
				message: `${this.ourTeam} scored (${this.getCurrentDuration()}).`,
				className: "score our-score"
			});
		},
		startTimer(half) {
			this.gameStopped = false;
			this.timerStart = moment().format("X");
			this.startTimerRenderCycle();
			this.statusMessages.push({
				message: `${half === 1 ? "First" : "Second"} half started`
			});
		},
		endTimer(half) {
			this.gameStopped = true;
			clearInterval(this._timer);
			this.statusMessages.push({
				message: `${half === 1 ? "First" : "Second"} half ended`
			});
		},
		startTimerRenderCycle() {
			this._timer = setInterval(this.renderTimer, 500);
		},
		renderTimer() {
			this.currentRuntime = this.getCurrentDuration();
		},
		getCurrentDuration() {
			var startTime = moment(this.timerStart, "X");
			var currentTime = moment();

			var diff = currentTime.diff(startTime, "milliseconds");
			var duration = moment(diff);

			return `${duration.format("mm")}:${duration.format("ss")}`;
		}
	}
});

var GameStatus = {
	FIRST_HALF: "FIRST_HALF",
	HALF_TIME: "HALF_TIME",
	SECOND_HALF: "SECOND_HALF",
	FULL_TIME: "FULL_TIME"
};

var GoalType = {
	US: "US",
	THEM: "THEM"
};

var GoalCredit = {
	SCORE: "SCORE",
	ASSIST: "ASSIST"
};