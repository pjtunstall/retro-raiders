// If using Go Live server on VS Code, use port number 5500.
// E.g. http://127.0.0.1:5500/
// Replace 127.0.0.1 with your IP address or localhost or 0.0.0.0.

// If using `python -m SimpleHTTPServer` or `python3 -m http.server`, port number 8000.

// Best played on full screen. Refresh page after making full screen.

// We recommend Chrome. Chrome will automatically switch to 80%, which is a good size.
// Safari can be used if you manually zoom out to 80%, then refresh. Unfortunately
// Firefox seems to have rounding errors in rescaling the sprites. They only look right
// at 100% zoom on Firefox, which is too big to fit my screen at least.

// Knowing what we know now, we'd make smaller images and ensure that the game container
// was a suitable size for all browsers at 100%.

// Game container and background variables.
const gameContainer = document.querySelector(".game-container");
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

let skyline = document.getElementById("skyline");
skyline.classList.add("london");
const credits = document.querySelector(".credits");
const title = document.querySelector(".title");

// State variables.
const statsBar = document.querySelector(".stats-bar");
let fadeOption = true;
let score = 0;
let incrementScore = false;
let lives = 3;
let level = 1;
let startTime = Date.now();
let timer = "00:00";
let isRenderingTimer = false;
let seconds = 0;
let minutes = 0;
let formattedMinutes = "00";
let formattedSeconds = "00";
let currentPage = 0;
let storyMode = false;
let isInCutScene = false;
let storyPart = "beginning";
let storyPageNumber = 0;
let storyEndInProgress = false;
let story = {
  beginning: [],
  ufoShot: [],
  londonSaved: [],
  playerShot: [],
  fireballEnding: [],
  aliensReachEarth: [],
};
story.beginning = [
  [
    `./24.jpg`,

    `The Emperor of Grumium,
that galactic buccaneer,
was on campaign in Orion Arm,
cut down in his thousandth year.

A faulty teleportation pad
left him in 64 bits,
strewn across Orion's belt,
jibbering and in fits.

Three warlike tribes he did unite,
Invaders one, two, three,
held together by fear and greed
and his personality.

His offspring fought till one was left,
a hatchling from the brood.
The only way to prove her power
was spilling yet more blood.

A babe in arms, but sharp and sly,
her rivals bit the dust.
They crowned her Emperess that day.
For conquest she did lust.

"Where shall we invade today?"
Her lip it slowly curled.
"Turn left at Barnard's Star," she said.
"I know a world."`,
  ],

  [
    `./28.jpg`,

    `"I know a world called Planet Earth
with little for defense.
A lone gunner guards their towns.
Let's teleport us hence."

"Let's teleport our tribes all three
and a Mystery Ship to boot.
Paris and New York will fall.
We'll divvy up the loot."

"Asteroids we'll ram off course
their cities for to wreck.
From off the starcharts let us wipe
that Pale Blue Speck."`,
  ],

  [
    `./26.jpg`,

    `You heard it in the street.
You heard it in the news.
You didn't believe at first,
but that was no excuse.

The politicians said keep calm.
Panicked they did meet.
Precious little help against
a rampaging alien fleet.

Quintuplet presidents discussed
the issue long and hard.
They squabbled, fought, and then they asked
Chat and Bing and Bard.

Those mutant clones decided then
on the counsel of such wise minds
to send out messengers far and wide
a hero for to find.

That summer morning, messengers came.
Messengers there were three.
"Leave your sheep and goats," they said,
"A gunner you must be."

"A gunner you must be for us,
defending PLanet Earth.
A plasma cannon you must steer
and shoot for all you're worth."`,
  ],
];

story.ufoShot = [
  [
    `./2b.jpg`,

    `A well-aimed shot, the Mystery Ship
explodes across the sky!
A cheer goes up from Planet Earth.
Perhaps they will not die.

Overjoyed, the presidential quints
award you points galore.
Those mutants promise you, if Earth wins,
fame, XP, and more.

The Invader generals, one, two, three,
meet in a foul mood.
This is a point of honour now.
It's a slight against their brood.

The generals of the alien force,
admirals one, two, three,
those monsters meet to plot their course,
to seal their victory.

New swarms appear, they will not rest
till Earth is all ablaze.
The human race must suffer now.
Its cities they will raze.

New swarms appear, they will not cease
till Earth is laid to waste
and a certain lone defender
his final end has faced.`,
  ],
];

story.londonSaved = [
  [
    `./4.jpg`,

    `One swarm destroyed, a glimpse of hope,
London's skies were free!
For a time it seemed the horde might leave,
but that was not to be.

For a while it seemed you'd won the day,
but that was premature talk.
Soon new swarms descended upon
Chicago and New York.

The alien lords were not dismayed.
They'd conquered worlds before.
If a planet proved too hard to take,
they'd just attack it more.

Their strategists devised a plan.
They were determined now.
On a certain lone defender
vengeance they did vow.`,
  ],
];

story.playerShot = [
  [
    `./25.jpg`,

    `The gunner's mother heard the knock,
three aliens at the door.
Not much to say to blunt that shock:
"Your hatchling is no more."

"A third and fatal blast he took.
Our plasma bolts struck home.
Accept this medal for his pluck
and a broodling of our own."

"Another a gift we'd like give
to help you out from hence,
as slaves to serve your every need:
your quintuplet presidents."

"Now we're the rulers of your world.
He didn't stand a chance.
To compensate you further, look!
We'll do our alien dance."

"Our dance we shall perform for you.
We flap our arms like so.
Your child was brave, we honour him.
We thought you'd like to know."`,
  ],
];

story.fireballEnding = [
  [
    `./0.jpg`,

    `The gunner's mother heard the knock,
three aliens at the door.
Not much to say to blunt that shock:
"Your hatchling is no more."

"A fireball took his life away.
For him, there's no tomorrow.
Please take a gift this tragic day
in token of our sorrow."

"Accept now, Mrs. Gunner, please,
since we've achieved our goal,
as consolation in your grief
this antique games console.

"A video game is always fun.
(He didn't stand a chance.)
To compensate you further now,
we'll do our alien dance."

"Our dance we shall perform for you.
We flap our arms like so.
Your child was brave, we honour him.
We thought you'd like to know."`,
  ],
];

story.aliensReachEarth = [
  [
    `./1.jpg`,

    `"O brave defender, gunner bold,
though human you are in form,
you've proved your worth, so take your place
in our invader swarm."

"Your worth you've shown, O earthling bold,
so join our conquering host.
Your world's a cinder, nothing left.
Of our offer make the most."

"You seas sublimed, the land ablaze,
there's notning left for thee.
If I were you, I'd gladly leap
at this opportunity."

An apprenticeship in space invading
we offer you this day.
Accept it now or perish too.
It is the only way.`,
  ],

  [
    `./11.jpg`,

    `So it was and so it went
and what could you do?
Now many years and light years hence,
your an Invader through and through.

So many worlds you've laid to waste
on a mercenary's pay.
Do you ever think of Planet Earth.
That is hard to say.

A rover, you, a treasure trover,
you keep the loot you find.
Alien wives, you have three,
one of each kind.

From Algol the Demon Star
to the shepherd moons of Hrao,
you're the last of Earth, you're one of the swarm.
You're freefalling now.

A retro raider, a space invader,
it's all the same to you.
Among laser blasts and plasma bolts,
you look out for your crew.`,
  ],

  [
    `./21.jpg`,

    `<i>From the Memoirs of Exaptia Tabbani, Ambassador of the Hmadian Macrostates, on concluding her negotiations with Emperor FnrRa Gfgfgg (II<sup>MXXIV</sup>-I)st, Lord of Orion, Grand Eskalir of Grumium, and Admiral of the High Reaches:</i>


Following my embassy to the barbarian emperor&mdash;Oh, I could hardly believe it, she'd walked right into my trap!&mdash;, as I walked back to my teleport pad, I happened upon a contingent of mercenaries, busy darning their space suits for the next invasion.

One caught my eye.

Crisscrossed with laser scars and plasma burns, it had a curious bilateral symmetry, and wore a breastplate in the Orion style, much like those of its comrades.

As I approached, it looked up and flapped its arms at me.`,
  ],

  [
    `./storyimage2.jpeg`,

    `I returned this traditional Invader salute and enquired, "Where are you from, sir?"

"Earth," it grunted.

"Earth Angiedi?"

"No, Earth Solis."

I looked blank.

"It's one of the Behenian Earths. Was. All burnt now."

A faraway look crossed the alien's face.

"You live as one of these barbarous rogues, raiding other planets?"

"It's a fine life," the mercenary grinned. "I have treasures aplenty, the spoils of half the galaxy and three alien wives. One of each kind."

"But you are a civilized being, sir. Are you not ashamed?"`,
  ],

  [
    `./7.jpg`,

    `"I have all the best spice, mister. I feel nothing."

I politely declined the smouldering baby-bone pipe it offered. It took a long drag and a glazed smile replaced the bitter look on its face. Its comrades cackled.

"Just look at yourself, sir! Think of what you've lost. This is no life. You'll be run through with a plasmic glaive or shot down sooner or later by a defender such as you once were. Did you not have a family on, what did you call it, Earth? What would your mother think to see you now?"

For the briefest moment, its face twisted with a wild-eyed look.

"What do you know about such things?" the mercenary muttered and a single tear dripped off its laser-scarred chin.`,
  ],

  [
    `./5.jpg`,

    `But it quickly took another long drag on the pipe and went back to patching its space suit.

Its comrades snickered and flapped their arms in empty glee.

So I left them there and trudged back to the teleport sheds.

A bad moon was rising.

I'd write up my notes on the needle ship on the way to the wormhole. With the alliances I'd arranged on my mission, and the false intelligence I'd shared with the Eskalir, it would not go well for the Grumian Empire. Such is the way of the High Reaches.`,
  ],

  [
    `./13.jpg`,

    `I sometimes wonder what became of that lone laser gunner from Earth. Almost certainly he was killed when the empire fell, shortly after my return.

Any chance he escaped? Not really. But who knows?

Maybe he found some way out through the chaos of all those years, got himself cloned, and founded a new Earth somewhere out in the quiet backwaters of Orion.

I like to think he did.`,
  ],
];

