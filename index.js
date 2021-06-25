const { Plugin } = require('powercord/entities');
const { post } = require("powercord/http");
let cantPatCynthia = false;
let cantHugCynthia = false;
module.exports = class PatCynthia extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'pat-cynthia',
            description: 'pat cynthia!',
            usage: '{c}',
            executor: async () => {
                if (cantPatCynthia) { return { send: false, result: "you're being rate limited! (dont pat too fast! only once per 5 seconds)" } }
                try {
                    let res = await post("https://cynthia.rest/action/pat").execute();
                    cantPatCynthia = true;
                    setTimeout(() => { cantPatCynthia = false }, 5000);
                    return { send: false, result: res.body.message }
                } catch { return { send: false, result: "Error! (You're likely being rate limited, dont pat too fast! (once per 5 seconds))" }; }
            }
        })
        powercord.api.commands.registerCommand({
            command: 'hug-cynthia',
            description: 'hug cynthia!',
            usage: '{c}',
            executor: async () => {
                if (cantHugCynthia) { return { send: false, result: "you're being rate limited! (dont hug too fast! only once per hour)" } }
                try {
                    let res = await post("https://cynthia.rest/action/hug").execute();
                    cantHugCynthia = true;
                    setTimeout(() => { cantHugCynthia = false }, 3600e3);
                    return { send: false, result: res.body.message }
                }
                catch { return { send: false, result: "Error! (You're likely being rate limited, dont hug too fast! (once per hour))" }; }
            }
        })
    }
    pluginWillUnload() {
        powercord.api.commands.unregisterCommand("pat-cynthia");
        powercord.api.commands.unregisterCommand("hug-cynthia");
    }
};