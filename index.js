var dataAccess = require('./dataAccess');

const basses = [
    // 'Andy Richards',
    // 'Benjamin Wanggaard',
    'Brian Younger',
    // 'Chris Dart',
    // 'Dave Casperson',
    'Dave Speidel',
    'David Morris',
    // 'Ernie Peters',
    // 'Jeffrey Bemis',
    // 'Joel Prather',
    'Mark Ortenburger',
    // 'Mike Corkins',
    'Ralph Cobb',
    'Steve Zorn',
    'Tim Tillman',
    'Tom Schulein',
    'Tommy Keenan',
    'William Mark'
] 

const leads = [
    'Adam Kaufman',
    // 'Benjamin Brekke',
    'Carl Johnson',
    // 'Heath Mueller',
    // 'Joe Guerreri',
    'Joe Larson',
    // 'John Von Haden',
    'John White',
    'Leo Pusateri',
    'Louis Maglione',
    'Martin Wissenberg',
    // 'Merlin Friesen',
    'Mike O\'Donnell',
    // 'Nic Cols',
    'Rob Hoversten',
    // 'Robert Lepage',
    'Ron Cowan',
    // 'Ron Riley',           // Not Feeling Well
    'Shawn Hunter',
    // 'Steve Kari',
    // 'Tony Lapakko',
    // 'Wendell Keith'
]

const baris = [
    'Alan Isaacson',
    // 'Ben Hancock',
    'Brian Eastman',
    // 'David Short',
    // 'Dean Lambert',
    'Jeff Culp',
    'Joel McGlothen',
    'Kevin Downs',
    'Kirk Benson',
    // 'Mark Bloomquist',
    // 'Matt Richards',
    'Paul Paddock',
    // 'Ray Sturdy',
    'Dick Riemenschneider',
    'Rick Anderson',
    // 'Rick Chaddock',
    'Rick Van Gomple',
    'Rod Johnson',
    // 'Ron Reimer',
    // 'Scott Monte'
];

const tenors = [
    'Barry Givens',
    // 'Dale Bieber',
    // 'Dave Bechard',
    'Dave Dreyer',
    'David Mirhady',
    // 'Greg Hilliard',
    'James Maclean',
    'Jeff Schultz',
    'Ken Wentworth',
    // 'Ken Yergler',
    'Kevin Huyck',
    // 'Michael Tate',
    // 'Nate Weimer',       // Bowed Out
    'PE. Binderup',
    // 'Phil Brewer',
    // 'Phil Hedtke',
    // 'Randy Rogers',
    'Travis Hale',
    'Tyler Stromquist-LeVoir'
];

const songs = [
    'That\'s Life',
    'Bare Necessities',
    'When She Loved Me',
    'Cheek to Cheek',
    'No No Nora',
    'Cry',
    'I Can\'t Give You Anything But Love',
    'Goodbye Yellow Brick Road',
    'Their Hearts Were Full of Spring',
    'I\'m Feeling Fine',
];

const getMaxCount = () => {
    let maxCount = basses.length;
    if(leads.length > maxCount) {
        maxCount = leads.length;
    }
    if(baris.length > maxCount) {
        maxCount = baris.length;
    }
    if(tenors.length > maxCount) {
        maxCount = tenors.length;
    }

    return maxCount;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

const getValue = (arr, index) => {
    if(index > arr.length - 1) {
        return arr[index % arr.length];
    } else {
        return arr[index];
    }
}

const shuffleAll = () => {
    shuffle(basses);
    shuffle(leads);
    shuffle(tenors);
    shuffle(baris);
    shuffle(songs);
}

var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 9000));

app.get('/counts', (req, res) => {
    res.send({
        basses: basses.length,
        leads: leads.length,
        baris: baris.length,
        tenors: tenors.length
    })
});

app.get('/basses', (req, res) => {
    dataAccess.getBasses();
    res.send(basses);
});

app.get('/bassesRandom', (req, res) => {
    shuffle(basses);
    res.send(basses[0]);
});

app.get('/leads', (req, res) => {
    res.send(leads);
});

app.get('/leadsRandom', (req, res) => {
    shuffle(leads);
    res.send(leads[0]);
});

app.get('/baris', (req, res) => {
    res.send(baris);
});

app.get('/barisRandom', (req, res) => {
    shuffle(baris);
    res.send(baris[0]);
});

app.get('/tenors', (req, res) => {
    res.send(tenors);
});

app.get('/tenorsRandom', (req, res) => {
    shuffle(tenors);
    res.send(tenors[0]);
});

app.get('/songsRandom', (req, res) => {
    shuffle(songs);
    res.send(songs[0]);
});

app.get('/getRandomQuartets', function (req, res) {
    shuffleAll();

    let quartets = [];
    for ( let i = 0; i < getMaxCount(); i++) {
        let quartet = {
            bass: getValue(basses, i),
            lead: getValue(leads, i),
            bari: getValue(baris, i),
            tenor: getValue(tenors, i),
            song: getValue(songs, i)
        }

        quartets.push(quartet);
    }

    res.send(quartets);
});

app.get('/getSingleRandomQuartet', function(req, res) {
    shuffleAll();

    let quartet = {
        bass: getValue(basses, 0),
        lead: getValue(leads, 0),
        bari: getValue(baris, 0),
        tenor: getValue(tenors, 0),
        song: getValue(songs, 0) + '<br>' + getValue(songs, 1)
    };

    res.send(quartet);
});

app.use(express.static('public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});