import teamData from './team-data';

export default function DraftCompiler(draftInfo) {

    var text = ""

    if (draftInfo.ids != null) {
        var redditFormat = "-------REDDIT FORMAT-------------\n\n"

        var shareableFormat = "---------Shareable Binary---------\n\n"
        var convertText = ""

        var excelFormat = "-------------EXCEL FORMAT-------------\n\n"
        var columns = "Number, Team, Name, Position, School\n"
        excelFormat += columns;

        draftInfo.ids.map( (value, index) => {

            let newLine = teamData[draftInfo.teams[value].content].name     //team name

            let playerId = draftInfo.pickedPlayers[index]       //Player id
            var chosenPick = "--Not Selected--"
            var position = ""
            var school = ""
            if (playerId != null) {
                chosenPick = draftInfo.players[playerId].content        //name set
                position = draftInfo.players[playerId].pos              //position set
                school = draftInfo.players[playerId].school             // school set
            }

            redditFormat +=  "**" + (index+1) + "**.\t**" + newLine + "** - **" + chosenPick + "**, *" + position + "-" + school + "*\n\n";

            excelFormat +=  (index+1) + "," + newLine + "," + chosenPick + "," + position + "," + school + "\n";
            
            convertText += draftInfo.teams[value].content + '-' + playerId + ":";

        })

        text += redditFormat;
        text += excelFormat;
        //var testStr = "THIS IS A HUGE TEST";
        //text += shareableFormat;

        //let objJsonStr = JSON.stringify(draftInfo);
       // let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
        
        //console.log(objJsonB64);

        //var actual = JSON.parse(atob(objJsonB64));
        ///console.log(actual);


       // var testConvert = btoa(draftInfo);
        //console.log(draftInfo);
        //console.log(testConvert);
        //text += testConvert;

        //text += objJsonB64;

        //var testUncovert = atob(testConvert);
        //console.log(testUncovert);
        //text += testUncovert;

        return text;

    }


}