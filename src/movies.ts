export type Movie = {
    name: string;
    price: number;
    seats: boolean[][];
  };
  
  export const movies: Movie[] = [
    {
      name: "Avengers: Endgame",
      price: 10,
      seats: [
        [true, true, true, false, true, true, true, true],
        [true, true, true, true, false, true, true, true],
        [true, true, true, true, true, true, false, true],
        [true, true, true, true, false, true, true, true],
      ],
    },
  ];
  