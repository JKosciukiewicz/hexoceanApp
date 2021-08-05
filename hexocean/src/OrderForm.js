import React from "react";
import { Form, Field } from "react-final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )

export const OrderForm=(props) => {
  let formData = {
    
  };

  return (
    <div className="wrapper">
      <Form
        onSubmit={onSubmit}
        initialValues={formData}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.username = "Required";
          }
          if (!values.preparation_time) {
            errors.password = "Required";
          }
          if (!values.type) {
            errors.confirm = "Required";
          } 
          if (values.no_of_slices>1) {
            errors.confirm = "At least 1 slice required";
          } 
          if (!values.diameter>0) {
            errors.confirm = "Diameter must be larger than 0.01";
          } 
          if (!values.slices_of_bread>0) {
            errors.confirm = "At least 1 slice of bread required";
          } 
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name">
              {({ input, meta }) => (
                <div>
                  <label>Name</label>
                  <input {...input} type="text" placeholder="Dish name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="preparation_time">
              {({ input, meta }) => (
                <div>
                  <label>Preparation Time</label>
                  <input {...input} type="duration" placeholder="Preparation time" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div>
              <label>Type</label>
              <Field name="type" component="select">
                <option />
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="sandwich">Sandwich</option>
              </Field>
            </div>

            {/*FOR PIZZA ONLY*/}
            <Condition when="type" is="pizza">
            <Field name="no_of_slices">
              {({ input, meta }) => (
                <div>
                  <label>Preparation Time</label>
                  <input {...input} type="number" placeholder="Number of slices" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="diameter">
              {({ input, meta }) => (
                <div>
                  <label>Number of slices</label>
                  <input {...input} type="number" step="0.01" placeholder="Number of slices" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            </Condition>

             {/*FOR SOUP ONLY*/}
             <Condition when="type" is="soup">
             <Field name="spiciness_scale">
              {({ input, meta }) => (
                <div>
                  <label>Spiciness</label>
                  <input {...input} type="range" min="1" max="10" placeholder="Spiciness" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            </Condition>

            {/*FOR SANDWICH ONLY*/}
            <Condition when="type" is="sandwich">
            <Field name="slices_of_bread">
              {({ input, meta }) => (
                <div>
                  <label>Slices of bread</label>
                  <input {...input} type="number" step="0.01" placeholder="Slices of bread" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            </Condition>

            <div className="buttonArea">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
};
