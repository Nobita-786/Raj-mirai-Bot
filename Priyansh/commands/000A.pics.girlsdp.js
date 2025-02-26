module.exports.config = {
    name: "dp",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Aziz",
    description: "janu pics💋",
    commandCategory: "dp",
    usages: "",
    cooldowns: 3,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var link = [
      "https://i.imgur.com/lfk29KL.jpg",
    "https://i.imgur.com/Cflsaj1.jpg",
"https://i.imgur.com/l6YdExk.jpg","https://i.imgur.com/zLdmLKe.jpg","https://i.imgur.com/Ajgkuge.jpg","https://i.imgur.com/u0K1lD0.jpg","https://i.imgur.com/OVuoAdV.jpg","https://i.imgur.com/R5sVCcU.jpg","https://i.imgur.com/GbtATsm.jpg","https://i.imgur.com/OOSIkYu.jpg","https://i.imgur.com/zLdmLKe.jpg","https://i.imgur.com/l6YdExk.jpg","https://i.imgur.com/Cflsaj1.jpg","https://i.imgur.com/AAi0wQ0.jpg","https://i.imgur.com/tY3jkon.jpg","https://i.imgur.com/Duyyiun.jpg","https://i.imgur.com/z0AWCgC.jpg","https://i.imgur.com/clhsXeh.jpg","https://i.imgur.com/I7C1FaP.jpg","https://i.imgur.com/SvVmCv2.jpg",
"https://i.imgur.com/6b25xc4.jpg",
"https://i.imgur.com/HV7hvCV.jpg",
"https://i.imgur.com/JQHJX7V.jpg",
"https://i.imgur.com/YK5K6Ok.jpg",
"https://i.imgur.com/bCBpSul.jpg",
"https://i.imgur.com/Cql9CR0.jpg",
"https://i.imgur.com/8LQYWks.jpg",
"https://i.imgur.com/Ew8rXRx.jpg",
"https://i.imgur.com/2V9QfFH.jpg",
"https://i.imgur.com/TXtVG4r.jpg",
"https://i.imgur.com/pIuFJN0.jpg",
"https://i.imgur.com/H3RbQBB.jpg",
"https://i.imgur.com/UnZTmBM.jpg",
"https://i.imgur.com/oQYJWe3.jpg",
"https://i.imgur.com/7jRTnLH.jpg",
"https://i.imgur.com/MULLVgS.jpg",
"https://i.imgur.com/kqfY1OV.jpg",
"https://i.imgur.com/Cjc8OO1.jpg",
"https://i.imgur.com/CcxehNJ.jpg"];
    var callback = () => api.sendMessage({ body: `ㅤ\n    𓆩🅟𝗶𝗸a͜͡巛😍ᯤᯱᯱᯱ࿐  \n➢HERE DP FOR GIRL\nㅤ`, attachment: fs.createReadStream(__dirname + "/cache/5.jpg") }, event.threadID, (err, info) => fs.unlinkSync(__dirname + "/cache/5.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/5.jpg")).on("close", () => callback());
};