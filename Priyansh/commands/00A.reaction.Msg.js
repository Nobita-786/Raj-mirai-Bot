const fs = require("fs");
module.exports.config = {
	name: "😁😂",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Aziz", 
	description: "",
	commandCategory: "no prefix",
	usages: "😁🤭🤣😂",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("")==0 || event.body.indexOf("B")==0 || event.body.indexOf("C")==0 ||  event.body.indexOf("D")==0 || event.body.indexOf("E")==0 || event.body.indexOf("F")==0 || event.body.indexOf("G")==0 || event.body.indexOf("H")==0 || event.body.indexOf("I")==0 || event.body.indexOf("J")==0 || event.body.indexOf("L")==0 || event.body.indexOf("K")==0 || event.body.indexOf("M")==0 || event.body.indexOf("N")==0 || event.body.indexOf("O")==0 || event.body.indexOf("P")==0 || event.body.indexOf("Q")==0 || event.body.indexOf("S")==0 || event.body.indexOf("T")==0 || event.body.indexOf("U")==0 || event.body.indexOf("V")==0 ||   event.body.indexOf("W")==0 || event.body.indexOf("X")==0 ||  event.body.indexOf("Y")==0 || event.body.indexOf("Z")==0) {
		var msg = {
				body: "",
				
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction(" ", event.messageID, (err) => {}, true)
  }
	if (event.body.indexOf("😂")==0 || event.body.indexOf("😁")==0 || event.body.indexOf("🤣")==0 || event.body.indexOf("😅")==0) {
		var msg = {
				body: "",
				
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😂", event.messageID, (err) => {}, true)
		}
	if (event.body.indexOf("🥰")==0 || event.body.indexOf("❣️")==0 || event.body.indexOf("🤩")==0 || event.body.indexOf("🤗")==0) {
		var msg = {
				body: "👆🥰🥰🥰",
				
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("💖", event.messageID, (err) => {}, true)
  }
      }
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }