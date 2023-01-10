import { FC, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  ButtonGroup,
  FormHelperText,
  Stack
} from "@mui/material";
import { RenderCount } from "../components/RenderCount";
import { initialDeck, STATUSES, toStatusName } from "../models/Deck";
import {
  createdDeckList,
  DeckList,
  initialDeckList,
  validationDeckListSchema
} from "../models/DeckList";

import { useFieldArray, Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePokemons } from "../hooks/usePokemons";

export const ReactHookFormPage: FC<RouteComponentProps<{}>> = () => {
  const { control, handleSubmit, reset } = useForm<DeckList>({
    defaultValues: initialDeckList,
    resolver: yupResolver(validationDeckListSchema),
    mode: "all"
  });

  const { fields: decks, append, remove } = useFieldArray({
    control,
    name: "decks"
  });

  const appendDeck = useCallback(() => append(initialDeck), [append]);

  const resetDeckList = useCallback(() => reset(initialDeckList), [reset]);

  const loadDeckList = useCallback(
    (count: number) => () =>
      reset({
        ...createdDeckList,
        decks: createdDeckList.decks.slice(count)
      }),
    [reset]
  );

  const pokemons = usePokemons({ count: 10 });

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <RenderCount />

        <Button variant="outlined" size="large" onClick={loadDeckList(10)}>
          デッキ 10 読込
        </Button>

        <Button variant="outlined" size="large" onClick={loadDeckList(100)}>
          デッキ 100 読込
        </Button>

        <Button variant="outlined" size="large" onClick={loadDeckList(500)}>
          デッキ 500 読込
        </Button>
      </Stack>

      <form onSubmit={handleSubmit(console.log)}>
        <Box sx={{ mt: 4 }}>
          <Controller
            name="name"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { invalid, error }
            }) => (
              <TextField
                value={value || ""}
                onChange={onChange}
                label="名前"
                error={invalid}
                onBlur={onBlur}
                helperText={error?.message}
                inputRef={ref}
              />
            )}
          />
        </Box>

        <ButtonGroup variant="contained" size="large" fullWidth sx={{ mt: 4 }}>
          <Button onClick={appendDeck}>デッキ追加</Button>
          <Button onClick={resetDeckList}>リセット</Button>
          <Button type="submit">サブミット</Button>
        </ButtonGroup>

        {decks.map((deck, index) => {
          const deckTitle = `デッキ ${index}`;

          return (
            <Box sx={{ mt: 4 }} key={index}>
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
                      name={`decks.${index}.name`}
                      control={control}
                      defaultValue={deck.name}
                      render={({
                        field: { value, onChange, onBlur, ref },
                        fieldState: { invalid, error }
                      }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          label="デッキ名"
                          error={invalid}
                          onBlur={onBlur}
                          helperText={error?.message}
                          inputRef={ref}
                        />
                      )}
                    />
                  </Box>

                  <Controller
                    name={`decks.${index}.description`}
                    control={control}
                    defaultValue={deck.description}
                    render={({
                      field: { value, onChange, onBlur, ref },
                      fieldState: { invalid, error }
                    }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        label="デッキ説明"
                        error={invalid}
                        multiline
                        rows={4}
                        onBlur={onBlur}
                        helperText={error?.message}
                        inputRef={ref}
                        sx={{ mt: 2 }}
                      />
                    )}
                  />

                  <Controller
                    name={`decks.${index}.status`}
                    control={control}
                    defaultValue={deck.status}
                    render={({
                      field: { value, onChange, onBlur, ref },
                      fieldState: { invalid, error }
                    }) => (
                      <FormControl sx={{ mt: 2 }} error={invalid}>
                        <FormLabel
                          id={`decks-${index}-status-label`}
                          error={invalid}
                        >
                          ステータス
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby={`decks-${index}-status-label`}
                          name={`decks.${index}.status`}
                          value={value || ""}
                          onBlur={onBlur}
                          onChange={onChange}
                        >
                          {STATUSES.map((status) => (
                            <FormControlLabel
                              key={status}
                              value={status}
                              control={<Radio />}
                              label={toStatusName(status)}
                            />
                          ))}
                        </RadioGroup>
                        <FormHelperText>{error?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </form>
    </Box>
  );
};
