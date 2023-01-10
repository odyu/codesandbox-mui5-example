import { Deck, validationDeckSchema, initialDeck } from "./Deck";
import * as Yup from "yup";

export type DeckList = {
  name: string;
  decks: Deck[];
};

export const initialDeckList: DeckList = {
  name: "",
  decks: []
};

export const validationDeckListSchema: Yup.SchemaOf<DeckList> = Yup.object().shape(
  {
    name: Yup.string().required("名前を入力してください"),
    decks: Yup.array()
      .of(validationDeckSchema)
      .required("デッキを入力してください")
  }
);

export const createdDeckList: DeckList = {
  name: "",
  decks: [...Array(10)].map((_, index) => ({
    ...initialDeck,
    name: `デッキ ${index}`
  }))
};
