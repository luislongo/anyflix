export function generateRandomArray(length: number, min: number, max: number): number[] {
  if (max - min + 1 < length) {
    throw new Error("Range is smaller than the desired length of the array.");
  }

  const range = Array.from({ length: max - min + 1 }, (_, index) => index + min);
  const randomArray: number[] = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * range.length);
    const [chosenNum] = range.splice(randomIndex, 1);
    randomArray.push(chosenNum);
  }

  return randomArray;
}





