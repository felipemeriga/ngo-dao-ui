import { useForm } from "react-hook-form";
import { Donate, DonateForm } from "../../../types/types.ts";
import { useDonate } from "../../../hooks/useNGODAO.ts";
import { weiValue } from "../../../utils/utils.ts";
import { useNGOForm, WithFormResults } from "../../../hooks/useNGOForm.tsx";

export const useDonateForm = ({
  handleAfterSubmit,
}: {
  handleAfterSubmit: () => void;
}) => {
  const formMethods = useForm<DonateForm>({
    mode: "onChange",
    defaultValues: { value: 0.1 },
  });

  const ngoForm = useNGOForm<Donate, DonateForm>({
    handleAfterSubmit,
    useHook: useDonate,
    successMessage: "You have successfully donated to the NGO...",
    formMethods,
    transformData: (data: DonateForm) => {
      const wei = weiValue(data.value);
      return {
        value: wei,
      } as Donate;
    },
  }) as WithFormResults;

  return {
    formMethods,
    ...ngoForm,
  };
};
