import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, CardContent, CardHeader, IconButton, Stack, TextField } from "@mui/material";
import React, { FC } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { initialPokemon, Pokemon, validationPokemonSchema } from "../../models/Pokemon";
import { RenderCount } from "../RenderCount";

type FormValues = { pokemons: Pokemon[] };

const initialValues: FormValues = { pokemons: [] };

export type PokemonFormProps = {
  values?: FormValues;
};
export const PokemonForm: FC<PokemonFormProps> = ({ values = initialValues }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(validationPokemonSchema),
    values,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pokemons",
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Stack alignItems="center" direction="row" spacing={2}>
        <RenderCount />

        <Button onClick={() => append(initialPokemon)} size="large" variant="outlined">
          新規追加（フォーカスする）
        </Button>

        <Button onClick={() => append(initialPokemon, { shouldFocus: false })} size="large" variant="outlined">
          新規追加（フォーカスしない）
        </Button>

        <Button onClick={() => reset()} size="large" variant="outlined">
          リセット
        </Button>
      </Stack>

      <form onSubmit={handleSubmit(console.log)}>
        {fields.map((field, index) => {
          const title = `${index}匹目のポケモン`;

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
                  <RenderCount />

                  <Box sx={{ mt: 2 }}>
                    <Controller
                      control={control}
                      defaultValue={field.id}
                      name={`pokemons.${index}.id`}
                      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                        <TextField
                          error={invalid}
                          helperText={error?.message}
                          inputRef={ref}
                          label="ID"
                          onBlur={onBlur}
                          onChange={onChange}
                          type="number"
                          value={value || ""}
                        />
                      )}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </form>
    </Box>
  );
};
