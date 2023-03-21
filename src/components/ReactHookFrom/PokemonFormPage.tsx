import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, CardContent, CardHeader, IconButton, Stack } from "@mui/material";
import React, { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";

import { useOnSubmit } from "../../hooks/useOnSubmit";
import { AppLayout } from "../../layouts/AppLayout";
import { initialPokemon, Pokemon, validationPokemonSchema } from "../../models/Pokemon";
import { RenderCount } from "../RenderCount";
import { PokemonFormArrayField } from "./PokemonFormArrayField";

export type FormValues = { pokemons: Pokemon[] };

const initialValues: FormValues = { pokemons: [] };

const validationSchema: Yup.SchemaOf<FormValues> = Yup.object().shape({
  pokemons: Yup.array().of(validationPokemonSchema).required(),
});

export type PokemonFormPageProps = {
  values?: FormValues;
};
export const PokemonFormPage: FC<PokemonFormPageProps> = ({ values = initialValues }) => {
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

  return (
    <AppLayout
      header={
        <Stack alignItems="center" direction="row" spacing={2}>
          <RenderCount />

          <Button
            disabled={isProcessing}
            onClick={() => append(initialPokemon, { focusIndex: fields.length, shouldFocus: true })}
            size="large"
            variant="outlined"
          >
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

          <Button disabled={isProcessing} onClick={() => reset()} size="large" variant="outlined">
            リセット
          </Button>

          <Button disabled={isProcessing} size="large" type="submit" variant="contained">
            保存する
          </Button>
        </Stack>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const title = `${index + 1}匹目のポケモン`;

          const onRemove = () => {
            remove(index);
          };

          // FIXME: indexにすると画面描画が適切にされない
          const key = field.id;

          return (
            <Box key={key} sx={{ mt: 4 }}>
              <Card>
                <CardHeader
                  action={
                    <IconButton onClick={onRemove} title={`${title}を削除`}>
                      <CloseIcon />
                    </IconButton>
                  }
                  subheader={title}
                />
                <CardContent>
                  <PokemonFormArrayField control={control} index={index} />
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </form>
    </AppLayout>
  );
};
