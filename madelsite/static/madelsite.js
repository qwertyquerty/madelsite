var console_input = "";
var command_history = [""]; // 0 is "current" input
var command_history_index = 0;

function run_command(command, history = true) {
	if (history)
		command_history.splice(1, 0, command);
	command_history_index = 0;
	$("#term").append(`<label style="color: var(--font-color);">guest@madeline:~# ${command}</label>\n`);

	switch (command) {
		case `help`:
			let cmds = [`help`, `about`, `contact`, `ls`, `lmndt`, `mplyr`, `source`, `clear`, `reboot`, `logout`]
				.map(x => `\n\`<a onclick="run_command('${x}')">${x}</a>\``)
				.join(` `);
			$("#term").append(`\nAvailable commands: ${cmds}\`\n\n`);
			break;
		case `about`:
			$("#term").append(`
Hello and welcome to my personal developer site. I figured I would eventually have to at least put something here. I hope you like this site because it took a lot of work. Why not shoot me an email explaining how in the world you ended up here, because... well... how did you end up here??

I am mainly a Python developer, but I study and have hobbies in the majority of computer science areas

I mostly work on personal projects but have done freelance work in the past, and am usually up for hire. If you want to talk to me you can usually contact me on Discord at coconatsu#4342, or shoot an email to <a href="mailto: qwertytrogi@gmail.com">qwertytrogi@gmail.com</a>

/*---------------------------*/

If you have spare gold feel free to send it to
- BTC: <a href="https://www.blockchain.com/btc/address/bc1qkqy5tqdahdn70tnm42gs6qmq0hg7x5xvr87f94">bc1qkqy5tqdahdn70tnm42gs6qmq0hg7x5xvr87f94</a>
- ETH: <a href="https://etherscan.io/address/0x75FE644Df34A95b3C5E03767AeAEe80d7B1B6ce7">0x75FE644Df34A95b3C5E03767AeAEe80d7B1B6ce7</a>

`);
			break;

		case `contact`:
			$("#term").append(`\nFeel free to contact me for any reason:

 * Email: <a href="mailto: qwertytrogi@gmail.com">qwertytrogi@gmail.com</a>
 * Discord: <a href="https://discord.gg/JF3kg77">https://discord.gg/JF3kg77</a>
 * Github: <a href="https://github.com/qwertyquerty">https://github.com/qwertyquerty</a>
 * Reddit: <a href="https://www.reddit.com/u/qwerty_trogi">https://www.reddit.com/u/qwerty_trogi</a>\n\n`);
			break;

		case `ls`:
			$("#term").append(`\nRedirecting...\n\n`);
			window.location = "http://static.qtqt.cf/";
			break;

		case `exit`:
		case `logout`:
		case `shutdown`:
			$(".container").remove();
			break;

		case `reboot`:
			location.reload();
			break;

		case `clear`:
			$("#term").text("");
			break;

		case `mplyr`:
			$("#term").append(`
<div class="terminal-alert"><b>[MPLYR] "~/kcptn.mod"</b>
<div class="progress-bar" style="white-space: initial !important;"><div class="progress-bar-filled mp_progress" style="width:0%; position:relative;"></div></div>
Controls: <a onclick="mp_play()">[play]</a> <a onclick="mp_pause()">[pause]</a> <a onclick="mp_stop()">[stop]</a>
File: ~/kcptn.mod | Position: <label class="mp_position">0x0</label>
</div>
`)
			break;

		case `lmndt`: // LeNoNaDe Tycoon
			$("#term").append(`
<div class="terminal-alert"><b>[/USR/GAMES/LMNDT.BAS] - "Lemonade Tycoon"</b>

Lemonade: <span class="lt_lemonade"></span>
Total Sales: <span class="lt_sold_lemonade"></span>
Cash on Hand: <span class="lt_cash"></span>

Workers: <span class="lt_workers"></span>
Cost to Hire: <span class="lt_worker_cost"></span>

Lemonade Stand Level: <span class="lt_stand_level"></span>
Cost to Upgrade: <span class="lt_stand_cost"></span>

Actions:
<a onClick="lt_make_lemonade(1)">[Make Lemonade]</a> <a onClick="lt_sell_lemonade(1)">[Sell Lemonade]</a> <a onClick="lt_hire_worker()">[Hire Worker]</a> <a onClick="lt_upgrade_stand()">[Upgrade Stand]</a>
<a onClick="lt_save()">[Save Game]</a> <a onClick="lt_reset()">[Reset Game]</a>
</div>
`);
			break;

		case `source`:
			$("#term").append(`\nGithub: <a href="https://github.com/qwertyquerty/madelsite">https://github.com/qwertyquerty/madelsite</a>\n\n`);
			break;

		case `apt list --upgradable`:
			$("#term").append(`Listing... Done\n`);
			break;

		default:
			if (command.length)
				$("#term").append(`${command.split(` `)[0]}: command not found\n`);
			break;

	}

	$('#term').scrollTop($('#term')[0].scrollHeight);
}