let scoreBoardPressAnyKey = document.querySelector(".press-any-key");
const storyEl = document.querySelector(".story-container");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");
let spaceKeyDown = false;
let resetInProgress = false;
let playerDeathInProgress = false;
let isScoreBoardShowing = false;
let isGameOver = false;
let gameOverDelay = 2500;
let gameOverTime;
let playerName = "";

const scores = [];
await getScores();

// Chapter titles.
const chapter = [
  "Truthy or Dare",
  "A Spoonful of Syntactic Sugar",
  "Djanko Undjanked",
  "Repo Man",
  "ASCII Not for Whom<br>the Bell Labs Toll",
  "Render Unto Caesar",
  "Layer Cake",
  "Not (Just) a Number",
  "String or Nothing",
  "Cold Console",
  "Terminal Velocity",
  "Winds Light to Variable",
  "Man of Constant Sorrow",
  "Sweet Sprites the Burthen Bear",
  "Gain of Function",
  "JSON and the Arguments",
  "Romanes eunt DOMus",
  "There's Node Business<br>Like Show Business",
  "That Asyncing Feeling",
  "To Summon His Array",
  "Regex Quandam, Regex Futurusque",
  "Snug as a Bug in a Rug",
  "Here We Go Loopy Loo",
  "Needle in a Callstack",
  "Burning Chrome",
  "It from Bit",
  "The Proton Prototype Chain",
  "ES6 Girl",
  "Promises, Promises",
  "Awaiting for Godot",
  "Web Workers of the World, Unite!",
  "R(est) I(n) P(arameters)",
  "None Shall Parse",
  "Adam and eval()",
  "Tupenny 'APIenny",
  "Bitwise and Pound Foolish",
  "Lookit, Log it, Lockett",
  "Nully the Element Packed Her Math.trunc<br>and ...Spread Goodbye to the Circus",
  "Lookbehind in Anger",
  "Home, Home on the Range Loop",
  "The Markup of the Beast",
];
let chapterNumber = Math.floor(chapter.length * Math.random());
title.innerHTML = `Chapter ${level}:<br>${chapter[chapterNumber]}`;

// Pause variables.
const pauseMenu = document.querySelector(".pause-menu");
let paused = false;
let pauseStartTime = 0;
let pauseOnStart = true;
let displayCredits = false;

// Game loop variables.
let loopID;
const fps = 60;
const frameDuration = 1000 / fps;
let lastTime = 0;
let accumulatedFrameTime = 0;

// Player variables.
const player = document.getElementById("player");
const playerWidth = 33;
const playerHeight = 33;
const playerStep = 256;
let playerDirection = 0;
let playerLeft = containerWidth / 2 - playerWidth / 2;
let playerTop = containerHeight - playerHeight;
player.style.top = playerTop + "px";
player.classList.add("life-1");

// Player bullet variables.
let playerBullet = document.createElement("div");
playerBullet.classList.add("player-bullet");
playerBullet.style.visibility = "hidden";
gameContainer.appendChild(playerBullet);
let playerBulletSpeedY = 1024;
let playerBulletSpeedX = 0;
let playerBulletTop = 0;
let playerBulletLeft = 0;
const playerBulletHeight = 12;
const playerBulletWidth = 3;
let playerBulletRemoveMe = false;
let newPlayerBullet = false;
let playerBulletOnScreen = false;

// Ufo variables.
const mysteryScore = [
  100, 50, 50, 100, 150, 100, 100, 50, 300, 100, 100, 100, 50, 150, 100, 50,
];
let ufoScorePointer = -1;
let ufoTimeUp = Date.now() + 20000 + Math.random() * 10000;
let ufoActive = false;
let ufoDirection;
let ufoHeight = 40;
let ufoWidth = 40;
let killUfo = false;
let removeUfo = false;
let ufoTop = 0;
let ufoToggleBeam = false;
let ufoGetPlayer = false;
let ufoTakenPlayer = false;
const ufo = document.createElement("div");
ufo.classList.add("ufo-container");
let ufoLeft;
ufo.style.top = "0px";
ufo.style.left = -16 * ufoWidth + "px";
const html = `
    <div id="ufo"class="ufo"></div>
    <div class="beam hidden"></div>
    `;
ufo.insertAdjacentHTML("beforeend", html);
let hasUfoBeenShot = false;

gameContainer.appendChild(ufo);
let ufoBeam = document.querySelector(".beam");
let ufoShip = document.querySelector(".ufo");
// Alien variables.
const aliens = document.getElementById("aliens");
const alienGridWidth = 11;
const alienGridHeight = 5;
const gap = parseFloat(getComputedStyle(aliens).gap);

let bottomRow = 4;
let lowestInColumn = Array(alienGridWidth).fill(alienGridHeight - 1);
let aliensGroundSensor = 320;

const computed = window.getComputedStyle(aliens);
const alienGridPixelWidth = parseFloat(
  computed.getPropertyValue("width").replace("px", "")
);
const alienGridPixelHeight = parseFloat(
  computed.getPropertyValue("height").replace("px", "")
);
const alienWidth = alienGridPixelWidth / alienGridWidth;
const alienHeight = alienGridPixelHeight / alienGridHeight;

const scale = 0.5;
const scaledHeight = scale * alienHeight;
const scaledWidth = scale * alienWidth;

let aliensRemaining = alienGridWidth * alienGridHeight;
let aliensToRemove = [];
const alienAlive = Array(alienGridHeight);
const alienElements = Array(alienGridHeight);
const alienTopInGrid = Array(alienGridHeight);
const alienLeftInGrid = Array(alienGridHeight);
for (let i = 0; i < alienGridHeight; i++) {
  alienAlive[i] = Array(alienGridWidth);
  alienElements[i] = Array(alienGridWidth);
  alienTopInGrid[i] = Array(alienGridWidth);
  alienLeftInGrid[i] = Array(alienGridWidth);
  for (let j = 0; j < alienGridWidth; j++) {
    alienAlive[i][j] = true;
    const alien = document.createElement("div");
    aliens.appendChild(alien);
    alienElements[i][j] = alien;
    alienTopInGrid[i][j] = i * alienHeight + (alienHeight - scaledHeight) / 2;
    alienLeftInGrid[i][j] = j * alienWidth + (alienWidth - scaledWidth) / 2;
  }
}

let alienAnimationDuration = 1;
let alienAnimationIncrement = 0.03;
let aliensDanceFaster = false;

let squids = [
  ...document.querySelectorAll(
    `.aliens-grid > div:nth-child(-n+${alienGridWidth})`
  ),
];
let crabs = [
  ...document.querySelectorAll(
    `.aliens-grid > div:nth-child(n+${alienGridWidth + 1}):nth-child(-n+${
      alienGridWidth * 3
    })`
  ),
];
let blobs = [
  ...document.querySelectorAll(
    `.aliens-grid > div:nth-child(n+${alienGridWidth * 3 + 1}):nth-child(-n+${
      alienGridWidth * 5
    })`
  ),
];

for (const squid of squids) {
  squid.classList.add("squid");
}

for (const crab of crabs) {
  crab.classList.add("crab");
}

for (const blob of blobs) {
  blob.classList.add("blob");
}

// // Testing dark level:

// for (const squid of squids) {
//   squid.classList.remove('alien-explosion');
//   squid.classList.remove('squid');
//   squid.classList.remove('squid-black');
//   if (level % 3 === 0) {
//     squid.classList.add('squid-black');
//   } else {
//     squid.classList.add('squid');
//   }
// }

// for (const crab of crabs) {
//   crab.classList.remove('alien-explosion');
//   crab.classList.remove('crab');
//   crab.classList.remove('black-black');
//   if (level % 3 === 0) {
//     crab.classList.add('crab-black');
//   } else {
//     crab.classList.add('crab');
//   }
// }

// for (const blob of blobs) {
//   blob.classList.remove('alien-explosion');
//   blob.classList.remove('blob');
//   blob.classList.remove('blob-black');
//   if (level % 3 === 0) {
//     blob.classList.add('blob-black');
//   } else {
//     blob.classList.add('blob');
//   }
// }

// // end test.

let aliensDirection = 1;
if (Math.random() < 0.5) {
  aliensDirection = -1;
}
const maxAlienSpeed = 512;
let startHeight = 40;
let aliensStep = startHeight + 100;
let aliensLeft = containerWidth / 2 - alienGridPixelWidth / 2;
let aliensTop = startHeight;
let insetLeft = 0;
let insetRight = 0;
let leftCol = 0;
let rightCol = 10;

// Alien bullet variables.
let alienBulletsArray = [];
let alienFireRate = 16;
let alienBulletDue = Date.now() + (5000 * Math.random()) / alienFireRate;
let maxAlienBullets = 16;
const bulletWidth = 10;
const bulletHeight = 30;

// Uncomment to test level parameters: background image and difficulty parameters,
// but not selection of alien types or choice or black vs white aliens.

// level = 5;
// startHeight = 60;
// aliensStep = 160;
// alienFireRate = 5;
// skyline.classList.add('berlin');

// level = 6;
// startHeight = 60;
// aliensStep = 160;
// alienFireRate = 6;
// skyline.classList.add('rome');

// level = 7;
// startHeight = 70;
// aliensStep = 170;
// alienFireRate = 7;
// skyline.classList.add('austin');

// level = 8;
// startHeight = 70;
// aliensStep = 170;
// alienFireRate = 8;
// skyline.classList.add('mountains');

// level = 9;
// startHeight = 80;
// aliensStep = 180;
// alienFireRate = 9;
// skyline.classList.add('wood');

// level = 10;
// startHeight = 40;
// aliensStep = 180;
// alienFireRate = 10;
// skyline.classList.add('forest');

let flashBrightness = 255;
let fades = Array.from({length: maxAlienBullets * 2}, () => ({
  duration: 2000,
  stage: 1,
}));
const startColor = Array(3).fill(flashBrightness);
const endColor = [0, 0, 0];
const backgroundColor = [0, 0, 0];
let quake = false;

