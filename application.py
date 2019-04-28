# -*- coding: utf-8 -*-

from flask import (Flask,
                   render_template,
                   url_for,
                   request,
                   redirect,
                   jsonify,
                   make_response,
                   flash)
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask import session as login_session
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
import random
import string
import json
import httplib2
import requests
from oauth2client.client import flow_from_clientsecrets, FlowExchangeError
#from setupDB import Location


app = Flask(__name__)


#<<<<<<< HEAD
#=======

#>>>>>>> cc515ba64f00a3fe69ae8cdbd9470c7b1af8ce4a
ACCOUNT_SID = 'AC94a1765a13973ddfa4420c0d35d6ab4e'
AUTH_TOKEN = 'e67261b76d3969e46a209a589fab2b69'
PHONE = '+16266002278'
PHONE2 = '+971505250332'

client = Client(ACCOUNT_SID, AUTH_TOKEN)
Message = "حاجز على طريق عيون الحرامية"


# Connect to Database
#engine = create_engine('sqlite:///charcatalog.db',connect_args={'check_same_thread': False})
#Base.metadata.bind = engine

# Create database session
#DBSession = sessionmaker(bind=engine)
#session = DBSession()

@app.route('/')
@app.route('/catalog')
def showCategories():
    return render_template(
        'index.html')

@app.route('/templates/inputform.html')
def showInput():
    
    new_message = client.messages.create(to="+971504330432", from_="+16266002278", body=Message)
    new_message = client.messages.create(to="+971557892786", from_="+16266002278", body=Message)
    new_message = client.messages.create(to="+971505250332", from_="+16266002278", body=Message)
    #new_message = client.messages.create(to="+971569035153", from_="+16266002278", body=Message)


    return render_template(
        'inputform.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

#
