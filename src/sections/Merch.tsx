import { useCms } from "../hooks/useCms";
import { MerchPanel } from "../components/MerchPanel";

export default function Merch() {
  const { state } = useCms();

  return <MerchPanel merch={state.merch} />;
}
