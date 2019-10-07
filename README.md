# MarginCalculator--Server

This application is the server for Margin and Brokerage Calculator application, mainly this application is responsible for scraping the website of 
zerodha to obtain margins of Futures, Commodity and Currency.

After obtaining the scraped results this application then converts them into JSON and writes them to a file which then acts like the REST API.

There is no point in scraping the website for every single Request from client, beacuse for the entire day the values will be the same.

To reduce the burden of server, the scraping of the three segments is done only once a day, 

This is achieved using node-cron library.

# Challenges faced
1.  I experienced a lot of difficulties while developing this server logic especially while synchronizing multiple calls to the website for scraping because we are not dealing with 1 but 3 calls, and timing them exactly is a hell of a burden.

2.  The website I was scraping had irregular tag usage so it became very challenging to scrape the right content, in one of the segments I literally had to combined 2 REST API calls with the scraped data to get final JSON, which is very challenging because here I am dealing with async data which require a lot of callback functions to maintain synchronization 

3.  I faced many difficulties while deploying because this is the first application that is being deployed to AWS but after a lot of research finally I deployed it.


# Experience Gained
I enjoyed working on this application because this is my first server application and the thought process is completely a whole new experience.

I also liked the fact not giving up in the middle of the development is a great experience, because there are several moments where I thought of giving up, but I motivated myself and completed the application.

# Link

http://ec2-user@ec2-18-222-28-191.us-east-2.compute.amazonaws.com:5000

routes

/commodity, 
/futures, 
/currency
