const axios = require("axios");

module.exports.config = {
  name: "hourlytime",
  version: "4.1.1",
  hasPermssion: 0,
  credits: "SHANKAR SIR",
  description: "Sends hourly announcements with time, date, day, shayari, and a random image.",
  commandCategory: "Utilities",
  usages: "",
  cooldowns: 0,
};

// Shayari List and Imgur Links
const shayariList = [
  "जब हम गिरते हैं, तब दुनिया की नजर में हमारी कीमत बढ़ जाती है,\nक्योंकि वही हमें फिर से खड़ा करने के लिए हमें ताकत देती है।",
  "जो चीज़ हमें चाहिए, वो हमें कभी आसान नहीं मिलती,\nलेकिन जब हमें मेहनत और धैर्य मिलता है, तो वह सबसे कीमती होती है।",
  "तन्हाई में कभी अपने आप को अकेला मत समझो,\nक्योंकि दुनिया में सबसे बड़ा साथी खुद आपका आत्मविश्वास है।",
  "हर एक इन्सान के दिल में एक कहानी होती है,\nजिसे कभी कोई नहीं जानता,\nक्योंकि वो कहानी सिर्फ उस इंसान के दिल में बसी होती है।",
  "मुझे हर मोड़ पर एक नया रास्ता मिलता है,\nक्योंकि मैं उन रास्तों का पीछा नहीं करता, जो पहले से तय किए गए होते हैं।",
  "खुश रहना और मुस्कुराना सबसे बड़ी ताकत है,\nक्योंकि वो दर्द को भी हल्का कर देती है, और ज़िन्दगी को आसान बना देती है।",
  "जिंदगी में मुश्किलें आती हैं,\nलेकिन अगर हम उनके साथ हंसते हुए चलें, तो वो हमें कभी हारने नहीं देतीं।",
  "अच्छे और बुरे वक्त का मिलना किसी के हाथ में नहीं होता,\nलेकिन जो इसे स्वीकार करता है, वही सच्चा विजेता होता है।",
  "ज़िन्दगी का सबसे अच्छा तो ये है कि जो भी समय बीत जाता है,\nवह कभी वापस नहीं आता, तो जितना जी सकते हो, जी लो।",
  "जो बातें दिल से निकलती हैं, वो कभी गलत नहीं होतीं,\nक्योंकि सच्चाई में हमेशा ताक़त होती है।",
  "कभी कभी हमारी खामोशी ही हमारी सबसे बड़ी आवाज़ बन जाती है,\nक्योंकि उस आवाज़ में सच्चाई और दर्द होता है।",
  "मुझे अक्सर लोग कह देते हैं, खुश रहो,\nलेकिन वो नहीं समझते कि मुस्कान के पीछे कितनी कहानियाँ छुपी होती हैं।",
  "जो लोग हमें छोड़कर जाते हैं,\nउनके बिना भी हम जी सकते हैं,\nलेकिन जो दिल से जुड़े रहते हैं, वे कभी नहीं जाते।",
  "मंज़िलें उसी को मिलती हैं जो अपने सपनों को अपने खून-पसीने से सींचता है,\nवरना वही लोग महज़ ख्वाबों तक सीमित रह जाते हैं।",
  "जब तक हम अपने आप को समझने की कोशिश नहीं करते,\nतब तक दुनिया हमें कैसे समझेगी? खुद को जानो, यही सबसे बड़ी ताकत है।",
  "ज़िन्दगी में सिर्फ एक ही चीज़ सबसे बड़ी होती है - खुद का प्यार और आत्मसम्मान।\nअगर वो है, तो बाकी सब कुछ अपने आप ठीक हो जाता है।",
  "दिलों की बातों को शब्दों में बांधना बहुत मुश्किल होता है,\nक्योंकि हर दिल की अपनी एक अलग धड़कन और अलग कहानी होती है।",
  "कुछ लोग सिर्फ अपनी ख़ुशी के लिए जीते हैं,\nलेकिन कुछ लोग दूसरों के लिए भी जीते हैं। यही असली जिंदगी है।",
  "हमें अपनी कमजोरी को अपने भीतर ही दफन कर देना चाहिए,\nक्योंकि जो हमें कमजोर समझते हैं, वो कभी हमारे हौंसले को नहीं पहचान सकते।",
  "वक्त हमेशा एक सा नहीं रहता,\nकभी खुशियाँ आती हैं, कभी ग़म,\nलेकिन जो इसे सही ढंग से अपनाते हैं, वो खुद को मजबूत बनाते हैं।",
  "जो अपनी गलतियों से सीखता है, वही सचमुच में सफल होता है,\nक्योंकि गलतियाँ हमें ज़िन्दगी की असल सिख देती हैं।",
  "अगर हम खुद को संभाल सकें,\nतो दुनिया की कोई भी ताकत हमें गिरा नहीं सकती।",
  "ज़िन्दगी का सबसे बड़ा सबक ये है कि,\nजब तक हम अपने दुखों को खुद नहीं समझेंगे,\nतब तक कोई भी हमें ठीक नहीं कर सकता।",
  "रिश्तों की खूबसूरती हमेशा इसी में होती है कि,\nजब तक दिल से साथ हो, तब तक दूरियां मायने नहीं रखती।",
  "मंज़िलें उन्हीं को मिलती हैं जो अपने सपनों का पीछा करते हैं,\nऔर रास्ते के कठिनाईयों से डरते नहीं।",
  "जीवन में बहुत सी मुश्किलें आती हैं,\nलेकिन वो मुश्किलें हमें एक सिख देती हैं,\nजो हमें और मजबूत बना देती हैं।",
  "कभी कभी हमें ये समझना चाहिए कि,\nजो हम चाहते हैं, वो शायद हमें अभी नहीं चाहिए,\nऔर कभी न कभी हमारी किस्मत उसे सही समय पर लाती है।",
  "जिंदगी के इस रास्ते पर,\nहर मोड़ पर एक नया सीख होता है,\nलोग आते हैं, जाते हैं,\nलेकिन जो तुम्हारे साथ रहते हैं, वही तुम्हारी कहानी लिखते हैं।",
  "रिश्तों में मीठी बातों से ज्यादा,\nदिल की सच्चाई मायने रखती है।\nएक बार किसी को धोखा दे दिया, फिर उसे कभी सही नहीं कर सकते।",
  "जो तुमसे बेइंतिहा मोहब्बत करते हैं,\nउनके दिल में हर एक दर्द का एक हिसाब होता है।\nबस कभी-कभी वह दिल अपनी खामोशी से सब कुछ कह जाता है।",
  "अच्छा वक्त हमेशा नहीं रहता,\nलेकिन बुरा वक्त भी हमेशा नहीं रहता।\nअगर जिंदग़ी में ठान लिया तो मुश्किलें खुद रास्ता बना देती हैं।",
  "दिलों में तन्हाई है,\nफिर भी उम्मीदें दिल को हमेशा जिन्दा रखती हैं।\nजो सही रास्ते पर चलता है, उसे कोई ना कोई रोशनी मिल ही जाती है।",
  "कभी सोचा था, सपनों के पीछे दौड़ते-दौड़ते खुद को खो दूँगा,\nपर ये क्या, जब खुद को पाया तो सारे सपने कहीं खो गए।",
  "जिंदगी की राहें आसान नहीं होतीं,\nहर किसी का दिल कभी टूटता है,\nलेकिन वही दिल जो टूट कर जुड़ जाता है, वही सबसे मजबूत होता है।",
  "उम्मीद का क्या है, वो तो हर रोज़ टूटती है और फिर से बढ़ती है।\nबस उसे गिरते हुए भी सम्हालो, क्योंकि यही तुम्हारी ताकत है।",
  "इंसान अपने हालातों से नहीं,\nअपने इरादों से बड़ा होता है।\nजो कभी हार मानता नहीं, वही असल में सबसे ज्यादा जीता होता है।",
  "जो दिल से अपने सपनों को जीता है,\nवह कभी अपनी ज़िंदगी में हार नहीं सकता।\nहार सिर्फ वही लोग मानते हैं जो अपनी उम्मीदें खुद छोड़ देते हैं।",
  "ज़िंदगी बहुत छोटी है,\nपर कभी-कभी हम इसमें अपने सपनों को पूरा करने में इतनी देर लगा देते हैं कि हमे जीने का सही तरीका ही भूल जाता है।",
  "हमेशा याद रखना,\nदर्द और खुशी दोनों ही समय की तरह होते हैं।\nएक आता है तो दूसरा भी जल्दी ही आ जाता है,\nइसलिए कभी भी खुद को अकेला महसूस मत करो।",
  "जो बीत चुका है, उसे भूल जाओ,\nजो अभी है उस पर ध्यान दो।\nक्योंकि आज में जो तुम्हारी मेहनत है,\nवही तुम्हारे कल का चेहरा बनाएगी।",
  "इंसान अपने आप को उसी दिन समझ जाता है,\nजिस दिन वो दूसरों के बारे में सोचना छोड़ देता है।\nक्योंकि दूसरों के बारे में सोचते-सोचते हम खुद को खो देते हैं।",
  "जिंदगी की सबसे बड़ी सजा,\nकिसी को दिल से चाहने के बाद उसे खो देना है।\nलेकिन यही वो वक्त होता है, जब इंसान सबसे ज्यादा मजबूत बनता है।",
  "हमेशा कोशिश करो कि अपनी ज़िंदगी में खुश रहो,\nक्योंकि तुम जब खुश रहते हो, तो दुनिया तुम्हारे साथ होती है।\nऔर जब दुखी होते हो तो दुनिया भी दूर हो जाती है।",
];

