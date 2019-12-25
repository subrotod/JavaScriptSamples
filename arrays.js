// Array functions
// Array.indexOf and Array.includes
const characters = [
    'ironman',
    'black_widow',
    'hulk',
    'captain_america',
    'hulk',
    'thor',
  ];
  
console.log(characters.indexOf('hulk'));  // 2
console.log(characters.indexOf('batman'));  // -1

// Array.includes if you want a boolen result
console.log(characters.includes('hulk'));  // true  
console.log(characters.includes('batman'));  // false

// Array.filter requires a callback argument and returns the value
//  of all elements satisfying this callback. 
  
// Array.filter requires traversing the whole array
const characters = [
    { id: 1, name: 'ironman' },
    { id: 2, name: 'black_widow' },
    { id: 3, name: 'captain_america' },
    { id: 4, name: 'captain_america' },
];
  
function getCharacter(name) {
    return character => character.name === name; // this is 
}
  
console.log(characters.filter(getCharacter('captain_america')));
  // [
  //   { id: 3, name: 'captain_america' },
  //   { id: 4, name: 'captain_america' },
  // ]

// Array.find Array.find. It requires a callback argument like Array.filter, and it returns the value
// of the first element satisfying this callback. Furthermore, Array.find stops as soon as an item 
// satisfies the callback 
console.log(characters.find(getCharacter('captain_america')));   // { id: 3, name: 'captain_america' }

// Array.some returns a boolean instead of the value. Think of it as the boolean equivalent of Array.find
const characters = [
    { id: 1, name: 'ironman', env: 'marvel' },
    { id: 2, name: 'black_widow', env: 'marvel' },
    { id: 3, name: 'wonder_woman', env: 'dc_comics' },
  ];
  
  function hasCharacterFrom(env) {
    return character => character.env === env;
  }
  
  console.log(characters.find(hasCharacterFrom('marvel')));  // { id: 1, name: 'ironman', env: 'marvel' }
  console.log(characters.some(hasCharacterFrom('marvel')));  // true

 // Array.reduce allows us to filter and add the satisfying items into an accumulator. As an example, this 
 // accumulator can be a number to increment, an object to fill, a string or an array to concat. 

 const characters = [
    { name: 'ironman', env: 'marvel' },
    { name: 'black_widow', env: 'marvel' },
    { name: 'wonder_woman', env: 'dc_comics' },
  ];
  
  console.log(
    characters
      .filter(character => character.env === 'marvel')
      .map(character => Object.assign({}, character, { alsoSeenIn: ['Avengers'] }))
  );
  // [
  //   { name: 'ironman', env: 'marvel', alsoSeenIn: ['Avengers'] },
  //   { name: 'black_widow', env: 'marvel', alsoSeenIn: ['Avengers'] }
  // ]
  
  console.log(
    characters
      .reduce((acc, character) => {
        return character.env === 'marvel'
          ? acc.concat(Object.assign({}, character, { alsoSeenIn: ['Avengers'] }))
          : acc;
      }, [])
  )
  // [
  //   { name: 'ironman', env: 'marvel', alsoSeenIn: ['Avengers'] },
  //   { name: 'black_widow', env: 'marvel', alsoSeenIn: ['Avengers'] }
  // ]



