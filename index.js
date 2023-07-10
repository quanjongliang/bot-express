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
const noBaId = -919328938;
// const noBaId = -919111052;
const ignoreIds = [nghiChatId, chatId];
const listeners = [-919328938];
// const listeners = [-919328938, -1670126524];
// const sendChatId = noBaId;
const sendChatId = -909339190;
// const sendChatId = -919111052;
// const sendChatId = -985761334;
const fs = require("fs");
const quoteTags = [
  {
    _id: "PIyOMHYqPd",
    name: "Age",
    slug: "age",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "qTFouZDPBZz",
    name: "Athletics",
    slug: "athletics",
    quoteCount: 0,
    dateAdded: "2022-07-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "M83oc3scg",
    name: "Business",
    slug: "business",
    quoteCount: 31,
    dateAdded: "2019-08-03",
    dateModified: "2023-04-14",
  },
  {
    _id: "QmvdN2qkQCC",
    name: "Change",
    slug: "change",
    quoteCount: 34,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "vWfmIQt6k8c",
    name: "Character",
    slug: "character",
    quoteCount: 17,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "JaQwywHSk59",
    name: "Competition",
    slug: "competition",
    quoteCount: 38,
    dateAdded: "2022-07-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "AjxQFSPEylb",
    name: "Conservative",
    slug: "conservative",
    quoteCount: 1,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "Ipw2-EcInZg",
    name: "Courage",
    slug: "courage",
    quoteCount: 2,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "aLWQOIYpeMz",
    name: "Creativity",
    slug: "creativity",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "kqzFRe-4V4",
    name: "Education",
    slug: "education",
    quoteCount: 7,
    dateAdded: "2019-03-17",
    dateModified: "2023-04-14",
  },
  {
    _id: "jl_H9UVXhGb",
    name: "Ethics",
    slug: "ethics",
    quoteCount: 1,
    dateAdded: "2023-04-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "gElqvJIRz0h",
    name: "Failure",
    slug: "failure",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "-7GEUrC5r",
    name: "Faith",
    slug: "faith",
    quoteCount: 4,
    dateAdded: "2019-09-13",
    dateModified: "2023-04-14",
  },
  {
    _id: "r437PEqVZx5",
    name: "Family",
    slug: "family",
    quoteCount: 2,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "fvpORe-t",
    name: "Famous Quotes",
    slug: "famous-quotes",
    quoteCount: 1090,
    dateAdded: "2019-07-23",
    dateModified: "2023-04-14",
  },
  {
    _id: "HJ05xaA6gN",
    name: "Film",
    slug: "film",
    quoteCount: 13,
    dateAdded: "2022-07-04",
    dateModified: "2023-04-14",
  },
  {
    _id: "QuBdKRcjNsO",
    name: "Freedom",
    slug: "freedom",
    quoteCount: 9,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "krXU-q4FE",
    name: "Friendship",
    slug: "friendship",
    quoteCount: 189,
    dateAdded: "2019-03-15",
    dateModified: "2023-04-14",
  },
  {
    _id: "OMnUd1CUg",
    name: "Future",
    slug: "future",
    quoteCount: 21,
    dateAdded: "2019-02-17",
    dateModified: "2023-04-14",
  },
  {
    _id: "i_OFrgCiQ4",
    name: "Generosity",
    slug: "generosity",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "L09SJrfjY8s",
    name: "Genius",
    slug: "genius",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "S9OYJZlyu5",
    name: "Gratitude",
    slug: "gratitude",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "k97A51Uf5",
    name: "Happiness",
    slug: "happiness",
    quoteCount: 18,
    dateAdded: "2019-06-27",
    dateModified: "2023-04-14",
  },
  {
    _id: "kv9zk8WIqaq",
    name: "Health",
    slug: "health",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "KBWnDu4rH",
    name: "History",
    slug: "history",
    quoteCount: 18,
    dateAdded: "2021-01-30",
    dateModified: "2023-04-14",
  },
  {
    _id: "uCLiEwnwh",
    name: "Honor",
    slug: "honor",
    quoteCount: 6,
    dateAdded: "2022-07-04",
    dateModified: "2023-04-14",
  },
  {
    _id: "uki-krBKTB_",
    name: "Humor",
    slug: "humor",
    quoteCount: 0,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "HJp_e1usX",
    name: "Humorous",
    slug: "humorous",
    quoteCount: 17,
    dateAdded: "2022-07-08",
    dateModified: "2023-04-14",
  },
  {
    _id: "eghR-r-OzL9",
    name: "Imagination",
    slug: "imagination",
    quoteCount: 2,
    dateAdded: "2023-04-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "JCMoLDds9",
    name: "Inspirational",
    slug: "inspirational",
    quoteCount: 89,
    dateAdded: "2020-01-27",
    dateModified: "2023-04-14",
  },
  {
    _id: "v9QUFHDZPT3",
    name: "Knowledge",
    slug: "knowledge",
    quoteCount: 3,
    dateAdded: "2023-04-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "V60a195td",
    name: "Leadership",
    slug: "leadership",
    quoteCount: 1,
    dateAdded: "2022-07-04",
    dateModified: "2023-04-14",
  },
  {
    _id: "poT-7QEBm",
    name: "Life",
    slug: "life",
    quoteCount: 42,
    dateAdded: "2020-09-09",
    dateModified: "2023-04-14",
  },
  {
    _id: "3n-gucf_OB",
    name: "Literature",
    slug: "literature",
    quoteCount: 1,
    dateAdded: "2020-03-01",
    dateModified: "2023-04-14",
  },
  {
    _id: "rnrd8q9X1",
    name: "Love",
    slug: "love",
    quoteCount: 20,
    dateAdded: "2020-02-27",
    dateModified: "2023-04-14",
  },
  {
    _id: "s19tg5r8EM-",
    name: "Mathematics",
    slug: "mathematics",
    quoteCount: 1,
    dateAdded: "2023-04-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "CaE-vzeOZb",
    name: "Motivational",
    slug: "motivational",
    quoteCount: 32,
    dateAdded: "2022-07-04",
    dateModified: "2023-04-14",
  },
  {
    _id: "vmVZQ72P_",
    name: "Nature",
    slug: "nature",
    quoteCount: 2,
    dateAdded: "2020-12-10",
    dateModified: "2023-04-14",
  },
  {
    _id: "pnLPcXTs_S",
    name: "Opportunity",
    slug: "opportunity",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "q8kOLaefsZM",
    name: "Pain",
    slug: "pain",
    quoteCount: 1,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "GaQEsvfbYYd",
    name: "Perseverance",
    slug: "perseverance",
    quoteCount: 2,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "mh6HEhK_T_a",
    name: "Philosophy",
    slug: "philosophy",
    quoteCount: 16,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "96NNdxeI_",
    name: "Politics",
    slug: "politics",
    quoteCount: 15,
    dateAdded: "2020-04-02",
    dateModified: "2023-04-14",
  },
  {
    _id: "MbsuUl67N3",
    name: "Power Quotes",
    slug: "power-quotes",
    quoteCount: 2,
    dateAdded: "2022-07-04",
    dateModified: "2023-04-14",
  },
  {
    _id: "p5xRCWCdU",
    name: "Proverb",
    slug: "proverb",
    quoteCount: 0,
    dateAdded: "2021-02-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "tWLCsyf_K",
    name: "Religion",
    slug: "religion",
    quoteCount: 6,
    dateAdded: "2020-01-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "dm15bka7Qc",
    name: "Sadness",
    slug: "sadness",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "qO4zwIUdFW",
    name: "Science",
    slug: "science",
    quoteCount: 14,
    dateAdded: "2020-01-26",
    dateModified: "2023-04-14",
  },
  {
    _id: "5wvH2mbETdq",
    name: "Self",
    slug: "self",
    quoteCount: 6,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "IJsMcEupo4",
    name: "Self Help",
    slug: "self-help",
    quoteCount: 6,
    dateAdded: "2022-07-04",
    dateModified: "2023-04-14",
  },
  {
    _id: "-WCNo8uFORU",
    name: "Social Justice",
    slug: "social-justice",
    quoteCount: 3,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "eD6qAIcDR8s",
    name: "Society",
    slug: "society",
    quoteCount: 1,
    dateAdded: "2023-04-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "DNZ4IdtHiFG",
    name: "Spirituality",
    slug: "spirituality",
    quoteCount: 4,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "EKV8W1TN-wb",
    name: "Sports",
    slug: "sports",
    quoteCount: 43,
    dateAdded: "2022-07-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "kZei477Cojv",
    name: "Stupidity",
    slug: "stupidity",
    quoteCount: 1,
    dateAdded: "2023-04-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "wm1HFcO8vf",
    name: "Success",
    slug: "success",
    quoteCount: 82,
    dateAdded: "2020-10-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "Gq75KBrfb",
    name: "Technology",
    slug: "technology",
    quoteCount: 50,
    dateAdded: "2020-01-27",
    dateModified: "2023-04-14",
  },
  {
    _id: "LzQ9iXOoZw_",
    name: "Time",
    slug: "time",
    quoteCount: 1,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "o7BP9_4e2lL",
    name: "Tolerance",
    slug: "tolerance",
    quoteCount: 1,
    dateAdded: "2023-04-06",
    dateModified: "2023-04-14",
  },
  {
    _id: "B1O_IThWjSP",
    name: "Truth",
    slug: "truth",
    quoteCount: 7,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "bsT8Bb9sxB",
    name: "Virtue",
    slug: "virtue",
    quoteCount: 10,
    dateAdded: "2022-07-04",
    dateModified: "2023-04-14",
  },
  {
    _id: "olEL606Ju49",
    name: "War",
    slug: "war",
    quoteCount: 3,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "AN2qILFNzW",
    name: "Weakness",
    slug: "weakness",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "5j5s-YkHAr_",
    name: "Wellness",
    slug: "wellness",
    quoteCount: 1,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "6J1qxxuj3",
    name: "Wisdom",
    slug: "wisdom",
    quoteCount: 550,
    dateAdded: "2019-10-18",
    dateModified: "2023-04-14",
  },
  {
    _id: "Y3mg6WH7Qv1",
    name: "Work",
    slug: "work",
    quoteCount: 3,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "NLC25zc7-m5",
    name: "Work",
    slug: "work",
    quoteCount: 3,
    dateAdded: "2023-04-14",
    dateModified: "2023-04-14",
  },
];