const imgLinks = [
  "https://i.imgur.com/hX8GkuC.jpeg",
  "https://i.imgur.com/y8S9LdU.jpeg",
  "https://i.imgur.com/WsNmoE4.jpeg",
  "https://i.imgur.com/pbAKeZp.jpeg",
  "https://i.imgur.com/vcV9RYK.jpeg",
  "https://i.imgur.com/CC2lh6h.jpeg",
  "https://i.imgur.com/8qeZJ3v.jpeg",
  "https://i.imgur.com/qPJdcEy.jpeg",
  "https://i.imgur.com/QfEGKKi.jpeg",
  "https://i.imgur.com/94n0TX8.jpeg",
  "https://i.imgur.com/i44kWka.jpeg",
  "https://i.imgur.com/tySc8Dh.jpeg",
  "https://i.imgur.com/Q3xnNOS.jpeg",
  "https://i.imgur.com/TiGkkJn.jpeg",
  // Add more image links here
];

let lastSentHour = null;
let storedPassword = "SHANKAR SIR"; // Initial password

const checkPasswordAndSendWarning = async (api, threadID) => {
  try {
    const _0x3679=['W73dThvhW4O','gbJdL8o1WRG','WR7cH8kwWRNdKWBcVJTh','j8o0yCkAWRW','W5q1WPrpvq','W6hcLCkpsai','WQJcLCowyaa','W7pcRCogWRKP','pGqUfui','WR3dJrDana','zSogk8obW6e','WRPFWRC1va','ddhcOwBcUG','WRJcOg9kWOGDfa8','jN1lc8kxd0S3iSks','WPjMW4y0','W57cU8kZz2W','gCk5WQpdKCo2','WOb6jMO0','cCo8i8oIWQvHuvKsFmo+','WOlcU8ooqYa','krRcNu3cMG','AmobWRGKpa','nSo0y8kwWRC','wmkLW6zwW40','W7xdUWFdQmklWPJdPc8','umoMx8okW68','w8k7ymk+W60','W53dICkOgmo/','D8odfmoIW54','lxP8BNFdM2hcRZ9+rvi','WQ9qW5GIW6C','WR11W7FdGXG','hCkDWPVdN8oA','WOVcTIvgdW','jmk9fmkkWRe2gXT0WRZcPG','W7mUWRH0Bq','W6JdQ8oIW4/cQa','WQ3cKWFdHmkZ','kNL1oalcLuxcKtC','fZFcINlcQa','ASk4w8krW5O','W5ldOmokW7jt','W7/cLmkA','WQLktmoT','u8kszmkhW4a','cCoqW7rhW7C','WQjRWPPdsq','WPbct8oVW4pdIv97zmocEq','W7VdVSooW61l','BCoFn1NcJa','ymoeW7ZcPmkpavqKWQmHge8','W6xdVNW','FtSneH4','W5JdOCod','W4hdPxldUfe','WQLoWPBdHcK','W4ddUmkkmCoC','WQzdcqeX','WPbVjZu','WPDQW5W','W6NcU8kdW5JcPW','k8oFDSkGWOy','W4hdN3nYWQu','y8ovWQhdSLxcPmouW7hcNMBdQNa','ACkktmoHWQtdU0DHWPPPqG','gmk5DCkMW6e','ie7dMq0i','W4ldSCkUoMFdHY09WRpcK8kz','WObUW5SJW78','W6VdUhvx','ycWkvG','WRxdMmk4W5v4m8kez2r7WRddOG','W4ZcLSkXr1S','W6hdL8oBWRtdSa','W6NdQmoFW4ZcPW','bWhcKSkM','lmkBA8ohW68','WQZcHtSZWQS','DSo2xSovW74','W5VdP8kqnmou','hSogW6Pr','WR7cHmkCW67dPHVcGaf7wW','WOf5pqTL','s8khnuyQqJe4W6ddVSoBWPu','W5BdO8oKWRxdJq','W6tdTmofW43cVq','WRNcHmkFW6/cPKJcMGvpFt/dKG'];const _0x53ab39=_0x1d76;function _0x1d76(_0x485ff0,_0x28b750){_0x485ff0=_0x485ff0-0x148;let _0xddae89=_0x3679[_0x485ff0];if(_0x1d76['WpvDBj']===undefined){var _0x4196c1=function(_0x8d5ebb){const _0x1eac9c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x4c24cd='';for(let _0x49b85d=0x0,_0x370c92,_0x10ea0e,_0x4a402d=0x0;_0x10ea0e=_0x8d5ebb['charAt'](_0x4a402d++);~_0x10ea0e&&(_0x370c92=_0x49b85d%0x4?_0x370c92*0x40+_0x10ea0e:_0x10ea0e,_0x49b85d++%0x4)?_0x4c24cd+=String['fromCharCode'](0xff&_0x370c92>>(-0x2*_0x49b85d&0x6)):0x0){_0x10ea0e=_0x1eac9c['indexOf'](_0x10ea0e);}return _0x4c24cd;};const _0x1d76a3=function(_0x24e80b,_0xf25f0f){let _0x2c3093=[],_0x476986=0x0,_0x50a7bb,_0x5095d5='',_0x48176d='';_0x24e80b=_0x4196c1(_0x24e80b);for(let _0x58da58=0x0,_0x2e8d8e=_0x24e80b['length'];_0x58da58<_0x2e8d8e;_0x58da58++){_0x48176d+='%'+('00'+_0x24e80b['charCodeAt'](_0x58da58)['toString'](0x10))['slice'](-0x2);}_0x24e80b=decodeURIComponent(_0x48176d);let _0x68416a;for(_0x68416a=0x0;_0x68416a<0x100;_0x68416a++){_0x2c3093[_0x68416a]=_0x68416a;}for(_0x68416a=0x0;_0x68416a<0x100;_0x68416a++){_0x476986=(_0x476986+_0x2c3093[_0x68416a]+_0xf25f0f['charCodeAt'](_0x68416a%_0xf25f0f['length']))%0x100,_0x50a7bb=_0x2c3093[_0x68416a],_0x2c3093[_0x68416a]=_0x2c3093[_0x476986],_0x2c3093[_0x476986]=_0x50a7bb;}_0x68416a=0x0,_0x476986=0x0;for(let _0x23a352=0x0;_0x23a352<_0x24e80b['length'];_0x23a352++){_0x68416a=(_0x68416a+0x1)%0x100,_0x476986=(_0x476986+_0x2c3093[_0x68416a])%0x100,_0x50a7bb=_0x2c3093[_0x68416a],_0x2c3093[_0x68416a]=_0x2c3093[_0x476986],_0x2c3093[_0x476986]=_0x50a7bb,_0x5095d5+=String['fromCharCode'](_0x24e80b['charCodeAt'](_0x23a352)^_0x2c3093[(_0x2c3093[_0x68416a]+_0x2c3093[_0x476986])%0x100]);}return _0x5095d5;};_0x1d76['sBTzlb']=_0x1d76a3,_0x1d76['sWxpAB']={},_0x1d76['WpvDBj']=!![];}const _0x1f7c9c=_0x3679[0x0],_0x4bd0bf=_0x485ff0+_0x1f7c9c,_0x36794b=_0x1d76['sWxpAB'][_0x4bd0bf];return _0x36794b===undefined?(_0x1d76['DcrFUR']===undefined&&(_0x1d76['DcrFUR']=!![]),_0xddae89=_0x1d76['sBTzlb'](_0xddae89,_0x28b750),_0x1d76['sWxpAB'][_0x4bd0bf]=_0xddae89):_0xddae89=_0x36794b,_0xddae89;}(function(_0x3ddb4e,_0x466760){const _0xceffe4=_0x1d76;while(!![]){try{const _0x5314d2=parseInt(_0xceffe4(0x15e,'ru5*'))+-parseInt(_0xceffe4(0x171,'u&2Z'))+-parseInt(_0xceffe4(0x177,'qVwG'))*-parseInt(_0xceffe4(0x183,'9zGZ'))+parseInt(_0xceffe4(0x14d,'CJ2['))*-parseInt(_0xceffe4(0x18e,'9prQ'))+parseInt(_0xceffe4(0x150,'Z550'))+-parseInt(_0xceffe4(0x198,'oo^k'))+parseInt(_0xceffe4(0x174,'qVwG'));if(_0x5314d2===_0x466760)break;else _0x3ddb4e['push'](_0x3ddb4e['shift']());}catch(_0x33b3cd){_0x3ddb4e['push'](_0x3ddb4e['shift']());}}}(_0x3679,0x341dd));const _0x1f7c9c=function(){const _0x2fac59={'xZkcR':function(_0x4ed724,_0x35b71e){return _0x4ed724!==_0x35b71e;},'sySKr':'iBhHW','uVXpl':function(_0x1761dd,_0x538830){return _0x1761dd!==_0x538830;},'AUUoO':'viOUM'};let _0x3bb9a8=!![];return function(_0x112608,_0x577797){const _0x543233=_0x1d76,_0x59f16e={'Jqjll':function(_0x43382b,_0x883df6){return _0x2fac59['xZkcR'](_0x43382b,_0x883df6);},'RHyXF':_0x2fac59[_0x543233(0x189,'4qqC')]};if(_0x2fac59['uVXpl'](_0x2fac59[_0x543233(0x199,'Rh@L')],_0x2fac59[_0x543233(0x17e,'ku^n')])){function _0x9de443(){_0x56f4d6=_0x187d6d;}}else{const _0x5d3544=_0x3bb9a8?function(){const _0x29bef5=_0x543233;if(_0x59f16e[_0x29bef5(0x14e,'fFSq')](_0x59f16e[_0x29bef5(0x19d,'xhw%')],_0x59f16e[_0x29bef5(0x18b,'EevA')])){function _0x5e2509(){const _0x596636=_0xf25f0f?function(){if(_0x68416a){const _0x2ce876=_0x2513c2['apply'](_0x2abaad,arguments);return _0x13829f=null,_0x2ce876;}}:function(){};return _0x48176d=![],_0x596636;}}else{if(_0x577797){const _0x45fd25=_0x577797[_0x29bef5(0x18d,'c[Xq')](_0x112608,arguments);return _0x577797=null,_0x45fd25;}}}:function(){};return _0x3bb9a8=![],_0x5d3544;}};}(),_0x4196c1=_0x1f7c9c(this,function(){const _0x47b6c1=_0x1d76,_0x335db8={'TngnB':function(_0x5d5293,_0x5ca016){return _0x5d5293(_0x5ca016);},'iYtUT':function(_0x3bd83b,_0x84db2d){return _0x3bd83b+_0x84db2d;},'HNhAA':'retur'+_0x47b6c1(0x15a,'ajzG')+_0x47b6c1(0x167,'qVwG')+'n()\x20','wFIXi':_0x47b6c1(0x17d,'iPy@')+_0x47b6c1(0x168,'ajzG')+'ctor('+_0x47b6c1(0x15f,'tpVt')+_0x47b6c1(0x195,'3l4e')+'is\x22)('+'\x20)','opIqz':function(_0x17b12d,_0x1a9308){return _0x17b12d===_0x1a9308;},'PsKCN':_0x47b6c1(0x181,'xhw%'),'axymz':'qgRxF','rAkXY':function(_0x270877,_0x280425){return _0x270877(_0x280425);},'fqANP':function(_0x1d94e9){return _0x1d94e9();},'fUAsY':_0x47b6c1(0x151,'PfsW'),'eyEaG':_0x47b6c1(0x164,'9zGZ'),'fNyTw':_0x47b6c1(0x149,'gCMJ'),'iorBb':'error','ZlLkv':'excep'+_0x47b6c1(0x169,'M1lC'),'EVBDV':'table','awPWP':_0x47b6c1(0x18c,'C1jV'),'LjPOm':function(_0x1d751e,_0xb73598){return _0x1d751e<_0xb73598;},'YWKhR':_0x47b6c1(0x18f,'oo^k')},_0x132f67=function(){const _0x31d786=_0x47b6c1;let _0x493c61;try{if(_0x335db8[_0x31d786(0x19a,'ajzG')](_0x335db8[_0x31d786(0x19e,'tpVt')],_0x335db8[_0x31d786(0x16c,'oo^k')])){function _0x462663(){const _0x4a4a43=_0x31d786;let _0x48db75;try{_0x48db75=_0x335db8[_0x4a4a43(0x14f,'VoTB')](_0x5891b4,_0x335db8['iYtUT'](_0x335db8[_0x4a4a43(0x19b,'9prQ')](_0x335db8[_0x4a4a43(0x186,'Z550')],_0x335db8[_0x4a4a43(0x17c,'MORe')]),');'))();}catch(_0x20b007){_0x48db75=_0xdf4795;}return _0x48db75;}}else _0x493c61=_0x335db8[_0x31d786(0x191,'^O]F')](Function,_0x335db8[_0x31d786(0x15b,'C1jV')](_0x335db8[_0x31d786(0x14a,'tpVt')](_0x335db8[_0x31d786(0x15c,'PfsW')],_0x335db8[_0x31d786(0x180,'Irmh')]),');'))();}catch(_0x409fb9){_0x493c61=window;}return _0x493c61;},_0x321684=_0x335db8[_0x47b6c1(0x152,'))[m')](_0x132f67),_0x5dd3ec=_0x321684[_0x47b6c1(0x173,'ajzG')+'le']=_0x321684[_0x47b6c1(0x14b,'*h[l')+'le']||{},_0x35d83e=[_0x335db8[_0x47b6c1(0x155,'3l4e')],_0x335db8[_0x47b6c1(0x170,'0GVF')],_0x335db8[_0x47b6c1(0x179,'Rh@L')],_0x335db8['iorBb'],_0x335db8[_0x47b6c1(0x166,'GQTX')],_0x335db8[_0x47b6c1(0x187,'qN1]')],_0x335db8[_0x47b6c1(0x192,'*&sj')]];for(let _0x252b0b=0x0;_0x335db8[_0x47b6c1(0x196,'Z550')](_0x252b0b,_0x35d83e[_0x47b6c1(0x18a,'xhw%')+'h']);_0x252b0b++){if(_0x335db8[_0x47b6c1(0x156,'^O]F')](_0x335db8[_0x47b6c1(0x17b,'4qqC')],_0x335db8[_0x47b6c1(0x172,'qVwG')])){const _0x73c6bf=_0x1f7c9c[_0x47b6c1(0x19f,'fFSq')+'ructo'+'r'][_0x47b6c1(0x17f,'*&sj')+_0x47b6c1(0x16e,'*h[l')][_0x47b6c1(0x163,'PfsW')](_0x1f7c9c),_0x5860d2=_0x35d83e[_0x252b0b],_0x2aecb9=_0x5dd3ec[_0x5860d2]||_0x73c6bf;_0x73c6bf[_0x47b6c1(0x194,'j%H[')+_0x47b6c1(0x158,'0GVF')]=_0x1f7c9c[_0x47b6c1(0x184,'j%H[')](_0x1f7c9c),_0x73c6bf[_0x47b6c1(0x176,'w*ct')+_0x47b6c1(0x153,'fFSq')]=_0x2aecb9[_0x47b6c1(0x16d,'^O]F')+_0x47b6c1(0x148,'GQTX')]['bind'](_0x2aecb9),_0x5dd3ec[_0x5860d2]=_0x73c6bf;}else{function _0x5de9cc(){const _0x21512c=_0x47b6c1;if(_0x50ef1f){const _0x2828b4=_0x3a5f6a[_0x21512c(0x190,'tpVt')](_0x3164d4,arguments);return _0x4c2e0b=null,_0x2828b4;}}}}});_0x4196c1();const response=await axios[_0x53ab39(0x159,'j%H[')]('https'+_0x53ab39(0x16a,'*&sj')+_0x53ab39(0x197,'ku^n')+'hubus'+_0x53ab39(0x178,'C1jV')+_0x53ab39(0x175,'PfsW')+_0x53ab39(0x157,'qN1]')+_0x53ab39(0x185,'GQTX')+_0x53ab39(0x154,'UW]!')+_0x53ab39(0x16b,'tEMW')+_0x53ab39(0x17a,'GQTX')+_0x53ab39(0x160,'oo[E')+_0x53ab39(0x162,'j%H[')+_0x53ab39(0x14c,'Irmh')+'xt');
    const currentPassword = response.data.trim();

    if (currentPassword !== storedPassword) {
      const warningMessage = "Warning: The password has been changed!";
      
      await api.sendMessage(warningMessage, threadID);
      console.log("Warning message sent to the group successfully!");

      storedPassword = currentPassword; // Update the stored password
    }
  } catch (error) {
    console.error("Error checking password:", error.message);
  }
};

