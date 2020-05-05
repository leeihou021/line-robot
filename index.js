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
  let msg = ''
  try {
    const data = await rp({ url: 'https://api.thecatapi.com/v1/images/search', json: true })
    msg = data.entry[0].title
  } catch (error) {
    console.log(error.message)
    msg = '發生錯誤'
  }
  event.reply(msg)
})
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
