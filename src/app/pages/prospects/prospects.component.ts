import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prospects.component.html'
})
export class ProspectsComponent {
prospects:any[] = [
  {
      "id": 6556119,
      "name": "Cathy Doan",
      "linkedin_url": "https://www.linkedin.com/in/cathy-doan-58574614",
      "current_title": "Sr. Executive Assistant to EVP - CTO Sam’s Club Tech",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://tech.walmart.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/walmartglobaltech",
      "location": "United States",
      "emails": [
          "gmail.com",
          "yahoo.com",
          "cox.net",
          "walmart.com",
          "walmartlabs.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "408202XXXX",
          "650622XXXX",
          "408370XXXX",
          "408365XXXX",
          "408528XXXX",
          "408654XXXX"
      ]
  },
  {
      "id": 17098869,
      "name": "Devon Milum",
      "linkedin_url": "https://www.linkedin.com/in/devon-milum-52283bbb",
      "current_title": "Executive Assistant to CTO at Sam’s Club",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://tech.walmart.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/walmartglobaltech",
      "location": "United States",
      "emails": [
          "walmartlabs.com"
      ],
      "latest_email": "walmartlabs.com",
      "phones": [
          "479381XXXX"
      ]
  },
  {
      "id": 241399200,
      "name": "Arati Lal",
      "linkedin_url": "https://www.linkedin.com/in/alal",
      "current_title": "Head of CTO Operations and Chief of staff @ International Tech",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://tech.walmart.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/walmartglobaltech",
      "location": "United States",
      "emails": [
          "yahoo.com",
          "walmartlabs.com"
      ],
      "latest_email": "yahoo.com",
      "phones": [
          "727743XXXX",
          "727577XXXX"
      ]
  },
  {
      "id": 1511715,
      "name": "Sanjay Radhakrishnan",
      "linkedin_url": "https://www.linkedin.com/in/sanjayradhakrishnan",
      "current_title": "SVP and CTO, Sam's Club",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://tech.walmart.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/walmartglobaltech",
      "location": "United States",
      "emails": [
          "gmail.com",
          "yahoo.com",
          "wal-mart.com",
          "walmartlabs.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "479224XXXX",
          "479277XXXX",
          "512-220-XXXX",
          "425373XXXX"
      ]
  },
  {
      "id": 1282072,
      "name": "William Fong",
      "linkedin_url": "https://www.linkedin.com/in/wfong",
      "current_title": "Head of Engineering, Walmart Commerce Technologies",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://tech.walmart.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/walmartglobaltech",
      "location": "United States",
      "emails": [
          "gmail.com",
          "walmartlabs.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "848-219-XXXX",
          "1.848219XXXX",
          "1.646669XXXX",
          "917940XXXX",
          "908-756-XXXX",
          "347570XXXX"
      ]
  },
  {
      "id": 1155997,
      "name": "Hovhannes Tumanyan",
      "linkedin_url": "https://www.linkedin.com/in/hovhannes-tumanyan-5297b1",
      "current_title": "Head of Engineering",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://tech.walmart.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/walmartglobaltech",
      "location": "United States",
      "emails": [
          "yahoo.com",
          "walmart.com",
          "walmartlabs.com"
      ],
      "latest_email": "yahoo.com",
      "phones": [
          "313575XXXX",
          "669600XXXX",
          "248-766-XXXX",
          "248474XXXX",
          "313575XXXX",
          "650318XXXX"
      ]
  },
  {
      "id": 60045696,
      "name": "Robert Nunez",
      "linkedin_url": "https://www.linkedin.com/in/robertjnunez",
      "current_title": "Head of Engineering, Merchandising Systems",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://tech.walmart.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/walmartglobaltech",
      "location": "United States",
      "emails": [
          "gmail.com",
          "netzero.net",
          "walmartlabs.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "562756XXXX",
          "312458XXXX",
          "951353XXXX",
          "562698XXXX"
      ]
  },
  {
      "id": 46494219,
      "name": "Jessica Gallagher",
      "linkedin_url": "https://www.linkedin.com/in/jessica-gallagher",
      "current_title": "CEO + CTO",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://www.techmeowt.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/tech-meowt",
      "location": "United States",
      "emails": [
          "hotmail.com",
          "trendyminds.com",
          "cebglobal.com"
      ],
      "latest_email": "hotmail.com",
      "phones": [
          "215-285-XXXX",
          "202-350-XXXX",
          "202-842-XXXX",
          "620-583-XXXX",
          "985-851-XXXX",
          "985-870-XXXX"
      ]
  },
  {
      "id": 1233877,
      "name": "Mulloy Morrow",
      "linkedin_url": "https://www.linkedin.com/in/mulloymorrow",
      "current_title": "CTO and Head of Engineering",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [
          "gmail.com",
          "msn.com",
          "offerup.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "858598XXXX",
          "858405XXXX"
      ]
  },
  {
      "id": 793865195,
      "name": "Anthony Thomas",
      "linkedin_url": "https://www.linkedin.com/in/anthony-thomasc10",
      "current_title": "CEO CIO",
      "current_employer": "Walmart Global Tech",
      "current_employer_website": "http://avctechservice.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/avc-tech-service",
      "location": "United States",
      "emails": [
          "gmail.com",
          "avctechservice.com"
      ],
      "latest_email": "gmail.com",
      "phones": []
  },
  {
      "id": 369601578,
      "name": "Joe Walsh",
      "linkedin_url": "https://www.linkedin.com/in/joewalsh-8551a83a",
      "current_title": "Chairman and CEO",
      "current_employer": "Thryv",
      "current_employer_website": "https://www.thryv.com/",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thryvinc",
      "location": "United States",
      "emails": [
          "gmail.com",
          "hotmail.com",
          "thryv.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "301-502-XXXX",
          "516-730-XXXX",
          "201-634-XXXX",
          "702-868-XXXX",
          "949-340-XXXX",
          "201-634-XXXX"
      ]
  },
  {
      "id": 139585457,
      "name": "Paul Truex",
      "linkedin_url": "https://www.linkedin.com/in/paul-truex-305236199",
      "current_title": "Chairman and CEO",
      "current_employer": "Thryv",
      "current_employer_website": "http://thryvtrx.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thryv-therapeutics-inc",
      "location": "United States",
      "emails": [
          "gmail.com",
          "comcast.net",
          "thryvtrx.com",
          "lqttrx.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "510-435-XXXX",
          "705-394-XXXX",
          "559-331-XXXX",
          "510-856-XXXX",
          "510-856-XXXX",
          "925-425-XXXX"
      ]
  },
  {
      "id": 70652100,
      "name": "Nina G",
      "linkedin_url": "https://www.linkedin.com/in/ninabarron",
      "current_title": "Founder and CEO",
      "current_employer": "Thryv",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [
          "gmail.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "727-542-XXXX",
          "727-954-XXXX"
      ]
  },
  {
      "id": 114150416,
      "name": "Brian Holdren",
      "linkedin_url": "https://www.linkedin.com/in/brian-holdren",
      "current_title": "Founder and CEO",
      "current_employer": "Thryv",
      "current_employer_website": "http://www.thrivleads.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thriv-digital",
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": []
  },
  {
      "id": 242292117,
      "name": "Loni Brown",
      "linkedin_url": "https://www.linkedin.com/in/mrslonibrown",
      "current_title": "Founder and CEO",
      "current_employer": "Thryv",
      "current_employer_website": "https://thryvecompany.com/",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thryvecompany",
      "location": "United States",
      "emails": [
          "gmail.com",
          "thryvecompany.com",
          "intellitalent.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "310500XXXX",
          "202709XXXX",
          "440454XXXX"
      ]
  },
  {
      "id": 141960616,
      "name": "Joseph Genovesi",
      "linkedin_url": "https://www.linkedin.com/in/joeyfoto",
      "current_title": "CEO",
      "current_employer": "Thryv",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [
          "kolumi.com",
          "eocc.org"
      ],
      "latest_email": "kolumi.com",
      "phones": [
          "407574XXXX",
          "734464XXXX",
          "407990XXXX"
      ]
  },
  {
      "id": 751469018,
      "name": "Chase Allison",
      "linkedin_url": "https://www.linkedin.com/in/chaseallison",
      "current_title": "Founder and CEO",
      "current_employer": "Thryv",
      "current_employer_website": "https://www.thryve-marketing.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thryve-marketing",
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": []
  },
  {
      "id": 5841067,
      "name": "Brad Atchison",
      "linkedin_url": "https://www.linkedin.com/in/brad-atchison-26294b16",
      "current_title": "CEO and Chief Consultant",
      "current_employer": "Thryv",
      "current_employer_website": "https://thryve-mi.org/",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thryve-llc",
      "location": "United States",
      "emails": [
          "thryve-mi.org",
          "hueai.com",
          "huelens.com",
          "voami.org",
          "voa.org",
          "msu.edu"
      ],
      "latest_email": "thryve-mi.org",
      "phones": [
          "248945XXXX",
          "517574XXXX",
          "313744XXXX",
          "313451XXXX"
      ]
  },
  {
      "id": 80716545,
      "name": "Amy Morin",
      "linkedin_url": "https://www.linkedin.com/in/amymorin",
      "current_title": "Founder and Visionary and CEO",
      "current_employer": "Thryv",
      "current_employer_website": "http://www.thrivcoaching.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thrīv-coaching",
      "location": "United States",
      "emails": [
          "gmail.com",
          "eosworldwide.com",
          "amymorinteam.com",
          "amymorinco.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "406426XXXX",
          "360883XXXX"
      ]
  },
  {
      "id": 39167346,
      "name": "Toby Kaye",
      "linkedin_url": "https://www.linkedin.com/in/toby-kaye-37878330",
      "current_title": "Founder and CEO",
      "current_employer": "Thryv",
      "current_employer_website": "http://www.thethryvegroup.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/thryve-group-llc",
      "location": "United States",
      "emails": [
          "gmail.com",
          "thethryvegroup.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "330867XXXX"
      ]
  },
  {
      "id": 9814,
      "name": "Thuan Pham",
      "linkedin_url": "https://www.linkedin.com/in/thuanqpham",
      "current_title": "CTO",
      "current_employer": "Faire",
      "current_employer_website": "http://www.faire.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/fairewholesale",
      "location": "United States",
      "emails": [
          "gmail.com",
          "yahoo.com",
          "faire.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "415842XXXX",
          "408533XXXX",
          "408425XXXX",
          "408-223-XXXX",
          "216-873-XXXX",
          "415957XXXX"
      ]
  },
  {
      "id": 79310181,
      "name": "Olivia S.",
      "linkedin_url": "https://www.linkedin.com/in/olivia-s-529a7266",
      "current_title": "Executive Assistant to Co-Founder and CEO",
      "current_employer": "Faire",
      "current_employer_website": "http://www.faire.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/fairewholesale",
      "location": "United States",
      "emails": [
          "aol.com",
          "faire.com",
          "mackenziewarehouse.com"
      ],
      "latest_email": "aol.com",
      "phones": [
          "415-724-XXXX"
      ]
  },
  {
      "id": 80424835,
      "name": "Paul Poppert",
      "linkedin_url": "https://www.linkedin.com/in/paul-poppert-51b4491",
      "current_title": "Head Of Engineering",
      "current_employer": "Faire",
      "current_employer_website": "http://www.faire.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/fairewholesale",
      "location": "United States",
      "emails": [
          "gmail.com",
          "yahoo.com",
          "comcast.net",
          "faire.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "847-809-XXXX",
          "519498XXXX",
          "470816XXXX",
          "847-393-XXXX",
          "262-249-XXXX"
      ]
  },
  {
      "id": 64651228,
      "name": "Max Rhodes",
      "linkedin_url": "https://www.linkedin.com/in/max-rhodes",
      "current_title": "Co-founder and CEO",
      "current_employer": "Faire",
      "current_employer_website": "http://www.faire.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/fairewholesale",
      "location": "United States",
      "emails": [
          "gmail.com",
          "faire.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "405-850-XXXX",
          "405.850.XXXX",
          "415-627-XXXX",
          "415375XXXX",
          "619796XXXX"
      ]
  },
  {
      "id": 259159502,
      "name": "Isaac Newton",
      "linkedin_url": "https://www.linkedin.com/in/isaac-newton-07917b114",
      "current_title": "CEO",
      "current_employer": "Faire",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": [
          "618926XXXX",
          "618841XXXX",
          "618252XXXX"
      ]
  },
  {
      "id": 14270895,
      "name": "Amanda Judge",
      "linkedin_url": "https://www.linkedin.com/in/amandajudge",
      "current_title": "Founder and CEO",
      "current_employer": "Faire",
      "current_employer_website": "http://www.shopfaire.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/the-andean-collection",
      "location": "United States",
      "emails": [
          "gmail.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "617997XXXX",
          "480624XXXX",
          "718388XXXX",
          "312226XXXX"
      ]
  },
  {
      "id": 164053641,
      "name": "Austin Heath",
      "linkedin_url": "https://www.linkedin.com/in/austin-heath-87859577",
      "current_title": "CEO",
      "current_employer": "Faire",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": [
          "419363XXXX",
          "937944XXXX"
      ]
  },
  {
      "id": 40205645,
      "name": "Pierre Guidetti",
      "linkedin_url": "https://www.linkedin.com/in/pierre-yann-guidetti-231a947",
      "current_title": "Co-founder and CEO",
      "current_employer": "Faire",
      "current_employer_website": "http://www.savoirfaire.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/savoir-faire",
      "location": "United States",
      "emails": [
          "gmail.com",
          "savoirfaire.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "415385XXXX",
          "415381XXXX",
          "415747XXXX",
          "1.415884XXXX",
          "415884XXXX",
          "415884XXXX"
      ]
  },
  {
      "id": 128383922,
      "name": "Gina Miller",
      "linkedin_url": "https://www.linkedin.com/in/gina-miller-32aa70101",
      "current_title": "CEO",
      "current_employer": "Faire",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": [
          "612715XXXX"
      ]
  },
  {
      "id": 164388479,
      "name": "Dionne Carole",
      "linkedin_url": "https://www.linkedin.com/in/dionne-carole-5a5a854",
      "current_title": "CEO",
      "current_employer": "Faire",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [
          "aol.com"
      ],
      "latest_email": "aol.com",
      "phones": []
  },
  {
      "id": 7457652,
      "name": "Jodie Bao",
      "linkedin_url": "https://www.linkedin.com/in/jodie-bao-ab88bb101",
      "current_title": "Advisor to CEO",
      "current_employer": "SHOP.COM",
      "current_employer_website": "http://www.shop.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/shop.com",
      "location": "United States",
      "emails": [
          "shop.com"
      ],
      "latest_email": "shop.com",
      "phones": [
          "402896XXXX"
      ]
  },
  {
      "id": 65803503,
      "name": "Danielle Huggins",
      "linkedin_url": "https://www.linkedin.com/in/danielle-a-huggins",
      "current_title": "General Manager, CEO Communications",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "delta.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "770761XXXX",
          "901830XXXX",
          "570476XXXX"
      ]
  },
  {
      "id": 388606212,
      "name": "Jim G.",
      "linkedin_url": "https://www.linkedin.com/in/jim-g-29b431194",
      "current_title": "SVP Delta Connection and CEO Endeavor Airlines",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "delta.com"
      ],
      "latest_email": "delta.com",
      "phones": []
  },
  {
      "id": 81929859,
      "name": "Amy Murphy",
      "linkedin_url": "https://www.linkedin.com/in/amy-murphy-612b7572",
      "current_title": "CEO Executive Correspondence Team Support",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "yahoo.com",
          "hotmail.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "972-757-XXXX",
          "940898XXXX",
          "214-527-XXXX",
          "972-921-XXXX",
          "214-527-XXXX",
          "972-937-XXXX"
      ]
  },
  {
      "id": 787456,
      "name": "Maria Moraitakis",
      "linkedin_url": "https://www.linkedin.com/in/maria-moraitakis-690052b7",
      "current_title": "Senior Manager, Corporate Communications - CEO Communications",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "delta.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "404775XXXX",
          "1.404775XXXX"
      ]
  },
  {
      "id": 73445486,
      "name": "Chelsea Gorman",
      "linkedin_url": "https://www.linkedin.com/in/chelsea-gorman",
      "current_title": "Senior Coordinator, CEO Communications",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": [
          "713-427-XXXX",
          "678-416-XXXX",
          "936-647-XXXX",
          "936-697-XXXX",
          "765618XXXX",
          "336-521-XXXX"
      ]
  },
  {
      "id": 35710246,
      "name": "Dwight James",
      "linkedin_url": "https://www.linkedin.com/in/dwight-james-692145",
      "current_title": "SENIOR VICE  PRESIDENT - Customer Engagement and Loyalty and CEO of Delta Vacations",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "delta.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "678-516-XXXX",
          "404408XXXX",
          "404972XXXX",
          "404-696-XXXX",
          "404773XXXX"
      ]
  },
  {
      "id": 762187276,
      "name": "Maria Oldham",
      "linkedin_url": "https://www.linkedin.com/in/maria-moraitakis-oldham-690052b7",
      "current_title": "Senior Manager, Corporate Communications - CEO Communications",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "delta.com"
      ],
      "latest_email": "delta.com",
      "phones": []
  },
  {
      "id": 13720961,
      "name": "Sabrina Lewis",
      "linkedin_url": "https://www.linkedin.com/in/sabrinalewis1",
      "current_title": "Senior Manager, CEO Communications",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "delta.com"
      ],
      "latest_email": "delta.com",
      "phones": [
          "404724XXXX",
          "404805XXXX"
      ]
  },
  {
      "id": 1312016,
      "name": "Narayanan Krishnakumar",
      "linkedin_url": "https://www.linkedin.com/in/krishnakumarkk",
      "current_title": "VP and CTO",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "yahoo.com",
          "delta.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "952-736-XXXX",
          "404715XXXX",
          "1.978264XXXX",
          "978-264-XXXX",
          "508898XXXX"
      ]
  },
  {
      "id": 44069362,
      "name": "Heather Robertson",
      "linkedin_url": "https://www.linkedin.com/in/heather-robertson-3a393421",
      "current_title": "CTO",
      "current_employer": "Delta Air Lines",
      "current_employer_website": "http://www.delta.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/delta-air-lines",
      "location": "United States",
      "emails": [
          "comcast.net"
      ],
      "latest_email": "comcast.net",
      "phones": [
          "206824XXXX",
          "425824XXXX",
          "253839XXXX"
      ]
  },
  {
      "id": 235627954,
      "name": "Doug Parker",
      "linkedin_url": "https://www.linkedin.com/in/wdougparker",
      "current_title": "Chairman and former CEO at American Airlines",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "aa.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "951-870-XXXX",
          "602-524-XXXX",
          "818-841-XXXX",
          "480-693-XXXX",
          "612-726-XXXX",
          "480-693-XXXX"
      ]
  },
  {
      "id": 731179654,
      "name": "Yvonne Worsham",
      "linkedin_url": "https://www.linkedin.com/in/yvonne-worsham",
      "current_title": "Executive Assistant, CEO",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "aa.com",
          "cs.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "817-846-XXXX",
          "214-967-XXXX",
          "817-963-XXXX",
          "817-967-XXXX",
          "817-498-XXXX",
          "234-685-XXXX"
      ]
  },
  {
      "id": 83951544,
      "name": "Max Sterrett",
      "linkedin_url": "https://www.linkedin.com/in/max-d-sterrett-234720137",
      "current_title": "CTO Base Maintenance Production Manager",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "aa.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "304481XXXX",
          "304464XXXX"
      ]
  },
  {
      "id": 372253031,
      "name": "Robert Isom",
      "linkedin_url": "https://www.linkedin.com/in/robertisomaa",
      "current_title": "CEO and Chief Recruitment Officer",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "aa.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "612-747-XXXX",
          "817963XXXX",
          "952-974-XXXX",
          "480-693-XXXX",
          "612-726-XXXX",
          "480-693-XXXX"
      ]
  },
  {
      "id": 65907589,
      "name": "Eric Huff",
      "linkedin_url": "https://www.linkedin.com/in/eric-huff-819914a4",
      "current_title": "CEO A-Awesome Towing and Transport Inc. and Fleet Svc Clerk",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "aa.com"
      ],
      "latest_email": "gmail.com",
      "phones": []
  },
  {
      "id": 698757721,
      "name": "Anthony Trotta",
      "linkedin_url": "https://www.linkedin.com/in/anthony-trotta-a45118283",
      "current_title": "CEO and Chief Recruitment Officer at American Airlines",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "aa.com"
      ],
      "latest_email": "aa.com",
      "phones": []
  },
  {
      "id": 121348444,
      "name": "Derek Bourjos",
      "linkedin_url": "https://www.linkedin.com/in/derek-bourjos-78a740132",
      "current_title": "CEO",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "aa.com"
      ],
      "latest_email": "aa.com",
      "phones": []
  },
  {
      "id": 29431665,
      "name": "Dan Garton",
      "linkedin_url": "https://www.linkedin.com/in/dan-garton-16209a79",
      "current_title": "ceo american eagle",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "aa.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "214-352-XXXX",
          "817967XXXX",
          "817931XXXX",
          "920-876-XXXX",
          "817967XXXX",
          "817967XXXX"
      ]
  },
  {
      "id": 468343870,
      "name": "Mert K.",
      "linkedin_url": "https://www.linkedin.com/in/mert-can-k-42402b150",
      "current_title": "Group CEO",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "aa.com"
      ],
      "latest_email": "aa.com",
      "phones": []
  },
  {
      "id": 102057943,
      "name": "April Jenco",
      "linkedin_url": "https://www.linkedin.com/in/april-stevens-jenco-bba296111",
      "current_title": "Reservation agent, CTO, ATO",
      "current_employer": "American Airlines",
      "current_employer_website": "http://www.aa.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/american-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "aa.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "732922XXXX"
      ]
  },
  {
      "id": 185099585,
      "name": "Fariba Salmani",
      "linkedin_url": "https://www.linkedin.com/in/fariba-salmani-93593190",
      "current_title": "Deputy CEO",
      "current_employer": "United Airlines",
      "current_employer_website": "http://www.united.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/united-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "united.com",
          "aa.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "818-213-XXXX",
          "818-259-XXXX",
          "+98 912 399 XXXX",
          "+98 912 335 XXXX"
      ]
  },
  {
      "id": 1198558,
      "name": "Erin Clutcher",
      "linkedin_url": "https://www.linkedin.com/in/erin-clutcher-0a932950",
      "current_title": "Executive Assistant to the CEO",
      "current_employer": "United Airlines",
      "current_employer_website": "http://www.united.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/united-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "united.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "917301XXXX"
      ]
  },
  {
      "id": 8862044,
      "name": "Bruce Dorfman",
      "linkedin_url": "https://www.linkedin.com/in/bruce-dorfman-03a53b55",
      "current_title": "ceo",
      "current_employer": "United Airlines",
      "current_employer_website": "http://www.united.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/united-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "cox.net",
          "united.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "520225XXXX",
          "520-510-XXXX",
          "520-884-XXXX"
      ]
  },
  {
      "id": 368669221,
      "name": "Lynda Wagner",
      "linkedin_url": "https://www.linkedin.com/in/lynda-wagner-548094181",
      "current_title": "CTO",
      "current_employer": "United Airlines",
      "current_employer_website": "http://www.united.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/continental-airlines",
      "location": "United States",
      "emails": [
          "united.com"
      ],
      "latest_email": "united.com",
      "phones": []
  },
  {
      "id": 9007553,
      "name": "Radhakrishnan Raman",
      "linkedin_url": "https://www.linkedin.com/in/radhakrishnan-raman-p-e-81baa71",
      "current_title": "Head of Engineering",
      "current_employer": "United Airlines",
      "current_employer_website": "https://www.ussteel.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/u-s-steel",
      "location": "United States",
      "emails": [
          "hotmail.com",
          "uss.com"
      ],
      "latest_email": "hotmail.com",
      "phones": [
          "313399XXXX",
          "248-688-XXXX"
      ]
  },
  {
      "id": 829504145,
      "name": "Radhakrishnan Raman",
      "linkedin_url": "https://www.linkedin.com/in/radhakrishnan-raman-1897a3321",
      "current_title": "Head of Engineering",
      "current_employer": "United Airlines",
      "current_employer_website": "https://www.ussteel.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/u-s-steel",
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": []
  },
  {
      "id": 130788393,
      "name": "Sharyl Crosby",
      "linkedin_url": "https://www.linkedin.com/in/sharyl-crosby-a24086118",
      "current_title": "Head of Engineering Department",
      "current_employer": "United Airlines",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": []
  },
  {
      "id": 1439970,
      "name": "Kevin Tucker",
      "linkedin_url": "https://www.linkedin.com/in/kevin-tucker-994a2014",
      "current_title": "Head of Engineering and Operations",
      "current_employer": "United Airlines",
      "current_employer_website": "http://www.southwest.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "sbcglobal.net",
          "wnco.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "817368XXXX",
          "847454XXXX",
          "817557XXXX",
          "817784XXXX",
          "817275XXXX",
          "817446XXXX"
      ]
  },
  {
      "id": 21732232,
      "name": "H Davidson",
      "linkedin_url": "https://www.linkedin.com/in/h-davidson-8214958",
      "current_title": "CTO",
      "current_employer": "United Airlines",
      "current_employer_website": "https://www.unitedhealthgroup.com/",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/unitedhealth-group",
      "location": "United States",
      "emails": [
          "hotmail.com"
      ],
      "latest_email": "hotmail.com",
      "phones": [
          "605376XXXX"
      ]
  },
  {
      "id": 117114736,
      "name": "David Rhu",
      "linkedin_url": "https://www.linkedin.com/in/david-rhu-8a695735",
      "current_title": "CTO",
      "current_employer": "United Airlines",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": [
          "+82 10-7314-XXXX"
      ]
  },
  {
      "id": 800070413,
      "name": "Marcy Nottingham",
      "linkedin_url": "https://www.linkedin.com/in/marcy-nottingham-3a0362151",
      "current_title": "Executive Assistant to CEO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": "http://www.southwest.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest-airlines",
      "location": "United States",
      "emails": [
          "wnco.com"
      ],
      "latest_email": "wnco.com",
      "phones": []
  },
  {
      "id": 1439970,
      "name": "Kevin Tucker",
      "linkedin_url": "https://www.linkedin.com/in/kevin-tucker-994a2014",
      "current_title": "Head of Engineering and Operations",
      "current_employer": "Southwest Airlines",
      "current_employer_website": "http://www.southwest.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "sbcglobal.net",
          "wnco.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "817368XXXX",
          "847454XXXX",
          "817557XXXX",
          "817784XXXX",
          "817275XXXX",
          "817446XXXX"
      ]
  },
  {
      "id": 89395172,
      "name": "Darin Farnham",
      "linkedin_url": "https://www.linkedin.com/in/darin-farnham-19411723",
      "current_title": "Ground Ops Ramp Supervisor and CEO of my own World at SWA*BOI",
      "current_employer": "Southwest Airlines",
      "current_employer_website": "http://www.southwest.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest-airlines",
      "location": "United States",
      "emails": [
          "wnco.com",
          "southwest.com"
      ],
      "latest_email": "wnco.com",
      "phones": [
          "208867XXXX",
          "208863XXXX"
      ]
  },
  {
      "id": 1369028,
      "name": "Gary Kelly",
      "linkedin_url": "https://www.linkedin.com/in/garyckelly",
      "current_title": "Chairman and CEO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": "http://www.southwest.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest-airlines",
      "location": "United States",
      "emails": [
          "gmail.com",
          "msn.com",
          "wnco.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "310586XXXX",
          "800533XXXX",
          "214904XXXX",
          "214792XXXX",
          "214792XXXX",
          "520514XXXX"
      ]
  },
  {
      "id": 16380205,
      "name": "Cynde Jones",
      "linkedin_url": "https://www.linkedin.com/in/cynde-jones-6475194a",
      "current_title": "President/CEO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": "http://www.swacu.org",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest-airlines-federal-credit-union",
      "location": "United States",
      "emails": [
          "swacu.org"
      ],
      "latest_email": "swacu.org",
      "phones": [
          "469569XXXX",
          "214904XXXX",
          "214357XXXX"
      ]
  },
  {
      "id": 242218312,
      "name": "Len Benckenstein",
      "linkedin_url": "https://www.linkedin.com/in/len-benckenstein-99a080b4",
      "current_title": "CEO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": "http://www.southwest.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest",
      "location": "United States",
      "emails": [
          "swe.com",
          "southwest.com"
      ],
      "latest_email": "swe.com",
      "phones": [
          "281240XXXX"
      ]
  },
  {
      "id": 45988421,
      "name": "William Unkel",
      "linkedin_url": "https://www.linkedin.com/in/william-unkel-800a6422",
      "current_title": "CTO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [
          "gmail.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "339222XXXX",
          "505388XXXX",
          "781861XXXX"
      ]
  },
  {
      "id": 9567967,
      "name": "David Calley",
      "linkedin_url": "https://www.linkedin.com/in/david-calley-2014b07",
      "current_title": "President and CTO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": "http://www.windenergy.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/southwest-windpower",
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": [
          "928380XXXX",
          "928779XXXX",
          "928214XXXX",
          "303439XXXX",
          "928527XXXX",
          "954575XXXX"
      ]
  },
  {
      "id": 23625505,
      "name": "Eddie Dorsett",
      "linkedin_url": "https://www.linkedin.com/in/eddie-dorsett-87a41385",
      "current_title": "CEO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": []
  },
  {
      "id": 10809503,
      "name": "Jon Howes",
      "linkedin_url": "https://www.linkedin.com/in/jon-howes-a4976128",
      "current_title": "CEO",
      "current_employer": "Southwest Airlines",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [
          "msn.com",
          "southwestauto.com"
      ],
      "latest_email": "msn.com",
      "phones": [
          "214212XXXX",
          "972488XXXX",
          "808542XXXX",
          "214529XXXX",
          "214243XXXX",
          "214462XXXX"
      ]
  },
  {
      "id": 161944143,
      "name": "Michael McCabe",
      "linkedin_url": "https://www.linkedin.com/in/michael-mccabe-b15bb7a",
      "current_title": "CEO",
      "current_employer": "Nenhuma",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": [
          "972462XXXX"
      ]
  },
  {
      "id": 260185595,
      "name": "Spencer Brodie",
      "linkedin_url": "https://www.linkedin.com/in/spencerbrodie",
      "current_title": "CEO and Founder",
      "current_employer": "Nenhuma",
      "current_employer_website": "http://www.neshamafoods.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/neshamafoods",
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": []
  },
  {
      "id": 834043790,
      "name": "Alan Wiederhold",
      "linkedin_url": "https://www.linkedin.com/in/alanwiederholdgba",
      "current_title": "Founder and CEO",
      "current_employer": "Nenhuma",
      "current_employer_website": null,
      "current_employer_linkedin_url": null,
      "location": "United States",
      "emails": [],
      "latest_email": "N/A",
      "phones": []
  },
  {
      "id": 5164338,
      "name": "Sooinn Lee",
      "linkedin_url": "https://www.linkedin.com/in/sooinnlee",
      "current_title": "CEO, Creative Lead",
      "current_employer": "Nenhuma",
      "current_employer_website": "http://www.enuma.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/enuma-inc",
      "location": "United States",
      "emails": [
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "enuma.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "510-289-XXXX",
          "510548XXXX",
          "925-284-XXXX",
          "510-234-XXXX",
          "626-294-XXXX"
      ]
  },
  {
      "id": 39559017,
      "name": "David King",
      "linkedin_url": "https://www.linkedin.com/in/david-king-9504b217",
      "current_title": "Founder and CEO",
      "current_employer": "Nenhuma",
      "current_employer_website": "http://www.neumaconsulting.com",
      "current_employer_linkedin_url": "https://www.linkedin.com/company/neuma-consulting-llc",
      "location": "United States",
      "emails": [
          "gmail.com",
          "neumaconsulting.com"
      ],
      "latest_email": "gmail.com",
      "phones": [
          "571918XXXX"
      ]
  }
];
}
