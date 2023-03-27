import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Card, CardContent, CardHeader, IconButton, Paper, Stack } from "@mui/material";
import { FieldArray, Formik, FormikConfig } from "formik";
import React, { FC, useCallback } from "react";

import { AppLayout } from "../../layouts/AppLayout";
import { initialPokemon, Pokemon, pokemonTypes, validationSchema } from "../../models/Pokemon";
import { sleep } from "../../utils/sleep";
import { RenderCount } from "../RenderCount";
import { CheckboxField } from "./CheckboxField";
import { ComboCheckboxField } from "./ComboCheckboxField";
import { InputTextField } from "./InputTextField";

export type FormValues = { pokemons: Pokemon[] };

const initialValues: FormValues = { pokemons: [] };

export type PokemonFormProps = {
  values?: FormValues;
  loading?: boolean;
};
export const PokemonForm: FC<PokemonFormProps> = ({ values = initialValues, loading }) => {
  const onSubmit = useCallback<FormikConfig<FormValues>["onSubmit"]>(async (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log("onSubmit", values);
    await sleep(1000);
    setSubmitting(false);
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="pokemons"
            render={(arrayHelpers) => (
              <AppLayout
                header={
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <RenderCount />

                    <Button
                      disabled={formik.isSubmitting}
                      onClick={() =>
                        arrayHelpers.push({
                          ...initialPokemon,
                          id: formik.values.pokemons.length + 1,
                        })
                      }
                      size="large"
                      variant="outlined"
                    >
                      新規追加
                    </Button>

                    <Button
                      disabled={formik.isSubmitting}
                      onClick={() => formik.resetForm()}
                      size="large"
                      variant="outlined"
                    >
                      リセット
                    </Button>

                    <Button disabled={formik.isSubmitting} size="large" type="submit" variant="contained">
                      保存する
                    </Button>
                  </Stack>
                }
              >
                {Object.keys(formik.errors).length > 0 && (
                  <Paper component="pre" sx={{ maxHeight: 120, overflowY: "scroll", p: 2 }}>
                    {JSON.stringify(formik.errors, null, "\t")}
                  </Paper>
                )}
                {formik.values.pokemons.map((pokemon, index) => {
                  const title = `${index + 1}匹目のポケモン`;

                  const onRemove = () => {
                    arrayHelpers.remove(index);
                  };

                  return (
                    <Box key={index} sx={{ mt: 4 }}>
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
                          <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
                            <div>
                              <RenderCount />
                              <div>&nbsp;</div>
                            </div>

                            <InputTextField label="ID" name={`pokemons.${index}.id`} type="number" />

                            <CheckboxField label="i18n対応" name={`pokemons.${index}.isSupportI18n`} row={true} />
                          </Stack>

                          <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
                            <InputTextField
                              label="名前（日本語）"
                              name={`pokemons.${index}.name.japanese`}
                              type="text"
                            />

                            {pokemon.isSupportI18n && (
                              <>
                                <InputTextField
                                  label="名前（英語）"
                                  name={`pokemons.${index}.name.english`}
                                  type="text"
                                />

                                <InputTextField
                                  label="名前（中国語）"
                                  name={`pokemons.${index}.name.chinese`}
                                  type="text"
                                />

                                <InputTextField
                                  label="名前（フランス語）"
                                  name={`pokemons.${index}.name.french`}
                                  type="text"
                                />
                              </>
                            )}
                          </Stack>

                          <Stack alignItems="center" flexDirection="row" gap={2} py={1}>
                            <InputTextField label="攻撃力" name={`pokemons.${index}.base.attack`} type="number" />

                            <InputTextField label="防御力" name={`pokemons.${index}.base.defense`} type="number" />

                            <InputTextField label="HP" name={`pokemons.${index}.base.hp`} type="number" />
                          </Stack>

                          <ComboCheckboxField label="タイプ" name={`pokemons.${index}.type`} options={pokemonTypes} />
                        </CardContent>
                      </Card>
                    </Box>
                  );
                })}
              </AppLayout>
            )}
          />
        </form>
      )}
    </Formik>
  );
};
