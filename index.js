const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
require("dotenv").config();
const bot = new TelegramBot(process.env.TOKEN, { polling: true });
let peopleNotHaveFood = [];
let userInput = false;

bot.on("message", (msg) => {
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendChatAction(msg.chat.id, "typing");
    bot.sendMessage(msg.chat.id, "Hello");
  }
});

bot.onText(/\/no/, (msg) => {
  if (userInput) {
    if (!peopleNotHaveFood.includes(msg.from.id)) {
      peopleNotHaveFood.push(msg.from.id);
      console.log(msg.chat.id);
      bot.sendMessage("552375707", msg.from.first_name + ", Not Having Food");
      bot.sendMessage(msg.chat.id, "Your input has been recorded");
    } else {
      bot.sendMessage(msg.chat.id, "Input already recorded");
    }
  } else {
    bot.sendMessage(msg.chat.id, "List already prepared.");
  }
});

bot.onText(/\/start/, (msg) => {
  schedule.scheduleJob(
    { hour: 23, minute: 57, dayOfWeek: [0, 6] },
    bot.sendMessage(msg.from.id, "Hello  " + msg.from.first_name)
  );
});

bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, "Menu List");
});

function timeTable() {
  const breakFast = schedule.scheduleJob(
    { hour: 8, minute: 0, dayOfWeek: [1, 6] },
    function () {
      userInput = true;
      peopleNotHaveFood = [];
      bot.sendMessage(
        "-1001353914062",
        "<b>Are you having breakfast?</b>\n<b>If no please respond with /no</b>"
      );
    }
  );

  const lunch = schedule.scheduleJob(
    { hour: 12, minute: 0, dayOfWeek: [0, 6] },
    function () {
      peopleNotHaveFood = [];
      bot.sendMessage(
        "-1001353914062",
        "<b>Are you Having Lunch</b>\n<b>If No Please Respond with /no</b>"
      );
      userInput = true;
    }
  );

  const dinner = schedule.scheduleJob(
    { hour: 18, minute: 0, dayOfWeek: [0, 6] },
    function () {
      peopleNotHaveFood = [];
      bot.sendMessage(
        "-1001353914062",
        "<b>Are you Having Dinner</b>\n<b>If No Please Respond with /no</b>"
      );
    }
  );
}

function listOfPeople() {
  const breakFast = schedule.scheduleJob(
    { hour: 8, minute: 30, dayOfWeek: [0, 6] },
    function () {
      bot.sendMessage(
        "552375707",
        "Number of people not having food " + peopleNotHaveFood.length
      );
      userInput = false;
    }
  );
  const lunch = schedule.scheduleJob(
    { hour: 12, minute: 30, dayOfWeek: [0, 6] },
    function () {
      bot.sendMessage(
        "552375707",
        "Number of people not having food. " + peopleNotHaveFood.length
      );
      userInput = false;
    }
  );
  const dinner = schedule.scheduleJob(
    { hour: 6, minute: 30, dayOfWeek: [0, 6] },
    function () {
      bot.sendMessage(
        "552375707",
        "Number of people not having food." + peopleNotHaveFood.length
      );
      userInput = false;
    }
  );
}

listOfPeople();
timeTable();
