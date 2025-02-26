  
module.exports.config = {
  name: "ai",
  version: "2.0.8",
  hasPermssion: 0,
  credits: ".",
  description: "AI",
  commandCategory: "utilities",
  usages: "AI",
  cooldowns: 5,
  dependencies: {
        "openai": ""
    }
};
module.exports.run = async function({ api, event, args }) {
 

const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
                  apiKey: "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",
                            });
                            const openai = new OpenAIApi(configuration);
  let data = args.join(" ");
                            if (data.length < 2) {
                                api.sendMessage("what can i help you?", event.threadID);
                            } else {
                                try {
                                    const completion = await openai.createCompletion({
                                        model: "text-davinci-003",
                                        prompt: args.join(" "),
                                        temperature: 0.5,
                                        max_tokens: 2048,
                                        top_p: 0.3,
                                        frequency_penalty: 0.5,
                                        presence_penalty: 0.0,
                                    });
                                    api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID);
                                }
                                catch (error) {
                                    if (error.response) {
                                        console.log(error.response.status);
                                        console.log(error.response.data);
                                    } else {
                                        console.log(error.message);
                                        api.sendMessage(error.message, event.threadID);
                                    }
                                }
                            }
}