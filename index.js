const basses = [
    'Steve Zorn',
    'Andy Richards',
    'Benjamin Wanggaard',
    'Thomas Schulein',
    'Chris Dart',
    'Dave Speidel',
    'Michael Corkins',
    'William Johnson',
    'David Casperson',
    'David Morris',
    'Peter Bennett',
    'Mark Ortenburger',
    'Joel Prather',
    'Thomas Keenan',
    'Lynton Kaufman',
    'Brian Younger',
    'Carl Sipe',
    'Eli Foreman',
    'Aaron Pedowitz',
    'Kyle Leichter',
    'Benjamin Israelson',
]

const leads = [
    'Joe Larson',
    'John Von Haden',
    'Joseph Gurreri',
    'Merlin Friesen',
    'Mike O\'Donnell',
    'Robert Hoversten',
    'Ronald Cowan',
    'Joseph Dempsey',
    'Gareth Cole',
    //'Conrad Ward',
    'Leo Pusateri',
    'John White',
    'Rich Kirwin',
    'Wendell Keith',
    'Aaron Marks',
    'John Loucks',
    'Heath Mueller',
    'Steve Reen',
    'Bernard Reen',
    'Benjamin Brekke',
    'Jim Clark',
    'Scott Veenhuis'
]

const baris = [
    'Raymond Sturdy',
    'Matthew Richards',
    'Paul Paddock',
    'Rodney	Johnson',
    'Brian Eastman',
    'Kenneth Hoversten',
    'David Short',
    'James Herrick',
    'Rick Anderson',
    'Mike Olson',
    'Dave Woods',
    'Mark Bloomquist',
    'Scott Monte',
    'Ron Reimer',
    'Rick Van Gomple',
    'Jeff Culp',
    'Ricky Chaddock',
    'Jeffrey Hagen',
    'Kirk Benson',
    'Bari Courts',
    'Stephen II	Reen',
    'Bob Cauley',
    'Adam Helgeson'
];

const tenors = [
    'Anthony Lapakko',
    'Randy Rogers',
    'David Dreyer',
    'James MacLean',
    'Kevin Huyck',
    'Ken Wentworth',
    'Dale Bieber',
    'Dick  Riemenschneider',
    'Poul-Erik Binderup',
    'Scot Brennecke',
    'Jeff Schulz',
    'Tyler Stromquist-LeVoir',
    'Nate Weimer',
    'Dominic Reen',
    'John Reen',
    'Charley Garrett',
    'Niel Johnson',
    'Mark Halverstadt'
];

const songs = [
    'This Could Be the Start of Something Big',
    'I\'ve Got the World On a String',
    'All the Things You Are',
    'Have a Little Talk with Myself',
    'All I Do is Dream of You',
    'I Wish You Love',
    'My Lady Loves to Dance',
    'Love Letters',
    'That Old Feeling',
    'Show Me Where the Good Times Are'
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

app.get('/counts', (req, res) => {
    res.send({
        basses: basses.length,
        leads: leads.length,
        baris: baris.length,
        tenors: tenors.length
    })
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
        song: getValue(songs, 0)
    };

    res.send(quartet);
});

app.use(express.static('public'));

app.listen(9000);
console.log('App started on port 9000...');