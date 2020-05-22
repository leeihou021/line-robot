// 引用linebot
import linebot from 'linebot'
// 引用dotnev套件
import dotenv from 'dotenv'

import rp from 'request-promise'

// 讀取.env檔
dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  let msg = { }
  try {
    const data = await rp({ uri: 'https://api.thecatapi.com/v1/images/search', json: true })
    if (event.message.text === '貓') {
      msg = {
        type: 'image',
        originalContentUrl: data[0].url,
        previewImageUrl: data[0].url
      }
    }
  } catch (error) {
    console.log(error.message)
    msg = { type: 'text', text: '發生錯誤' }
  }
  // 原本會顯示網址是因為這邊完成後是以文字輸出 所以變成輸出網址
  event.reply(msg)
})
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
