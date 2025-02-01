"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
}

interface IProps extends formConfig {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
  // onSubmit: SubmitHandler<FieldValues>;
}

const Form: React.FC<IProps> = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}) => {
  const formConfig: formConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm<FieldValues>(formConfig);

  const submitHandler = methods.handleSubmit(async (data) => {
    await onSubmit(data);
    methods.reset(defaultValues);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler}>{children}</form>
    </FormProvider>
  );
};

export default Form;
