import React, {useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {Field, Form, Formik} from "formik";

import {DiagnosisSelection, SelectField, TextField, TypeOption} from "./FormField";
import {Entry, EntryType, HealthCheckRating} from "../types";
import {useStateValue} from "../state";
import {Box} from "@mui/material";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntriesFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntriesFormValues) => void;
  onCancel: () => void;
}

const typeOptions:TypeOption[] = [
    {value: EntryType.Hospital, label: "Hospital"},
    {value: EntryType.HealthCheck, label: "HealthCheck"},
    {value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare"}
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    const [type, setType] = useState<EntryType>(EntryType.Hospital);

    const handleTypeChange = (value: string) => {
        console.log(value);
        switch (value) {
            case "Hospital":
                setType(EntryType.Hospital);
                break;
            case "HealthCheck":
                setType(EntryType.HealthCheck);
                break;
            case "OccupationalHealthcare":
                setType(EntryType.OccupationalHealthcare);
                break;
        }
    };

  return (
    <Formik
      initialValues={{
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: undefined,
          type: EntryType.Hospital,
          healthCheckRating: HealthCheckRating.Healthy,
          employerName: "",
          sickLeave_startDate: "",
          sickLeave_endDate: "",
          discharge_date: "",
          discharge_criteria: ""

      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if(values.type === EntryType.HealthCheck){
            if(!values.healthCheckRating){
                errors.healthCheckRating = requiredError;
            }
        } else if(values.type === EntryType.Hospital){
            if(!values.discharge_date ){
                errors.discharge_date = requiredError;

            }
            if(!values.discharge_criteria){
                errors.discharge_criteria = requiredError;
            }
          } else if(values.type === EntryType.OccupationalHealthcare){
            if(!values.employerName){
                errors.employerName = requiredError;
            }
            if(!values.sickLeave_startDate ){
                errors.sickLeave_startDate = requiredError;
            }
            if( !values.sickLeave_endDate){
                errors.sickLeave_endDate = requiredError;
            }
        }
        return errors;
      }}
    >
      {({ isValid, dirty,setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
              <SelectField label="Entry Type" name="type" options={typeOptions} onChange={handleTypeChange}/>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Enter the name of the doctor"
              name="specialist"
              component={TextField}
            />
              <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
              />
              {
                  type === EntryType.HealthCheck ? <Field
                      label="Healthcheck Rating (0 Healthy - 3 Near death)"
                      placeholder="Healthcheck Rating "
                      name="healthCheckRating"
                      component={TextField}
                  /> : null
              }

              {
                  type === EntryType.Hospital ? (
                      <>
                          <fieldset>
                              <legend>Sick leave dates</legend>
                              <Field
                                  label="Start date"
                                  placeholder="YYYY-MM-DD"
                                  name="discharge_date"
                                  component={TextField}
                              />
                              <Field
                                  label="Criteria"
                                  placeholder="Criteria"
                                  name="discharge_criteria"
                                  component={TextField}
                              />
                          </fieldset>
                          <Box marginY={2}/>
                      </>
                  ) : null
              }

              {
                  type === EntryType.OccupationalHealthcare ? (
                      <>
                          <Field
                              label="Employer Name"
                              placeholder="Employer Name"
                              name="employerName"
                              component={TextField}
                          />
                        <fieldset>
                            <legend>Sick leave dates</legend>
                            <Field
                                label="Start date"
                                placeholder="YYYY-MM-DD"
                                name="sickLeave_startDate"
                                component={TextField}
                            />
                            <Field
                                label="End date"
                                placeholder="YYYY-MM-DD"
                                name="sickLeave_endDate"
                                component={TextField}
                            />
                        </fieldset>
                          <Box marginY={2}/>
                      </>
                      ) : null
              }

              <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
