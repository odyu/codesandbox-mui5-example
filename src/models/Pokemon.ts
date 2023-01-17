import * as Yup from "yup";

export type PokemonType = "Grass" | "Poison" | "Fire";

export type Pokemon = {
  id: number;
  name: {
    chinese: string;
    english: string;
    french: string;
    japanese: string;
  };
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

export const pokemonData = require("../data/pokemon.json") as unknown as Pokemon[];

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
        attack: Yup.number().required("攻撃力を入力してください"),
        defense: Yup.number().required("防御力を入力してください"),
        hp: Yup.number().required("HPを入力してください"),
        spAttack: Yup.number().required("特殊攻撃力を入力してください"),
        spDefense: Yup.number().required("特殊防御力を入力してください"),
        speed: Yup.number().required("すばやさを入力してください"),
      })
      .required(),
    id: Yup.number().required("IDを入力してください"),
    name: Yup.object()
      .shape({
        chinese: Yup.string().required("名前（中国語）を入力してください"),
        english: Yup.string().required("名前（英語）を入力してください"),
        french: Yup.string().required("名前（フランス語）を入力してください"),
        japanese: Yup.string().required("名前（日本語）を入力してください"),
      })
      .required(),
    type: Yup.array()
      .of(Yup.mixed().oneOf(["Grass", "Poison", "Fire"]).required())
      .min(1, "属性を１つ以上選択してください")
      .required("属性を選択してください"),
  })
  .required();
