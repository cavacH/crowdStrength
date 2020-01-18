from mongoengine import *
connect('crowdStrength')

class User(Document):
    name = StringField(max_length=50)
    passwd = BinaryField()

class Task(Document):
    title = StringField(default='Untitled')
    author = ReferenceField(User)

class Unit(Document):
    data = DictField()
    task = ReferenceField(Task)

