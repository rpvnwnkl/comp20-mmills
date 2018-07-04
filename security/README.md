# The README File

## Each assignment and lab shall include a README file that describes the work. This description must:

> ```1. Identify what aspects of the work have been correctly implemented and what have not.```

I have not implemented any of the required aspects of this assignment. I did look through the site and identified several locations where there could be security concerns. Very quickly I was ably to see unvalidated inputs taken into the database (with potential to mine private data or take down the system), partially validated outputs delivered to the client (with the potential to insert malicious code), and unrestricted use of cross-origin request headers (which would allow others to hijack users' sessions). These all present various avenues for attack that make the site vulnerable. 

I had trouble setting up the GUI clients for pen testing, and wasn't sure what to inject into the site to prove that it was actually vulnerable. Since I suspect this will be covered in COMP116 again, I chose not to invest too much time into figuring it all out right now. I do think I have an understanding of what to look for and some of the risks.


> ``` 1. Identify anyone with whom you have collaborated or discussed the assignment.```

No collaborators or discussions beyond Piazza. 

> ```2. Say approximately how many hours you have spent completing the assignment.```

I spent 4 hours on this assignment.

> ```3. Be written in either text format (**README.txt**) or in Markdown (**README.md**). Markdown is preferred. No other formats will be accepted. Please use all capital letters for README```

... 