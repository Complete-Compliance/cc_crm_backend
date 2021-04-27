import pathlib
import time

from sys import argv
from datetime import datetime as dt
from crm_manager import *
from request_utils import *

class Scraper():
	def __init__(self, startDot, endDot):
		self.crm = CRM_Manager()
		self.startDot = int(startDot)
		self.endDot = int(endDot)

	def start_requests(self):
		for currentDot in range(self.startDot, self.endDot + 1):
			print(f'SEARCHING DOT# {currentDot}')
			lead = get_details(USDOTNumber=currentDot)
			if lead:
				try:
					if lead['usdot'] == '':
						continue
			
					leadExists = self.crm.findLead(lead['usdot'])
					if not leadExists:
						print('NEW LEAD')
						self.crm.createLead(lead)
					else:
						print(f"UPDATING LEAD WITH ID {leadExists['id']}")
						self.crm.updateLead(lead, leadExists['id'])

				except Exception as Error:
					print('EXCEPTION')
					print(Error)
					continue
			else:
				continue

			time.sleep(5)

		self.crm.updateProcessStatus()

if __name__ == '__main__':
	app = Scraper(argv[1], argv[2])
	app.start_requests()