function addFade(duration, stage) {
  let i = 0;
  while (fades[i].stage < 1) {
    i++;
  }
  if (i <= fades.length) {
    fades[i].stage = stage;
    fades[i].duration = duration;
    quake = true;
  }
}

// Barriers.

// Types and relative positions of blocks that make up a barrier.
const regularBarrier = [
  ["outerLeft", "square", "square", "outerRight"],
  ["square", "innerLeft", "innerRight", "square"],
  ["square", "empty", "empty", "square"],
];

const tentBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
  ["innerLeft", "empty", "empty", "innerRight"],
];

const towersBarrier = [
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
  ["outerRight", "empty", "empty", "outerLeft"],
];

const palmBarrier = [
  ["empty", "innerRight", "innerLeft", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const frownBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["outerLeft", "innerRight", "innerLeft", "outerRight"],
  ["square", "innerLeft", "innerRight", "square"],
];

const colosseumBarrier = [
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
];

const domeBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
  ["square", "empty", "empty", "square"],
];

const camelBarrier = [
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["square", "innerLeft", "innerRight", "square"],
  ["square", "empty", "empty", "square"],
];

const platformBarrier = [
  ["innerRight", "innerLeft", "innerRight", "innerLeft"],
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["square", "empty", "empty", "square"],
];

const boxTreeBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const pointsBarrier = [
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["square", "square", "square", "square"],
  ["innerRight", "innerLeft", "innerRight", "innerLeft"],
];

const templeBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
  ["outerRight", "outerLeft", "outerRight", "outerLeft"],
];

const partingBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerRight", "outerLeft", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const flagsBarrier = [
  ["innerRight", "empty", "empty", "innerLeft"],
  ["empty", "outerRight", "outerLeft", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const follyBarrier = [
  ["empty", "innerLeft", "innerRight", "empty"],
  ["empty", "outerRight", "outerLeft", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const awningBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "innerLeft", "innerRight", "empty"],
];

const finsBarrier = [
  ["outerRight", "outerRight", "outerLeft", "outerLeft"],
  ["square", "innerLeft", "innerRight", "square"],
  ["innerRight", "empty", "empty", "innerLeft"],
];

const dishesBarrier = [
  ["outerRight", "outerRight", "outerLeft", "outerLeft"],
  ["innerRight", "innerRight", "innerLeft", "innerLeft"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const armsBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
  ["outerRight", "innerRight", "innerLeft", "outerLeft"],
];

const hussarBarrier = [
  ["empty", "innerRight", "innerLeft", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "innerLeft", "innerRight", "empty"],
];

const twoserBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
];

const spearBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const treesBarrier = [
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["innerRight", "innerLeft", "innerRight", "innerLeft"],
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
];

const wingsBarrier = [
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["innerLeft", "square", "square", "innerRight"],
  ["empty", "innerLeft", "innerRight", "empty"],
];

const heartBarrier = [
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
  ["innerRight", "square", "square", "innerLeft"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const splitBarrier = [
  ["outerLeft", "empty", "empty", "outerRight"],
  ["innerRight", "empty", "empty", "innerLeft"],
  ["outerLeft", "empty", "empty", "outerRight"],
];

const porticoBarrier = [
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
  ["outerRight", "outerLeft", "outerRight", "outerLeft"],
  ["square", "square", "square", "square"],
];

const geodesicBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["outerLeft", "empty", "empty", "outerRight"],
  ["innerLeft", "innerRight", "innerLeft", "innerRight"],
];

const eagleBarrier = [
  ["innerRight", "outerRight", "outerLeft", "innerLeft"],
  ["empty", "square", "square", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const bridgeBarrier = [
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
  ["square", "empty", "empty", "square"],
  ["square", "empty", "empty", "square"],
];

const watchtowerBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "innerLeft", "innerRight", "empty"],
  ["empty", "innerLeft", "innerRight", "empty"],
];

const bushBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const pyramidBarrier = [
  ["empty", "innerLeft", "innerRight", "empty"],
  ["innerLeft", "empty", "empty", "innerRight"],
  ["innerLeft", "empty", "empty", "innerRight"],
];

const tiptoesBarrier = [
  ["empty", "outerRight", "outerLeft", "empty"],
  ["outerLeft", "innerRight", "innerLeft", "outerRight"],
  ["innerRight", "innerRight", "innerLeft", "innerLeft"],
];

const hillBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
  ["outerLeft", "square", "square", "outerRight"],
];

const hillockBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
];

const bunkerBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
];

const flowerBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "empty", "empty", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const pillboxBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "outerRight", "outerLeft", "empty"],
];

const butterflyBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "outerRight", "outerLeft", "empty"],
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
];

const twinPeaksBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "empty", "empty", "empty"],
  ["outerLeft", "outerRight", "outerLeft", "outerRight"],
];

const lowBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["outerLeft", "square", "square", "outerRight"],
  ["square", "empty", "empty", "square"],
];

const lowArchBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
  ["square", "empty", "empty", "square"],
];

const stiltBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "innerLeft", "innerRight", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
];

const turretBarrier = [
  ["empty", "outerLeft", "outerRight", "empty"],
  ["empty", "innerLeft", "innerRight", "empty"],
  ["empty", "square", "square", "empty"],
];

