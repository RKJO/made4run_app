import React, { useState } from "react";
import { BaseMap } from "./BaseMap";
import { Sidebar } from "../../../components/Sidebar/Sidebar";

const EventCreate = () => {
  return (
    <>
      <Sidebar />
      <BaseMap />
    </>
  );
};

export { EventCreate };
