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
                if (cantPatCynthia) {return {send:false, result:"you're being rate limited! (dont pat too fast! only once per 5 seconds)"}}

                let res = await post("https://cynthia.rest/action/pat").execute();
                cantPatCynthia = true;
                setTimeout(()=>{cantPatCynthia=false}, 5000);
                return {send: false, result: res.body.message}
            }
        })
        powercord.api.commands.registerCommand({
            command: 'hug-cynthia',
            description: 'hug cynthia!',
            usage: '{c}',
            executor: async () => {
                if (cantHugCynthia) {return {send:false, result:"you're being rate limited! (dont hug too fast! only once per hour)"}}

                let res = await post("https://cynthia.rest/action/hug").execute();
                cantHugCynthia = true;
                setTimeout(()=>{cantHugCynthia=false}, 5000);
                return {send: false, result: res.body.message}
            }
        })
    }
    pluginWillUnload() {
        powercord.api.commands.unregisterCommand("pat-cynthia");
        powercord.api.commands.unregisterCommand("hug-cynthia");
    }
};