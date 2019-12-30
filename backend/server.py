from flask import request, Flask, jsonify, session
from database import User
import hashlib
import os
import secrets

app = Flask(__name__)
app.secret_key = 'cavacfhqfhqwfgg1728y872461iu2d12qgfiug1'

def err(msg):
    return jsonify({
        'err': msg
    })

@app.route('/register', methods=['POST'])
def register():
    if len(User.objects(name=request.form['username'])) > 0:
        return err('Username already exists')
    else:
        salt = secrets.token_bytes(32)
        hashed_passwd = hashlib.pbkdf2_hmac('sha256', request.form['passwd'].encode('utf-8'), salt, 100000)
        User(name=request.form['username'], passwd=salt+hashed_passwd).save()
        return 'ok'

@app.route('/login', methods=['POST'])
def login():
    print(session)
    qset = User.objects(name=request.form['username'])
    if len(qset) == 0:
        return err('Username or password incorrect')
    else:
        user = qset[0]
        salt = user.passwd[:32]
        pwd_hash = user.passwd[32:]
        pwd_guess = hashlib.pbkdf2_hmac('sha256', request.form['passwd'].encode('utf-8'), salt, 100000)
        if pwd_guess == pwd_hash:
            session['uname'] = user.name
            return 'ok'
        else:
            return err('Username or password incorrect')

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('uname', None)
    return 'ok'
