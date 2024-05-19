import { Card } from "@repo/ui/card";
import { findP2Ptranx } from "../app/lib/actions";

export const UserDetails = async () => {
  const { user } = await findP2Ptranx();
  return (
    <Card title="User details">
      <div className="flex flex-row justify-evenly gap-x-10 p-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
        <div className="p-4">
          <div className=" font-semibold text-md">Name</div>
          <div>{user.name}</div>
        </div>
        <div className="p-4">
          <div className="font-semibold text-md">Number</div>
          <div>{user.email}</div>
        </div>
      </div>
    </Card>
  );
};
