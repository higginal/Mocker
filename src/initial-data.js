import players from './players'
import playerFile from './players.json'


var request = new XMLHttpRequest();
request.open("GET", "./data/players.json", false);
request.send(null)

const initialData = {

    'teams': {
        'team-1': { id: 'team-1', content: 1 }
    },

    'players': playerFile['players'],


    /*{

        'Joe-Burrow': { id: 'Joe-Burrow', content: 'Joe Burrow', pos: 'Quarterback', school: 'LSU' },
        'Chase-Young': { id: 'Chase-Young', content: 'Chase Young', pos: 'Edge', school: 'OSU' },
        'Tua-T': { id: 'Tua-T', content: 'Tua T', pos: 'Quarterback', school: 'Alabama' }

    }, */

    //'allPlayerIds': ['Joe-Burrow', 'Chase-Young', 'Tua-T', 'Jeffrey-Okudah', 'Derrick-Brown', 'Andrew-Thomas', 'Isaiah-Simmons'],

    allPlayerIds: playerFile['ids'],

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

    columnOrder: ['team-column', 'player-column', 'player-pool']

}

export default initialData;