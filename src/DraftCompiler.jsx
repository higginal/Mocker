import teamData from './team-data';

export default function DraftCompiler(draftInfo) {

    var text = ""

    if (draftInfo.ids != null) {
        var redditFormat = "-------REDDIT FORMAT-------------\n\n"

        var excelFormat = "-------------EXCEL FORMAT-------------\n\n"
        var columns = "Number, Team, Name, Position, School\n"
        excelFormat += columns;

        draftInfo.ids.map( (value, index) => {

            let newLine = teamData[draftInfo.teams[value].content].name     //Player name

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

        })

        text += redditFormat;
        text += excelFormat;

        return text;

    }


}