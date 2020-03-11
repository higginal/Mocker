import playerFile2 from './morePlayers.json'


var request = new XMLHttpRequest();
request.open("GET", "./data/players.json", false);
request.send(null)

const initialData = {

    'teams': {
        'team-1': { id: 'team-1', content: 1 }
    },

    'players': playerFile2['players'],


    /*{

        'Joe-Burrow': { id: 'Joe-Burrow', content: 'Joe Burrow', pos: 'Quarterback', school: 'LSU' },
        'Chase-Young': { id: 'Chase-Young', content: 'Chase Young', pos: 'Edge', school: 'OSU' },
        'Tua-T': { id: 'Tua-T', content: 'Tua T', pos: 'Quarterback', school: 'Alabama' }

    }, */

    //'allPlayerIds': ['Joe-Burrow', 'Chase-Young', 'Tua-T', 'Jeffrey-Okudah', 'Derrick-Brown', 'Andrew-Thomas', 'Isaiah-Simmons'],

    allPlayerIds: playerFile2['ids'],

    columns: {
        'team-column': {
            id: 'team-column',
            title: 'Teams',
            teamIds: null
        },

        'player-column': {
            id: 'player-column',
            title: 'Picked Players',
            playerIds: []
        },

        'player-pool': {
            id: 'player-pool',
            title: 'Player Pool',
            playerIds: ['Joe-Burrow', 'Chase-Young', 'Tua-T']
        }
    },

    columnOrder: ['team-column', 'player-column', 'player-pool'],

    draftOrder: [   
        [6, 31, 10, 22, 18, 16, 4, 0, 14, 7, 23, 24, 13, 29, 9, 1, 8,
        18, 24, 14, 25, 3, 20, 21, 19, 18, 28, 2, 30, 11, 27, 15],

        [6, 13, 10, 22, 16, 4, 18, 0, 7, 14, 5, 13, 29, 9, 1, 23, 26, 5, 8, 17, 
        25, 3, 1, 18, 12, 19, 28, 2, 30, 11, 15, 28],

        [6, 31, 10, 23, 4, 18, 16, 0, 14, 7, 13, 29, 9, 1, 23, 24, 24, 8, 9, 17, 25, 3,
        20, 21, 19, 7, 24, 2, 30, 11, 9, 15]

    ]

}

export default initialData;