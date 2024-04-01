const mySecret = process.env['OTY0NTA0NzQxMjIyNjc4NTc5.Gt41oq.zYNHMCC9JZ6YOy4PQfMaVfPUZUXj6NzTXaRfoE']
// Файлы
const { Embeds } = require(`./files/embeds`); //здесь эмбеды ЛОЛ
const { bot } = require('./files/settings'); //здесь настройки. Sussy boy
const prefix = bot.prefix;

// Пакеты с говном
const { Client, Collection, MessageEmbed, Intents } = require("discord.js");
const client = new Client({ intents: [
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILDS
] });
/*

*/
const chalk = require('chalk');
let ms = Date.now();

setInterval(() => {
    ms = 0;
    ms = Date.now();
},0);

module.exports = client;

/*
// Для реплита
const keepAlive = require('./files/server');run
keepAlive();
*/

// Глобальные зависимости
client.commands = new Collection();
client.slashCommands = new Collection();

//Хендлер хуюндлер
require("./handler")(client);
client.login(process.env.token).catch((e) => {
  console.log(`${chalk.red(`\n{!} :: Failed to log in.. Please check if your bot token is valid or it has all intents enabled..`)}`)
  setTimeout(() => {
    process.exit();
  }, 5000) //задержка
});

// База данных
const Database = require("@replit/database");
const db = new Database();

console.log(db)

// Анти создание канала
client.on("channelCreate", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${channel.guild.id}`);

  if (executor.id === channel.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  channel.delete();
  channel.guild.members.ban(executor.id, { 
    reason: "Не законное создание каналов"
  });
}); 


// Анти удаление канала
client.on("channelDelete", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 5, type: "CHANNEL_DELETE" }); //лимиты создания каналов а так же указывание на что он будет реагировать. ЛОЛ хуйню какуе-то несу. Я сам с собой разговарию? Нет. Тот кто прочитал ЗОГШИАТгьущкпинтьашбугкн0нр780т43п АХАХАХАХХАХАХАХАХАХХАХАХАХАХ шиза-шиза-шиза да да да да да АЗАЗАЗАЗАЗАЗАЗЗАЗАЗА ШИЗАААААААААААААААААААА

  const logs = auditLogs.entries.first(); 
  const { executor } = logs;
  const trusted = await db.get(`trust${channel.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${channel.guild.id}`);

  if (executor.id === channel.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  channel.clone();
  channel.guild.members.ban(executor.id, { 
    reason: "Не законное удаление каналов"
  });
});   


// Анти создание роли
client.on("roleCreate", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 5, type: "ROLE_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor, createdTimestamp } = logs;

  const trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${role.guild.id}`);

  
  if (executor.id === role.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  if (role.managed) return;

  role.delete();
  role.guild.members.ban(executor.id, { 
    reason: "Не законное создание ролей"
  });
});    

// Анти удаление роли
client.on("roleDelete", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 5, type: "ROLE_DELETE" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${role.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${role.guild.id}`);
  
  if (executor.id === role.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  if (role.managed) return;
  
  role.guild.roles.create({
    name: role.name,
    color: role.color,
  });
  role.guild.members.ban(executor.id, { 
    reason: "Не законное удаление ролей"
  });
});

// Анти создание эмодзи
client.on("emojiCreate", async (emoji) => {
  const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 5, type: "EMOJI_CREATE" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${emoji.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${emoji.guild.id}`);
  
  if (executor.id === emoji.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  emoji.guild.members.ban(executor.id, { 
    reason: "Не законное создание эмодзи"
  });
});


// Анти обновление эмодзи
client.on("emojiUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 5, type: "EMOJI_UPDATE" });
  const logs = auditLogs.entries.first();

  const { executor } = logs;
  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === n.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  n.setName(o.name);
  n.guild.members.ban(executor.id, { 
    reason: "Не законное обновление эмодзи"
  });
});


