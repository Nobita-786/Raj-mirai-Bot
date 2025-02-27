const ytdl = require('@distube/ytdl-core');
const ytSearch = require('yt-search');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  name: 'ytb',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Mr Perfect',
  description: 'Download YouTube videos or audio',
  commandCategory: 'media',
  usages: '+ytb <video name or URL> -<format>',
  cooldowns: 5,
  dependencies: {
    '@distube/ytdl-core': '',
    'yt-search': '',
    'fs-extra': '',
    'path': ''
  },
  run: async function({ api, event, args }) {
    const downloadDir = path.join(__dirname, '../../downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const input = args.join(' ');
    const formatMatch = input.match(/-(audio|video)$/i);
    if (!formatMatch) {
      return api.sendMessage('❌ *Error:* Please specify the format using -audio or -video.', event.threadID, event.messageID);
    }

    const format = formatMatch[1].toLowerCase();
    const query = input.replace(/-(audio|video)$/i, '').trim();

    if (!query) {
      return api.sendMessage('❌ *Error:* Please provide a video name or URL.', event.threadID, event.messageID);
    }

    const searchResults = await ytSearch(query);
    if (!searchResults.videos.length) {
      return api.sendMessage('⚠️ *No results found!* Try a different query.', event.threadID, event.messageID);
    }

    const selectedVideo = searchResults.videos[0];
    const fileExtension = format === 'video' ? 'mp4' : 'mp3';
    const filePath = path.join(downloadDir, `${selectedVideo.videoId}.${fileExtension}`);

    const streamOptions = format === 'video' ? {} : { filter: 'audioonly' };
    const stream = ytdl(selectedVideo.url, streamOptions).pipe(fs.createWriteStream(filePath));

    stream.on('finish', async () => {
      api.sendMessage({
        body: selectedVideo.title,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    });

    stream.on('error', async (error) => {
      console.error('Download error:', error);
      api.sendMessage('❌ *Download Failed!* Please try again later.', event.threadID, event.messageID);
    });
  }
};
