import { getServerSession } from "next-auth";
import { P2PTxns } from "../../../components/P2PTxns";
import { Peer2Peer } from "../../../components/Peer2Peer";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex justify-center items-center w-full gap-52">
      <Peer2Peer />
      <P2PTxns title="Recent transactions" />
    </div>
  );
}
