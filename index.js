import express from 'express';
import removeBackground from '@imgly/background-removal-node';

const app = express()
const port = 3000

app.get('/remove-bg', async (req, res) => {
    if( !req.query.imgUrl){
        res.sendStatus(400)
        res.end()
        return
    }
    const imgUrl = req.query.imgUrl;
    try{
        const blob = await removeBackground(imgUrl);
        //res.setHeaders(headers);
        res.type(blob.type)
        blob.arrayBuffer().then((buf) => {
            res.send(Buffer.from(buf))
        })
    } catch (e) {
        res.sendStatus(500)
        res.end()
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})