from datetime import datetime
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from hashlib import md5


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(
            digest, size)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artist = db.Column(db.String(300))
    album = db.Column(db.String(300))
    label = db.Column(db.String(300))
    year = db.Column(db.Integer)
    body = db.Column(db.String(6000))
    tags = db.Column(db.String(140))
    image = db.Column(db.String(140))
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    date = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    edited = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    applemusic = db.Column(db.String(300))
    bandcamp = db.Column(db.String(300))
    other = db.Column(db.String(300))
    soundcloud = db.Column(db.String(300))
    spotify = db.Column(db.String(300))
    telegram = db.Column(db.String(300))
    vk = db.Column(db.String(300))
    youtube = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Post {} - {}>'.format(self.artist, self.album)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


