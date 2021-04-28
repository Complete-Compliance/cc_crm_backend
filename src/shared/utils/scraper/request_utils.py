import time
import requests

from decouple import config
from lxml import html
from bs4 import BeautifulSoup

def get_state_and_zip(address):
    state = address.split(',')[1].split('\xa0')[0].strip()
    zip_code = address.split(',')[1].split('\xa0')[1].split('-')[0].strip()

    return state, zip_code

def captcha_guru(site_key, pageurl):
    CAPTCHA_GURU_KEY = config('captchaKey')

    query = 'https://api.captcha.guru/in.php?key=' + CAPTCHA_GURU_KEY + '&method=userrecaptcha&googlekey=' + site_key + f'&pageurl={pageurl}'
    try:
        resp = requests.get(query, timeout=300)
    except Exception as e:
        return False, 'CAPTCHA GURU service error: ' + str(e)

    if resp.text[0:2] != 'OK':
        return False, resp.text

    captcha_id = resp.text[3:]
    fetch_url = "https://api.captcha.guru/res.php?key=" + CAPTCHA_GURU_KEY + "&action=get&id=" + captcha_id
    
    for i in range(1, 36):
        time.sleep(2)
        resp = requests.get(fetch_url)
        if resp.text[0:2] == 'OK':
            return True, resp.text[3:]
    return False, resp.text

def scrap_cargo_carried(content):
    result = ''
    cargos = [
        'General Freight', 'Liquids/Gases', 'Chemicals', 'Commodities Dry Bulk', 'Refrigerated Food', 'Beverages', 'Paper Products',
        'Utilities', 'Agricultural/Farm Supplies', 'Construction', 'Water Well', 'Intermodal Cont.', 'Passengers', 'Oilfield Equipment',
        'Livestock', 'Grain, Feed, Hay', 'Coal/Coke', 'Meat', 'Garbage/Refuse', 'US Mail', 'Fresh Produce', 'Machinery', 'Large Objects',
        'Mobile Homes', 'Building Materials', 'Logs, Poles, Beams, Lumber', 'Drive/Tow away', 'Motor Vehicles',
        'Metal: sheets, coils, rolls', 'Household Goods'
    ]
    soup = BeautifulSoup(content, features="html.parser")
    query = soup.findAll('td', class_='queryfield', text='X')
    for field in query:
        if field.find_next_sibling("td").text in cargos:
            result = result + field.find_next_sibling("td").text + ', '

    return result

def scrap_carrier_operation(content):
    result = ''
    carriers = ['Interstate', 'Intrastate Only (HM)', 'Intrastate Only (Non-HM)']
    soup = BeautifulSoup(content, features="html.parser")
    query = soup.findAll('td', class_='queryfield', text='X')
    for field in query:
        if field.find_next_sibling("td").text in carriers:
            result = result + field.find_next_sibling("td").text + ', '

    return result

def scrap_operation_classification(content):
    result = ''
    classification = [
        'Auth. For Hire', 'Priv. Pass.(Non-business)', "State Gov't", "Local Gov't", 'Indian Nation',
        'Exempt For Hire', 'Private(Property)', 'Priv. Pass. (Business)', 'Migrant', 'U.S. Mail', "Fed. Gov't"
    ]
    soup = BeautifulSoup(content, features="html.parser")
    query = soup.findAll('td', class_='queryfield', text='X')
    for field in query:
        if field.find_next_sibling("td").text in classification:
            result = result + field.find_next_sibling("td").text + ', '

    return result

