export function move<T = unknown>(arr: Array<T>, oldIndex: number, newIndex: number) {
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}

interface Orderable {
  order: number;
}

export function moveWithOrder<T extends Orderable>(arr: T[], oldIndex: number, newIndex: number): T[] {
  const elementToMove = arr[oldIndex];
  const movedArray = [...arr];

  movedArray.splice(oldIndex, 1);
  movedArray.splice(newIndex, 0, elementToMove);

  movedArray.forEach((element, index) => {
    element.order = index + 1;
  });

  return movedArray;
}