const hillPalmBarrier = [
  ["empty", "innerRight", "innerLeft", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
];

const pointBridgeBarrier = [
  ["outerLeft", "innerLeft", "innerRight", "outerRight"],
  ["square", "empty", "empty", "square"],
  ["innerLeft", "empty", "empty", "innerRight"],
];

const openHandedBarrier = [
  ["empty", "innerRight", "innerLeft", "empty"],
  ["innerRight", "outerLeft", "outerRight", "innerLeft"],
  ["square", "innerLeft", "innerRight", "square"],
];

const chaliceBarrier = [
  ["empty", "empty", "empty", "empty"],
  ["empty", "innerRight", "innerLeft", "empty"],
  ["empty", "outerLeft", "outerRight", "empty"],
];

const handsUpBarrier = [
  ["outerLeft", "empty", "empty", "outerRight"],
  ["innerRight", "outerLeft", "outerRight", "innerLeft"],
  ["empty", "square", "square", "empty"],
];

const mushroomBarrier = [
  ["outerLeft", "innerRight", "innerLeft", "outerRight"],
  ["innerRight", "outerRight", "outerLeft", "innerLeft"],
  ["empty", "square", "square", "empty"],
];

const towerBridgeBarrier = [
  ["square", "empty", "empty", "square"],
  ["square", "innerLeft", "innerRight", "square"],
  ["square", "empty", "empty", "square"],
];

const openBridgeBarrier = [
  ["outerLeft", "empty", "empty", "outerRight"],
  ["square", "innerLeft", "innerRight", "square"],
  ["square", "empty", "empty", "square"],
];

const barrierList = [
  regularBarrier,
  tentBarrier,
  towersBarrier,
  palmBarrier,
  frownBarrier,
  colosseumBarrier,
  domeBarrier,
  camelBarrier,
  platformBarrier,
  mushroomBarrier,
  pointsBarrier,
  templeBarrier,
  partingBarrier,
  flagsBarrier,
  follyBarrier,
  awningBarrier,
  finsBarrier,
  dishesBarrier,
  armsBarrier,
  hussarBarrier,
  twoserBarrier,
  spearBarrier,
  treesBarrier,
  wingsBarrier,
  heartBarrier,
  splitBarrier,
  porticoBarrier,
  geodesicBarrier,
  eagleBarrier,
  bridgeBarrier,
  watchtowerBarrier,
  bushBarrier,
  pyramidBarrier,
  tiptoesBarrier,
  hillBarrier,
  hillockBarrier,
  bunkerBarrier,
  flowerBarrier,
  pillboxBarrier,
  butterflyBarrier,
  twinPeaksBarrier,
  lowBarrier,
  lowArchBarrier,
  stiltBarrier,
  turretBarrier,
  hillPalmBarrier,
  pointBridgeBarrier,
  openHandedBarrier,
  chaliceBarrier,
  handsUpBarrier,
  boxTreeBarrier,
  towerBridgeBarrier,
  openBridgeBarrier,
];

let blockType;

// blockX stores the horizontal position of each block in the barriers spritesheet, i.e.
// the location of the left edge of block, measured in pixels from the right of the image.
// The 4 numbers for each block represent the 4 stages of damage. For example, square[0]
// is the undamaged square block while square[3] the is the most severely damaged version
// of the square block when one more hit will destroy it.
const blockX = {
  innerRight: [192, 144, 96, 48],
  outerRight: [384, 336, 288, 240],
  innerLeft: [576, 528, 480, 432],
  outerLeft: [768, 720, 672, 624],
  square: [960, 912, 864, 816],
};

// barriers[k][i][j] is a number representing the number of hits taken by the block on row i,
// column j of barier k. In other words, the amount of damage it's sustained.
const barriers = new Array(4);
const barrierGrids = new Array(4);
const barrierTop = containerHeight - 185;

let blocks;
let blocksToChange = [];
const blockLeft = new Array(48);
const blockTop = new Array(48);
const blockVis = new Array(48);

function resetBarriers() {
  // A barrier type is chosen at random each level apart from the first
  // and after the state variables are reset after every 10th level, in
  // other words, when level % 10 === 1.
  if (level - (1 % 10) === 0) {
    blockType = regularBarrier;
  } else {
    const rand = Math.floor(Math.random() * barrierList.length);
    blockType = barrierList[rand];
  }

  for (let k = 0; k < 4; k++) {
    barrierGrids[k] = document.createElement("div");
    barrierGrids[k].classList.add("barrier");
    barrierGrids[k].style.left = (k + 1) * (containerWidth / 5) - 96 + "px";
    barrierGrids[k].style.top = barrierTop + "px";
    gameContainer.appendChild(barrierGrids[k]);
    barriers[k] = new Array(3);
    for (let i = 0; i < 3; i++) {
      barriers[k][i] = new Array(4);
      for (let j = 0; j < 4; j++) {
        barriers[k][i][j] = 0;
        const block = document.createElement("div");
        block.classList.add("block");
        barrierGrids[k].appendChild(block);
        if (blockType[i][j] !== "empty") {
          block.style.backgroundPositionX =
            blockX[blockType[i][j]][barriers[k][i][j]] + "px";
        } else {
          block.style.backgroundPositionX = "960px";
          block.style.visibility = "hidden";
        }
      }
    }
  }
  blocks = [...document.querySelectorAll(".block")];
  for (const i in blocks) {
    const parent = blocks[i].offsetParent;
    blockLeft[i] = blocks[i].offsetLeft + parent.offsetLeft;
    blockTop[i] = blocks[i].offsetTop + parent.offsetTop;
    const t = i % 12;
    const r = Math.floor(t / 4);
    const c = t % 4;
    if (blockType[r][c] === "empty") {
      blockVis[i] = false;
    } else {
      blockVis[i] = true;
    }
  }
}

resetBarriers();

// Music.
const audioContext = new AudioContext();
let source;
let musicInterval;

// Parameters governing how the music gets faster.
const speedIncreaseAmount = 0.08;
let pausedPlaybackRate = 1;
let pausedTime = 0;
let musicStartTime = 0;

async function loadAndPlayMusic() {
  try {
    const musicFile = "Space_Invaders_Music.ogg.mp3";
    const response = await fetch(musicFile);
    const buffer = await response.arrayBuffer();
    const musicBuffer = await audioContext.decodeAudioData(buffer);

    source = audioContext.createBufferSource();
    source.buffer = musicBuffer;
    source.loop = true;
    source.playbackRate.value = 1;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error("Error loading and playing music:", error);
  }
}

function waitForKeyPress() {
  return new Promise((resolve) => {
    function handleKeyPress(event) {
      resolve();
      document.removeEventListener("keydown", handleKeyPress);
    }

    document.addEventListener("keydown", handleKeyPress);
  });
}

async function startProgram() {
  await waitForKeyPress();
  loadAndPlayMusic();
}

startProgram();

// Sound effects.
const shootEffect = new Audio("LaserBlastQuick PE1095107.mp3");
const laserShot = new Audio("Laser-Shot-1.mp3");
const hull = new Audio("Hull-Breach-4.mp3");
const voltage = new Audio("Mad-Voltage.mp3");
const scream = new Audio("Scream-Short-C2-www.fesliyanstudios.com.mp3");
const wood = new Audio("WoodCrashesDistant FS022705.mp3");
const rock = new Audio("rock-destroy-6409.mp3");
rock.volume = 0.5;
const bomb = new Audio("bomb.mp3");
const kaboom = new Audio("kaboom.wav");
const mortar = new Audio("mortar cannon explosion.wav");
const explode1 = new Audio("explode1.wav");
const Explosion1 = new Audio("Explosion1.wav");
const Explosion2 = new Audio("Explosion2.wav");
const damage = new Audio("damage.wav");
const LEXPLODE = new Audio("LEXPLODE.wav");
const blk = new Audio("blkfoot4.wav");

// const sfxArray = [
//   shootEffect, laserShot, hull, voltage, scream, wood, rock,
//   bomb, kaboom, mortar, explode1, Explosion1, Explosion2, damage, LEXPLODE, blk
// ];

const wind = new Audio("wind.mp3");
wind.loop = true;

// Effects for when alien bullets reach the ground. r is a random number. When r < 0.01,
// the 'bullet' is actually a fireball. 'kaboom' is an especially big, long explosion.
// The flash in this case has an extra long fade.
let fireballPresent = false;
function playBombEffect(bullet) {
  let soundEffect;
  if (bullet.type === "fireball") {
    setTimeout(() => {
      fireballPresent = false;
    }, 6000);
    soundEffect = kaboom;
  } else if (bullet.r < 0.2) {
    soundEffect = bomb;
  } else if (bullet.r < 0.3) {
    soundEffect = mortar;
  } else if (bullet.r < 0.4) {
    soundEffect = explode1;
  } else if (bullet.r < 0.5) {
    soundEffect = damage;
  } else if (bullet.r < 0.6) {
    soundEffect = LEXPLODE;
  } else if (bullet.r < 0.7) {
    soundEffect = blk;
  } else if (bullet.r < 0.8) {
    soundEffect = Explosion2;
  } else {
    soundEffect = Explosion1;
  }
  soundEffect.play();
  if (fadeOption) {
    if (bullet.type === "fireball") {
      addFade(2000 + 3000 * bullet.r, 0);
    } else {
      addFade(2024 * bullet.r, bullet.r);
    }
  }
}

// Even though only one player bullet can be on screen at a time, player fire rate is throttled
// so that when you shoot a barrier from directly beneath, it doesn't instantly destroy the
// barrier.
function throttle(callback, delay) {
  let previousTime = 0;
  return function () {
    const currentTime = new Date().getTime();
    if (currentTime - previousTime > delay) {
      previousTime = currentTime;
      callback.apply(this, arguments);
    }
  };
}

function turnPage() {
  storyPageNumber++;
  if (storyPageNumber >= story[storyPart].length) {
    unCutScene();
    if (storyPart === "londonSaved") {
      reset(false);
    }
  } else {
    renderStory(story[storyPart][storyPageNumber]);
  }
}

function newGame() {
  if (displayCredits) {
    toggleCreditsThrottled();
  }
  togglePause();
  reset(true);
}

function togglePause() {
  paused = !paused;
  if (paused) {
    pauseStartTime = Date.now();
    if (ufoActive) {
      voltage.pause();
    }
    wind.play();
    pausedPlaybackRate = source.playbackRate.value;
    pausedTime = audioContext.currentTime - musicStartTime;
    source.playbackRate.setValueAtTime(0, audioContext.currentTime);
    audioContext.suspend();
    pauseMenu.style.visibility = "visible";
    if (resetInProgress) {
      title.style.backgroundColor = "rgba(0, 0, 0, 1);";
    } else {
      title.style.backgroundColor = "rgba(0, 0, 0, 0.7);";
    }
    title.style.visibility = "visible";
  } else {
    pauseMenu.style.visibility = "hidden";
    title.style.visibility = "hidden";
    wind.pause();
    if (resetInProgress) {
      pauseStartTime = Date.now();
      pausedTime = audioContext.currentTime - musicStartTime;
    }
    startTime += Date.now() - pauseStartTime;
    ufoTimeUp = ufoTimeUp = Date.now() + 20000 + Math.random() * 10000;
    if (ufoActive) {
      voltage.play();
    }
    audioContext.resume().then(() => {
      source.playbackRate.setValueAtTime(
        pausedPlaybackRate,
        audioContext.currentTime
      );
      musicStartTime = audioContext.currentTime - pausedTime;
      if (resetInProgress && source.playbackRate) {
        source.playbackRate.value = 1;
      }
    });
    resetInProgress = false;
  }
}

function toggleFlashEffect() {
  fadeOption = !fadeOption;
  if (!fadeOption) {
    quake = false;
  }
  gameContainer.style.backgroundColor = fadeOption
    ? "black"
    : "rgb(32, 32, 32)";
}

function toggleCredits() {
  displayCredits = !displayCredits;
  if (displayCredits) {
    credits.style.visibility = "visible";
    title.style.visibility = "hidden";
  } else {
    credits.style.visibility = "hidden";
    title.style.visibility = "visible";
  }
}

const toggleCreditsThrottled = throttle(toggleCredits, 256);
const toggleFlashEffectThrottled = throttle(toggleFlashEffect, 256);
const togglePauseThrottled = throttle(togglePause, 256);
const firePlayerBulletThrottled = throttle(firePlayerBullet, 128);
const newGameThrottled = throttle(newGame, 256);
const turnPageThrottled = throttle(turnPage, 512);

function fireAlienBullet(col) {
  if (resetInProgress) {
    return;
  }
  laserShot.time = 0;
  laserShot.play();
  if (alienFireRate < 16) {
    alienFireRate += 0.03 * level;
  }
  const newAlienBullet = document.createElement("div");
  let r = Math.random();
  let type;
  newAlienBullet.classList.add("alien-bullet");
  const bulletX = aliensLeft + (alienWidth + gap) * (col + 0.5);
  let bulletY =
    aliensTop + alienHeight * (lowestInColumn[col] + 1) - scaledHeight / 2;
  if (r < 0.01 && !fireballPresent) {
    fireballPresent = true;
    newAlienBullet.classList.add("fireball");
    type = "fireball";
    bulletY = -32;
  } else if (r < 0.3) {
    newAlienBullet.classList.add("lightning");
    type = "lightning";
  } else {
    newAlienBullet.classList.add("cross");
    type = "cross";
  }
  newAlienBullet.style.width = bulletWidth;
  newAlienBullet.style.height = bulletHeight;
  newAlienBullet.style.left = `${bulletX}px`;
  newAlienBullet.style.top = `${bulletY}px`;

  gameContainer.appendChild(newAlienBullet);

  const bulletSpeedY = 300 + 360 * Math.random() * r;

  alienBulletsArray.push({
    element: newAlienBullet,
    type: type,
    speed: bulletSpeedY,
    top: bulletY,
    left: bulletX,
    r: r,
    removeMe: false,
  });
}

function launchUfo() {
  if (ufoActive) {
    return;
  }
  voltage.currentTime = 0;
  voltage.play();
  ufoActive = true;
  ufoScorePointer++;
  if (ufoScorePointer > 15) {
    ufoScorePointer = 0;
  }
  if (Math.random() < 0.5) {
    ufoDirection = 1;
    ufoLeft = -ufoWidth;
  } else {
    ufoDirection = -1;
    ufoLeft = containerWidth;
  }
  ufo.style.left = ufoLeft + "px";
}

const hiddenElementsOnBeam = () => {
  aliens.style.opacity = 0;
  barrierGrids.forEach((el) => (el.style.opacity = 0));
  alienBulletsArray.forEach((el) => (el.element.style.visibility = "visible"));
  playerBullet.style.opacity = 0;
};

const showElementsOnBeam = () => {
  aliens.style.opacity = 1;
  barrierGrids.forEach((el) => (el.style.opacity = 1));
  alienBulletsArray.forEach((el) => (el.element.style.visibility = "hidden"));
  playerBullet.style.opacity = 1;
};

function reset(restart) {
  if (resetInProgress) {
    return;
  }
  resetInProgress = true;

  if (restart) {
    level = 1;
    lives = 3;
    score = 0;
  }

  chapterNumber++;
  if (chapterNumber >= chapter.length) {
    chapterNumber = 0;
  }
  title.innerHTML = `Chapter ${level}:<br>${chapter[chapterNumber]}`;

  showElementsOnBeam();
  ufoGetPlayer = false;
  ufoToggleBeam = false;
  ufoTakenPlayer = false;
  scoreBoardPressAnyKey.classList.add("hidden");
  player.classList.remove("player-beam");
  source.playbackRate.value = 1;
  currentPage = 0;

  // To deal with the possibility that the player is hit by an alien bullet while
  // the last alien is still exploding.
  if (player.classList.contains("explosion")) {
    restart = true;
  }

  document.removeEventListener("keydown", handleKeyDown);
  spaceKeyDown = false;

  ufoLeft = -2 * ufoWidth;
  ufo.style.left = ufoLeft;

  const alienBullets = document.querySelectorAll(".alien-bullet");
  alienBullets.forEach((alienBullet) => alienBullet.remove());
  alienBulletsArray = [];

  playerBullet.style.visibility = "hidden";
  playerBulletOnScreen = false;

  const barrierElements = document.querySelectorAll(".barrier");
  barrierElements.forEach((barrierElement) => barrierElement.remove());

  setTimeout(() => {
    if (restart) {
      if (storyMode) {
        // Restore story option on pause menu if we were previously in story mode.
        pauseMenu.innerHTML = "";
        pauseMenu.insertAdjacentHTML(
          "beforeend",
          `<div><span id="n">[N]ew game</span></div>
          <div><span id="c">[C]redits</span></div>
          <div><span id="f">[F]lash effect toggle</span></div>
          <div><span id="a">[ANY OTHER KEY] to continue</span></div>
          <div><span id="s">[S]tory</span></div>`
        );
      }
      storyMode = false;
      hasUfoBeenShot = false;
      level = 1;
      lives = 3;
      score = 0;
      startHeight = 40;
      skyline.classList.remove(
        "chicago",
        "nyc",
        "paris",
        "berlin",
        "rome",
        "austin",
        "mountains",
        "wood",
        "forest"
      );
      playerLeft = containerWidth / 2 - playerWidth / 2;
      startTime = Date.now();
      scoreElement.textContent = `${score}`.padStart(5, "0");
      updateTimer();
      renderTimer();
    } else {
      if (level % 2 === 1) {
        startHeight += 20;
      }
    }

    if (!storyMode || level !== 2) {
      togglePauseThrottled();
    }

    levelElement.textContent = level;
    aliensStep = startHeight + 100;
    if (lives < 3) {
      lives++;
    }
    const lifeCounter = document.querySelectorAll(".life");
    for (let i = 0; i < 3; i++) {
      if (i < lives) {
        lifeCounter[i].style.visibility = "visible";
      } else {
        lifeCounter[i].style.visibility = "hidden";
      }
    }

    source.playbackRate.value = 1;

    aliensRemaining = alienGridHeight * alienGridWidth;
    alienFireRate = level;

    alienAnimationDuration = 1;
    aliensToRemove = [];

    aliensLeft = containerWidth / 2 - alienGridPixelWidth / 2;
    aliensTop = startHeight;
    insetLeft = 0;
    insetRight = 0;
    aliensGroundSensor = 320;
    bottomRow = 4;
    leftCol = 0;
    rightCol = 10;
    lastTime = 0;
    playerDirection = 0;
    if (Math.random() < 0.5) {
      aliensDirection = -1;
    } else {
      aliensDirection = 1;
    }

    squids = [];
    crabs = [];
    blobs = [];

    // On restart or after 10 etc. levels, removes and re-appends the aliens so
    // that they will be in sync (i.e. in phase). Otherwise, just removes the
    // alien-type classes and restores visibility.
    for (let row = 0; row < alienGridHeight; row++) {
      for (let col = 0; col < alienGridWidth; col++) {
        alienAlive[row][col] = true;
        let alien = alienElements[row][col];
        if (level % 10 === 1) {
          alien.remove();
          alien = document.createElement("div");
          aliens.appendChild(alien);
          alienElements[row][col] = alien;
        } else {
          alien.style.animation = "";
          alien.classList.remove(
            "alien-explosion",
            "squid",
            "squid-black",
            "crab",
            "crab-black",
            "blob",
            "blob-black"
          );
          alien.style.visibility = "visible";
        }
        const alienChoice = Math.floor(3 * Math.random());
        if (level % 5 === 1) {
          if (row === 0) {
            squids.push(alien);
          } else if (row < 3) {
            crabs.push(alien);
          } else {
            blobs.push(alien);
          }
        } else {
          switch (alienChoice) {
            case 0:
              squids.push(alien);
              break;
            case 1:
              crabs.push(alien);
              break;
            case 2:
              blobs.push(alien);
              break;
          }
        }
      }
    }

    for (const squid of squids) {
      if (
        level % 5 === 4 ||
        (level % 5 === 3 && Math.floor(3 * Math.random()) === 0)
      ) {
        squid.classList.add("squid-black");
      } else {
        squid.classList.add("squid");
      }
    }

    for (const crab of crabs) {
      if (
        level % 5 === 4 ||
        (level % 5 === 4 && Math.floor(3 * Math.random()) === 0)
      ) {
        crab.classList.add("crab-black");
      } else {
        crab.classList.add("crab");
      }
    }

    for (const blob of blobs) {
      if (
        level % 5 === 4 ||
        (level % 5 === 3 && Math.floor(3 * Math.random()) === 0)
      ) {
        blob.classList.add("blob-black");
      } else {
        blob.classList.add("blob");
      }
    }

    lowestInColumn = Array(alienGridWidth).fill(alienGridHeight - 1);

    resetBarriers();

    fades = Array.from({length: maxAlienBullets * 2}, () => ({
      duration: 2000,
      stage: 1,
    }));

    switch (level - (1 % 10)) {
      case 0:
        skyline.classList.remove("forest");
        skyline.classList.add("london");
        break;
      case 1:
        skyline.classList.remove("london");
        skyline.classList.add("chicago");
        break;
      case 2:
        skyline.classList.remove("chicago");
        skyline.classList.add("nyc");
        break;
      case 3:
        skyline.classList.remove("nyc");
        skyline.classList.add("paris");
        break;
      case 4:
        skyline.classList.remove("paris");
        skyline.classList.add("berlin");
        break;
      case 5:
        skyline.classList.remove("berlin");
        skyline.classList.add("rome");
        break;
      case 6:
        skyline.classList.remove("rome");
        skyline.classList.add("austin");
        break;
      case 7:
        skyline.classList.remove("austin");
        skyline.classList.add("mountains");
        break;
      case 8:
        skyline.classList.remove("mountains");
        skyline.classList.add("wood");
        break;
      case 9:
        skyline.classList.remove("wood");
        skyline.classList.add("forest");
        break;
    }

    player.classList.remove("explosion");
    for (let i = 1; i < 4; i++) {
      player.classList.remove(`life-${4 - i}`);
    }
    player.classList.add(`life-${4 - lives}`);
    render();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }, 128);
}

function updateTimer() {
  if (ufoToggleBeam || ufoGetPlayer || ufoTakenPlayer) {
    return;
  }
  if (Date.now() - startTime > 3600000) {
    startTime = Date.now();
  }
  const time = Math.round((Date.now() - startTime) / 1000);
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  formattedMinutes = String(minutes).padStart(2, "0");
  formattedSeconds = String(seconds).padStart(2, "0");
  timer = formattedMinutes + ":" + formattedSeconds;
}

const worker = new Worker("worker.js");

function update(frameDuration) {
  // Update fades.
  if (fadeOption) {
    let brightest = 1;
    let fadesCount = fades.length;
    for (let i = 0; i < fades.length; i++) {
      if (fades[i].stage < 1) {
        fades[i].stage += frameDuration / fades[i].duration;
        if (fades[i].stage < brightest) {
          brightest = fades[i].stage;
        }
      } else {
        fades[i].stage = 1;
        fadesCount--;
      }
    }
    if (fadesCount === 0) {
      quake = false;
    }
    for (let i = 0; i < 3; i++) {
      backgroundColor[i] = startColor[0] * (1 - brightest);
    }
  }
  if (
    ufoGetPlayer &&
    (ufoLeft < -ufoWidth - 8 || ufoLeft > containerWidth + 8)
  ) {
    ufoToggleBeam = false;
    ufoGetPlayer = false;
    ufoTakenPlayer = false;
    playerDeath(true);
  }

  if (!ufoGetPlayer) {
    // Update player position.
    worker.postMessage({
      resetInProgress: resetInProgress,
      frameDuration: frameDuration,
      level: level,
      player: {
        left: playerLeft,
        step: playerStep,
        direction: playerDirection,
        bullet: {
          isOnScreen: playerBulletOnScreen,
          top: playerBulletTop,
          speedY: playerBulletSpeedY,
        },
      },
      aliens: {
        remaining: aliensRemaining,
        top: aliensTop,
        left: aliensLeft,
        step: aliensStep,
        groundSensor: aliensGroundSensor,
        insetLeft: insetLeft,
        insetRight: insetRight - 60,
        direction: aliensDirection,
      },
    });
    worker.onmessage = function (event) {
      playerLeft = event.data.player.left;
      // playerBulletTop = event.data.player.bullet.top;
      if (event.data.player.dead) {
        if (storyMode) {
          audioContext.suspend();
          hiddenElementsOnBeam();
          ufoGetPlayer = true;
          if (!ufoActive) {
            launchUfo();
          } else {
            if (ufoLeft + ufoWidth / 2 <= playerLeft + playerWidth) {
              ufoDirection = 1;
            } else {
              ufoDirection = -1;
            }
          }
        } else {
          playerDeath(true);
        }
      }
      aliensTop = event.data.aliens.top;
      aliensLeft = event.data.aliens.left;
      aliensStep = event.data.aliens.step;
      aliensDirection = event.data.aliens.direction;
    };

    // Move player bullet.
    if (playerBulletOnScreen) {
      playerBulletTop -= (playerBulletSpeedY * frameDuration) / 1000;
      playerBulletCollisions();
    }

    // Move alien bullets and check for collision with barriers or player or ground.
    for (const bullet of alienBulletsArray) {
      if (ufoGetPlayer) break;
      bullet.top += (bullet.speed * frameDuration) / 1000;
      if (
        bullet.type === "fireball" &&
        bullet.top + 64 >= playerTop &&
        bullet.left + 16 >= playerLeft &&
        bullet.left <= playerLeft + playerWidth
      ) {
        bullet.removeMe = true;
        lives = 1;
        player.className = "player";
        playerDeath(false, true);
        break;
      } else if (
        bullet.top + bulletHeight >= playerTop &&
        bullet.left + bulletWidth >= playerLeft &&
        bullet.left <= playerLeft + playerWidth
      ) {
        playerDeath(false);
        bullet.removeMe = true;

        break;
      } else if (bullet.top + bulletHeight > containerHeight) {
        bullet.removeMe = true;
        bullet.groundHit = true;
        break;
      }
      if (bullet.top + bulletHeight > barrierTop) {
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];
          if (
            bullet.top + bulletHeight >= blockTop[i] &&
            bullet.left + bulletWidth >= blockLeft[i] &&
            bullet.left <= blockLeft[i] + 48 &&
            blockVis[i] === true
          ) {
            const barrierNumber = Math.floor(i / 12);
            const h = i % 12;
            const rowNumber = Math.floor(h / 4);
            const colNumber = h % 4;
            barriers[barrierNumber][rowNumber][colNumber]++;
            let removeMe = false;
            if (
              bullet.type === "fireball" ||
              barriers[barrierNumber][rowNumber][colNumber] > 3
            ) {
              blockVis[i] = false;
              removeMe = true;
            }
            blocksToChange.push({
              block: block,
              rowNumber: rowNumber,
              colNumber: colNumber,
              barrierNumber: barrierNumber,
              removeMe: removeMe,
              changed: false,
            });
            if (bullet.type !== "fireball") {
              bullet.removeMe = true;
              break;
            }
          }
        }
      }
    }

    // Fire player bullets.
    if (spaceKeyDown && !playerBulletOnScreen) {
      firePlayerBulletThrottled();
    }

    // Launch UFO.
    if (Date.now() > ufoTimeUp) {
      launchUfo();
    }
  }

  ufoToggleBeam =
    (ufoDirection === 1 &&
      ufoLeft + ufoWidth / 2 < playerLeft + playerWidth / 2) ||
    (ufoDirection === -1 &&
      ufoLeft + ufoWidth / 2 > playerLeft + playerWidth / 2);

  if (!ufoToggleBeam && ufoGetPlayer && !ufoTakenPlayer) {
    ufoLeft = playerLeft + playerWidth / 2 - ufoWidth / 2;
  }

  // if (this.active && this.toggoleBeam && this.gettingPlayer) {
  // Move UFO.
  if (ufoActive && ufoToggleBeam && ufoGetPlayer) {
    ufoLeft += (ufoDirection * frameDuration) / 5;
  } else if (ufoActive && (!ufoGetPlayer || ufoTakenPlayer)) {
    ufoLeft += (ufoDirection * frameDuration) / 5;
  }

  if (ufoActive && (ufoLeft < -ufoWidth - 8 || ufoLeft > containerWidth + 8)) {
    removeUfo = true;
    ufoTimeUp = Date.now() + 20000 + Math.random() * 10000;
  }
}

