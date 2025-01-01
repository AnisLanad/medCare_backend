export type TColumn<T = any> = {
  key: keyof T;
  label: string;
  render?: (value: T) => string;
};
