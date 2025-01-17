const Discord = require('discord.js');
const utils = require("./data/utils");

require('dotenv').config()
require("./setup")().then((client) => {
    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.use(express.json({ extended: false }));

    app.post('/votes/end/point', (req, res) => {
        if (req.body.guild === "788164739850043413") {
            client.guilds.cache.get("788164739850043413").members.fetch(req.body.user).then((user) => {
                if (user) {
                    if (user.user.avatar.startsWith("a_"))
                        var avatar = `https://images.discordapp.net/avatars/${user.user.id}/${user.user.avatar}.gif`;
                    else
                        var avatar = `https://images.discordapp.net/avatars/${user.user.id}/${user.user.avatar}.png`;
                    const embed = new Discord.MessageEmbed()
                        .setColor(utils.randomHex())
                        .setTimestamp()
                        .setAuthor(user.displayName, avatar)
                        .setTitle(`**${user.displayName}** just voted!`)
                        .setDescription(`Thank you ${user.displayName} for voting Code++ on top.gg!\nYou now have the <@&${process.env.VOTE_ROLE}> role, that will give you access to a secret channel!`)

                    let role = user.guild.roles.cache.find(r => r.id === process.env.VOTE_ROLE);

                    user.roles.add(role);

                    client.guilds.cache.get("788164739850043413").channels.cache.get("788350810165477406").send(`<@!${user.id}>`, embed);
                }
            });
        }
    });

    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});