function playerDeath(final, fireball) {
  if (playerDeathInProgress) {
    return;
  }
  playerDeathInProgress = true;
  player.classList.remove(`life-${4 - lives}`);
  scream.currentTime = 0;
  scream.play();
  lives--;
  const lifeCounter = document.querySelectorAll(".life");
  for (let i = 0; i < 3; i++) {
    if (i < lives) {
      lifeCounter[i].style.visibility = "visible";
    } else {
      lifeCounter[i].style.visibility = "hidden";
    }
  }
  if (lives < 1) {
    player.classList.add("explosion");
    console.log(player.classList);
  }
  if (final || lives < 1) {
    source.playbackRate.value = 1;
    for (let i = 0; i < 3; i++) {
      lifeCounter[i].style.visibility = "hidden";
    }
    playerDirection = 0;
    isGameOver = true;
    setTimeout(() => {
      player.classList.remove("explosion");
      if (storyMode) {
        storyPart = final ? "aliensReachEarth" : "playerShot";
        if (fireball) {
          storyPart = "fireballEnding";
        }
        cutScene();
        storyPageNumber = -1;
        turnPageThrottled();
        storyEndInProgress = true;
      } else {
        updatesGameOver();
      }
    }, 360);
  } else {
    player.classList.add(`life-${4 - lives}`);
  }
  playerDeathInProgress = false;
}

