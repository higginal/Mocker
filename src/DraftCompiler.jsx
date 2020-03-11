import teamData from './team-data';

export default function DraftCompiler(draftInfo) {

    var text = ""

    //console.log(draftInfo.pickedPlayers.length)
    if (draftInfo.ids != null) {
        var redditFormat = "-------REDDIT FORMAT-------------\n\n"
        draftInfo.ids.map((value, index) => {

            let newLine = teamData[draftInfo.teams[value].content].name

            let playerId = draftInfo.pickedPlayers[index]
            //console.log(playerId)
            var chosenPick = "--Not Selected--"
            var position = ""
            var school = ""
            if (playerId != null) {
                chosenPick = draftInfo.players[playerId].content
                position = draftInfo.players[playerId].pos
                school = draftInfo.players[playerId].school
            }

            redditFormat +=  "**" + (index+1) + "**.\t**" + newLine + "** - **" + chosenPick + "**, *" + position + "-" + school + "*\n\n";

        })


        text += redditFormat;



        var excelFormat = "-------------EXCEL FORMAT-------------\n\n"
        var columns = "Number, Team, Name, Position, School\n"
        excelFormat += columns;

        draftInfo.ids.map((value, index) => {

            let newLine = teamData[draftInfo.teams[value].content].name

            let playerId = draftInfo.pickedPlayers[index]
            //console.log(playerId)
            var chosenPick = "--Not Selected--"
            var position = ""
            var school = ""
            if (playerId != null) {
                chosenPick = draftInfo.players[playerId].content
                position = draftInfo.players[playerId].pos
                school = draftInfo.players[playerId].school
            }

            excelFormat +=  (index+1) + "," + newLine + "," + chosenPick + "," + position + "," + school + "\n";

        })

        text += excelFormat;

        return text;

    }


}