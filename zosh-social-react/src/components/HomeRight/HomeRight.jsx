import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

const popularUser = [1, 1, 1, 1, 1]

const HomeRight = () => {
  return (
    <div className="pr-2 pt-5 pb-10 w-full h-full">
      <SearchUser />

      <Card className="p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95">View all</p>

        </div>

        <div className="space-y-2">
          {popularUser.map((item) => <PopularUserCard />)}
        </div>

      </Card>



    </div>
  );
};

export default HomeRight;