// Анти удаление эмодзи
client.on("emojiDelete", async (emoji) => {
  const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 5, type: "EMOJI_DELETE" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${emoji.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${emoji.guild.id}`);
  
  if (executor.id === emoji.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  emoji.guild.members.ban(executor.id, { 
    reason: "Не законное удаление эмодзи"
  });
});


// Анти обновление участников
/*client.on("guildMemberUpdate", async (o,n) => {
  const auditLogs = await o.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_UPDATE" });
  const logs = auditLogs.entries.first();

  const { executor } = logs;
  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === n.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  const oldRoles = o.roles;
  const newRoles = n.roles;

  if (oldRoles !== newRoles) {
    n.edit({ roles: o.roles });
  }

  n.guild.members.ban(executor.id, {
    reason: "Не законное обновление участников"
  });
});
*/


// Анти бан участников
client.on("guildBanAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 5, type: "MEMBER_BAN_ADD" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  member.guild.members.kick(executor.id, { 
    reason: "Не законный бан участника"
  });
  member.guild.members.unban(target.id, {
    reason: "Не законный бан участника"
  })
});


// Анти кик участников
client.on("guildMemberRemove", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_KICK" });

  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  member.guild.members.ban(executor.id, { 
    reason: "Не законный кик участника"
  });
});


// Анти добавление ботов
client.on("guildMemberAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" });

  const logs = auditLogs.entries.first();
  const { executor, target } = logs;

  const trusted = await db.get(`trust${member.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${member.guild.id}`);
  
  if (executor.id === member.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;


  member.guild.members.ban(executor.id, { 
    reason: "Не законное добавление бота"
  });
  member.guild.members.kick(target.id, { 
    reason: "Нелегальный бот"
  });
});


// Анти обновление роли
client.on("roleUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "ROLE_UPDATE" });
  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === o.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  n.setPermissions(o.permissions);
  n.guild.members.ban(executor.id, {
    reason: "Не законное обновление ролей"
  })
});


// Анти обновление каналов
client.on("channelUpdate", async (o,n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_UPDATE" });
  const logs = auditLogs.entries.first();
  const { executor } = logs;

  const trusted = await db.get(`trust${n.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.guild.id}`);
  
  if (executor.id === o.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  const oldName = o.name;
  const newName = n.name;
  
  n.guild.members.ban(executor.id, {
  reason: "Не законное обновление каналов"
});

  if (oldName !== newName) {
    await n.edit({
      name: oldName
    })
  }
  
  if (n.isText()) {
    const oldTopic = o.topic;
const mySecret = process.env['token']
    const newTopic = n.topic;
    if (oldTopic !== newTopic) {
      await n.setTopic(oldTopic)
    }
  }
});

// Анти создание вебхуков
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_CREATE" });
  const logs = auditLog.entries.first();

  const { executor } = logs;
  const trusted = await db.get(`trust${webhook.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${webhook.guild.id}`);
  
  if (executor.id === webhook.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  webhook.guild.members.ban(executor.id, {
    reason: "Не законное создание вебхуков"
  });
});


// Анти обновление вебхуков
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_UPDATE" });
  const logs = auditLog.entries.first();

  const { executor } = logs;
  const trusted = await db.get(`trust${webhook.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${webhook.guild.id}`);
  
  if (executor.id === webhook.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  webhook.guild.members.ban(executor.id, {
    reason: "Не законное обновление вебхуков"
  });
});


// Анти удаление вебхуков
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_DELETE" });
  const logs = auditLog.entries.first();

  const { executor } = logs;
  const trusted = await db.get(`trust${webhook.guild.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${webhook.guild.id}`);
  
  if (executor.id === webhook.guild.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;
  
  webhook.guild.members.ban(executor.id, {
    reason: "Не законное удаление вебхуков"
  });
});


// Анти обновление сервера
client.on("guildUpdate", async (o,n) => {
  const auditLogs = await n.fetchAuditLogs({ limit: 3, type: "GUILD_UPDATE" });
  const logs = auditLogs.entries.first();

  const { executor } = logs;
  
  const trusted = await db.get(`trust${n.id} ${executor.id}`);
  const antinuke = await db.get(`antinuke_${n.id}`);
  
  if (executor.id === o.ownerId) return;
  if (executor.id === client.user.id) return;
  if (antinuke !== true) return;
  if (trusted === true) return;

  const oldIcon = o.iconURL();
  const oldName = o.name;
  
  const newIcon = n.iconURL(); 
  const newName = n.name;

  if (oldName !== newName) {
    await n.setName(oldName);
  }

  if (oldIcon !== newIcon) {
    await n.setIcon(oldIcon);
  }
  
  n.members.ban(executor.id, {
    reason: "Не законное обновление сервера"
  });
});

// #1
process.on("unhandledRejection", (reason, promise) => {
   console.log("Unhandled Rejection at: " + promise)
   console.log("Reason: " + reason)
});

// #2
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
});

// #3
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});

// #4
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

client.on("messageCreate",()=>{client.ms = ms});
