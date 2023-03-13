from datetime import datetime

from flask import Flask, render_template, request, send_from_directory

import psutil

import socket

import platform

app = Flask(__name__)

@app.route("/static/<path:path>")
def send_static_content(path):
    return send_from_directory("static", path)

@app.context_processor
def add_imports():
    return dict(datetime=datetime, psutil=psutil, socket=socket, request=request, platform=platform)

@app.route("/")
def route_index():
    return render_template("index.html")