def get_details(USDOTNumber):
    USDOTNumber = str(USDOTNumber)
    session = requests.Session()
    lead = {}

    url = "https://safer.fmcsa.dot.gov/query.asp"
    formdata = {
        "searchtype": "ANY",
        "query_type": "queryCarrierSnapshot",
        "query_param": "USDOT",
        "query_string": USDOTNumber,
    }
    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-length": "85",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://safer.fmcsa.dot.gov",
        "referer": "https://safer.fmcsa.dot.gov/CompanySnapshot.aspx",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
    }
    response = session.get(url=url, data=formdata, headers=headers)
    tree = html.fromstring(response.text)
    
    try:
        EntityType = tree.xpath('//a[text()="Entity Type:"]/../following-sibling::td[1]/text()')[0].strip()
        lead.update({"entityType": EntityType})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        OperatingStatus =  tree.xpath('//a[text()="Operating Status:"]/../following-sibling::td[1]/font/b/text()')[0].strip()
        lead.update({"operatingStatus": OperatingStatus})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        LegalName = tree.xpath('//a[text()="Legal Name:"]/../following-sibling::td[1]/text()')[0].strip()
        lead.update({"companyName": LegalName})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        DBAName = tree.xpath('//a[text()="DBA Name:"]/../following-sibling::td[1]/text()')[0].strip()
        lead.update({"dbaName": DBAName})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        PhysicalAddress = "\n".join(
            [elm.strip() for elm in
                tree.xpath('//a[text()="Physical Address:"]/../following-sibling::td[1]/text()') if
                elm.strip()])
        PrimaryState, PrimaryZip = get_state_and_zip(PhysicalAddress)
        lead.update({"primaryAddress": PhysicalAddress})
        lead.update({"state": PrimaryState})
        lead.update({"zipCode": PrimaryZip})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        Phone = "\n".join(
            [elm.strip() for elm in tree.xpath('//a[text()="Phone:"]/../following-sibling::td[1]/text()') if
                elm.strip()])
        lead.update({"phoneNumber": Phone})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        MailingAddress = "\n".join(
            [elm.strip() for elm in
                tree.xpath('//a[text()="Mailing Address:"]/../following-sibling::td[1]/text()') if
                elm.strip()])
        altState, altZip = get_state_and_zip(MailingAddress)
        lead.update({"altAddress": MailingAddress})
        lead.update({"altState": altState})
        lead.update({"altZipCode": altZip})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        USDOTNumber = "\n".join(
            [elm.strip() for elm in tree.xpath('//a[text()="USDOT Number:"]/../following-sibling::td[1]/text()')
                if
                elm.strip()])
        lead.update({"usdot": USDOTNumber})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        PowerUnits = "\n".join(
            [elm.strip() for elm in tree.xpath('//a[text()="Power Units:"]/../following-sibling::td[1]/text()')
                if
                elm.strip()])
        lead.update({"powerUnits": PowerUnits})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        Drivers = tree.xpath('//a[text()="Drivers:"]/../following-sibling::td[1]/font/b/text()')[0].strip()
        lead.update({"drivers": Drivers})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        MCS150FormDate = "\n".join(
            [elm.strip() for elm in
                tree.xpath('//a[text()="MCS-150 Form Date:"]/../following-sibling::td[1]/text()') if
                elm.strip()])
        lead.update({"mcs150FormDate": MCS150FormDate})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        OperationClassification = scrap_operation_classification(response.content)
        lead.update({"operationClassification": OperationClassification})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        CarrierOperation = scrap_carrier_operation(response.content)
        lead.update({"carrierOperation": CarrierOperation})
    except:
        print('INFO NOT FOUND - BASIC')
    try:
        CargoCarried = scrap_cargo_carried(response.content)
        lead.update({"cargoCarried": CargoCarried})
    except:
        print('INFO NOT FOUND - BASIC')
    
    lead.update({"email": "N/A"})

    if ("Auth. For Hire" not in lead["operationClassification"] and "Interstate" not in lead["carrierOperation"]):
        return lead

    url = f"https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist?n_dotno={USDOTNumber}&s_prefix=MC&n_docketno=&s_legalname=&s_dbaname=&s_state="
    
    print('waiting before request...')
    time.sleep(2)
    
    r = session.get(url=url)
    tree = html.fromstring(r.text)
    site_key = tree.xpath('//div[@class="g-recaptcha"]/@data-sitekey')[0]

    cap_guru_result, captcha = captcha_guru(site_key, url)
    if cap_guru_result:
        url = "https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist"
        formdata = {
            "n_dotno": USDOTNumber,
            "s_prefix": "MC",
            "n_docketno": "",
            "s_legalname": "",
            "s_dbaname": "",
            "s_state": "~~",
            "g_recaptcha_response": captcha,
            "pv_vpath": "LIVIEW",
        }

        print('waiting before request...')
        time.sleep(2)

        r = session.post(url=url, data=formdata)
        tree = html.fromstring(r.text)
        form = tree.xpath('//form[@action="pkg_carrquery.prc_getdetail"]')
        no_record = tree.xpath('//*[contains(text(), "No record found, please try different search parameters")]')

        if no_record:
            print('NO RECORD FOR THIS LEAD')
            return lead

        pv_apcant_id = \
        tree.xpath('//form[@action="pkg_carrquery.prc_getdetail"]/input[@name="pv_apcant_id"]/@value')[0]
        pv_vpath = tree.xpath('//form[@action="pkg_carrquery.prc_getdetail"]/input[@name="pv_vpath"]/@value')[0]
        formdata = {
            'pv_apcant_id': pv_apcant_id,
            'pv_vpath': pv_vpath,
        }
        url = "https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_getdetail"
        
        print('waiting before request...')
        time.sleep(2)
        
        r = session.post(url=url, data=formdata)
        tree = html.fromstring(r.text)
        try:
            BIPDInsuranceRequired = tree.xpath('//td[@headers="bipd Insurance_required"]//text()')[0].strip()
            lead.update({"bipdInsuranceRequired": BIPDInsuranceRequired})
        except:
            print('INFO NOT FOUND - ADVANCED 1')
        try:
            BIPDInsuranceOnFile = tree.xpath('//td[@headers="bipd Insurance_on_file"]//text()')[0].strip()
            lead.update({"bipdInsuranceOnFile": BIPDInsuranceOnFile})
        except:
            print('INFO NOT FOUND - ADVANCED 1')
        try:
            CargoInsuranceRequired = tree.xpath('//td[@headers="cargo Insurance_required"]//text()')[0].strip()
            lead.update({"cargoInsuranceRequired": CargoInsuranceRequired})
        except:
            print('INFO NOT FOUND - ADVANCED 1')
        try:
            CargoInsuranceOnFile = tree.xpath('//td[@headers="cargo Insurance_on_file"]//text()')[0].strip()
            lead.update({"cargoInsuranceOnFile": CargoInsuranceOnFile})
        except:
            print('INFO NOT FOUND - ADVANCED 1')
        try:
            BondInsuranceRequired = tree.xpath('//td[@headers="bond Insurance_required"]//text()')[0].strip()
            lead.update({"bondInsuranceRequired": BondInsuranceRequired})
        except:
            print('INFO NOT FOUND - ADVANCED 1')
        try:
            BondInsuranceOnFile = tree.xpath('//td[@headers="bond Insurance_on_file"]//text()')[0].strip()
            lead.update({"bondInsuranceOnFile": BondInsuranceOnFile})
        except:
            print('INFO NOT FOUND - ADVANCED 1')

        active_pending_url = "https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_activeinsurance/"

        # 3. Active/Pending Insurance
        print('waiting before request...')
        time.sleep(2)

        r = session.get(url=active_pending_url)
        tree = html.fromstring(r.text)
        try:
            InsuranceCarrier = tree.xpath('//td[contains(@headers, "insurance_carrier")]/a//text()')[0].strip()
            lead.update({"insuranceCarrier": InsuranceCarrier})
        except:
            print('INFO NOT FOUND - ADVANCED 2')
        try:
            PolicySurety = tree.xpath('//td[contains(@headers, "policy_surety")]//text()')[0].strip()
            lead.update({"policySurety": PolicySurety})
        except:
            print('INFO NOT FOUND - ADVANCED 2')
        try:
            PostedDate = tree.xpath('//td[contains(@headers, "posted_date")]//text()')[0].strip()
            lead.update({"postedDate": PostedDate})
        except:
            print('INFO NOT FOUND - ADVANCED 2')
        try:
            CoverageFrom = tree.xpath('//td[contains(@headers, "coverage_from")]//text()')[0].strip()
            lead.update({"coverageFrom": CoverageFrom})
        except:
            print('INFO NOT FOUND - ADVANCED 2')
        try:
            CoverageTo = tree.xpath('//td[contains(@headers, "coverage_to")]//text()')[0].strip()
            lead.update({"coverageFrom": CoverageTo})
        except:
            print('INFO NOT FOUND - ADVANCED 2')
        try:
            EffectiveDate = tree.xpath('//td[contains(@headers, "effective_date")]//text()')[0].strip()
            lead.update({"effectiveDate": EffectiveDate})
        except:
            print('INFO NOT FOUND - ADVANCED 2')
        try:
            CancellationDate = tree.xpath('//td[contains(@headers, "cancellation_date")]//text()')[0].strip()
            lead.update({"cancellationDate": CancellationDate})
        except:
            print('INFO NOT FOUND - ADVANCED 2')
        
        return lead
    else:
        print('Captcha not solved')
        return lead
