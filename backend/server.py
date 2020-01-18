from flask import request, Flask, jsonify, session
from database import *
from functools import wraps
import hashlib
import os
import secrets
import csv
import io

app = Flask(__name__)
app.secret_key = 'cavacfhqfhqwfgg1728y872461iu2d12qgfiug1'

def check_login(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        if not ('uname' in session):
            return err('login required')
        else:
            return f(*args, **kwargs)
    return wrapped

def err(msg):
    return jsonify({
        'err': msg
    })

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if len(User.objects(name=data['username'])) > 0:
        return err('Username already exists')
    else:
        salt = secrets.token_bytes(32)
        hashed_passwd = hashlib.pbkdf2_hmac('sha256', data['passwd'].encode('utf-8'), salt, 100000)
        User(name=data['username'], passwd=salt+hashed_passwd).save()
        return 'ok'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    qset = User.objects(name=data['username'])
    if len(qset) == 0:
        return err('Username or password incorrect')
    else:
        user = qset[0]
        salt = user.passwd[:32]
        pwd_hash = user.passwd[32:]
        pwd_guess = hashlib.pbkdf2_hmac('sha256', data['passwd'].encode('utf-8'), salt, 100000)
        if pwd_guess == pwd_hash:
            session['uname'] = user.name
            return 'ok'
        else:
            return err('Username or password incorrect')

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('uname', None)
    return 'ok'

@app.route('/c_task', methods=['POST'])
@check_login
def c_task():
    _author = User.objects(name=session['uname'])[0]
    Task(author=_author).save()
    return 'ok'

@app.route('/c_unit', methods=['POST'])
@check_login
def c_unit():
    f = request.files['file']
    task_id = request.form['task_id']
    stream = io.StringIO(f.stream.read().decode("UTF8"), newline=None)
    reader = csv.reader(stream)
    header = []
    idx = 0
    for row in reader:
        if idx == 0:
            header = row
        else:
            unit = Unit(task=Task.objects(id=task_id)[0])
            for i in range(len(rows)):
                unit.data[header[i]] = row[i]
            unit.save()
        idx += 1
    return 'ok'



    

