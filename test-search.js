var compileCsvSearch = function(text, keyName) {
    return function(valueName) {
        var textLines = text.slice(0, -1).split('\n');
        var keyVal = textLines[0].split(',');
        var parsedText = [];
        for (var i = 1; i < textLines.length; i++) {
            parsedText.push((function(keys, values) {
                var obj = {};
                for (var i = 0; i < keyVal.length; i++) {
                    obj[keys[i]] = values[i];
                };
                return obj;
            })(keyVal, textLines[i].split(',')));
        }
        for (var i = 0; i < parsedText.length; i++) {
            if (parsedText[i][keyName] == valueName) {
                return parsedText[i];
            }
        }
    }
};

console.time('timerName');
var csvByValue = compileCsvSearch(
    "ip,name,desc\n" +
    "10.49.1.4,server1,Main Server\n" +
    "10.52.5.1,server2,Backup Server\n",
    "name");
console.log(csvByValue("server2"));
console.timeEnd('timerName');
console.log(csvByValue("server9"));

var csvByValue = compileCsvSearch(
    "ip,name,desc\n" +
    "10.49.1.4,server1,Main Server\n" +
    "10.52.5.1,server2,Backup Server\n",
    "desc");
console.log(csvByValue("Main Server"));
console.log(csvByValue("server9"));