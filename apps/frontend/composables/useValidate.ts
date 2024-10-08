type FieldRule<T> = (value: IField<T>["value"]) => false | string | void;

interface IField<T> {
  value?: T;
  error: string;
  isError: boolean;
  rules: FieldRule<T>[];

  notEmpty(this: IField<string>, errorMessage: string): IField<string>;
  min(
    this: IField<string>,
    minCharacters: number,
    errorMessage: string,
  ): IField<string>;
  enforce<T>(this: IField<T>, rule: FieldRule<T>): IField<T>;
}

export function useValidate() {
  const fields: IField<unknown>[] = [];

  function createField<T>(initialValue?: T) {
    const field = reactive({
      value: initialValue,
      error: "",
      isError: false,
      rules: [],

      notEmpty,
      min,
      enforce,
    }) as IField<T>;

    watch(
      () => field.value,
      () => {
        checkRules(field);
      },
    );

    fields.push(field as IField<unknown>);
    return field;
  }

  function checkRules<T>(field: IField<T>): boolean {
    let checkResult: boolean | string | void = true;

    field.rules.some((rule) => {
      checkResult = rule(field.value as T | undefined);
      return checkResult;
    });

    if (typeof checkResult === "string") {
      field.isError = true;
      field.error = checkResult;

      return true;
    }

    if (typeof checkResult === "boolean" && !checkResult) {
      field.isError = true;

      return true;
    }

    field.isError = false;
    field.error = "";
    return false;
  }

  function enforce<T>(this: IField<T>, rule: FieldRule<T>): IField<T> {
    this.rules.push(rule);
    return this;
  }

  function notEmpty(
    this: IField<string>,
    errorMessage: string,
  ): IField<string> {
    this.enforce((value) => {
      if (typeof value !== "string") return errorMessage || false;
      if (value.trim().length === 0) return errorMessage || false;
    });

    return this;
  }

  function min(
    this: IField<string>,
    minCharacters: number,
    errorMessage: string,
  ): IField<string> {
    this.enforce((value) => {
      if (typeof value !== "string") return errorMessage || false;
      if (value.trim().length < minCharacters) return errorMessage || false;
    });

    return this;
  }

  function validateSome(fields: IField<any>[]): boolean {
    let isAnyError = false;

    (fields as IField<unknown>[]).forEach((field) => {
      const isError = checkRules(field);
      if (!isAnyError && isError) isAnyError = true;
    });

    return isAnyError;
  }

  function validateAll(): boolean {
    let isAnyError = false;

    fields.forEach((field) => {
      const isError = checkRules(field);
      if (!isAnyError && isError) isAnyError = true;
    });

    return isAnyError;
  }

  return { createField, validateSome, validateAll };
}
