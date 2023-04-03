import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, CardContent, CardHeader, IconButton, Paper, Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { useOnSubmit } from "../../hooks/useOnSubmit";
import { AppLayout } from "../../layouts/AppLayout";
import { initialPokemon, Pokemon, validationSchema } from "../../models/Pokemon";
import { RenderCount } from "../RenderCount";
import { PokemonFormArrayField } from "./PokemonFormArrayField";

export type FormValues = { pokemons: Pokemon[] };

const initialValues: FormValues = { pokemons: [] };

export type PokemonFormProps = {
  values?: FormValues;
  loading?: boolean;
};
export const PokemonForm: FC<PokemonFormProps> = ({ values = initialValues, loading }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
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

  useEffect(() => {
    if (loading) return;

    // FIXME: 非同期読み込みのときはresetで値をセットする必要がある
    // See: https://react-hook-form.com/api/useform/reset/#rules
    reset(values);
  }, [loading, reset, values]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppLayout
        header={
          <Stack alignItems="center" direction="row" spacing={2}>
            <RenderCount />

            <Button
              disabled={isProcessing}
              onClick={() =>
                append(
                  {
                    ...initialPokemon,
                    id: fields.length + 1,
                  },
                  { focusIndex: fields.length, shouldFocus: true }
                )
              }
              size="large"
              variant="outlined"
            >
              新規追加（フォーカスする）
            </Button>

            <Button
              disabled={isProcessing}
              onClick={() =>
                append(
                  {
                    ...initialPokemon,
                    id: fields.length + 1,
                  },
                  { shouldFocus: false }
                )
              }
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
        <RenderCount />

        {Object.keys(errors).length > 0 && (
          <Paper component="pre" sx={{ maxHeight: 120, overflowY: "scroll", p: 2 }}>
            {JSON.stringify(errors, null, "\t")}
          </Paper>
        )}
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
      </AppLayout>
    </form>
  );
};
