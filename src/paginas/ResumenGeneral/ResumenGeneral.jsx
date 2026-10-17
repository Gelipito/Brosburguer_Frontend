import React, { useEffect, useState } from "react";
import "./ResumenGeneral.css";
import logoGrande from "../../recursos/logos/logo.png.jpeg";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import ReporteLooker from "./ReporteLooker";

const ResumenGeneral = () => {
  return (
    <div>
      <ReporteLooker />
    </div>
  );
};

export default ResumenGeneral;