function renderTimer() {
  timerElement.textContent = formattedMinutes + ":" + formattedSeconds;
  isRenderingTimer = false;
}

function renderTimerThrottled() {
  if (isRenderingTimer) {
    return;
  }
  isRenderingTimer = true;
  setTimeout(renderTimer, 900);
}

function render() {
  // Turn off rendering while changes are being prepared/queued. Look at the end of render()
  // to see how rendering is switched back on and a complete repaint triggered to update the DOM with
  // all the changes specified while rendering was switched off. In other words, these changes to the
  // DOM are batched.
  document.documentElement.style.display = "none";

  if (incrementScore) {
    scoreElement.textContent = `${score}`.padStart(5, "0");
    incrementScore = false;
  }

  if (!paused) {
    renderTimerThrottled();
  }

  if (quake) {
    const randomX = Math.floor(Math.random() * 10) - 10;
    const randomY = Math.floor(Math.random() * 10) - 5;
    skyline.style.left = randomX + "px";
    skyline.style.top = randomY + "px";
  }

  if (fadeOption) {
    const colorString = `rgb(${backgroundColor.join(", ")})`;
    gameContainer.style.backgroundColor = colorString;
  }

  player.style.left = playerLeft + "px";

  aliens.style.left = aliensLeft + "px";
  aliens.style.top = aliensTop + "px";

  for (const poorDoomedAlien of aliensToRemove) {
    alienElements[poorDoomedAlien.row][poorDoomedAlien.col].classList.remove(
      "squid",
      "squid-black",
      "crab",
      "crab-black",
      "blob",
      "blob-black"
    );
    alienElements[poorDoomedAlien.row][poorDoomedAlien.col].classList.add(
      "alien-explosion"
    );
    alienElements[poorDoomedAlien.row][poorDoomedAlien.col].style.animation =
      "";
    hull.currentTime = 0;
    hull.play();
    setTimeout(function () {
      alienElements[poorDoomedAlien.row][poorDoomedAlien.col].classList.remove(
        "alien-explosion"
      );
      alienElements[poorDoomedAlien.row][poorDoomedAlien.col].style.visibility =
        "hidden";
      if (poorDoomedAlien.isLastOne) {
        if (storyMode && level === 2) {
          storyPart = "londonSaved";
          source.playbackRate.value = 1;
          cutScene();
          renderStory(story.londonSaved[0]);
          storyPageNumber = 0;
        } else {
          console.log("poorDoomedAlien");
          reset(false);
        }
      }
    }, 180);
  }
  aliensToRemove = [];

  if (aliensDanceFaster) {
    for (const squid of squids) {
      if (squid.classList.contains("squid")) {
        squid.style.animation = `squidAnimation ${alienAnimationDuration}s infinite steps(2)`;
      } else if (squid.classList.contains("squid-black")) {
        squid.style.animation = `squidBlackAnimation ${alienAnimationDuration}s infinite steps(2)`;
      }
    }
    for (const crab of crabs) {
      if (crab.classList.contains("crab")) {
        crab.style.animation = `crabAnimation ${alienAnimationDuration}s infinite steps(2)`;
      } else if (crab.classList.contains("crab-black")) {
        crab.style.animation = `crabBlackAnimation ${alienAnimationDuration}s infinite steps(2)`;
      }
    }
    for (const blob of blobs) {
      if (blob.classList.contains("blob")) {
        blob.style.animation = `blobAnimation ${
          0.5 * alienAnimationDuration
        }s infinite steps(1)`;
      } else if (blob.classList.contains("blob-black")) {
        blob.style.animation = `blobBlackAnimation ${
          0.5 * alienAnimationDuration
        }s infinite steps(1)`;
      }
    }
    aliensDanceFaster = false;
  }

  if (ufoActive) {
    ufo.style.left = ufoLeft + "px";
    if (killUfo) {
      voltage.pause();
      killUfo = false;
      ufoShip.classList.add("ufo-explosion");
      gameContainer.classList.add("fade-red");
      setTimeout(() => {
        ufoActive = false;
        ufo.style.left = -16 * ufoWidth + "px";
        ufoShip.classList.remove("ufo-explosion");
      }, 500);
      setTimeout(() => {
        gameContainer.classList.remove("fade-red");
        if (storyMode && !hasUfoBeenShot) {
          storyPart = "ufoShot";
          cutScene();
          renderStory(story.ufoShot[0]);
          storyPageNumber = 0;
          hasUfoBeenShot = true;
        }
      }, 1000);
    }
    if (removeUfo) {
      voltage.pause();
      removeUfo = false;
      ufoActive = false;
      ufo.removeChild(ufoBeam);
      ufo.insertAdjacentHTML("beforeend", `<div class="beam hidden"></div>`);
      ufoBeam = document.querySelector(".beam");

      ufo.style.left = -16 * ufoWidth + "px";
    }
  }

  if (newPlayerBullet) {
    playerBullet.style.left = `${playerBulletLeft}px`;
    playerBullet.style.visibility = "visible";
    newPlayerBullet = false;
  }

  if (playerBulletOnScreen) {
    if (playerBulletRemoveMe) {
      playerBullet.style.visibility = "hidden";
      playerBulletRemoveMe = false;
      playerBulletOnScreen = false;
    } else {
      playerBullet.style.top = `${playerBulletTop}px`;
      playerBullet.style.left = `${playerBulletLeft}px`;
    }
  }

  for (const [index, bullet] of alienBulletsArray.entries()) {
    if (bullet.removeMe) {
      bullet.element.remove();
      alienBulletsArray.splice(index, 1);
      if (bullet.groundHit) {
        playBombEffect(bullet);
      }
    } else {
      bullet.element.style.top = bullet.top + "px";
    }
  }

  if (
    !ufoGetPlayer &&
    alienBulletsArray.length < maxAlienBullets &&
    Date.now() > alienBulletDue
  ) {
    const col = pickAColumn();
    if (col <= alienGridWidth) {
      alienBulletDue = Date.now() + (5000 * Math.random()) / alienFireRate;
      fireAlienBullet(col);
    }
  }
  if (ufoActive && !ufoToggleBeam && ufoGetPlayer) {
    ufoBeam.classList.remove("hidden");
  }

  for (const blockToChange of blocksToChange) {
    rock.currentTime = 0;
    rock.play();
    if (blockToChange.removeMe === true) {
      blockToChange.block.style.visibility = "hidden";
    } else {
      blockToChange.block.style.backgroundPositionX =
        blockX[blockType[blockToChange.rowNumber][blockToChange.colNumber]][
          barriers[blockToChange.barrierNumber][blockToChange.rowNumber][
            blockToChange.colNumber
          ]
        ] + "px";
    }
  }
  blocksToChange = [];

  // Switches rendering back on.
  document.documentElement.style.display = "";

  // Triggers a repaint so that the DOM will be updated with all pending changed, i.e. with all the changes
  // that were prepared while rendering was switched off.
  gameContainer.offsetHeight;
}

