import React, {useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {Field, Form, Formik} from "formik";

import {DiagnosisSelection, SelectField, TextField, TypeOption, RatingOption} from "./FormField";
import {BaseEntry, EntryType, HealthCheckRating} from "../types";
import {useStateValue} from "../state";
import {Box} from "@mui/material";

/*
 * we are using type BaseEntry, but omit id
 * cause we are creating this on back end
 */
export type EntriesFormValues = Omit<BaseEntry, 'id' | 'discharge' | 'sickLeave'> & {
    dischargeDate: string,
    dischargeCriteria: string,
    entryType: EntryType,

    sickLeaveStartDate: string,
    sickLeaveEndDate: string,
    employerName: string;

    healthCheckRating: HealthCheckRating;
};

interface Props {
  onSubmit: (values: EntriesFormValues) => void;
  onCancel: () => void;
}

const typeOptions:TypeOption[] = [
    {value: EntryType.Hospital, label: "Hospital"},
    {value: EntryType.HealthCheck, label: "HealthCheck"},
    {value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare"}
];

const ratingOptions:RatingOption[] = [
    {value: HealthCheckRating.Healthy, label: "Healthy"},
    {value: HealthCheckRating.LowRisk, label: "LowRisk"},
    {value: HealthCheckRating.HighRisk, label: "HighRisk"},
    {value: HealthCheckRating.CriticalRisk, label: "CriticalRisk"}

];
export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    const [type, setType] = useState<EntryType>(EntryType.Hospital);

    const handleTypeChange = (value: string) => {

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
    const handleRatingChange = (value: string) => {
        console.log(value);
    };

  return (
    <Formik
      initialValues={{
          description: "",
          date: "",
          specialist: "",
          entryType: EntryType.Hospital,
          dischargeCriteria: "",
          dischargeDate: "",

          sickLeaveStartDate: "",
          sickLeaveEndDate: "",
          employerName: "",

          healthCheckRating: HealthCheckRating.Healthy
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

        if(values.entryType === EntryType.HealthCheck){
            if(!values.healthCheckRating){
                errors.healthCheckRating = requiredError;
            }
        } else if(values.entryType === EntryType.Hospital){
            if(!values.dischargeCriteria ){
                errors.dischargeCriteria = requiredError;
            }
            if(!values.dischargeDate ){
                errors.dischargeDate = requiredError;
            }
          } else if(values.entryType === EntryType.OccupationalHealthcare){
            if(!values.employerName){
                errors.employerName = requiredError;
            }
            if(!values.sickLeaveStartDate ){
                errors.sickLeaveStartDate = requiredError;
            }
            if( !values.sickLeaveEndDate){
                errors.sickLeaveEndDate = requiredError;
            }
        }
        return errors;
      }}
    >
      {({ isValid, dirty,setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
              <SelectField label="Entry Type" name="entryType" options={typeOptions} onChange={handleTypeChange}/>
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
                  type === EntryType.HealthCheck ? <SelectField label="Healthcheck Rating" name="healthCheckRating" options={ratingOptions} onChange={handleRatingChange}/> : null
              }

              {
                  type === EntryType.Hospital ? (
                      <>
                          <fieldset>
                              <legend>Discharge</legend>
                              <Field
                                  label="Start date"
                                  placeholder="YYYY-MM-DD"
                                  name="dischargeDate"
                                  component={TextField}
                              />
                              <Field
                                  label="Criteria"
                                  placeholder="Criteria"
                                  name="dischargeCriteria"
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
                                name="sickLeaveStartDate"
                                component={TextField}
                            />
                            <Field
                                label="End date"
                                placeholder="YYYY-MM-DD"
                                name="sickLeaveEndDate"
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
