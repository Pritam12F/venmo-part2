import { P2PTxns } from "../../../components/P2PTxns";
import { Peer2Peer } from "../../../components/Peer2Peer";

export default async function Page() {
  return (
    <div className="flex justify-center items-center w-full gap-52">
      <Peer2Peer />
      <P2PTxns />
    </div>
  );
}
