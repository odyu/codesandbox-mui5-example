import * as Yup from "yup";

import { FormValues } from "../components/ReactHookForm/PokemonForm";

export const pokemonTypes = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
] as const;

type PokemonType = (typeof pokemonTypes)[number];

export type PokemonName = {
  chinese: string;
  english: string;
  french: string;
  japanese: string;
};

export type Pokemon = {
  id: number;
  isSupportI18n: boolean;
  name: PokemonName;
  base: {
    attack: number;
    defense: number;
    hp: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
  type: PokemonType[];
};

export const pokemonData200 = require("../data/pokemon.json") as unknown as Pokemon[];

export const initialPokemon: Pokemon = {
  base: {
    attack: 0,
    defense: 0,
    hp: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
  },
  id: 0,
  isSupportI18n: true,
  name: {
    chinese: "",
    english: "",
    french: "",
    japanese: "",
  },
  type: [],
};

export const validationPokemonSchema: Yup.SchemaOf<Pokemon> = Yup.object()
  .shape({
    base: Yup.object()
      .shape({
        attack: Yup.number().typeError("数値を入力してください").required("攻撃力を入力してください"),
        defense: Yup.number().typeError("数値を入力してください").required("防御力を入力してください"),
        hp: Yup.number().typeError("数値を入力してください").required("HPを入力してください"),
        spAttack: Yup.number().typeError("数値を入力してください").required("特殊攻撃力を入力してください"),
        spDefense: Yup.number().typeError("数値を入力してください").required("特殊防御力を入力してください"),
        speed: Yup.number().typeError("数値を入力してください").required("すばやさを入力してください"),
      })
      .required(),
    id: Yup.number().required("IDを入力してください").min(1, "IDを入力してください"),
    isSupportI18n: Yup.boolean().required("i18n対応を選択してください"),
    // FIXME: クロスバリデーションの場合は `when` を使用するが、objectのnestが多い場合は `test` を使うべき
    name: Yup.mixed()
      .when("isSupportI18n", {
        is: true,
        then: Yup.object()
          .shape({
            chinese: Yup.string().required("名前（中国語）を入力してください"),
            english: Yup.string().required("名前（英語）を入力してください"),
            french: Yup.string().required("名前（フランス語）を入力してください"),
            japanese: Yup.string().required("名前（日本語）を入力してください"),
          })
          .required(),
      })
      .when("isSupportI18n", {
        is: false,
        then: Yup.object()
          .shape({
            japanese: Yup.string().required("名前（日本語）を入力してください"),
          })
          .required(),
      }),
    type: Yup.array()
      .of(
        Yup.mixed()
          .oneOf([...pokemonTypes])
          .required()
      )
      .min(1, "属性を１つ以上選択してください")
      .required("属性を選択してください"),
  })
  .required();

export const validationSchema: Yup.SchemaOf<FormValues> = Yup.object().shape({
  pokemons: Yup.array().of(validationPokemonSchema).required(),
});
