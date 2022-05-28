const pasteImage = require('paste-image')
const translate = require('deepl')


async function doTranslate() {
    const result = await translate({
        text: document.getElementById('ocrResult').value,
        free_api: true,
        auth_key: process.env.DEEPL_KEY,
        target_lang: 'EN',
    })
    document.getElementById('translateResult').value = result.data.translations.map(v => v.text).join("\n")
}

pasteImage.on('paste-image', async (img) => {
    const { data: { text } } = await worker.recognize(img.getAttribute('src'))
    document.getElementById('pasteImage').setAttribute("src", img.getAttribute('src'))
    document.getElementById('ocrResult').value = text.replace(/ /g, '').replace("\n", '')
        .replace(/[\u24ea\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468]/g, (o) => {
            return '\u24ea\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468'.indexOf(o)
        })
    doTranslate()
})

window.doTranslate = doTranslate
