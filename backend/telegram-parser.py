#!/usr/bin/env python3

import os
import json
import datetime
import re
import argparse
import warnings

import pandas as pd
# from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from app import app, db
from app.models import Post, User


# List of music links used for filtering all possible links under the posts
MUSIC_LINKS = ["Soundcloud", "Spotify", "AppleMusic", "Bandcamp", "Telegram", "Youtube", "VK", "Archive"]


def get_plain_text(text_with_json):
    # Extracts plain text from the provided text with json parts

    if type(text_with_json) == str:
        return text_with_json

    plain_text = str()

    for element in text_with_json:
        element_type = type(element)
        if element_type is str:
            plain_text += element

        elif element_type is dict:

            if element['type'] == 'text_link':
                plain_text += f'[{element["text"]}]({element["href"]})'
            elif element['type'] == 'bold':
                plain_text += f'__{element["text"]}__'
            elif element['type'] == 'italic':
                plain_text += f'_{element["text"]}_'
            elif element['type'] == 'code':
                plain_text += f'`{element["text"]}`'
            else:
                plain_text += element["text"]
        else:
            print('WARNING! Do not know what to do with ', element_type)

    return plain_text


def process_title(string):

    target = ''
    result = 1e6

    # Split post by dash of multiple types
    for dash in ['—', '–', '-']:
        index = string.find(dash)

        if (index >= 0) and (result > index):
            result = index
            target = dash

    if 1e6 > result > 0:

        print(target)

        # Find author name
        result = string.split(target)
        author = result[0].strip()

        # Find album name
        result = target.join(result[1:])
        album = result[0:result.find('(')]

        # Find year
        result = result[result.find('(')+1:-1].split(',')
        try:
            year = int(result[-1][-4:])
        except ValueError:
            year = ''

        # Find label
        if len(result) > 1:
            result = result[0]
            if result.find('[') > -1:
                label = result[result.find('[')+1: result.find(']')]
            else:
                label = result
        else:
            label = ''

        return author, album, label, year

    else:
        warnings.warn("No dash in first string. Must be not album post", Warning)
        return None


def get_properties(plain_text):
    # Extracts title, tags, and content from the provided plain text

    strings = plain_text.split('\n')

    # Find all matches using re.findall
    links = re.findall(r'\[(.*?)\]', strings[-1])

    if len(list(set(links) & set(MUSIC_LINKS))) > 0:
        print('\n', strings[0])
        result = process_title(strings[0])
        if result:
            author, album, label, year = result[0], result[1], result[2], result[3]
        else:
            return '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
        print(author, '|', album, '|', label, '|', year)
        tags = "|".join(strings[1].replace(" ", "").split('#')[1:])
        content = "\n".join(strings[2:-1])[1:]

        links = dict()
        for element in strings[-1].split('|'):
            processed = False

            for link in MUSIC_LINKS:
                if element[element.find('[')+1:element.find(']')].lower() == link.lower():
                    if link.lower() == 'archive':
                        links['telegram'] = element[element.find('(')+1:element.find(')')]
                        processed = True
                    else:
                        links[link.lower()] = element[element.find('(')+1:element.find(')')]
                        processed = True

            if not processed:
                links['other'] = element[element.find('('):element.find(')')]

        for link in (MUSIC_LINKS + ['other']):
            if link.lower() not in links:
                if link.lower() == 'archive':
                    links['telegram'] = str()
                else:
                    links[link.lower()] = str()

        # key = list(map(lambda x: x.lower(), MUSIC_LINKS))[:-1] + ['other']

        links = dict(sorted(links.items())).values()

        return author, album, label, year, tags, content, links, *links
    else:
        return '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''


def pandas2sql(post, user, database):

    if type(post.edited) == str:
        edited = datetime.datetime.strptime(post.edited, '%Y-%m-%dT%H:%M:%S')
    else:
        edited = datetime.datetime.min

    post = Post(
        artist=post.author,
        album=post.album,
        label=post.label,
        year=post.year,
        body=post.text,
        tags=post.tags,
        image=post.photo,
        width=post.width,
        height=post.height,
        date=datetime.datetime.strptime(post.date, '%Y-%m-%dT%H:%M:%S'),
        edited=edited,
        author=user,
        applemusic=post.applemusic,
        bandcamp=post.bandcamp,
        other=post.other,
        soundcloud=post.soundcloud,
        spotify=post.spotify,
        telegram=post.telegram,
        vk=post.vk,
        youtube=post.youtube
    )

    try:
        db.session.add(post)
        db.session.commit()

    except:
        db.session.rollback()


def main():
    """
    The code reads JSON data from a file, performs data processing and filtering, and then saves
    the processed data as a SQLite database table. It uses command-line arguments to specify
    the input JSON file path (-p or --path option). The data processing involves extracting plain text
    from text with markdown, extracting properties (title, tags, and content) from the plain text,
    and creating a DataFrame with the processed data. Finally, the code saves the DataFrame
    as a table in a SQLite database.
    """

    # # Parse arguments from command line
    # parser = argparse.ArgumentParser(description=
    #                                  "Reads JSON from <<World Music Geek>> Telegram channel and returns SQL database")
    # parser.add_argument('-p', '--path', help="Path to exported Telegram JSON", required=True)
    # args = vars(parser.parse_args())

    args = {'path': '/home/wassilyminkow/Develop/data/ChatExport/result.json'}

    # Get input path and generates output path
    input = args['path']
    output = os.path.join(*os.path.normpath(input).split(os.sep)[:-1] + ['posts.db'])

    # Load JSON data from the input file
    with open(input) as train_file:
        dict_train = json.load(train_file)

    # Convert JSON data to a DataFrame
    df = pd.DataFrame.from_records(dict_train["messages"])

    # Filter DataFrame and keep relevant columns
    df = df[df['type'] == "message"][["text", "date", "photo", "width", "height", "edited"]]
    df = df[~pd.isna(df['photo'])]

    # Extract properties (title, tags, and content) using helper functions
    properties = df['text'].apply(lambda x: get_properties(get_plain_text(x)))
    df['author'] = properties.apply(lambda x: x[0])
    df['album'] = properties.apply(lambda x: x[1])
    df['label'] = properties.apply(lambda x: x[2])
    df['year'] = properties.apply(lambda x: x[3])
    df['tags'] = properties.apply(lambda x: x[4])
    df['text'] = properties.apply(lambda x: x[5])

    for id, link in enumerate(sorted(list(map(lambda x: x.lower(), MUSIC_LINKS[:-1])) + ['other'])):
        df[link.lower()] = properties.apply(lambda x: x[7+id])

    df = df[df['tags'] != '']

    # Create SQLite database engine and save the DataFrame as a table in the database
    # engine = create_engine(f'sqlite:////{output}', echo=False)
    # df.to_sql('posts', con=engine)

    app.app_context().push()

    u = User(username="Wassily Minkow", email="proveyourselfmail@gmail.com")

    for index, row in df.iterrows():
        pandas2sql(post=row, user=u, database=db)
    db.session.close()


if __name__ == "__main__":
    main()



