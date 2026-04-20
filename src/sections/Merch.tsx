import MerchPanel from "../components/MerchPanel";
import { merch } from "../data/merch";

export default function Merch() {
  return <MerchPanel items={merch} />;
}