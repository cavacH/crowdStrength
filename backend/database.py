from mongoengine import *
connect('crowdStrength')

class User(Document):
    name = StringField(max_length=50)
    passwd = BinaryField()