const tags = quoteTags
  .filter((el) => el.quoteCount && el.slug)
  .map((el) => el.slug);

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
// https://api.quotable.io/quotes/random?tags=love
const commands = tags.map((el) => ({
  command: `quote_${el}`,
  description: `Command quote with ${el} tag`,
}));
bot.telegram.setMyCommands([
  {
    command: "quote",
    description: "Command random quote",
  },
  {
    command: "quote_love",
    description: "Command quote with love tag",
  },
  {
    command: "quote_business",
    description: "Command quote with business tag",
  },
  {
    command: "quote_change",
    description: "Command quote with change tag",
  },
  {
    command: "ask",
    description: "Ask something and Meo Dai Tuong will answer",
  },
]);
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
bot.command("ask", async (ctx) => {
  console.log(ctx.message);
  const question = ctx?.message?.text?.replace("ask", "");
  console.log(ctx.message.text);
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });
    console.log(
      "chatCompletion.data.choices[0].message",
      chatCompletion.data.choices[0].message
    );
    // ctx.forwardMessage(ctx.message.chat.id,{from_chat_id:ctx.message.message_id,})
    ctx.reply(chatCompletion.data.choices[0].message.content);
  } catch (error) {
    console.log("error", { error });
  }
});
for (let i = 0; i < tags.length; i++) {
  const tag = tags[i];
  bot.command(`quote_${tag}`, (ctx) => {
    axios
      .get(`https://api.quotable.io/quotes/random?tags=${tag}`)
      .then((res) => {
        console.log("res", res.data);
        try {
          axios
            .get(
              `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${res.data[0].content}`
            )
            .then((res) => {
              const result = res.data[0][0].filter(
                (el) => typeof el === "string"
              );
              ctx.reply(result.join("\n"));
            });
        } catch (error) {
          ctx.reply(res.data.content);
        }
        // console.log("res", res);
      });
  });
}

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

  // fs.readFile("chat.json", (err, data) => {
  //   // READ
  //   if (err) {
  //     return console.error(err);
  //   }

  //   const parsedData = JSON.parse(data.toString());
  //   console.log("data", parsedData);
  //   fs.writeFile(
  //     "chat.json",
  //     JSON.stringify({ ...parsedData, [ctx.update.update_id]: ctx.update }),
  //     (err, result) => {
  //       // WRITE
  //       if (err) {
  //         return console.error(err);
  //       } else {
  //         console.log(result);
  //         console.log("Success");
  //       }
  //     }
  //   );
  // });

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
