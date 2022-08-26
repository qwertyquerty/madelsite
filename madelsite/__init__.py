from datetime import datetime

from flask import Flask, render_template, request

import psutil

import socket

app = Flask(__name__)

@app.context_processor
def add_imports():
    return dict(datetime=datetime, psutil=psutil, socket=socket, request=request)

@app.route("/")
def route_index():
    return render_template("index.html")

