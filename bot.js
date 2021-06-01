const Discord = require('discord.js');
const client = new Discord.Client();
const { token, guild_id } = require('./config.json');

client.on('ready', async () => {
    console.log('Bot aktif');

    await getApp(guild_id).commands.post({
        data: {
            name: 'ping',
            description: 'Botun gecikme süresini gösterir.',
        }
    })

    client.ws.on("INTERACTION_CREATE", async interaction => {
        const command = interaction.data.name.toLowerCase();

        if (command == 'ping') {

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `🏓 Ping: **${client.ws.ping} ms**`,
                    },
                }
            })
        }
    })
})

function getApp(guild) {
    const app = client.api.applications(client.user.id);
    if (guild) {
        app.guilds(guild);
    }
    return app;
}

client.login(token);