const cutScene = () => {
  if (storyPart === "beginning") {
    audioContext.suspend();
  } else {
    if (!isGameOver) {
      togglePauseThrottled();
    }
  }
  isInCutScene = true;
  pauseMenu.style.display = "none";
  title.style.display = "none";
  gameContainer.style.display = "none";
  statsBar.style.display = "none";
};

const unCutScene = () => {
  pauseMenu.style.display = "flex";
  title.style.display = "flex";
  gameContainer.style.display = "block";
  statsBar.style.display = "flex";
  storyEl.classList.add("hidden");
  if (storyPart === "ufoShot") {
    togglePause();
  }
  isInCutScene = false;
  if (
    storyPart === "playerShot" ||
    storyPart === "fireballEnding" ||
    storyPart === "aliensReachEarth"
  ) {
    storyEndInProgress = false;
    updatesGameOver();
  }
};

const renderStory = (arr) => {
  storyEl.innerHTML = "";
  storyEl.classList.remove("hidden");
  const html = `
  <div class="img"> 
  <img src="${arr[0]}" alt="image of space conflict">
  </div>
  <div class="text">
  <div class="text-turnpage-container" >
  ${arr[1].split("\n\n").reduce((acc, el) => (acc += `<p>${el}</p>`), "")}
  </div>
  <div class="turnPage" >[T]urn page</div>
  </div>
  
  `;

  storyEl.insertAdjacentHTML("beforeend", html);
};

function gameLoop(timestamp) {
  // Many examples place the call to requestAnimationFrame at the end of the game loop,
  // but I've read that best practice is to place it at the beginning.
  loopID = requestAnimationFrame(gameLoop);

  if (paused || isGameOver) {
    lastTime = null;
    return;
  }

  updateTimer();

  if (!lastTime) {
    lastTime = timestamp;
  }
  let elapsedTimeBetweenFrames = timestamp - lastTime;
  lastTime = timestamp;
  if (elapsedTimeBetweenFrames > 1000) {
    // Avoid large time gaps when unpausing.
    elapsedTimeBetweenFrames = frameDuration;
  }
  accumulatedFrameTime += elapsedTimeBetweenFrames;

  while (accumulatedFrameTime >= frameDuration) {
    update(frameDuration);
    accumulatedFrameTime -= frameDuration;
  }

  if (source && source.playbackRate.value < 16) {
    const speedIncrease = speedIncreaseAmount * (frameDuration / 5000);
    source.playbackRate.value += speedIncrease;
  }

  render();

  if (pauseOnStart) {
    togglePauseThrottled();
    pauseOnStart = false;
  }
}

// Pick which column an alien bullet will be fired from. If the column chosen is empty,
// return a placeholder value to indicate that no bullet is to be fired.
function pickAColumn() {
  const c = Math.floor(alienGridWidth * Math.random());
  if (lowestInColumn[c] >= 0) {
    return c;
  }
  return alienGridWidth + 1;
}

function firePlayerBullet() {
  shootEffect.currentTime = 0;
  shootEffect.play();
  playerBulletOnScreen = true;
  playerBulletLeft = playerLeft + playerWidth / 2 - playerBulletWidth / 2;
  playerBulletTop = playerTop - playerBulletHeight;
  playerBullet.style.top = `${playerBulletTop}px`;
  newPlayerBullet = true;
}

function playerBulletCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (
      playerBulletTop <= blockTop[i] + 48 &&
      playerBulletTop + playerBulletHeight >= blockTop[i] &&
      playerBulletLeft + playerBulletWidth >= blockLeft[i] &&
      playerBulletLeft <= blockLeft[i] + 48 &&
      blockVis[i] === true
    ) {
      playerBulletRemoveMe = true;
      const barrierNumber = Math.floor(i / 12);
      const h = i % 12;
      const rowNumber = Math.floor(h / 4);
      const colNumber = h % 4;
      barriers[barrierNumber][rowNumber][colNumber]++;
      let removeMe = false;
      if (barriers[barrierNumber][rowNumber][colNumber] > 3) {
        blockVis[i] = false;
        removeMe = true;
      }
      blocksToChange.push({
        block: block,
        rowNumber: rowNumber,
        colNumber: colNumber,
        barrierNumber: barrierNumber,
        removeMe: removeMe,
        changed: false,
      });
      break;
    }
  }

  if (ufoActive) {
    if (
      playerBulletTop <= ufoTop + ufoHeight &&
      playerBulletLeft + playerBulletWidth >= ufoLeft &&
      playerBulletLeft <= ufoLeft + ufoWidth
    ) {
      playerBulletRemoveMe = true;
      killUfo = true;
      score += mysteryScore[ufoScorePointer];
      incrementScore = true;
      ufoTimeUp = Date.now() + 20000 + Math.random() * 10000;
    }
  }

  alienIsHit: for (let row = 0; row < alienGridHeight; row++) {
    for (let col = 0; col < alienGridWidth; col++) {
      if (alienAlive[row][col]) {
        if (
          playerBulletTop <=
            aliensTop + alienTopInGrid[row][col] + scaledHeight &&
          playerBulletTop + playerBulletHeight >=
            aliensTop + alienTopInGrid[row][col] &&
          playerBulletLeft >=
            aliensLeft + alienLeftInGrid[row][col] + gap * col &&
          playerBulletLeft <=
            aliensLeft + alienLeftInGrid[row][col] + scaledWidth + gap * col
        ) {
          playerBulletRemoveMe = true;
          aliensRemaining--;
          let isLastOne = false;
          if (aliensRemaining < 1) {
            level++;
            isLastOne = true;
          }
          aliensToRemove.push({
            row: row,
            col: col,
            isLastOne: isLastOne,
          });
          alienAlive[row][col] = false;
          if (row === lowestInColumn[col]) {
            for (let i = row; i >= 0; i--) {
              if (alienAlive[i][col]) {
                break;
              }
              lowestInColumn[col]--;
            }
          }
          if (alienAnimationDuration > 0.3) {
            alienAnimationDuration -= alienAnimationIncrement;
            aliensDanceFaster = true;
          }
          switch (true) {
            case alienElements[row][col].classList.contains("squid"):
              score += 30;
              break;
            case alienElements[row][col].classList.contains("crab"):
              score += 20;
              break;
            default:
              score += 10;
          }
          incrementScore = true;
          if (col === leftCol && alienAlive.every((row) => !row[col])) {
            removeLeftColumn();
          }
          if (col === rightCol && alienAlive.every((row) => !row[col])) {
            removeRightColumn();
          }
          if (
            row === bottomRow &&
            alienAlive[row].every((colValue) => !colValue)
          ) {
            removeRow();
          }
          break alienIsHit;
        }
      }
    }
  }

  if (playerBulletTop < 0 || !playerBulletOnScreen) {
    playerBulletRemoveMe = true;
  }
}

// Logic to deal with what happens when the bottom row of aliens is destroyed.
function removeRow() {
  bottomRow--;
  aliensGroundSensor -= alienHeight;
  while (
    bottomRow > 0 &&
    alienAlive[bottomRow].every((colValue) => !colValue)
  ) {
    bottomRow--;
    aliensGroundSensor -= alienHeight;
  }
}

// Logic for when the leftmost column of aliens is destroyed.
function removeLeftColumn() {
  leftCol++;
  insetLeft += alienWidth + gap;
  while (leftCol < rightCol && alienAlive.every((row) => !row[leftCol])) {
    leftCol++;
    insetLeft += alienWidth + gap;
  }
}

// Logic for what to do when the rightmost column of aliens is destroyed.
function removeRightColumn() {
  rightCol--;
  insetRight += alienWidth + gap;
  while (rightCol > leftCol && alienAlive.every((row) => !row[rightCol])) {
    rightCol--;
    insetRight += alienWidth + gap;
  }
}

