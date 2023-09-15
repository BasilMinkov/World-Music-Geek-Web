# World Music Geek Web


This is a project for World Music Geek website.

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

## Running

```sh
docker compose up
```