import { P2PTxns } from "../../../components/P2PTxns";
import { Peer2Peer } from "../../../components/Peer2Peer";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full">
      <Peer2Peer />
      <P2PTxns />
    </div>
  );
}
