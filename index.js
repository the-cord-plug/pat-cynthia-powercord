const { Plugin } = require('powercord/entities');
const { post } = require("powercord/http");
let x = false;
module.exports = class PatCynthia extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'pat-cynthia',
            description: 'pat cynthia!',
            usage: '{c}',
            executor: async () => {
                if (x) {return {send:false, result:"you're being rate limited! (dont pat too fast! only once per 5 seconds)"}}

                let res = await post("https://cynthia.rest/action/pat").execute();
                x = true;
                setTimeout(()=>{x=false}, 5000);
                return {send: false, result: res.body.message}
            }
        })
    }
    pluginWillUnload() {
        powercord.api.commands.unregisterCommand("pat-cynthia");
    }
};