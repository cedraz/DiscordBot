const { Client, Intents, Guild } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("./config.json");

const servidores = {
    'server': {
        connection: null,
        dispatcher: null
    }
}

const prefix = '#';

client.on("ready", () => {
  console.log("I am ready!");
});

function rand(min, max) {
    const number = Math.random() * (max - min) + min
    return Math.trunc(number);
}

const respostas = {
    teAmo: [
        `tendi \nnice`,
        `very nice`,
        `nicee`,
        `tbm te amo`,
        `isso n é ideia n boy`,
        'tmj amor'
    ],
    oi: [
        `chama?`,
        `receeeba`
    ]
}

const variacoes = {
    teAmo: [
        'te amo',
        'Te amo',
        'tr amo',
        'Tr amo',
        'te amo mt',
        'tr amo mt',
        'Te amo mt',
        'Tr amo mt',
        'te am9 mt',
        'tr am9 mt',
        'Te am9 mt',
        'Tr am9 mt',
        'te am9',
        'Te am9',
        'tr am9',
        'Tr am9',
    ],
    oi: [
        'Oi',
        'oi',
        'Oii',
        'oii',
        'Oiii',
        'oiii'
    ],
    vcEhAssim: [
        'pq vc eh assim',
        'pq vc é assim',
        'pq vc eh assim man',
        'pq vc é assim man',
        'Pq vc eh assim',
        'Pq vc é assim',
        'Pq vc eh assim man',
        'Pq vc é assim man',
        'pq vc eh assim'.toUpperCase(),
        'pq vc é assim'.toUpperCase(),
        'pq vc eh assim man'.toUpperCase(),
        'pq vc é assim man'.toUpperCase()
    ],
    amor: [
        'amor',
        '9mor',
        'mo',
        'Amor'
    ],
    oiBot: [
        'Oi bot',
        'oi bot'
    ]
}

client.on('message', (msg) => {
    // ! console.log(client.users);

    if (msg.author.id === '689626608893689870') { // ! id de bianca
        if (variacoes.teAmo.includes(msg.content)) {
            let n = rand(0, 5);
            msg.channel.send(respostas.teAmo[n])
        }
    
        if (variacoes.oi.includes(msg.content)) {
            let n = rand(0, 2);
            msg.channel.send(respostas.oi[n])
        }
    
        if (variacoes.amor.includes(msg.content)) {
            msg.channel.send('ti amu', { files: ['./amor.jpg'] })
        }

        if (variacoes.oiBot.includes(msg.content)) {
            msg.channel.send('Olá dona bianca')
        }
    }
});

client.on('message', async (msg) => {
    if (!msg.guild) return;

    if (msg.content === prefix + 'join') { // ? #join
        if (msg.member.voice.channel == null) {
            msg.channel.send('Você precisa estar em um canal para chamar o bot')
        } else {
            servidores.server.connection = await msg.member.voice.channel.join();
        }
    }

    if (variacoes.vcEhAssim.includes(msg.content)) { // ? #play
        if (msg.member.voice.channel == null) {
            msg.channel.send('Você precisa estar em um canal para chamar o bot')
        } else {
            servidores.server.connection = await msg.member.voice.channel.join();
            servidores.server.connection.play('./sonho.mp3')

            setTimeout(() => {
                servidores.server.connection.disconnect();
            }, 7000)
        }
    }

    if (msg.content === prefix + 'leave') {
        if (msg.member.voice.channel == null) {
            msg.channel.send('Você precisa estar em um canal para chamar o bot')
        } else {
            await servidores.server.connection.disconnect();
        }
    }
});

// client.on('guildDelete', guild => {
//     console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
//     client.user.setActivity(`Serving ${client.guilds.size} servers`)
// });

client.login(config.token);