#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
from flask import Flask, Response, send_from_directory
from flask import request

app = Flask(__name__)

ACCOUNT_SID = 'AC94a1765a13973ddfa4420c0d35d6ab4e'
AUTH_TOKEN = 'e67261b76d3969e46a209a589fab2b69'
PHONE = '+16266002278'
PHONE2 = '+971505250332'

@app.route("/", methods=["GET"])
def hello():
  return send_from_directory("/", "index.html")

@app.route("/send")
def send_sms():
  global client
  global STATE
  print ("Sending a message...")
  new_message = client.messages.create(to=PHONE2, from_='+16266002278', body=WARNING_TITLE)
  STATE = "WARNING"
  return "Thank you!"

@app.route("/receive_sms")
def receive_sms():
  global STATE

  if STATE == "WARNING":
    new_message = client.messages.create(to=PHONE2, from_='+16266002278', body=WARNING_DETAILS)
    STATE = "DETAILS"
  elif STATE == "DETAILS":
    #new_message_1 = client.messages.create(to=PHONE2, from_='+16266002278', body=JOB_CONFIRMATION)
    new_message_2 = client.messages.create(to=PHONE2, from_='+16266002278', body=RECEIVE_SMS)
    STATE = "OK"
  else:
    new_message_1 = client.messages.create(to=PHONE, from_='+16266002278', body='لقد تم التحقق من العملية  بنجاح!')
    STATE = "WARNING"

  return "OK!"

  

if __name__ == "__main__":
  app.run()
