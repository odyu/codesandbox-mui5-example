import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import PokeAPI from "pokeapi-typescript";
import { FC, useCallback, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { RenderCount } from "../components/RenderCount";
import { Pokemons, usePokemons } from "../hooks/usePokemons";
import { initialDeck, STATUSES, toStatusName } from "../models/Deck";
import {
  createdDeckList,
  DeckList,
  initialDeckList,
  validationDeckListSchema,
} from "../models/DeckList";

type FormValues = { pokemons: Pokemons };

const defaultValues: FormValues = { pokemons: [] };

export const ReactHookFormPage: FC = () => {
  const [loadCount, setLoadCount] = useState(0);

  const pokemons = usePokemons({ count: loadCount });

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    mode: "all",
    resolver: yupResolver(validationDeckListSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pokemons",
  });

  const appendDeck = useCallback(() => {
    PokeAPI.Pokemon.fetch(25).then((newPokemon) => {
      append({
        name: newPokemon.name,
        url: "",
      });
    });
  }, [append]);

  const resetDeckList = useCallback(() => reset(defaultValues), [reset]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack alignItems="center" direction="row" spacing={2}>
        <RenderCount />

        <Button
          onClick={() => setLoadCount(10)}
          size="large"
          variant="outlined"
        >
          デッキ 10 読込
        </Button>

        <Button
          onClick={() => setLoadCount(100)}
          size="large"
          variant="outlined"
        >
          デッキ 100 読込
        </Button>

        <Button
          onClick={() => setLoadCount(500)}
          size="large"
          variant="outlined"
        >
          デッキ 500 読込
        </Button>
      </Stack>

      <form onSubmit={handleSubmit(console.log)}>
        <ButtonGroup fullWidth size="large" sx={{ mt: 4 }} variant="contained">
          <Button onClick={appendDeck}>デッキ追加</Button>
          <Button onClick={resetDeckList}>リセット</Button>
          <Button type="submit">サブミット</Button>
        </ButtonGroup>

        {fields.map((field, index) => {
          const deckTitle = `ポケモン ${index}`;

          return (
            <Box key={index} sx={{ mt: 4 }}>
              <Card>
                <CardHeader
                  action={
                    <IconButton
                      onClick={() => remove(index)}
                      title={`${deckTitle}を削除`}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  subheader={deckTitle}
                />
                <CardContent>
                  <RenderCount />

                  <Box sx={{ mt: 2 }}>
                    <Controller
                      control={control}
                      defaultValue={field.name}
                      name={`pokemons.${index}.name`}
                      render={({
                        field: { value, onChange, onBlur, ref },
                        fieldState: { invalid, error },
                      }) => (
                        <TextField
                          error={invalid}
                          helperText={error?.message}
                          inputRef={ref}
                          label="ポケモン名"
                          onBlur={onBlur}
                          onChange={onChange}
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
