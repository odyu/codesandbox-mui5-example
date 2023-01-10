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
import { FC, useCallback } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { RenderCount } from "../components/RenderCount";
import { initialDeck, STATUSES, toStatusName } from "../models/Deck";
import {
  createdDeckList,
  DeckList,
  initialDeckList,
  validationDeckListSchema,
} from "../models/DeckList";

export const ReactHookForm2Page: FC = () => {
  const { control, handleSubmit, reset } = useForm<DeckList>({
    defaultValues: initialDeckList,
    mode: "all",
    resolver: yupResolver(validationDeckListSchema),
  });

  const {
    fields: decks,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "decks",
  });

  const appendDeck = useCallback(() => append(initialDeck), [append]);

  const resetDeckList = useCallback(() => reset(initialDeckList), [reset]);

  const loadDeckList = useCallback(
    (count: number) => () =>
      reset({
        ...createdDeckList,
        decks: createdDeckList.decks.slice(count),
      }),
    [reset]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stack alignItems="center" direction="row" spacing={2}>
        <RenderCount />

        <Button onClick={loadDeckList(10)} size="large" variant="outlined">
          デッキ 10 読込
        </Button>

        <Button onClick={loadDeckList(100)} size="large" variant="outlined">
          デッキ 100 読込
        </Button>

        <Button onClick={loadDeckList(500)} size="large" variant="outlined">
          デッキ 500 読込
        </Button>
      </Stack>

      <form onSubmit={handleSubmit(console.log)}>
        <Box sx={{ mt: 4 }}>
          <Controller
            control={control}
            name="name"
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                inputRef={ref}
                label="名前"
                onBlur={onBlur}
                onChange={onChange}
                value={value || ""}
              />
            )}
          />
        </Box>

        <ButtonGroup fullWidth size="large" sx={{ mt: 4 }} variant="contained">
          <Button onClick={appendDeck}>デッキ追加</Button>
          <Button onClick={resetDeckList}>リセット</Button>
          <Button type="submit">サブミット</Button>
        </ButtonGroup>

        {decks.map((deck, index) => {
          const deckTitle = `デッキ ${index}`;

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
                      defaultValue={deck.name}
                      name={`decks.${index}.name`}
                      render={({
                        field: { value, onChange, onBlur, ref },
                        fieldState: { invalid, error },
                      }) => (
                        <TextField
                          error={invalid}
                          helperText={error?.message}
                          inputRef={ref}
                          label="デッキ名"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value || ""}
                        />
                      )}
                    />
                  </Box>

                  <Controller
                    control={control}
                    defaultValue={deck.description}
                    name={`decks.${index}.description`}
                    render={({
                      field: { value, onChange, onBlur, ref },
                      fieldState: { invalid, error },
                    }) => (
                      <TextField
                        error={invalid}
                        helperText={error?.message}
                        inputRef={ref}
                        label="デッキ説明"
                        multiline
                        onBlur={onBlur}
                        onChange={onChange}
                        rows={4}
                        sx={{ mt: 2 }}
                        value={value || ""}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    defaultValue={deck.status}
                    name={`decks.${index}.status`}
                    render={({
                      field: { value, onChange, onBlur, ref },
                      fieldState: { invalid, error },
                    }) => (
                      <FormControl error={invalid} sx={{ mt: 2 }}>
                        <FormLabel
                          error={invalid}
                          id={`decks-${index}-status-label`}
                        >
                          ステータス
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby={`decks-${index}-status-label`}
                          name={`decks.${index}.status`}
                          onBlur={onBlur}
                          onChange={onChange}
                          row
                          value={value || ""}
                        >
                          {STATUSES.map((status) => (
                            <FormControlLabel
                              control={<Radio />}
                              key={status}
                              label={toStatusName(status)}
                              value={status}
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