$(document).ready(function () {
	setTimeout(() => run_command("help", false), 250);

	lt_load();

	setInterval(function () {
		lt_make_lemonade(workers / 20);

		if (workers > 2) {
			lt_sell_lemonade((workers / 20) * lt_worker_efficiency());
		}

		lt_update_labels();
	}, 50);

	setInterval(() => {
		$(".mp_progress").css("width", mp_audio.currentTime / mp_audio.duration * 100 + "%");
		$(".mp_position").html("0x" + Math.floor(mp_audio.currentTime * 100).toString(16))
	}, 50);

	lt_update_labels();
})


$(document).keydown(function (e) {
	switch (e.keyCode) {
		case 38: // arrow up
			if (command_history_index == 0)
				command_history[0] = console_input;

			command_history_index = Math.min(command_history_index + 1, command_history.length - 1);
			console_input = command_history[command_history_index];
			break;

		case 40: // arrow down
			if (command_history_index == 1)
				console_input = command_history[0];

			command_history_index = Math.max(command_history_index - 1, 0);
			console_input = command_history[command_history_index];
			break;

		case 8: // backspace
			console_input = console_input.slice(0, console_input.length - 1);
			break;

		case 13: // enter
			run_command(console_input);
			console_input = "";
			break;

		default:
			if (console_input == undefined) console_input = ``;
			if (!e.key.match(/[^\x00-\x7F]/) && e.key.length == 1)
				console_input += e.key;
			break;
	}

	$("#console-input").text(console_input);
});



var mp_audio = new Audio("https://qtqt.cf/static/kapchiptune.ogg");


function mp_play() {
	if (mp_audio.paused) {
		mp_audio.play();
	}
}

function mp_pause() {
	mp_audio.pause();
}

function mp_stop() {
	mp_audio.pause();
	mp_audio.currentTime = 0;
}



// Lemonade Tycoon
var lemonade = 0;
var stand_level = 1;
var stand_cost = lt_stand_cost();
var lemonade_sold = 0;
var cash = 0;
var workers = 0;
var worker_cost = lt_worker_cost();

function lt_update_labels() {
	$(".lt_lemonade").html(Math.floor(lemonade));
	$(".lt_workers").html(workers);
	$(".lt_cash").html("$" + Math.floor(cash));
	$(".lt_worker_cost").html("$" + worker_cost);
	$(".lt_sold_lemonade").html(Math.floor(lemonade_sold));
	$(".lt_stand_level").html(stand_level);
	$(".lt_stand_cost").html("$" + stand_cost);
}

function lt_make_lemonade(number) {
	lemonade += number;
	lt_update_labels();
}

function lt_sell_lemonade(sold) {
	if (lemonade >= sold) {
		lemonade -= sold;
		lemonade_sold += sold;

		cash += 1.0 * sold;
	}
	lt_update_labels();
}

function lt_hire_worker() {
	if (cash >= worker_cost) {
		workers += 1;
		cash -= worker_cost;
	}
	var nextCost = lt_worker_cost();
	worker_cost = nextCost;
	lt_update_labels()
}


function lt_upgrade_stand() {
	if (cash >= stand_cost) {
		stand_level += 1;
		cash -= stand_cost;
	}
	stand_cost = lt_stand_cost();
	lt_update_labels()
}

function lt_save() {
	var saveData = {
		lemonade: lemonade,
		lemonade_sold: lemonade_sold,
		cash: cash,
		workers: workers,
		stand_level: stand_level
	};

	localStorage.setItem("save", JSON.stringify(saveData));
}

function lt_load() {
	var saveGame = JSON.parse(localStorage.getItem("save"));
	if (saveGame) {
		if (typeof saveGame.lemonade !== "undefined") lemonade = saveGame.lemonade;
		if (typeof saveGame.stand_level !== "undefined") stand_level = saveGame.stand_level;
		if (typeof saveGame.lemonade_sold !== "undefined") lemonade_sold = saveGame.lemonade_sold;
		if (typeof saveGame.cash !== "undefined") cash = saveGame.cash;
		if (typeof saveGame.workers !== "undefined") workers = saveGame.workers;
		worker_cost = lt_worker_cost();
		stand_cost = lt_stand_cost();
		lt_update_labels();
	}
};

function lt_worker_cost() {
	return 10 + Math.floor(10 * ((workers) / 2) + Math.pow(workers, 1.5));
}

function lt_stand_cost() {
	return 10 + Math.floor(10 * ((stand_level) / 2) + Math.pow(stand_level * 10, 2));
}

function lt_worker_efficiency() {
	return (1 - (1 / (0.5 * (stand_level + 1)))) / 2 + 0.5;
}

function lt_reset() {
	lemonade = 0;
	workers = 0;
	worker_cost = lt_worker_cost();
	cash = 0;
	lemonade_sold = 0;
	stand_level = 1;
	stand_cost = lt_stand_cost();
	lt_save()
	lt_update_labels();
}
