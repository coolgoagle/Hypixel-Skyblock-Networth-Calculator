// ONLY WORKS IN TERMINAL DUE TO PROMPT, if you want to use it in Visual Studio Code, then use main('username here')

require("node-bash-title")('Get Networth')
const fetch = require("node-fetch")
const prompt = require("prompt")
const imageservice = require('terminal-image')
const got = require("got")

console.clear()

function numberformat(num) {
    if (num >= 1000000000000000) {
        return (num / 1000000000000000).toFixed(1).replace(/\.0$/, '') + 'QD';
    }
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
    }
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

async function main(username) {
    const id = await uuid(username.toString())
    const nw = await networth(id)
    console.log(username)
    console.log(nw)
    const imagedata = await got('https://crafatar.com/renders/body/' + id + '?overlay=true').buffer();
    //const imagedata = await got('https://mc-heads.net/player/' + id).buffer()
    console.log(await imageservice.buffer(imagedata, {width: 50, height: 25}))
}

async function uuid(username) {
    const data = await fetch('https://api.mojang.com/users/profiles/minecraft/' + username.toString()).then((text) => text.json())
    return data["id"]
}

async function networth(uuid) {
    const data = await fetch('https://soopy.dev/api/v2/leaderboard/networth/user/' + uuid.toString()).then((text) => text.json())
    return numberformat(parseInt(data["data"]["data"]["userData"]["networth"]))
}

prompt.get(['username'], function (err, result) {
    main(result.username)
    console.clear()
})

//main("56ms")