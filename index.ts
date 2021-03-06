import express from 'express';
import Discord from 'discord.js';
const client = new Discord.Client();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (_req, res) {
  res.status(200).send();
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}...`);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
  if (msg.channel.type === 'dm') return;
  if (msg.channel.name === 'uwu-owony' || msg.channel.name === 'bot-hole') {
    if (msg.author.username === 'wojonatior') return;
    if (msg.content.trim().toLowerCase() !== 'uwu') {
      msg.delete();
      const role = msg.guild.roles.cache.find(
        (role) => role.name === 'uwu criminal',
      );
      if (role) {
        msg.member.roles.add(role);
      }
    }
  }
});

client.on('guildMemberAdd', (member) => {
  console.log(JSON.stringify(member));
  if (member.displayName === 'MalcomWest') {
    const role = member.guild.roles.cache.find(
      (role) => role.name === 'uwu criminal',
    );
    if (role) {
      member.roles.add(role);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
