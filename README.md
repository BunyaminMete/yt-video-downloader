
Pytube database codes below;
--------------------------------------------------------------------

```
from flask import Flask, request
from pytube import YouTube
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)


@app.route("/api2/youtube")
def deneme():
    url = request.args.get('url')
    yt = YouTube(url)

    regEx = yt.description
    regEx = regEx.replace('\n', ' ')

    video = {"info":
                 {"description": regEx,
                  "title": yt.title,
                  "author": yt.author,
                  "views": yt.views,
                  "thumbnail": yt.thumbnail_url}
             }

    return video


@app.route("/api2/youtube/download")
def download():
    url = request.args.get('url')
    yt = YouTube(url)
    event = yt.streams.filter(progressive=True).order_by('resolution').desc().first()\
        .download(os.path.expanduser("~/Desktop"))

    return event


if __name__ == '__main__':
    app.run()
 ```
--------------------------------------------------------------------
