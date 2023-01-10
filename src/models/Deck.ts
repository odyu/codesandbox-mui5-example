import { IPokemon } from "pokeapi-typescript";
import * as Yup from "yup";

export const STATUSES = ["enabled", "disabled", "drafted"];

export type Status = typeof STATUSES[number];

export const toStatusName = (status: Status): string => {
  switch (status) {
    case "enabled":
      return "利用中";
    case "disabled":
      return "利用しない";
    case "drafted":
      return "作成中";
    default:
      return "";
  }
};

export type Deck = {
  name: string;
  description: string;
  status: Status;
  pokemonIds: Array<IPokemon["id"]>;
};

export const initialDeck: Deck = {
  name: "",
  description: "",
  status: "",
  pokemonIds: []
};

export const validationDeckSchema: Yup.SchemaOf<Deck> = Yup.object().shape({
  name: Yup.string().required("名前を入力してください"),
  description: Yup.string().required("説明を入力してください"),
  status: Yup.mixed()
    .oneOf(STATUSES, "ステータスを選択してください")
    .required("ステータスを選択してください"),
  pokemonIds: Yup.array()
    .of(Yup.number().required("ポケモンを選択してください"))
    .min(1, "ポケモンを１つ以上選択してください")
    .required("ポケモンを選択してください")
});
