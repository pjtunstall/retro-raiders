// Game container and background variables.
const gameContainer = document.querySelector(".game-container");
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

let skyline = document.getElementById("skyline");
skyline.classList.add("london");
const credits = document.querySelector(".credits");
const title = document.querySelector(".title");

// State variables.
let starting = true;
const statsBar = document.querySelector(".stats-bar");
let fadeOption = true;
let score = 0;
let incrementScore = false;
let lives = 3;
let level = 1;
let levelStartTime;
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
  chicagoSaved: [],
  newYorkSaved: [],
  parisSaved: [],
  berlinSaved: [],
  romeSaved: [],
  austinSaved: [],
  mountainsSaved: [],
  woodSaved: [],
  playerShot: [],
  fireballEnding: [],
  win: [],
  aliensReachEarth: [],
};

let introPic;
let sheepPic;
let ufoShotPic;
let lastPic;
let beamPic;
let berlinPic1;
let berlinPic2;
let berlinPic3;
let eightPic;
let ninePic;
let tenPic;

let playerCharacterIsMale;
let boyOrGirl;
let ladOrLass;
let sirOrMadam;
let wivesOrHusbands;
let subjectPronoun;
let subjectPronounCapital;
let possessivePronoun;
let objectPronoun;
let partnerSubjectPronoun;
let partnerSubjectPronounCapital;
let partnerPossessivePronoun;
let partnerObjectPronoun;
let buccaneerOrCavalier;
let ladsOrSwarms;
let asteroidsOrMeteors;
let three;
let lootOrHell;
let sheepOrLamas;
let sirOrMaam;
let earthOrTerra;
let amazonOrRifleman;
let hatchlingOrBroodling;

randomizeStory();
modifyStory();

function randomizeStory() {
  const genderRandomizer = Math.round(Math.random());
  const otherRandomizer = !Math.round(Math.random());
  playerCharacterIsMale = !genderRandomizer;

  if (playerCharacterIsMale) {
    boyOrGirl = "boy";
    ladOrLass = "lad";
    sirOrMadam = "sir";
    sirOrMaam = "sir";
    wivesOrHusbands = "wives";
    subjectPronoun = "he";
    subjectPronounCapital = "He";
    possessivePronoun = "his";
    objectPronoun = "him";
    partnerSubjectPronoun = "she";
    partnerSubjectPronounCapital = "She";
    partnerPossessivePronoun = "her";
    partnerObjectPronoun = "her";
    berlinPic2 = "rebec";
    eightPic = "106";
    ninePic = "51";
    tenPic = "48";
    ladsOrSwarms = "alien lads";
    three = `Three warlike tribes he did unite,
Invaders, one, two, three,
held together by fear and greed
and his personality.`;
    amazonOrRifleman = `Their strategists devise a plan.
They'll stop at nothing now.
On that lone laser rifleman
vengeance they do vow.`;
  } else {
    boyOrGirl = "girl";
    ladOrLass = "lass";
    sirOrMadam = "madam";
    sirOrMaam = "ma'am";
    wivesOrHusbands = "husbands";
    subjectPronoun = "she";
    subjectPronounCapital = "She";
    possessivePronoun = "her";
    objectPronoun = "her";
    partnerSubjectPronoun = "he";
    partnerSubjectPronounCapital = "He";
    partnerPossessivePronoun = "his";
    partnerObjectPronoun = "him";
    berlinPic2 = "graffiti";
    eightPic = "3f";
    ninePic = "2f";
    tenPic = "7f";
    ladsOrSwarms = "swarms from space";
    three = `Three warring clans did he unite,
Invaders, white and red, 
bound together by greed and hate
and, of their leader, dread`;
    amazonOrRifleman = `Those monsters, quarter give they none.
They'll stop at nothing now.
On that lone laser amazon
vengeance they do vow.`;
  }

  const introRandomizer = Math.random();
  const sheepRandomizer = Math.random();
  const ufoShotRandomizer = Math.random();
  const beamRandomizer = Math.random();
  const lastPicRandomizer = Math.random();

  switch (true) {
    case introRandomizer < 0.2:
      introPic = "28";
      break;
    case introRandomizer < 0.4:
      introPic = "4b";
      break;
    case introRandomizer < 0.6:
      introPic = "13b";
      break;
    case introRandomizer < 0.8:
      introPic = "29";
      break;
    default:
      introPic = "6";
  }

  if (playerCharacterIsMale) {
    switch (true) {
      case sheepRandomizer < 0.08:
        sheepPic = "96";
        break;
      case sheepRandomizer < 0.17:
        sheepPic = "76";
        break;
      case sheepRandomizer < 0.25:
        sheepPic = "82";
        break;
      case sheepRandomizer < 0.33:
        sheepPic = "89";
        break;
      case sheepRandomizer < 0.42:
        sheepPic = "97";
        break;
      case sheepRandomizer < 0.5:
        sheepPic = "105";
        break;
      case sheepRandomizer < 0.58:
        sheepPic = "87";
        break;
      case sheepRandomizer < 0.67:
        sheepPic = "91";
        break;
      case sheepRandomizer < 0.75:
        sheepPic = "85";
        break;
      case sheepRandomizer < 0.83:
        sheepPic = "79";
        break;
      case sheepRandomizer < 0.92:
        sheepPic = "71";
        break;
      default:
        sheepPic = "98";
    }

    switch (true) {
      case lastPicRandomizer < 0.2:
        lastPic = "39";
        break;
      case lastPicRandomizer < 0.4:
        lastPic = "11b";
        break;
      case lastPicRandomizer < 0.6:
        lastPic = "38";
        break;
      case lastPicRandomizer < 0.8:
        lastPic = "69";
        break;
      default:
        lastPic = "13";
    }
  } else {
    switch (true) {
      case sheepRandomizer < 0.1:
        sheepPic = "5f";
        break;
      case sheepRandomizer < 0.2:
        sheepPic = "6f";
        break;
      case sheepRandomizer < 0.3:
        sheepPic = "11f";
        break;
      case sheepRandomizer < 0.4:
        sheepPic = "14f";
        break;
      case sheepRandomizer < 0.5:
        sheepPic = "12f";
        break;
      case sheepRandomizer < 0.6:
        sheepPic = "15f";
        break;
      case sheepRandomizer < 0.7:
        sheepPic = "17f";
        break;
      case sheepRandomizer < 0.8:
        sheepPic = "4f";
        break;
      case sheepRandomizer < 0.9:
        sheepPic = "8af";
        break;
      default:
        sheepPic = "16f";
    }

    switch (true) {
      case lastPicRandomizer < 0.08:
        lastPic = "3af";
        break;
      case lastPicRandomizer < 0.17:
        lastPic = "10f";
        break;
      case lastPicRandomizer < 0.25:
        lastPic = "ruinsf";
        break;
      case lastPicRandomizer < 0.33:
        lastPic = "2ff";
        break;
      case lastPicRandomizer < 0.42:
        lastPic = "7ff";
        break;
      case lastPicRandomizer < 0.5:
        lastPic = "11ff";
        break;
      case lastPicRandomizer < 0.58:
        lastPic = "4ff";
        break;
      case lastPicRandomizer < 0.67:
        lastPic = "12ff";
        break;
      case lastPicRandomizer < 0.75:
        lastPic = "9ff";
        break;
      case lastPicRandomizer < 0.83:
        lastPic = "1ff";
        break;
      case lastPicRandomizer < 0.92:
        lastPic = "8f";
        break;
      default:
        lastPic = "1af";
    }
  }

  switch (true) {
    case ufoShotRandomizer < 0.33:
      ufoShotPic = "aug1";
      break;
    case ufoShotRandomizer < 0.66:
      ufoShotPic = "9";
      break;
    default:
      ufoShotPic = "2b";
  }

  if (beamRandomizer < 0.5) {
    beamPic = "4c";
    berlinPic1 = "wall";
    berlinPic3 = "twins";
    buccaneerOrCavalier = "buccaneer";
    asteroidsOrMeteors = `Asteroids we'll ram off course
their cities for to wreck.
From off the starcharts let us wipe
that Pale Blue Speck.`;
  } else {
    beamPic = "1";
    berlinPic1 = "apartment-block";
    berlinPic3 = "twins2";
    buccaneerOrCavalier = "cavalier";
    asteroidsOrMeteors = `Meteors we'll haul off course
and pillage all they've got.
It's not looking terribly good
for that Pale Blue Dot.`;
  }

  if (otherRandomizer) {
    hatchlingOrBroodling = `a hatchling from the brood.
The only way to prove herself
was spilling yet more blood.`;
    lootOrHell = `Let's teleport our tribes all three
and a Mystery Ship to boot.
Paris and New York will fall.
We'll divvy up the loot.`;
    if (beamRandomizer < 0.33) {
      sheepOrLamas = `flock and come," they cried,
"`;
    } else if (beamRandomizer < 0.67) {
      sheepOrLamas = `quadrupeds," they said,
"`;
    } else {
      sheepOrLamas = `woolly pals," they called,
"`;
    }
    earthOrTerra = "Earth";
  } else {
    hatchlingOrBroodling = `a broodling short of mirth.
The only way to prove herself
was conquering an earth.`;
    lootOrHell = `Let's teleport our species three
and a UFO as well.
Chicago and Berlin will fall.
We'll make their world a hell.`;
    if (playerCharacterIsMale) {
      sheepOrLamas = `furry friends, sir.
`;
    } else {
      sheepOrLamas = `lamas, ma'am," they said,
"`;
    }
    earthOrTerra = "Terra";
  }
}

