import React, { useState } from "react";
import { BaseMap } from "./BaseMap";
import { Sidebar } from "../../../components/Sidebar/Sidebar";

const EventCreate = () => {
  return (
    <>
      <Sidebar>
        <h4>Tu bedzie formularz</h4>
      </Sidebar>
      <BaseMap />
    </>
  );
};

export { EventCreate };
