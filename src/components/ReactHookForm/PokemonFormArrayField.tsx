import { Stack } from "@mui/material";
import React, { FC } from "react";
import { Control, useWatch } from "react-hook-form";

import { pokemonTypes } from "../../models/Pokemon";
import { RenderCount } from "../RenderCount";
import { CheckboxField } from "./CheckboxField";
import { ComboCheckboxField } from "./ComboCheckboxField";
import { InputTextField } from "./InputTextField";
import { FormValues } from "./PokemonForm";

export type PokemonFormArrayFieldProps = {
  index: number;
  control: Control<FormValues>;
};
export const PokemonFormArrayField: FC<PokemonFormArrayFieldProps> = ({ index, control }) => {
  // FIXME: 入力値を参照するためにはコンポーネントを分割してhook(useWatch)を設定する必要があり
  const isSupportI18n = useWatch({ control, name: `pokemons.${index}.isSupportI18n` });

  return (
    <>
      <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
        <div>
          <RenderCount />
          <div>&nbsp;</div>
        </div>

        <InputTextField control={control} label="ID" name={`pokemons.${index}.id`} type="number" />

        <CheckboxField control={control} label="i18n対応" name={`pokemons.${index}.isSupportI18n`} row={true} />
      </Stack>

      <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
        <InputTextField control={control} label="名前（日本語）" name={`pokemons.${index}.name.japanese`} type="text" />

        {isSupportI18n && (
          <>
            <InputTextField
              control={control}
              label="名前（英語）"
              name={`pokemons.${index}.name.english`}
              type="text"
            />

            <InputTextField
              control={control}
              label="名前（中国語）"
              name={`pokemons.${index}.name.chinese`}
              type="text"
            />

            <InputTextField
              control={control}
              label="名前（フランス語）"
              name={`pokemons.${index}.name.french`}
              type="text"
            />
          </>
        )}
      </Stack>

      <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
        <InputTextField control={control} label="攻撃力" name={`pokemons.${index}.base.attack`} type="number" />

        <InputTextField control={control} label="防御力" name={`pokemons.${index}.base.defense`} type="number" />

        <InputTextField control={control} label="HP" name={`pokemons.${index}.base.hp`} type="number" />
      </Stack>

      <ComboCheckboxField control={control} label="タイプ" name={`pokemons.${index}.type`} options={pokemonTypes} />
    </>
  );
};
