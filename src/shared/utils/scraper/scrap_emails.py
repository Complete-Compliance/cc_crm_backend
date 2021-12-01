import requests

from random import randrange
from time import sleep
from sys import argv
from bs4 import BeautifulSoup
from crm_manager import *

class Email_Scraper:
  def __init__(self, startDot, endDot):
    self.crm = CRM_Manager()
    self.startDot = int(startDot)
    self.endDot = int(endDot)

    self.headers = {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
    }

  def get_overview_url(self, dot_number):
    url = f'https://ai.fmcsa.dot.gov/SMS/Carrier/{dot_number}/Overview.aspx?FirstView=True'

    return url

  def get_registration_url(self, dot_number):
    url = f'https://ai.fmcsa.dot.gov/SMS/Carrier/{dot_number}/CarrierRegistration.aspx'

    return url

  def check_email_type(self, dot_number, session):
    try:
      url = self.get_overview_url(dot_number)

      response = session.get(url=url, headers=self.headers)

      soup = BeautifulSoup(response.content, features="html.parser")

      not_authorized_query = soup.findAll('aside', class_='carrierNote auth')

      not_authorized = bool(len(not_authorized_query))

      if not_authorized:
        return 'notAuthorized'
      
      mcs150_outdated_query = soup.findAll('aside', class_='carrierNote OOS')

      mcs150_outdated = bool(len(mcs150_outdated_query))

      if mcs150_outdated:
        return 'mcs150Outdated'

      return 'authorized'
    except Exception as e:
      # print(e)
      return False

  def get_email(self, dot_number, session):
    try:
      url = self.get_registration_url(dot_number)

      response = session.get(url=url, headers=self.headers)

      soup = BeautifulSoup(response.content, features="html.parser")

      ul_tree = soup.find('ul', class_='col1')

      li_list = ul_tree.findAll('li')

      email = None
      for element in li_list:
        label_text = element.find('label').text.strip()
        
        if (label_text == 'Email:'):
          email = element.find('span').text.strip()

      return email
    except Exception as e:
      # print(e)
      return None

  def execute(self):
    for currentDot in range(self.startDot, self.endDot + 1):
      leadExists = self.crm.findLead(currentDot)

      if not leadExists:
        # print('This lead does not exist on the DB')
        continue

      session = requests.Session()

      sleep_time = randrange(3, 6)
      # print(f'Waiting {sleep_time} before continuing...')
      sleep(sleep_time)

      email_type = self.check_email_type(currentDot, session)

      sleep_time = randrange(3, 6)
      # print(f'Waiting {sleep_time} before continuing...')
      sleep(sleep_time)

      email = self.get_email(currentDot, session)

      if not email:
        # print('No Email found')
        continue

      email = email.lower()

      if email == leadExists['email']:
        # print("We've already scraped this email")
        continue

      data = { 'email': email, 'mailtype': email_type }

      self.crm.updateLead(data, leadExists['id'])
      sleep_time = randrange(20, 30)
      sleep(sleep_time)
      # print('Email updated')
    
    self.crm.updateProcessStatus('search_emails')


if __name__ == '__main__':
  app = Email_Scraper(argv[1], argv[2])
  app.execute()