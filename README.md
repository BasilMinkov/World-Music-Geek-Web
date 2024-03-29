# World Music Geek Web

This is a project for World Music Geek website.

## Backend

### Run server

```commandline
sudo apt install python3.10 
sudo apt install virtualenv  # или venv
python3.10 -m pip install --user venv 
python3.10 -m venv wmg 
source wmg/bin/activate 
cd backend 
export FLASK_APP=blog.py 
flask run
```

### Initialise database

```commandline
flask db init
flask db migrate
flask db upgrade
```

## Frontend

### Run server

```commandline
cd frontend
npm install
npm run start
```
## Utils

### Telegram Parser

The code reads JSON data from a file, performs data processing 
and filtering, and then saves the processed data as a SQLite 
database table. It uses command-line arguments to specify 
the input JSON file path (`-p` or `--path` option).

To run the Telegram Parser, execute the following command from
the script folder: `python3 telegram-parser.py -p /path-to-my output-json/result.json`
The resulting SQLite database will be saved in the same directory.

# How to run locally

## macos installation

[Orbstack](https://docs.orbstack.dev/) for easier usage

```sh
brew install docker
brew install docker-credential-helper
brew install orbstack
	
```

The folder for the app should be `world-music-geek`,
Which correspond to the orbstack's local domains naming

## Running

- Put *app.db* and *photos* folder in the root of the repo
  then run

```sh
docker compose up
// or
sudo -E docker compose up
```
