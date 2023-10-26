import json
from app import app, db
from app.forms import LoginForm, RegistrationForm
from flask import render_template, flash, redirect, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Post
from sqlalchemy import or_  # Import 'or_' for filter conditions
from app.utils import modify_dict
from flask import send_from_directory
from constants import COUNTRIES_MAP, GENRES, PEOPLES, INSTRUMENTS, LABELS

@app.route('/posts', methods=['GET'])
def posts():
    host = request.host
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=25, type=int)
    tag_filter = request.args.get('tag', default=None, type=str)
    artist_filter = request.args.get('artist', default=None, type=str)
    year_filter = request.args.get('year', default=None, type=int)
    album_filter = request.args.get('album', default=None, type=str)
    label_filter = request.args.get('label', default=None, type=str)
    total = Post.query.count()

    # Construct the base query
    base_query = Post.query.order_by(Post.date.desc())

    # Apply filters if provided
    if tag_filter:
        base_query = base_query.filter(Post.tags.like(f"%{tag_filter}%"))

    if artist_filter:
        base_query = base_query.filter(Post.artist == artist_filter)

    if year_filter:
        base_query = base_query.filter(Post.year == year_filter)

    if album_filter:
        base_query = base_query.filter(Post.album == album_filter)

    if label_filter:
        base_query = base_query.filter(Post.label == label_filter)

    query = base_query.paginate(
        page=page,
        per_page=page_size,
        error_out=False)

    extracted_posts = []
    for post in query.items:  # Use query.items to iterate over the paginated results
        extracted_posts.append(modify_dict(post.as_dict()))

    return jsonify(
        {
            'total': total,
            'next_page': f'{host}{url_for("posts", page=query.next_num)}' if query.has_next else None,
            'prev_page': f'{host}{url_for("posts", page=query.prev_num)}' if query.has_prev else None,
            'posts': extracted_posts,
        }
    )


@app.route('/post', methods=['GET'])
def post():
    post_id = request.args.get('id', type=int)
    query = Post.query.get(post_id)

    return json.dumps(
        {
            'post': query.as_dict(),
        },
        indent=4, default=str, ensure_ascii=False)


@app.route('/countries', methods=['GET'])
def countries():
    # Construct the base query
    base_query = Post.query.order_by()

    countries_dict = dict()
    for key, value in COUNTRIES_MAP.items():

        if len(value.split(' ')) > 1:
            value = value.replace(' ', '_')

        countries_dict[key] = {
            'albums': base_query.filter(Post.tags.like(f"%{value}%")).count()
        }

    return jsonify(
        {
            'values': countries_dict,
        }
    )


@app.route('/rubricator', methods=['GET'])
def rubricator():
    return jsonify(
        {
            'genres': GENRES,
            'instruments': INSTRUMENTS,
            'peoples': PEOPLES,
            'labels': [value['name'] for key, value in LABELS.items()]
        }
    )


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('blog'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('blog')
        return redirect(next_page)
    return render_template('login.html', title='Log In', form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('blog'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    posts = [
        {'author': user, 'body': 'Test post #1'},
        {'author': user, 'body': 'Test post #2'}
    ]
    return render_template('user.html', user=user, posts=posts)


@app.route('/api/data')
def get_data():
    data = {'message': 'Hello, world!'}
    return data

  
@app.route('/photos/<path:path>')
def serve_static(path):
    return send_from_directory('photos', path)
