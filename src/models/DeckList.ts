import * as Yup from "yup";

import { Deck, initialDeck,validationDeckSchema } from "./Deck";

export type DeckList = {
  name: string;
  decks: Deck[];
};

export const initialDeckList: DeckList = {
  decks: [],
  name: "",
};

export const validationDeckListSchema: Yup.SchemaOf<DeckList> =
  Yup.object().shape({
    decks: Yup.array()
      .of(validationDeckSchema)
      .required("デッキを入力してください"),
    name: Yup.string().required("名前を入力してください"),
  });

export const createdDeckList: DeckList = {
  decks: [...Array(10)].map((_, index) => ({
    ...initialDeck,
    name: `デッキ ${index}`,
  })),
  name: "",
};
