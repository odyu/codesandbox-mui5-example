import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, CardContent, CardHeader, IconButton, Stack } from "@mui/material";
import React, { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";

import { useOnSubmit } from "../../hooks/useOnSubmit";
import { initialPokemon, Pokemon, validationPokemonSchema } from "../../models/Pokemon";
import { CircularLoading } from "../CircularLoading";
import { RenderCount } from "../RenderCount";
import { InputTextField } from "./InputTextField";

type FormValues = { pokemons: Pokemon[] };

const initialValues: FormValues = { pokemons: [] };

const validationSchema: Yup.SchemaOf<FormValues> = Yup.object().shape({
  pokemons: Yup.array().of(validationPokemonSchema).required(),
});

export type PokemonFormProps = {
  values?: FormValues;
  loading?: boolean;
};
export const PokemonForm: FC<PokemonFormProps> = ({ values = initialValues, loading }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialValues,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    values,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pokemons",
  });

  const { onSubmit, isProcessing } = useOnSubmit();

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <CircularLoading />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems="center" direction="row" spacing={2}>
          <RenderCount />

          <Button disabled={isProcessing} onClick={() => append(initialPokemon)} size="large" variant="outlined">
            新規追加（フォーカスする）
          </Button>

          <Button
            disabled={isProcessing}
            onClick={() => append(initialPokemon, { shouldFocus: false })}
            size="large"
            variant="outlined"
          >
            新規追加（フォーカスしない）
          </Button>

          <Button disabled={isProcessing} size="large" type="submit" variant="outlined">
            保存する
          </Button>

          <Button disabled={isProcessing} onClick={() => reset()} size="large" variant="outlined">
            リセット
          </Button>
        </Stack>

        {fields.map((field, index) => {
          const title = `${index + 1}匹目のポケモン`;

          return (
            <Box key={index} sx={{ mt: 4 }}>
              <Card>
                <CardHeader
                  action={
                    <IconButton onClick={() => remove(index)} title={`${title}を削除`}>
                      <CloseIcon />
                    </IconButton>
                  }
                  subheader={title}
                />
                <CardContent>
                  <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
                    <RenderCount />

                    <InputTextField control={control} label="ID" name={`pokemons.${index}.id`} type="number" />
                  </Stack>

                  <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
                    <InputTextField
                      control={control}
                      label="名前（日本語）"
                      name={`pokemons.${index}.name.japanese`}
                      type="text"
                    />
                  </Stack>

                  <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
                    <InputTextField
                      control={control}
                      label="攻撃力"
                      name={`pokemons.${index}.base.attack`}
                      type="number"
                    />

                    <InputTextField
                      control={control}
                      label="防御力"
                      name={`pokemons.${index}.base.defense`}
                      type="number"
                    />

                    <InputTextField control={control} label="HP" name={`pokemons.${index}.base.hp`} type="number" />
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </form>
    </Box>
  );
};
