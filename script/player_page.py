import requests
from bs4 import BeautifulSoup
import pandas as pd

import time
from random import randint
from requests import Session
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

def create_retry_session(retries=3, backoff_factor=0.3, status_forcelist=(500, 502, 503, 504, 429), session=None):
    session = session or Session()
    print('Create Session', session)
    retry = Retry(
        total=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
        raise_on_status=False
    )
    print('REtry', retry)
    adapter = HTTPAdapter(max_retries=retry)
    print('Adapter', adapter)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

# Use the session object to handle retries
session = create_retry_session()
print('Session is THIS:', session)


def adjust_row(row, headers):
    if len(row) < len(headers):
        row += [''] * (len(headers) - len(row))
    elif len(row) > len(headers):
        row = row[:len(headers)]
    return row


def fetch_data(player_url):
    print('Inside fetch_data')
    base_url = "https://www.basketball-reference.com"
    player_id = player_url.split('/')[-1].replace('.html', '')

    # Fetch main player page
    try:
        print('fetch_data: Try block')
        response = session.get(player_url)
        if response.status_code == 429:
            print('Too Many Requests, sleeping...')
            time.sleep(10)  # adjust the sleep time as needed
        print('response', response)
        response.raise_for_status()
    except requests.RequestException as err:
        print(f"An error occurred when fetching player's data: {err}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all links in the the per_game table
    try:
        start_year = end_year = None
        anchor_tags = soup.select('table#per_game a')
        print('Anchor Tags | 55:', anchor_tags)

        if anchor_tags:
            start_year_text = anchor_tags[0].get_text().strip()
            end_year_text = anchor_tags[-9].get_text().strip()
            print('SYT', start_year_text)
            print('EYT', end_year_text)
            #refactor this so it locates the correct anchor tag. it won't always be at index -6

            if '-' in start_year_text:
                start_year_parts = start_year_text.split('-')
            if len(start_year_parts) == 2:
                start_year = int(start_year_parts[1]) 
                start_year = int(start_year_parts[0][:2] + str(start_year))

            if '-' in end_year_text:
                end_year_parts = end_year_text.split('-')
            if len(end_year_parts) == 2:
                end_year = int(end_year_parts[1]) 
                end_year = int(end_year_parts[0][:2] + str(end_year))

        print('END YEAR', end_year)


    except Exception as err:
        print(f"An error occurred when parsing the main page: {err}")
        return None
    
    career_links = [f"{base_url}/players/c/{player_id}/gamelog/{year}" for year in range(start_year, end_year + 1)]
    print('LINKS', career_links)



    data_frames = []
    for index, link in enumerate(career_links):
        try:
            # Add delay before making the request
            print('In loop')
            time.sleep(randint(3, 10))
            #response = requests.get(link)
            response = session.get(link) 
            print('Loop response', response)

            if response.status_code == 429:
                print(f"Too many requests. The server responded with a 429 status code.")
                continue
            response.raise_for_status()
        except requests.RequestException as err:
            print(f"An error occurred when fetching the page: {err}")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find(id='pgl_basic')

        if not table:  # skip if no such table found
            continue

        headers = [th.getText() for th in table.find('thead').findAll(['th', 'td'])] #if index == 0 else []
        rows = table.find('tbody').findAll('tr')
        
        player_data = []

        for i in range(len(rows)):
           
            if 'thead' not in rows[i].get('class', []) and rows[i].get('id', '').startswith('pgl_basic'):
                player_data.append(adjust_row([rows[i].find('th').getText()] + [td.getText() for td in rows[i].findAll('td')], headers))
            elif 'thead' not in rows[i].get('class', []):
                player_data.append(adjust_row([rows[i].find('th').getText()] + [td.getText() for td in rows[i].findAll('td', {'data-stat': True})], headers))

        data_frames.append(pd.DataFrame(player_data, columns=headers if headers else None))

    return pd.concat(data_frames)


def save_data_to_csv(data_frame, file_name):
    try:
        data_frame.to_csv(file_name, index=False)
    except Exception as err:
        print(f"An error occurred when saving data to CSV: {err}")

player_url = "https://www.basketball-reference.com/players/w/willilo02.html"
df = fetch_data(player_url)
if df is not None:
    save_data_to_csv(df, 'test-career.csv')