#!/usr/bin/env python3

import json
import argparse
import os.path

import pandas as pd
from sqlalchemy import create_engine

# List of music links used for filtering all possible links under the posts
MUSIC_LINKS = ["soundcloud", "spotify", "applemusic", "bandcamp", "telegram", "youtube", "vk", "archive"]


def get_plain_text(text_with_json):
    # Extracts plain text from the provided text with json parts

    plain_text = str()

    for element in text_with_json:
        element_type = type(element)
        if element_type is str:
            plain_text += element
        elif element_type is dict:
            plain_text += element['text']
        else:
            print(element_type)

    return plain_text


def get_properties(plain_text):
    # Extracts title, tags, and content from the provided plain text

    strings = plain_text.split('\n')

    links = strings[-1].lower().replace(" ", "").split('|')

    if len(list(set(links) & set(MUSIC_LINKS))) > 0:
        title = strings[0]
        tags = "|".join(strings[1].replace(" ", "").split('#')[1:])
        content = "\n".join(strings[2:-1])[2:]
        return title, tags, content

    else:
        return '', '', ''


def main():
    """
    The code reads JSON data from a file, performs data processing and filtering, and then saves
    the processed data as a SQLite database table. It uses command-line arguments to specify
    the input JSON file path (-p or --path option). The data processing involves extracting plain text
    from text with markdown, extracting properties (title, tags, and content) from the plain text,
    and creating a DataFrame with the processed data. Finally, the code saves the DataFrame
    as a table in a SQLite database.
    """

    # Parse arguments from command line
    parser = argparse.ArgumentParser(description=
                                     "Reads JSON from <<World Music Geek>> Telegram channel and returns SQL database")
    parser.add_argument('-p', '--path', help="Path to exported Telegram JSON", required=True)
    args = vars(parser.parse_args())

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
    df['title'] = properties.apply(lambda x: x[0])
    df['tags'] = properties.apply(lambda x: x[1])
    df['text'] = properties.apply(lambda x: x[2])

    # Create SQLite database engine and save the DataFrame as a table in the database
    engine = create_engine(f'sqlite:////{output}', echo=False)
    df.to_sql('posts', con=engine)


if __name__ == "__main__":
    main()



