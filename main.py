import io

from aiohttp import web
from aiohttp import ClientSession
from PIL import Image


async def remove_bg(request):
    if 'imgUrl' not in request.query:
        return web.Response(status=400)
    imgUrl = request.query['imgUrl']
    async with ClientSession() as session:
        async with session.get(imgUrl) as response:
            response.auto_decompress = False
            buffer = io.BytesIO(await response.read())
            img = Image.open(buffer)
    rgba = img.convert("RGBA")
    datas = rgba.getdata()

    newData = [] 
    for item in datas: 
        if item[0] >= 247 and item[1] >= 247 and item[2] >= 247:  # finding white colour 
            # replacing it with a transparent value 
            newData.append((255, 255, 255, 0)) 
        else: 
            newData.append(item) 
    
    rgba.putdata(newData)
    stream = io.BytesIO()
    rgba.save(stream, "PNG")

    return web.Response(body=stream.getvalue(), content_type='image/png')

app = web.Application()
app.add_routes([web.get('/remove-bg', remove_bg)])
web.run_app(app,port=5555)