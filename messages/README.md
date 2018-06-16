# The README File

> ```If the first part worked, turn off Python's simple HTTP server. Instead, open the index.html on a few web browsers (Chrome, Firefox, Safari, Microsoft Edge, etc.) via double-clicking on the file or do a File > Open. Does it really work? Should it work?```

I tried this; it seemed to work although the Console showed an XML Parsing Error while trying to read the data.json file. It did display the message and usernames. I tried this with new browser sessions, cache disabled, and history cleared. I think this SHOULD work, because the files being requested are all on the same local domain.

> ```If the first part worked, instead of loading the data from the data.json file, try loading the JSON data from a URI. Replace data.json in your lab.js to https://messagehub.herokuapp.com/messages.json. The JSON looks very similar with the same important fields. You do not need to modify any other code in your JavaScript. Does it work?```

This did not work at all. The messages nor usernames did not show, and the Console showed that a Cross-Origin Request was blocked because CORS header 'Access-Control-Allow-Origin' was missing (on the server).

## Each assignment and lab shall include a README file that describes the work. This description must:

> ```1. Identify what aspects of the work have been correctly implemented and what have not.```

A request object is created after the body onload event fires which pulls the json data from whatever file is specified in the lab.js file, it has been a couple different locations for this assignment.
The data from the request is parsed once recieved with a successful status code, and added to the HTML with some CSS stylings.

> ```1. Identify anyone with whom you have collaborated or discussed the assignment.```

I have not collaborated or discussed this assignment with anyone, although portions of the code were inspired by your example at https://github.com/tuftsdev/WebProgramming/blob/gh-pages/examples/ajax/messages.html.

> ```2. Say approximately how many hours you have spent completing the assignment.```

I have spent about an hour on this assignment.

> ```3. Be written in either text format (**README.txt**) or in Markdown (**README.md**). Markdown is preferred. No other formats will be accepted. Please use all capital letters for README```

...

> ```For this lab, you must also answer an important question: is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) or from your local machine (from file:///) from using XMLHttpRequest? Why or why not?```

It was possible to pull the data from the local machine whether or not the Python server was on.  It was never possible to load the data from the heroku site because the browser blocked the request for violating the same-origin policy.