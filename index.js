const axios = require('axios')
const fs = require('fs-extra')
const redlineSync = require('readline-sync')
 

if (!fs.existsSync(`Tiktok`)) {
    fs.mkdirSync(`Tiktok`)
    console.log("Folder Tiktok berhasil dibuat")
} else {
    console.log('Folder video sudah ada')
    console.log('Melanjutkan ke proses download')
}
async function downloadVideo () {
    const uri = redlineSync.question('Masukan Link video: ')
    const video = await axios.get('https://api.douyin.wtf/api?url=' + uri).then(res => {
        if(res.data.status == "success")
        var tmp = [res.data.nwm_video_url, res.data.video_author_id]
        return tmp
        
    }).catch(err => {
        console.log('error: ' + err)
    })
    if(video){
        await axios.get(video, {responseType: 'stream'}).then(res => {
            // console.log(res.data.video_author_id)
            res.data.pipe(fs.createWriteStream(`Tiktok/${[video[1]]}.mp4`))
            console.log('Berhasil download video')
            console.log('Silahkan cek folder Tiktok')
        }).catch(err => {
            console.log('Gagal mengunduh video karna ' + err)
        })
    } else {
        console.log('Gagal mengunduh video')
    }
}
downloadVideo()