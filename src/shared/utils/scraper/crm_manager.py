import requests as req
import json

from decouple import config

class CRM_Manager(object):
  def __init__(self):
    self.api = config('crmApiUrl')

  def findLead(self, dot):
    response = req.get(f'{self.api}/leads/find?searchCriteria=exact&dot={dot}&page=1')

    if response.content:
      return json.loads(response.content)['leads'][0]
    else:
      return None

  def createLead(self, data):
    response = req.post(f'{self.api}/leads', json=data)

    if response.status_code == 200:
      return True
    else:
      return False
  
  def getHighestDOTAdded(self):
    response = req.get(f'{self.api}/leads/find/highestDOT')

    if response.content:
      return json.loads(response.content)[0]['max']
    else:
      return None
    
  def updateLead(self, data, leadId):
    response = req.put(f'{self.api}/leads/{leadId}', json=data)

    if response.content:
      return json.loads(response.content)
    else:
      return None
  
  def updateProcessStatus(self, category):
    response = req.put(f"{self.api}/scrapProcesses/running?category={category}")

    if response.status_code == 204 or response.status_code == 200:
      return True
    else:
      return False
    