function modifyStory() {
  story.beginning = [
    [
      `./assets/story-images/24.jpg`,

      `The Emperor of Grumium,
that galactic ${buccaneerOrCavalier},
was on campaign in Orion Arm,
cut down in his thousandth year.

A faulty teleportation pad
left him in 64 bits,
strewn across the Southern Cross,
jibbering and in fits.

${three}

His offspring fought till one was left,
${hatchlingOrBroodling}

A babe in arms, but sharp and sly,
her rivals bit the dust.
They crowned her Emperor that day.
For conquest she did lust.

"Where shall we invade today?"
Her lip it slowly curled.
"Turn left at Barnard's Star," she said.
"I know a world." <font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/${introPic}.jpg`,

      `"I know a world called Planet Earth
with little for defense.
A lone gunner guards their towns.
Let's teleport us hence."

"${lootOrHell}"

"${asteroidsOrMeteors}"

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/26.jpg`,

      `You heard it in the street.
You heard it in the news.
You didn't believe at first,
but that was no excuse.

The politicians said keep calm.
Panicked, they did meet.
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

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/${sheepPic}.jpg`,

      `That summer morning, messengers came.
Messengers there were three.
"Leave your ${sheepOrLamas}A gunner you must be."

"A gunner you must be for us,
defending Planet Earth.
A laser cannon you must steer
and shoot for all you're worth."

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.ufoShot = [
    [
      `./assets/story-images/${ufoShotPic}.jpg`,

      `A well-aimed shot, the Mystery Ship
explodes across the sky!
A cheer goes up from Planet Earth.
Perhaps they will not die.

Thrilled, the presidential quints
award you points galore.
Those mutants promise you, if Earth wins,
fame, XP, and more.

The generals of the alien fleet
meet in a foul mood.
This is a point of honor now.
It's a slight against their brood.

The generals of the alien force,
admirals, one, two, three,
decide upon a monstrous course
to seal their victory.

Faster they flap, they'll not let go
till Earth is all ablaze.
No pity will this planet know.
Its cities they will raze.

They're speeding up, they will not stop
till Earth is laid to waste,
and a lone laser fusilier
${possessivePronoun} final end has faced.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.londonSaved = [
    [
      `./assets/story-images/4.jpg`,

      `One fleet destroyed, a glimpse of hope,
and London's skies are free!
For a time it seems the horde might leave,
but that is not to be.

For a while it seems they have withdrawn,
but that is just a ploy;
soon new swarms descend upon
Chicago, Illinois.

The alien lords are not dismayed.
They've conquered worlds before.
If a planet proves too hard to take,
they just attack it more.

${amazonOrRifleman}

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.chicagoSaved = [
    [
      `./assets/story-images/22.jpg`,

      `The Windy City sighs relief,
brief respite though it be.
From Riverdale to Rogers park,
Chicago too is free.

There's fireworks on Navy Pier.
Perhaps it's not too late?
Earth's savior, though, has earned ${objectPronoun}self
some hard alien hate.

The galactic interlopers run
while issuing a threat:
"Never leave your laser gun.
We haven't finished yet."

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.newYorkSaved = [
    [
      `./assets/story-images/34.jpg`,

      `"Three aliens walked into a bar. Which one said ouch?" &mdash;Zen <i>koan</i>, traditional

"Game?" &mdash;Groundskeeper Willie, The Simpsons, S1E7

O, they were not happy to lose New York. They cursed Earth then. Their green blood boiled.

And you? What of the victor? F&#234;ted and hailed a hero. A long way from your sheep farm now. How does it feel? Do you feel like a hero? Not really.

How can time even pass?

There was a time. And it was everything, and real and sharp and impossible, as life is. And somehow it's gone. And long gone. And your fellow defenders, comrades of that summer, how can they have been then so very here, and now&mdash;not?

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/8b.jpg`,

      `Each morning, you'd run in Central Park to burn off the adrenaline of the night's battle, then home to toss and turn through the June heat in the sweltering, cockroach-infested brownstone they'd appointed for Earth's defenders, up in Washington Heights.

Band of misfits, Scottie called you. And that was right enough.

Sometimes alien allies would come to stay. Ever more often as human gunners fell or quit.

One night, they offered you a toke of their Tralfamadorian spice and you saw it all, the whole mechanism laid bare.

You stood outside of time that night. Absurd. The clockwork. The game! All of it, a game.

But no time to think on that. A new attack. And they rush you across the ocean.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.parisSaved = [
    [
      `./assets/story-images/1p.jpg`,

      `Misty mornings.

First coolness.

Ghosts of leaves fading into the pavement's sheen.

Fall found you holed up in a cheap Pig Alley hostel (disused since the tourists fled), or else in the Catacombs when the bombardment got too heavy.

It had only been a few months, but already the world had settled into a rhythm. Those things gliding left and right in the night, they might as well have been invisible. Just a fact or life.

Is there anything we humans can't take for granted?

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/3p.jpg`,

      `If they saw you rattling to work on your scooter down the steep, cobbled alleys of Montmartre, the Parisians probably took you for an alien yourself.

You dressed in the outlandish, harlequin garb of your fellow gunners, all of them by now drawn from Earth's extraterrestrial allies. Your skin was a mesh of interstellar tattoos, glowing faintly with bioluminescent exobacteria, and you'd had your skull deformed with ever tighter ligatures, as was their fashion.

Alienation.

The night you saved Paris was marked with barely a just-for-laughs, human-interest piece at the end of the local news.

But you knew what was at stake as you packed your bags for the next one.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.berlinSaved = [
    [
      `./assets/story-images/${berlinPic1}.jpg`,

      `It was winter in Berlin. Even your alien allies had absconded. All but one. You sold your medals for that dingy room over the bar in Friedrichshain and took turns on a stall at the fleamarket. Weeks could go by without a sale. When someone finally did take a shine to your Presidents' Star or Quintessential Badge of Courage, you'd celebrate with <i>Glühwein</i> and drew a little closer, and it kept out the December chill awhile.

It was in those days that you started writing your story&mdash;back when you still thought it would have a happy ending.

Ever more people began to deny the existence of the Invaders. Their certainty would have been laughable had it not been so bellicose. Others called for all alien blood. There was a massacre. You kept a low profile then.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/${berlinPic2}.jpg`,

      `Such misunderstanding, on every level! How much of it due to those crummy AI translation headsets they gave you? Who knows? ${partnerSubjectPronounCapital} never did seem at ease in this world. You wondered what kept ${partnerObjectPronoun} here.

For ${partnerPossessivePronoun} birthday (or rather <i>external soulday</i>, as they called it), you gave ${partnerObjectPronoun} a trinket you'd found on a neighboring stall. Turns out, it was an instrument of ${partnerPossessivePronoun} people, the <i>silent rebec</i>.

${partnerSubjectPronounCapital} was delighted. It took great skill to play well, balancing each cadence against its sonic inverse, although only a true master could approach the ideal of perfect silence. Indeed, at first, ${partnerSubjectPronoun} often let slip a bright squall of notes to cheer the drab winter hours.

${partnerSubjectPronounCapital} made ok money at the cabaret&mdash;until ${partnerSubjectPronoun} got good.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/${berlinPic3}.jpg`,

      `By spring, ${partnerSubjectPronoun} almost had it. ${partnerSubjectPronounCapital} looked magnificent, coaxing the arcane contraption into what you guessed, from your fading recollection of ${partnerPossessivePronoun} early attempts, must be tunes of devastating transcendence, albeit deftly canceled out. You applauded, and felt quite alone.

Then, just as you started to doubt your aim, the last of the swarm exploded across the sky. Berlin was saved.

You celebrated with a few friends from the market. The <i>Glühwein</i> flowed. And later, when they'd gone . . . Probably that was the first time you tried out the alien dance, flapping your arms as you bobbed about the room&mdash;both of you in stitches&mdash;as you did your best to keep to the noiseless beat.

Probably that was when the twins were conceived.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.romeSaved = [
    [
      `./assets/story-images/wolves.jpg`,

      `O, your brave little fellow!

No hospital would take a half-alien baby, so he lived his out three fevered days in your tent on the south bank of the Tiber; and, on the third, convulsed and was done.

${partnerSubjectPronounCapital} ate him, of course, as was the way of ${partnerPossessivePronoun} people, and vanished soon after with the other.

It just wasn't ${partnerPossessivePronoun} world.

You didn't care about anything then, certainly not the people of Planet Earth, but momentum carried you on. Not knowing what else to do, you threw yourself into the mission.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/colosseum.jpg`,

      `It was just you and your little coin-op laser now. You camped by the river till the <i>polizia robotica</i> moved you on, then in cemeteries, robbing pilgrims for the cash to recharge it.

Seems like no one believed in the Invaders anymore. Even the quintuplet presidents dismissed them, but you knew better. Sure, you called it a game in your vision&mdash;that is, when you tried to wrestle your vision into words. But there are games and games: games that are part of life, and the big game that life is a part of.

You had to keep such thoughts to yourself in those days, though, and shoot your laser from abandonned lots in the night.

Why were you still trying to save these people? You sometimes wondered. Maybe you just wanted to finish what you started.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.austinSaved = [
    [
      `./assets/story-images/${eightPic}.jpg`,

      `The remnants of the human race in rags their cities flee. They leave to seek a safer place, a mountain sanctuary.

In search of haven, humankind are headed for the downs. The urban life has extra risk. It's over for the towns.

Nobody doubts the danger now. The deadly alien force has turned to novel tactics, wow, attacks without remorse.

The refugees acknowledge you. They know the threat is real. They've no idea what to do. They envy you your zeal.

All people do depend on you&mdash;their plans are in a mess&mdash;more humble since inhabiting a hilly wilderness.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.mountainsSaved = [
    [
      `./assets/story-images/${ninePic}.jpg`,

      `Their mountain base abandonning, abysmal prospects there, the last survivors leave it for a lonely woodland lair.

Escaping from that skilled assault has scared them to their senses. They claim they were somewhat of late waylaid by false pretenses.

Escaping in a skittish mood, they scorn no longer hold, as formerly they did, for you, their own defender bold.

"A forest refuge fits our need; it's far from any town." But you can count cosmic scouts to quickly hunt you down.

You can rely on ${ladsOrSwarms} to search both high and low. The place that you supposed was safe, they presently will know.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.woodSaved = [
    [
      `./assets/story-images/${tenPic}.jpg`,

      `Yet deeper traipse into the woods the tattered last few folk. The way is scattered with their goods, their wishes up in smoke.

Though somewhat scarred by circumstance, you swear to hold the line. Though terrible their likely fate, you tell them they'll be fine.

Determined now to take a stand, you tell them happy lies: instead of truth, a story blithe to still their anguished cries.

There's nowhere else on Earth to flee. This is the make-or-break. Decided here is history. The whole wide world's at stake.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.playerShot = [
    [
      `./assets/story-images/25.jpg`,

      `The gunner's mother heard the knock,
three aliens at the door.
Not much to say to blunt that shock:
"Your hatchling is no more."

"A third and fatal blast ${subjectPronoun} took.
Our plasma bolts struck home.
Accept this medal for ${possessivePronoun} pluck
and a broodling of our own."

"Another a gift we'd like give
to help you out from hence,
as slaves to serve your every need:
your quintuplet presidents."

"Now we're the rulers of your world;
${subjectPronoun} didn't stand a chance.
To compensate you further, look!
We'll do our alien dance."

"Our dance we shall perform for you.
We flap our arms like so.
Your ${boyOrGirl} was brave, we honor ${objectPronoun}.
We thought you'd like to know."

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.fireballEnding = [
    [
      `./assets/story-images/0.jpg`,

      `The gunner's mother heard the knock,
three aliens at the door.
Not much to say to blunt that shock:
"Your hatchling is no more."

"A fireball took ${possessivePronoun} life away.
For ${objectPronoun}, there's no tomorrow.
Please take a gift this tragic day
in token of our sorrow."

"Accept now, Mrs. Gunner, please,
since we've achieved our goal,
as consolation in your grief
this antique games console.

"A video game is always fun.
It will your life enhance.
To compensate you further, dear,
we'll do our alien dance."

"Our dance we shall perform for you.
We flap our arms like so.
Your ${boyOrGirl} was brave, we honor ${objectPronoun}.
We thought you'd like to know."

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.win = [
    [
      `./assets/story-images/victorian.jpg`,

      `Earth wakes at last from yon bad dream.
Was it story or history?
The more you think, the stranger seem
those years of tragedy.

Such thoughts you ponder, praised and dazed,
at the celebration feast.
The presidential quints guffaw.
They're having fun, at least.

"Don't wrack your brains; you've done your bit.
Our hero! We are free!
You were in the thick of it."
They offer you more tea.

But your mind is on the mystery.
You will not let it rest:
how each joke contains the tragedy,
each loss the cosmic jest.

Each fiction's fact by other means,
at each storm's heart a lull.
All life's a game, all game is life
if lived-played to the full.

<font color="red">[T]urn page</font>`,
    ],
  ];

  story.aliensReachEarth = [
    [
      `./assets/story-images/${beamPic}.jpg`,

      `"O brave defender, gunner bold,
though human you are in form,
you've proved your worth, so take your place
in our invader swarm."

"Your worth you've shown us, earthling ${ladOrLass},
so join our conquering host.
Your world's a cinder, nothing left.
Of our offer make the most."

"You oceans dry, your lands ablaze,
there's nothing left for thee.
If I were you, I'd gladly leap
at this opportunity."

An apprenticeship in Space Invading
we offer you this day.
Accept it now or perish too.
It is the only way.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/11.jpg`,

      `So it was and so it went
and what could you do?
Now many years and light years hence,
you're an Invader through and through.

So many worlds you've laid to waste
on a mercenary's pay.
Do you ever think of Planet Earth.
That is hard to say.

A rover, you, a treasure trover,
you keep the loot you find.
Alien ${wivesOrHusbands}, you have three,
one of each kind.

From ALGOL the Demon Star
to Ceti Sigma and Tau,
you're the last of Earth, you're one of the swarm.
You're freefalling now.

A Retro Raider, a Space Invader,
it's all the same to you.
Among laser blasts and plasma bolts,
you look out for your crew.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/21.jpg`,

      `<i>From the Memoirs of Exaptia Tabbani, Envoy Incarnate of the Hmadian Macrostates, on concluding her negotiations with Emperor FnrRa Gfgfgg (II<sup>MXXIV</sup>-I)st, Lord of Orion, Grand Eskalir of Grumium, and Admiral of the High Reaches:</i>


Following my embassy to the barbarian emperor&mdash;O, I could hardly believe it, she'd walked right into my trap!&mdash;as I strode back to my teleport pad, I happened upon a contingent of mercenaries, busy darning their space suits for the next invasion.

One caught my eye.

Crisscrossed with plasma burns, it had a curious bilateral symmetry and wore a breastplate in the Orion style, much like those of its comrades.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/2.jpg`,

      `It scowled up at me and flapped its arms.

I returned the traditional Invader salute and enquired, "Where are you from, ${sirOrMaam}?"

"${earthOrTerra}," it grunted.

"${earthOrTerra} Angiedi?"

"No, ${earthOrTerra} Solis."

I looked blank.

"It's one of the Behenian Earths. Was. All burnt now."

A faraway cast clouded the alien's visage.

"You live as one of these barbarous rogues, raiding other planets?"

"It's a fine life," the mercenary shrugged. "I have treasures aplenty, the spoils of half the galaxy and three alien ${wivesOrHusbands}. One of each kind."

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/7.jpg`,

      `"But you are a civilized being, my friend. Are you not ashamed?"

"I have all the best spice, your honor. I feel nothing."

I politely declined the smouldering baby-bone pipe it offered. It took a long drag and a glazed smile replaced the bitter expression. Its comrades cackled.

"Just look at yourself, ${sirOrMadam}! Think of what you've lost. This is no life. You'll be run through with a plasmic glaive or shot down sooner or later by a defender such as you once were. Did you not have a family on, what did you call it, Earth? A mate? Hatchlings? What would your mother think to see you now?"

For the briefest moment, its face twisted into a wild-eyed look.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/5.jpg`,

      `"What do you know of such things?" the mercenary muttered and a single, spice-scented tear dripped off its laser-scarred chin.

But it quickly took another hit of the pipe and went back to patching its space suit.

Its comrades snickered and flapped their arms in empty glee.

So I left them there and trudged back to the teleport sheds. A bad moon was rising.

I'd write up my notes on the needle ship on the way to the wormhole. With the alliances I'd made on my mission, and the false intelligence I'd shared with the Eskalir, it would not go well for the Grumian Empire.

Such is the way of the High Reaches.

<font color="red">[T]urn page</font>`,
    ],

    [
      `./assets/story-images/${lastPic}.jpg`,

      `I sometimes wonder what became of that lone laser gunner from Earth. Almost certainly ${subjectPronoun} was killed when the empire fell, shortly after my return.

Any chance ${subjectPronoun} escaped? Not really. But who knows?

Maybe ${subjectPronoun} found some way out through the chaos of all those years, got ${objectPronoun}self cloned, and founded a new Earth somewhere out in the quiet backwaters of Orion.

I like to think ${subjectPronoun} did.

<font color="red">[T]urn page</font>`,
    ],
  ];
}

const storyEl = document.querySelector(".story-container");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");
let spaceKeyDown = false;
let resetInProgress = false;
let restartInProgress = false;
let playerDeathInProgress = false;
let isScoreBoardShowing = false;
let isGameOver = false;
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
  "A &lt;span&gt;ner in the Works&lt;/span&gt;",
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
  "The Bilalgorithm",
  "Nully the Element Packed Her Math.trunc<br>and ...Spread Goodbye to the Circus",
  "Lookbehind in Anger",
  "Home, Home on the Range Loop",
  "The Markup of the Beast",
  "Cache Only",
  "Who requestAnimationFrame(edRogerRabbit?)",
  "&lt;div&gt;ide &amp; Conquer&lt;/div&gt;",
  "Escape \\Sequence from New York",
  "Midnight in Parity",
  "ANSI Boys",
  "['The', 'Army'].join(' ') and C++ the Navy",
  "Single or Carriage Return",
  "Brain-Fukkatsu no Hi",
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
let ufoScorePointer = 0;
let ufoBoost = 1;
let ufoTimeUp = Date.now() + 20000 + Math.random() * 10000;
let ufoActive = false;
let ufoDirection;
const ufoHeight = 40;
const ufoWidth = 40;
let killUfo = false;
let removeUfo = false;
let ufoTop = 0;
let ufoToggleBeam = false;
let ufoGetPlayer = false;
let ufoTakenPlayer = false;
let isInUfoCutScene = false;
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
let removeBean = false;
gameContainer.appendChild(ufo);
let ufoBeam = document.querySelector(".beam");
let ufoShip = document.querySelector(".ufo");

// Alien variables.
const aliens = document.getElementById("aliens");
const alienGridWidth = 11;
const alienGridHeight = 5;
const gap = parseFloat(getComputedStyle(aliens).gap);

let alienTimeoutID;

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

// Variables relating to alien movement patterns on later levels.
let endBounce = false;
let endFlit = false;

// Alien bullet variables.
let alienBulletsArray = [];
let alienBulletsElementArray = [];
function* IDGenerator() {
  let i = 0;
  while (true) {
    yield ++i;
  }
}
const ids = IDGenerator();
let alienRateOfFire = level;
let alienBulletDue = Date.now() + (5000 * Math.random()) / alienRateOfFire;
let maxAlienBullets = 16;
const bulletWidth = 10;
const bulletHeight = 30;

// Uncomment to test level parameters: background image and difficulty parameters,
// but not selection of alien types or choice or black vs white aliens.

// level = 5;
// startHeight = 60;
// aliensStep = 160;
// alienRateOfFire = 5;
// skyline.classList.add('berlin');

// level = 6;
// startHeight = 60;
// aliensStep = 160;
// alienRateOfFire = 6;
// skyline.classList.add('rome');

// level = 7;
// startHeight = 70;
// aliensStep = 170;
// alienRateOfFire = 7;
// skyline.classList.add('austin');

// level = 8;
// startHeight = 70;
// aliensStep = 170;
// alienRateOfFire = 8;
// skyline.classList.add('mountains');

// level = 9;
// startHeight = 80;
// aliensStep = 180;
// alienRateOfFire = 9;
// skyline.classList.add('wood');

// level = 10;
// startHeight = 40;
// aliensStep = 180;
// alienRateOfFire = 10;
// skyline.classList.add('forest');

// Variables to do with the flash effect for when alien bullets hit the ground.
let flashBrightness = 255;
let fades = Array.from({ length: maxAlienBullets * 2 }, () => ({
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

// Barrier variables.

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
  if (level % 10 === 1) {
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
let music = new Audio();
music.volume = 0.2;
music.loop = true;
const musicSpeedIncreaseAmount = 0.02;

function pickMusic() {
  const musicRandomizer = Math.random();
  let musicFile;
  switch (true) {
    case musicRandomizer < 0.2:
      musicFile = "assets/music/POL-chubby-cat-short.wav";
      break;
    case musicRandomizer < 0.4:
      musicFile = "assets/music/POL-combat-plan-short.wav";
      break;
    case musicRandomizer < 0.6:
      musicFile = "assets/music/POL-bomb-carrier-short.wav";
      break;
    case musicRandomizer < 0.8:
      musicFile = "assets/music/POL-secret-alchemy-short.wav";
      break;
    default:
      musicFile = "assets/music/POL-galactic-chase-short.wav";
  }
  music.src = musicFile;
}

// Sound effects.
const shootEffect = new Audio("assets/SFX/LaserBlastQuick PE1095107.mp3");
const laserShot = new Audio("assets/SFX/Laser-Shot-1.mp3");
const hull = new Audio("assets/SFX/Hull-Breach-4.mp3");
const voltage = new Audio("assets/SFX/Mad-Voltage.mp3");
const scream = new Audio(
  "assets/SFX/Scream-Short-C2-www.fesliyanstudios.com.mp3"
);
const wood = new Audio("assets/SFX/WoodCrashesDistant FS022705.mp3");
const rock = new Audio("assets/SFX/rock-destroy-6409.mp3");
rock.volume = 0.1;
const bomb = new Audio("assets/SFX/bomb.mp3");
const kaboom = new Audio("assets/SFX/kaboom.wav");
const mortar = new Audio("assets/SFX/mortar cannon explosion.wav");
const explode1 = new Audio("assets/SFX/explode1.wav");
const Explosion1 = new Audio("assets/SFX/Explosion1.wav");
const Explosion2 = new Audio("assets/SFX/Explosion2.wav");
const damage = new Audio("assets/SFX/damage.wav");
const LEXPLODE = new Audio("assets/SFX/LEXPLODE.wav");
const blk = new Audio("assets/SFX/blkfoot4.wav");

const sfx = [
  shootEffect,
  laserShot,
  hull,
  scream,
  wood,
  bomb,
  kaboom,
  mortar,
  explode1,
  Explosion1,
  Explosion2,
  damage,
  LEXPLODE,
  blk,
];
sfx.forEach((sound) => {
  sound.volume = 0.2;
});

const wind = new Audio("assets/SFX/wind.mp3");
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
    if (
      storyPart === "londonSaved" ||
      storyPart === "chicagoSaved" ||
      storyPart === "newYorkSaved" ||
      storyPart === "parisSaved" ||
      storyPart === "berlinSaved" ||
      storyPart === "romeSaved" ||
      storyPart === "austinSaved" ||
      storyPart === "mountainsSaved" ||
      storyPart === "woodSaved"
    ) {
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
    if (!starting) {
      music.pause();
    }
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
    if (resetInProgress || starting) {
      pickMusic();
      music.playbackRate = 1;
      music.currentTime = 0;
      levelStartTime = Date.now();
      if (restartInProgress || starting) {
        startTime = Date.now();
        pauseStartTime = Date.now();
        ufoTimeUp = Date.now() + 20000 + Math.random() * 10000;
        restartInProgress = false;
      }
    } else {
      const pauseInterval = Date.now() - pauseStartTime;
      startTime += pauseInterval;
      ufoTimeUp += pauseInterval;
    }
    if (ufoActive) {
      voltage.play();
    }
    music.play();
    starting = false;
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
const turnPageThrottled = throttle(turnPage, 256);

function fireAlienBullet(col) {
  if (
    resetInProgress ||
    isInUfoCutScene ||
    isGameOver ||
    playerDeathInProgress
  ) {
    return;
  }
  laserShot.time = 0;
  laserShot.play();
  if (alienRateOfFire < 16) {
    alienRateOfFire += 0.01 * level;
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

  let n = ids.next().value;
  alienBulletsElementArray.push({ element: newAlienBullet, id: n });
  alienBulletsArray.push({
    type: type,
    speed: bulletSpeedY,
    top: bulletY,
    left: bulletX,
    r: r,
    removeMe: false,
    id: n,
  });
}

function launchUfo() {
  if (ufoActive || paused || resetInProgress) {
    return;
  }
  killUfo = false;
  voltage.currentTime = 0;
  voltage.play();
  ufoActive = true;
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
  alienBulletsElementArray.forEach(
    (el) => (el.element.style.visibility = "hidden")
  );

  playerBullet.style.opacity = 0;
};

const showElementsOnBeam = () => {
  aliens.style.opacity = 1;
  barrierGrids.forEach((el) => (el.style.opacity = 1));
  alienBulletsElementArray.forEach(
    (el) => (el.element.style.visibility = "visible")
  );
  playerBullet.style.opacity = 1;
};

function reset(restart) {
  if (resetInProgress) {
    return;
  }
  resetInProgress = true;
  endBounce = false;
  endFlit = false;

  if (restart) {
    restartInProgress = true;
    level = 1;
    lives = 3;
    score = 0;
    ufoBoost = 1;
    randomizeStory();
    modifyStory();
  }

  if (level % 10 === 0 || level % 10 > 4) {
    lives = 3;
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
  isInUfoCutScene = false;
  player.classList.remove("player-beam");

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
  alienBulletsElementArray = [];

  playerBullet.style.visibility = "hidden";
  playerBulletRemoveMe = false;

  const barrierElements = document.querySelectorAll(".barrier");
  barrierElements.forEach((barrierElement) => barrierElement.remove());

  setTimeout(() => {
    if (restart) {
      if (storyMode) {
        // Restore story option on pause menu if we were previously in story mode.
        pauseMenu.innerHTML = "";
        if (fadeOption) {
          pauseMenu.insertAdjacentHTML(
            "beforeend",
            `
          <div><span id="n">[N]ew game</span></div>
          <div><span id="c">[C]redits</span></div>
          <div><span id="f">[F]lash effect off</span></div>
          <div><span id="s"> [S]tory</span></div>
          <div><span id="a">[ANY OTHER KEY] to continue</span></div>
          `
          );
        } else {
          pauseMenu.insertAdjacentHTML(
            "beforeend",
            `
          <div><span id="n">[N]ew game</span></div>
          <div><span id="c">[C]redits</span></div>
          <div><span id="f">[F]lash effect on</span></div>
          <div><span id="s"> [S]tory</span></div>
          <div><span id="a">[ANY OTHER KEY] to continue</span></div>
          `
          );
        }
      }
      storyMode = false;
      hasUfoBeenShot = false;
      level = 1;
      lives = 3;
      score = 0;
      startHeight = 40;
      ufoScorePointer = -1;
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

    if (!storyMode) {
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

    aliensRemaining = alienGridHeight * alienGridWidth;
    if (level % 10 === 0) {
      alienRateOfFire = 10;
    } else {
      alienRateOfFire = level % 10;
    }
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

    fades = Array.from({ length: maxAlienBullets * 2 }, () => ({
      duration: 2000,
      stage: 1,
    }));

    switch (level % 10) {
      case 1:
        skyline.classList.remove("forest");
        skyline.classList.add("london");
        break;
      case 2:
        skyline.classList.remove("london");
        skyline.classList.add("chicago");
        break;
      case 3:
        skyline.classList.remove("chicago");
        skyline.classList.add("nyc");
        break;
      case 4:
        skyline.classList.remove("nyc");
        skyline.classList.add("paris");
        break;
      case 5:
        skyline.classList.remove("paris");
        skyline.classList.add("berlin");
        break;
      case 6:
        skyline.classList.remove("berlin");
        skyline.classList.add("rome");
        break;
      case 7:
        skyline.classList.remove("rome");
        skyline.classList.add("austin");
        break;
      case 8:
        skyline.classList.remove("austin");
        skyline.classList.add("mountains");
        break;
      case 9:
        skyline.classList.remove("mountains");
        skyline.classList.add("wood");
        break;
      case 0:
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
  if (isInUfoCutScene) {
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
      levelStartTime: levelStartTime,
      ufoGetPlayer: ufoGetPlayer,
      player: {
        left: playerLeft,
        step: playerStep,
        direction: playerDirection,
        bullet: {
          isOnScreen: playerBulletOnScreen,
          top: playerBulletTop,
          left: playerBulletLeft,
          speedY: playerBulletSpeedY,
          removeMeMessageToWorker: playerBulletRemoveMe,
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
        bullets: alienBulletsArray,
      },
      endBounce: endBounce,
      endFlit: endFlit,
      barriers: {
        damage: barriers,
        blockVis: blockVis,
        blockTop: blockTop,
        blockLeft: blockLeft,
      },
      ufo: {
        active: ufoActive,
        top: ufoTop,
        left: ufoLeft,
        getPlayer: ufoGetPlayer,
      },
    });
    worker.onmessage = function (event) {
      playerLeft = event.data.player.left;
      // playerBulletTop = event.data.player.bullet.top;
      if (event.data.player.dead) {
        if (storyMode) {
          isInUfoCutScene = true;
          music.pause();
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
      // aliensStep = event.data.aliens.step;
      aliensDirection = event.data.aliens.direction;
      endBounce = event.data.endBounce;
      endFlit = event.data.endFlit;
      if (event.data.player.bullet.removeMeMessageFromWorker) {
        playerBulletRemoveMe = true;
      }
      for (const block of event.data.barriers.blocksToChange) {
        barriers[block.barrierNumber][block.rowNumber][block.colNumber]++;
        blocksToChange.push(block);
      }
      if (event.data.ufo.kill) {
        killUfo = true;
        score += mysteryScore[ufoScorePointer];
        incrementScore = true;
        ufoTimeUp = Date.now() + 20000 + Math.random() * 10000;
      }
      for (const bullet of alienBulletsArray) {
        for (const workerBullet of event.data.aliens.bullets) {
          if (bullet.id === workerBullet.id) {
            bullet.top = workerBullet.top;
            if (workerBullet.removeMe) {
              bullet.removeMe = true;
            }
          }
        }
      }
      if (event.data.player.hitByBullet) {
        playerDeath(false);
      }
      if (event.data.player.hitByFireball) {
        lives = 1;
        player.className = "player";
        playerDeath(false, true);
      }
    };

    // Move player bullet.
    if (playerBulletOnScreen) {
      playerBulletTop -= (playerBulletSpeedY * frameDuration) / 1000;
      playerBulletCollisions();
    }

    // Move alien bullets and check for collisions with player or ground.
    for (const bullet of alienBulletsArray) {
      if (ufoGetPlayer) break;
      // bullet.top += (bullet.speed * frameDuration) / 1000;
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
        // Cheat mode:
        // Comment out this line to be invulnerable to alien bullets for testing.
        playerDeath(false);
        bullet.removeMe = true;
        break;
      } else if (bullet.top + bulletHeight > containerHeight) {
        bullet.removeMe = true;
        bullet.groundHit = true;
        break;
      }
    }

    // Fire player bullets.
    if (spaceKeyDown && !playerBulletOnScreen && !playerBulletRemoveMe) {
      firePlayerBulletThrottled();
    }

    // Launch UFO.
    if (Date.now() > ufoTimeUp) {
      launchUfo();
    }
  }

  if (isInUfoCutScene) {
    ufoToggleBeam =
      (ufoDirection === 1 &&
        ufoLeft + ufoWidth / 2 < playerLeft + playerWidth / 2) ||
      (ufoDirection === -1 &&
        ufoLeft + ufoWidth / 2 > playerLeft + playerWidth / 2);
  }

  if (!ufoToggleBeam && ufoGetPlayer && !ufoTakenPlayer) {
    ufoLeft = playerLeft + playerWidth / 2 - ufoWidth / 2;
    ufoBoost = 3;
  }

  if (
    (ufoActive && ufoToggleBeam && ufoGetPlayer) ||
    (ufoActive && (!ufoGetPlayer || ufoTakenPlayer))
  ) {
    ufoLeft += (ufoBoost * (ufoDirection * frameDuration)) / 5;
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
  if (storyPart !== "win") {
    scream.play();
  }
  lives--;
  const lifeCounter = document.querySelectorAll(".life");
  for (let i = 0; i < 3; i++) {
    if (i < lives) {
      lifeCounter[i].style.visibility = "visible";
    } else {
      lifeCounter[i].style.visibility = "hidden";
    }
  }
  if (final || lives < 1) {
    clearTimeout(alienTimeoutID);
    isGameOver = true;
    player.classList.add("explosion");
    playerBullet.style.visibility = "hidden";
    const alienBullets = document.querySelectorAll(".alien-bullet");
    alienBullets.forEach((alienBullet) => alienBullet.remove());
    alienBulletsArray = [];
    alienBulletsElementArray = [];
    for (let i = 0; i < 3; i++) {
      lifeCounter[i].style.visibility = "hidden";
    }
    playerDirection = 0;
    isInUfoCutScene = false;
    setTimeout(() => {
      player.classList.remove("explosion");
      for (let row = 0; row < alienGridHeight; row++) {
        for (let col = 0; col < alienGridWidth; col++) {
          let alien = alienElements[row][col];
          alien.remove();
        }
      }
      if (storyMode) {
        if (storyPart !== "win") {
          storyPart = final ? "aliensReachEarth" : "playerShot";
          if (fireball) {
            storyPart = "fireballEnding";
          }
        }
        cutScene();
        storyPageNumber = -1;
        turnPageThrottled();
        storyEndInProgress = true;
      } else {
        togglePauseThrottled();
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
    if (music.playbackRate < 3.9) {
      music.playbackRate += musicSpeedIncreaseAmount * (frameDuration / 5000);
    }
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
    alienTimeoutID = setTimeout(function () {
      alienElements[poorDoomedAlien.row][poorDoomedAlien.col].classList.remove(
        "alien-explosion"
      );
      alienElements[poorDoomedAlien.row][poorDoomedAlien.col].style.visibility =
        "hidden";
      if (poorDoomedAlien.isLastOne && !isGameOver) {
        level++;
        if (storyMode) {
          switch (level % 10) {
            case 2:
              storyPart = "londonSaved";
              break;
            case 3:
              storyPart = "chicagoSaved";
              break;
            case 4:
              storyPart = "newYorkSaved";
              break;
            case 5:
              storyPart = "parisSaved";
              break;
            case 6:
              storyPart = "berlinSaved";
              break;
            case 7:
              storyPart = "romeSaved";
              break;
            case 8:
              storyPart = "austinSaved";
              break;
            case 9:
              storyPart = "mountainsSaved";
              break;
            case 0:
              storyPart = "woodSaved";
              break;
            case 1:
              storyPart = "win";
              playerDeath(true);
          }
          cutScene();
          renderStory(story[storyPart][0]);
          storyPageNumber = 0;
        } else {
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
      if (storyMode && !hasUfoBeenShot && !isGameOver) {
        storyPart = "ufoShot";
        cutScene();
        renderStory(story.ufoShot[0]);
        storyPageNumber = 0;
        hasUfoBeenShot = true;
      }
      setTimeout(() => {
        ufoActive = false;
        ufo.style.left = -16 * ufoWidth + "px";
        ufoShip.classList.remove("ufo-explosion");
      }, 500);
      setTimeout(() => {
        gameContainer.classList.remove("fade-red");
      }, 1000);
    }
    if (removeUfo) {
      voltage.pause();
      removeUfo = false;
      ufoActive = false;
      if (ufoGetPlayer) {
        ufo.removeChild(ufoBeam);
        ufo.insertAdjacentHTML("beforeend", `<div class="beam hidden"></div>`);
        ufoBeam = document.querySelector(".beam");
      }
      ufo.style.left = -16 * ufoWidth + "px";
    }
  }

  if (newPlayerBullet) {
    playerBullet.style.left = `${playerBulletLeft}px`;
    playerBullet.style.visibility = "visible";
    newPlayerBullet = false;
  }

  if (playerBulletRemoveMe) {
    playerBullet.style.visibility = "hidden";
    playerBulletRemoveMe = false;
    playerBulletOnScreen = false;
  } else {
    playerBullet.style.top = `${playerBulletTop}px`;
    playerBullet.style.left = `${playerBulletLeft}px`;
  }

  for (const [index, bulletElement] of alienBulletsElementArray.entries()) {
    let bullet = alienBulletsArray[index];
    if (bullet.removeMe) {
      bulletElement.element.remove();
      alienBulletsArray.splice(index, 1);
      alienBulletsElementArray.splice(index, 1);
      if (bullet.groundHit) {
        playBombEffect(bullet);
      }
    } else {
      bulletElement.element.style.top = bullet.top + "px";
    }
  }

  if (
    !ufoGetPlayer &&
    alienBulletsArray.length < maxAlienBullets &&
    Date.now() > alienBulletDue
  ) {
    const col = pickAColumn();
    if (col <= alienGridWidth) {
      alienBulletDue = Date.now() + (5000 * Math.random()) / alienRateOfFire;
      fireAlienBullet(col);
    }
  }
  if (ufoActive && !ufoToggleBeam && ufoGetPlayer) {
    ufoBeam.classList.remove("hidden");
  }

  for (const blockToChange of blocksToChange) {
    rock.currentTime = 0;
    rock.play();
    const i =
      12 * blockToChange.barrierNumber +
      4 * blockToChange.rowNumber +
      blockToChange.colNumber;
    const block = blocks[i];
    if (blockToChange.removeMe === true) {
      block.style.visibility = "hidden";
      blockVis[i] = false;
    } else {
      block.style.backgroundPositionX =
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
  if (isInCutScene) {
    return;
  }
  if (storyPart !== "beginning") {
    togglePauseThrottled();
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
    storyPart === "win" ||
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
  ${arr[1].split("\n\n").reduce((acc, el) => (acc += `<p>${el}</p>`), "")}
  </div>`;

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

  // if (source && source.playbackRate.value < 16) {
  //   source.playbackRate.value += musicSpeedIncreaseAmount * (frameDuration / 5000);
  // }

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
  ufoScorePointer++;
  if (ufoScorePointer > 14) {
    ufoScorePointer = 0;
  }
}

function playerBulletCollisions() {
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
          if (level % 10 < 6 || level > 7) {
            aliensStep += 10;
          } else {
            aliensStep += 7;
          }
          playerBulletRemoveMe = true;
          aliensRemaining--;
          let isLastOne = false;
          if (aliensRemaining < 1) {
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

  if (isInUfoCutScene) {
    return;
  }

  if (isInCutScene) {
    if (key === "t" || key === "T") {
      turnPageThrottled();
    }
    return;
  }

  if (isGameOver && (key === "n" || key === "N") && isScoreBoardShowing) {
    document.querySelector("#end-game-scoreboard-container").innerHTML = "";
    gameContainer.style.visibility = "visible";
    statsBar.style.display = "flex";
    pauseMenu.innerHTML = "";
    pauseMenu.classList.remove("pause-menu-modify");
    if (fadeOption) {
      pauseMenu.insertAdjacentHTML(
        "beforeend",
        `
      <div><span id="n">[N]ew game</span></div>
      <div><span id="c">[C]redits</span></div>
      <div><span id="f">[F]lash effect off</span></div>
      <div><span id="s"> [S]tory</span></div>
      <div><span id="a">[ANY OTHER KEY] to continue</span></div>
      `
      );
    } else {
      pauseMenu.insertAdjacentHTML(
        "beforeend",
        `
      <div><span id="n">[N]ew game</span></div>
      <div><span id="c">[C]redits</span></div>
      <div><span id="f">[F]lash effect on</span></div>
      <div><span id="s"> [S]tory</span></div>
      <div><span id="a">[ANY OTHER KEY] to continue</span></div>
      `
      );
    }
    togglePause();
    reset(true);
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
      if (displayCredits) {
        toggleCreditsThrottled();
      }
      pauseMenu.innerHTML = "";
      if (fadeOption) {
        pauseMenu.insertAdjacentHTML(
          "beforeend",
          `
        <div><span id="n">[N]ew game</span></div>
        <div><span id="c">[C]redits</span></div>
        <div><span id="f">[F]lash effect off</span></div>
        <div><span id="a">[ANY OTHER KEY] to continue</span></div>
        `
        );
      } else {
        pauseMenu.insertAdjacentHTML(
          "beforeend",
          `
        <div><span id="n">[N]ew game</span></div>
        <div><span id="c">[C]redits</span></div>
        <div><span id="f">[F]lash effect on</span></div>
        <div><span id="a">[ANY OTHER KEY] to continue</span></div>
        `
        );
      }
      storyPart = "beginning";
      cutScene();
      storyMode = true;
      storyPageNumber = -1;
      turnPageThrottled();
      return;
    }

    if (key === "n" || key === "N") {
      newGameThrottled();
    } else if (key === "f" || key === "F") {
      pauseMenu.innerHTML = "";
      toggleFlashEffectThrottled();
      if (fadeOption) {
        pauseMenu.insertAdjacentHTML(
          "beforeend",
          `
        <div><span id="n">[N]ew game</span></div>
        <div><span id="c">[C]redits</span></div>
        <div><span id="f">[F]lash effect off</span></div>
        <div><span id="s"> [S]tory</span></div>
        <div><span id="a">[ANY OTHER KEY] to continue</span></div>
        `
        );
      } else {
        pauseMenu.insertAdjacentHTML(
          "beforeend",
          `
        <div><span id="n">[N]ew game</span></div>
        <div><span id="c">[C]redits</span></div>
        <div><span id="f">[F]lash effect on</span></div>
        <div><span id="s"> [S]tory</span></div>
        <div><span id="a">[ANY OTHER KEY] to continue</span></div>
        `
        );
      }
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
    event.target.classList.add("opposite-beam");
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
  pauseMenu.style.display = "none";
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
        <input type="text" id="player-name" name="player-name" placeholder="TYPE NAME, HUMAN SCUM!" autocomplete="off" maxlength="24">
    </div>
</form>`
        : ``
    }
</div>
  `;
  overlay.insertAdjacentHTML("beforeend", html);
};

const showAndAddGameoverMenue = () => {
  pauseMenu.innerHTML = "";
  pauseMenu.style.display = "flex";
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
  gameContainer.style.visibility = "hidden";
  title.style.visibility = "hidden";
  pauseMenu.innerHTML = "";
  statsBar.style.display = "none";
  playerBullet.style.visibility = "hidden";
  gameOverView();
  if (score < Math.min(...scores.map((el) => el.score))) {
    document.getElementById("overlay").innerHTML = "";
    displayScoreboard(scores, message);
    showAndAddGameoverMenue();
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
    showAndAddGameoverMenue();
    isScoreBoardShowing = true;
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

const sendScore = async ({ playerName, score, second, minute }) => {
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

function addScore({ name, score, minutes, seconds }) {
  const time = formatTime(minutes, seconds);
  scores.push({ name, score, time });
  scores.sort((a, b) => b.score - a.score);
}

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

const updateScoresOnAdd = ({ playerName, score, second, minute }) => {
  const time = formatTime(minute, second);
  scores.push({ name: playerName, score: +score, time });
  scores.sort((a, b) => b.score - a.score);
};

const message = () => {
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

    callback({ playerName, score, second, minute });
  });
};

function displayScoreboard(scores, message) {
  if (currentPage > 1) return;
  console.log(score);
  const start = currentPage * 10 + 1;
  const end = start + 9;
  const container = document.getElementById("end-game-scoreboard-container");
  container.innerHTML = "";
  const header = document.createElement("h1");
  header.textContent = "High Scores";
  header.id = "high-scores-header";
  container.appendChild(header);

  const text = document.createElement("p");
  text.textContent = message();
  text.classList.add("message");
  container.appendChild(text);

  for (let i = start; i <= end; i++) {
    const { name, score, time } = scores[i - 1];

    const entry = document.createElement("div");
    entry.className = "score-entry";

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
