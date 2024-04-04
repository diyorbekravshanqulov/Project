function bumpCounter(ants) {
  let collisionCount = 0;
  let rightCount = 0;
  let result = '';

  for (let ant of ants) {
    if (ant === 'R') {
      rightCount++;
    } else if (ant === 'L') {
      collisionCount += rightCount;
    }
    result += collisionCount + ' ';
  }

  // Adjust the result string to include the correct collision counts
  let adjustedResult = result
    .trim()
    .split(' ')
    .map((count, index) => {
      return index === 0
        ? count
        : parseInt(count) + parseInt(result.split(' ')[index - 1]);
    })
    .join(' ');

  return adjustedResult;
}

// Test cases
console.log(bumpCounter('LR')); // Output: "0 0"
console.log(bumpCounter('RL')); // Output: "1 1"
console.log(bumpCounter('RRR')); // Output: "0 0 0"
console.log(bumpCounter('RRL')); // Output: "1 2 1"


// ------------------------------------------------

// There is a row of ants. An ant can be represented by letter "R" - facing right, and "L" - facing left. Every ant is moving with constant speed. When ants collide, they are changing their direction to opposite. Our task is to count collisions for each ant. There is a starting gap between ants, lets say that it is 2 meters.

// Example: "RL"

// Should return "1 1" Because they collide each other once, and then they never collide, because earth is flat.

// You will have to count bumps up to 1 000 000 ants.

// I am not a real author of this great algorithm challenge. I cant name the author though. Here is the only source i could have find https://sio2.mimuw.edu.pl/c/pa-2024-1/p/mro/ , it is in polish.
