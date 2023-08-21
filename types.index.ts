export type Variation = {
  name: string,
  variations: Variation[] | []
};

export type QueryResponse = {
  name: string
}[];