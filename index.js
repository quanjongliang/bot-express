const express = require("express");
const expressApp = express();
const axios = require("axios");
const path = require("path");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());
require("dotenv").config();
var cron = require("node-cron");
const mentionHtml = `<a href="tg://user?id=5551439813">inline mention of a user</a>`;
const nghiChatId = -920105903;
const metionUser = (id) => `[inline mention of a user](tg://user?id=${id})`;
const chatId = -1001544747324;
const ignoreIds = [nghiChatId, chatId];
const listeners = [-919328938];
const sendChatId = chatId;
const fs = require("fs");
// cron.schedule(
//   "*/5 * * * * ",
//   () => {
//     bot.telegram.sendPhoto(
//       chatId,
//       { url: "https://i.ytimg.com/vi/ndsaoMFz9J4/maxresdefault.jpg" },
//       {
//         caption: "Mấy con gà này",
//       }
//     );
//   },
//   {
//     scheduled: true,
//     timezone: "America/Sao_Paulo",
//   }
// );
const myChatId = -919328938;
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.telegram.sendMessage(chatId, "Nghỉ mẹ đi làm gì nữa");
const texts = [
  "Mấy con gà này",
  "Meo meo meo meo",
  "Ngày người đi biệt ly chẳng nói nên câu",
];
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
expressApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
// bot.telegram.getMe().then((botInfo) => {
//   bot.options.username = botInfo.username;

//   bot.hears(/\/help(@botname)?/, (ctx) => ctx.replyWithMarkdown(helpResponse));
// });

// setTimeout(() => {
//   console.log("ádasdas111");
//   bot.telegram.getChat(-968377613).then(function (chat) {
//     console.log("chat info", chat);
//   });
// }, 1000);
// const sendText = () => {
//   const text = randomItem(texts);
//   bot.telegram.sendMessage(-968377613, text, {});
//   setTimeout(() => {
//     sendText();
//   }, 2000);
// };
// setTimeout(() => {
//   sendText();
// }, 2000);
// bot.telegram.sendMessage(chatId, "Xung phong......", {});

// bot.telegram.sendMessage(-968377613, "Mấy con gà", {});
// bot.telegram.sendMessage(chatId, "haha", { reply_to_message_id: 2810 });
bot.command("quote", (ctx) => {
  console.log("asdasd");
  axios.get("https://api.quotable.io/random").then((res) => {
    try {
      axios
        .get(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${res.data.content}`
        )
        .then((res) => {
          const result = res.data[0][0].filter((el) => typeof el === "string");
          ctx.reply(result.join("\n"));
        });
    } catch (error) {
      ctx.reply(res.data.content);
    }
    // console.log("res", res);
  });
});
bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(ctx.chat.id, "Hello anh em", {});
});
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.on(message("sticker"), (ctx) => {
  // ctx.telegram.sendMessage(sendChatId, "👍");
  ctx.telegram.sendSticker(
    sendChatId,

    ctx.update.message.sticker.file_id
  );
});

bot.on(message("photo"), async (ctx) => {
  console.log("text", ctx.update.message.photo);
  // ctx.replyWithPhoto(
  //   {
  //     url: "https://i.ytimg.com/vi/ndsaoMFz9J4/maxresdefault.jpg",
  //   },
  //   { caption: "Mấy con gà này" }
  // );
  // ctx.sendPhoto(ctx.update.message.photo);
  // Explicit usage
  // console.log("ctx.message.chat.id", ctx.message.chat.id);
  // console.log("ctx", JSON.stringify({ ...ctx }));
  // if (!ctx.update.message.text.toLowerCase().includes("câm")) {
  //   ctx.reply("👍");
  //   await ctx.telegram.sendMessage(
  //     ctx.message.chat.id,
  //     `Tin nhắn từ: ${ctx?.update?.message?.from?.first_name || ""} ${
  //       ctx?.update?.message?.from?.last_name || ""
  //     }
  //   "${ctx.update.message.text}"`
  //   );
  // }
  // if (ctx.message.chat.id !== chatId) {
  //   ctx.reply("👍");
  //   await ctx.telegram.sendMessage(
  //     ctx.message.chat.id,
  //     `Tin nhắn từ: ${ctx?.update?.message?.from?.first_name || ""} ${
  //       ctx?.update?.message?.from?.last_name || ""
  //     }
  //   "${ctx.update.message.text}"`
  //   );
  // }

  // ctx.forwardMessage(chatId, { from_chat_id: ctx.update.message.message_id });
});

bot.on(message("text"), async (ctx) => {
  // Explicit usage
  // console.log("ctx.message.chat.id", ctx.message.chat.id);
  // console.log("ctx", JSON.stringify({ ...ctx }));
  // if (!ctx.update.message.text.toLowerCase().includes("câm")) {
  //   ctx.reply("👍");

  // }
  console.log("ctx", JSON.stringify(ctx.update));

  fs.readFile("chat.json", (err, data) => {
    // READ
    if (err) {
      return console.error(err);
    }

    const parsedData = JSON.parse(data.toString());
    console.log("data", parsedData);
    fs.writeFile(
      "chat.json",
      JSON.stringify({ ...parsedData, [ctx.update.update_id]: ctx.update }),
      (err, result) => {
        // WRITE
        if (err) {
          return console.error(err);
        } else {
          console.log(result);
          console.log("Success");
        }
      }
    );
  });

  if (listeners.includes(ctx.message.chat.id)) {
    try {
      await ctx.telegram.sendMessage(
        sendChatId,
        // ctx.message.chat.id,
        ctx.update.message.text,
        { parse_mode: "HTML" }
      );
    } catch (error) {
      console.log("error", { error });
    }
    // await ctx.replyWithPhoto(
    //   {
    //     url: "https://i.ytimg.com/vi/ndsaoMFz9J4/maxresdefault.jpg",
    //   },
    //   {
    //     caption: `"${ctx.update.message.text}"
    // Mấy con gà này"`,
    //   }
    // );
  }
  // ctx.reply("👍");
  // await ctx.telegram.sendMessage(
  //   ctx.message.chat.id,
  //   `Tin nhắn từ: ${ctx?.update?.message?.from?.first_name || ""} ${
  //     ctx?.update?.message?.from?.last_name || ""
  //   }
  // "${ctx.update.message.text}"`
  // );
  // }

  // ctx.forwardMessage(chatId, { from_chat_id: ctx.update.message.message_id });
});
bot.command("ethereum", (ctx) => {
  var rate;
  console.log(ctx.from);
  axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    )
    .then((response) => {
      console.log(response.data);
      rate = response.data.ethereum;
      const message = `Hello, today the ethereum price is ${rate.usd}USD`;
      bot.telegram.sendMessage(ctx.chat.id, message, {});
    });
});
bot.launch();
