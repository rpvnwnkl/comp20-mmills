// Your JavaScript goes here...
function parse() {
    var request = new XMLHttpRequest();
    request.open("GET", "data.json", true);

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            msgBox = document.getElementById("messages");
            parsedJson = JSON.parse(request.responseText);

        //create html and enter in json field values
            for (i in parsedJson) {
            //create child
                currChild = msgBox.appendChild(document.createElement('div'));
            //create message and username elements
                currMsg = currChild.appendChild(document.createElement('span'));
                currMsg.setAttribute('class', 'message');
                currUsr = currChild.appendChild(document.createElement('span'));
                currUsr.setAttribute('class', 'username');
            //populate message and username from json
                currMsg.textContent = parsedJson[i].content;
                currUsr.textContent = parsedJson[i].username;
            }
        }
    };

    request.send();
}