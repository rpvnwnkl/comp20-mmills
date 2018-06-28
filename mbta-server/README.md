# The README File

## Each assignment and lab shall include a README file that describes the work. This description must:

> ```1. Identify what aspects of the work have been correctly implemented and what have not.```

I implemented all the basic requirements of this assignment:

The server is written in Node.js and uses the Express web application framework. 
The work is deployed onto Heroku and I've added you as a collaborator.
The server has one route: GET /redline/schedule.json
Cross-Origin Resource Sharing is enabled for GET /redline/schedule.json. 
The server API requires one query string key: stop_id. 
Using the API without query string key stop_id shall renders the error (in JSON format): ```{"errors":"No stop_id provided"}```
Accessing this route returns the contents of the original source of the JSON data feed at https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=STOP_ID_HERE&page[limit]=10&sort=departure_time.
Providing a stop_id value that does not exist renders the error (in JSON format): ```{"errors":"No such stop_id exist"}```
The mbta project has been updated to use the new url.

I have not implement any of the Going Beyond features, mostly because of time. I ran into errors setting up CORS and using the heroku server that took me a while to really sort out.


> ``` 1. Identify anyone with whom you have collaborated or discussed the assignment.```

No collaborators, but some ideas and code inspirations were drawn from elsewhere on the web. 
The source code features comments when specific material has been referenced. 

> ```2. Say approximately how many hours you have spent completing the assignment.```

I worked around 13 hours on this assignment.

> ```3. Be written in either text format (**README.txt**) or in Markdown (**README.md**). Markdown is preferred. No other formats will be accepted. Please use all capital letters for README```

... 