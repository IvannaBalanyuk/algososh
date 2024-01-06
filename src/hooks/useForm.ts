import { ChangeEvent, useState } from "react";

type TInputValues = {
  string: string;
  index: number | null;
};

const useForm = (inputValues: TInputValues) => {
  const [values, setValues] = useState<TInputValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (value === undefined) {
      return;
    }

    if (name === "index") {
      const numValue = Number(value);
      setValues({ ...values, [name]: numValue });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return { values, handleChange, setValues };
};

export default useForm;