function handleKeyDown(event) {
  const key = event.key;

  if (isInCutScene) {
    if (key === "t" || key === "T") {
      turnPageThrottled();
    }
    return;
  }

  if (
    isGameOver &&
    (key === "n" || key === "N") &&
    isScoreBoardShowing &&
    gameOverTime + gameOverDelay < Date.now()
  ) {
    document.querySelector("#end-game-scoreboard-container").innerHTML = "";
    gameContainer.style.visibility = "visible";
    statsBar.style.display = "flex";
    pauseMenu.innerHTML = "";
    pauseMenu.classList.remove("pause-menu-modify");

    pauseMenu.insertAdjacentHTML(
      "beforeend",
      `
    <div><span id="n">[N]ew game</span></div>
    <div><span id="c">[C]redits</span></div>
    <div><span id="f">[F]lash effect toggle</span></div>
    <div><span id="a">[ANY OTHER KEY] to continue</span></div>
    <div><span id="s">[S]tory</span></div>
    `
    );
    reset(true);
    // newGameThrottled();
    isGameOver = false;
    isScoreBoardShowing = false;
    return;
  }

  if (isGameOver && isScoreBoardShowing && (key === "p" || key === "P")) {
    if (currentPage == 1) {
      currentPage--;
      displayScoreboard(scores, message);
    } else {
      currentPage++;
      displayScoreboard(scores, message);
    }

    return;
  }

  if (isGameOver) {
    return;
  }

  if (key === "p" || key === "P") {
    togglePauseThrottled();
    return;
  }

  if (paused) {
    if (!storyMode && (key === "S" || key === "s")) {
      pauseMenu.innerHTML = "";
      pauseMenu.insertAdjacentHTML(
        "beforeend",
        `
      <div><span id="n">[N]ew game</span></div>
      <div><span id="c">[C]redits</span></div>
      <div><span id="f">[F]lash effect toggle</span></div>
      <div><span id="any">[ANY OTHER KEY] to continue</span></div>
      `
      );
      storyPart = "beginning";
      cutScene();
      storyMode = true;
      storyPageNumber = -1;
      turnPageThrottled();
      return;
    }

    if (!pauseOnStart && (key === "n" || key === "N")) {
      newGameThrottled();
    } else if (key === "f" || key === "F") {
      toggleFlashEffectThrottled();
    } else if (key === "c" || key === "C") {
      toggleCreditsThrottled();
    } else {
      if (displayCredits) {
        toggleCreditsThrottled();
      }

      togglePauseThrottled();
    }
  }
  switch (key) {
    case "ArrowLeft":
      playerDirection = -1;
      break;
    case "ArrowRight":
      playerDirection = 1;
  }
  if (event.code === "Space") {
    spaceKeyDown = true;
  }
}

function handleKeyUp(event) {
  const key = event.key;
  if (key === "ArrowLeft" && playerDirection === -1) {
    playerDirection = 0;
  } else if (key === "ArrowRight" && playerDirection === 1) {
    playerDirection = 0;
  } else if (event.code === "Space") {
    spaceKeyDown = false;
  }
}

gameContainer.addEventListener("animationend", (event) => {
  const animationName = event.animationName;
  if (
    event.target.classList.contains("beam") &&
    animationName === "extendBeam" &&
    ufoGetPlayer
  ) {
    // alert(event.target);
    event.target.classList.add("opposite-beam");
    // event.target.appendChild(player.element);
    player.classList.add("player-beam");
  }

  if (
    animationName === "movePlayerUp" ||
    animationName === "oppositeExtendBeam"
  ) {
    ufoTakenPlayer = true;
  }
});

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Launch game loop.
loopID = requestAnimationFrame(gameLoop);

const gameOverView = () => {
  const overlay = document.getElementById("overlay");

  overlay.innerHTML = "";
  overlay.style.zIndex = 4;
  const html = `
  <h2 class="overlay-title">Game Over</h2>
  <div id="end-game-prompt">
    ${
      score > Math.min(...scores.map((el) => el.score))
        ? `<form id="score-form">
    <div class="gameOver-stats">
        <div class="stat-group">
            <label for="score1" class="stat-label">SCORE:</label>
            <p class="stat-input" id="score1" name="score">${score}</p>
        </div>
        <div class="stat-group">
            <label for="time" class="stat-label">TIME:</label>
            <p class="stat-input" id="time" name="time">${timer}</p>
        </div>
    </div>
    <div class="player-input">
        <input type="text" id="player-name" name="player-name" placeholder="Enter your name">
        <button type="submit">Submit Score</button>
    </div>
</form> `
        : ``
    }
</div>

 
  `;
  overlay.insertAdjacentHTML("beforeend", html);

  // overlay.classList.remove("overlay-hidden");
};

const showAndAddGameoverMenue = () => {
  pauseMenu.innerHTML = "";

  pauseMenu.classList.add("pause-menu-modify");
  pauseMenu.insertAdjacentHTML(
    "beforeend",
    `
<div><span id="n">[N]ew game</span></div>
<div class="hidden" ><span id="any"> [P]age toggle</span></div> 
`
  );
  pauseMenu.style.visibility = "visible";
};

async function updatesGameOver() {
  gameOverTime = Date.now();
  audioContext.suspend();

  gameContainer.style.visibility = "hidden";
  title.style.visibility = "hidden";
  pauseMenu.innerHTML = "";
  statsBar.style.display = "none";
  playerBullet.style.visibility = "hidden";
  gameOverView();
  if (score < Math.min(...scores.map((el) => el.score))) {
    document.getElementById("overlay").innerHTML = "";
    displayScoreboard(scores, message);

    setTimeout(() => {
      showAndAddGameoverMenue();
    }, 2500);
    isScoreBoardShowing = true;
  }

  sendScoreView(controlScore.bind(null));
}

const controlScore = async (obj) => {
  try {
    await sendScore(obj);
    deleteMinimumScore();
    updateScoresOnAdd(obj);
    document.getElementById("overlay").innerHTML = "";
    playerName = obj.playerName;

    displayScoreboard(scores, message);
    setTimeout(() => {
      showAndAddGameoverMenue();
    }, 2500);
    isScoreBoardShowing = true;
    // togglePauseThrottled();
    // showScoreBoard();
  } catch (err) {
    console.log(err);
  }
};

async function getScores() {
  try {
    const res = await fetch("http://localhost:10000/get-scores");
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    data.forEach((element) => {
      addScore(element);
    });
  } catch (error) {
    console.log(error);
  }
}

const sendScore = async ({playerName, score, second, minute}) => {
  try {
    const response = await fetch("http://localhost:10000/add-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playerName,
        score: parseInt(score),
        minutes: minute,
        seconds: second,
      }),
    });

    if (response.status === 201) {
      console.log("Score submitted successfully.");
    } else {
      console.log("Failed to submit score.");
    }
  } catch (error) {
    console.log("An error occurred while submitting the score:", error);
  }
};

function addScore({name, score, minutes, seconds}) {
  const time = formatTime(minutes, seconds);
  scores.push({name, score, time});
  scores.sort((a, b) => b.score - a.score);
}

// Function to format time as mm:ss
function formatTime(minutes, seconds) {
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

const deleteMinimumScore = () => {
  const minValue = Math.min(...scores.map((el) => el.scores));
  const minIndex = scores.indexOf(minValue);
  scores.splice(minIndex, 1);
};

const updateScoresOnAdd = ({playerName, score, second, minute}) => {
  const time = formatTime(minute, second);
  scores.push({name: playerName, score: +score, time});
  scores.sort((a, b) => b.score - a.score);
};

const message = () => {
  // const highestScore = scores[0].score;
  const position = scores.findIndex(
    (el) => el.score === score && playerName === el.name
  );

  if (position === -1) {
    return "Unfortunately, your score did not make it to the scoreboard. Keep practicing and try again!";
  }

  const percentage = (position / scores.length) * 100;
  let suffix = "";

  switch (position) {
    case 0:
      suffix = "st";
      break;
    case 1:
      suffix = "nd";
      break;
    case 2:
      suffix = "rd";
      break;
    default:
      suffix = "th";
      break;
  }

  return `Congrats, ${playerName}! You are in the top ${Math.round(
    percentage
  )}%, holding the ${position + 1}${suffix} position.`;
};

const sendScoreView = (callback) => {
  let scoreForm = document?.getElementById("score-form");
  scoreForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    let scoreElement = document.getElementById("score1");
    let timeElement = document.getElementById("time");
    let playerNameElement = document.getElementById("player-name");

    if (!scoreElement || !timeElement || !playerNameElement) {
      console.error("Unable to find necessary elements");
      return;
    }

    let score = scoreElement.textContent;
    let time = timeElement.textContent.split(":");
    let playerName = playerNameElement.value;

    if (!score || !time || !playerName) {
      console.error("Unable to find necessary values");
      return;
    }

    let minute = parseInt(time[0]);
    let second = parseInt(time[1]);

    callback({playerName, score, second, minute});
  });
};

//  default sendScoreView;

// Function to display the scoreboard
function displayScoreboard(scores, message) {
  if (currentPage > 1) return;
  console.log(score);
  const start = currentPage * 10 + 1;
  const end = start + 9;
  // Get the scoreboard container
  const container = document.getElementById("end-game-scoreboard-container");
  // Clear the current scoreboard display
  container.innerHTML = "";
  // container.style.zIndex = 3;
  // Create a header for the scoreboard
  const header = document.createElement("h1");
  header.textContent = "High Scores";
  header.id = "high-scores-header";
  container.appendChild(header);

  const text = document.createElement("p");
  text.textContent = message();
  text.classList.add("message");
  container.appendChild(text);
  // Determine the start and end indices for the scores on the current page

  // Create and append a new div for each score on the current page
  for (let i = start; i <= end; i++) {
    const {name, score, time} = scores[i - 1];

    const entry = document.createElement("div");
    entry.className = "score-entry";

    // Add the ordinal suffix to the rank
    let suffix = "th";
    if (i % 10 === 1) suffix = "st";
    else if (i % 10 === 2) suffix = "nd";
    else if (i % 10 === 3) suffix = "rd";

    const rank = document.createElement("span");
    rank.textContent = `${i}${suffix}`;
    entry.appendChild(rank);

    const playerName = document.createElement("span");
    playerName.textContent = name;
    entry.appendChild(playerName);

    const playerScore = document.createElement("span");
    playerScore.textContent = `${score}`.padStart(5, "0");
    entry.appendChild(playerScore);

    const playerTime = document.createElement("span");
    playerTime.textContent = time;
    entry.appendChild(playerTime);

    container.appendChild(entry);
  }
}
