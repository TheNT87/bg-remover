import express from 'express';
import removeBackground from '@imgly/background-removal-node';

const app = express()
const port = 3000

const config = {
    debug: true,
    model: 'small',
    output: {
        quality: 0.4
    }
};
/*type Config = {
    publicPath: string; // The public path used for model and wasm files. Default: '`file://${path.resolve(`node_modules/${pkg.name}/dist/`)}/`.
    debug: bool; // enable or disable useful console.log outputs
    model: 'small' | 'medium'; // The model to use. (Default "medium")
    output: {
      format: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/x-rgba8'; // The output format. (Default "image/png")
      quality: number; // The quality. (Default: 0.8)
      type: 'foreground' | 'background' | 'mask'; // The output type. (Default "foreground")
    };
  };*/

app.get('/remove-bg', async (req, res) => {
    if( !req.query.imgUrl){
        res.sendStatus(400)
        res.end()
        return
    }
    const imgUrl = req.query.imgUrl;
    try{
        const blob = await removeBackground(imgUrl,config);
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