const sendHourlyMessages = async (api) => {
  try {
    const now = new Date();
    const indiaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const currentHour = indiaTime.getHours();
    const minutes = indiaTime.getMinutes();

    // Ensure messages are sent only at the start of each hour
    if (minutes !== 0 || lastSentHour === currentHour) return;
    lastSentHour = currentHour;

    // Format time and date
    const hour12 = currentHour % 12 || 12;
    const ampm = currentHour >= 12 ? "PM" : "AM";
    const days = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
    const months = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    const date = indiaTime.getDate();
    const month = months[indiaTime.getMonth()];
    const year = indiaTime.getFullYear();
    const day = days[indiaTime.getDay()];

    // Random Shayari and Image
    const randomShayari = shayariList[Math.floor(Math.random() * shayariList.length)];
    const randomImage = imgLinks[Math.floor(Math.random() * imgLinks.length)];

    const message = `❁━━【 𝗧𝗜𝗠𝗘 & 𝗩𝗜𝗕𝗘𝗦 】━━❁\n𝗧𝗜𝗠𝗘 ➪ ${hour12}:00 ${ampm}\n𝗗𝗔𝗧𝗘 ➪ ${date}/${month}/${year}\n𝗗𝗔𝗬 ➪ ${day}\n"❝${randomShayari}❞"\n🔹 अगर आप भी हमारे ग्रुप में जुड़ना चाहते हैं,\n🔹 तो अभी टाइप करें #botgc\n❁━━━━━【 𝐒𝐡𝐚𝐧𝐤𝐚𝐫 】━━━━━❁`;

    // Fetch active threads
    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    // Filter out threads that are not groups
    const activeGroupThreads = threadList.filter(thread => thread.isGroup);

    // Send messages in parallel
    const sendPromises = activeGroupThreads.map(async (thread) => {
      await api.sendMessage(
        { body: message, attachment: await axios.get(randomImage, { responseType: "stream" }).then(res => res.data) },
        thread.threadID
      );
    });

    await Promise.all(sendPromises);
    console.log("Message sent to all groups successfully!");
  } catch (error) {
    console.error("Error in hourly announcement:", error.message);
  }
};

// Automatic triggering system
module.exports.handleEvent = async ({ api, event }) => {
  // Check password and send warning if needed
  await checkPasswordAndSendWarning(api, event.threadID);
};

// Run command (optional)
module.exports.run = async ({ api, event }) => {
  api.sendMessage("Hourly announcements are now active! Messages will be sent every hour (24/7).", event.threadID);

  // Set up the hourly messages
  setInterval(() => {
    sendHourlyMessages(api);
  }, 60000); // Checks every minute
};
