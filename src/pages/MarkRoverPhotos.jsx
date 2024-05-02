import React, { useState, useEffect } from "react";
import axios from "axios";
import MARSImageWithContext from "../components/NasaAPI/MarsRover"

import { Card, CardContent, Typography, Button } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ModalImage from "react-modal-image";
import { useNavigate } from "react-router-dom";

const MarsImages = ({}) => {
  const [expanded, setExpanded] = useState(false);
  const [sol, setSol] = useState("");
  const [earthDate, setEarthDate] = useState("");
  const [camera, setCamera] = useState("");
  const [page, setPage] = useState("");
  const navigate = useNavigate();
  const apiKey = "yJZPuN2nvNQGZCf4SD7HMM6XhUdl1ZwNXBTrXD2P";

  const handleDateChange = (event) => {
    setEarthDate(event.target.value);
  };

  const handleSolChange = (event) => {
    setSol(event.target.value);
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handleCameraChange = (event) => {
    setCamera(event.target.value);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="field">
          <label>Earth Date:</label>
          <input type="date" value={earthDate} onChange={handleDateChange} />
        </div>
        <div className="field">
          <label>Sol:</label>
          <input type="number" value={sol} onChange={handleSolChange} />
        </div>
        <div className="field">
          <label>Page:</label>
          <input type="number" value={page} onChange={handlePageChange} />
        </div>
      </div>
      <FormControl>
        <InputLabel style={{ color: "white" }}>Camera</InputLabel>
        <Select
          value={camera}
          onChange={handleCameraChange} 
          style={{ color: "white" }} // Apply inline style
        >
          <MenuItem value="fhaz">FHAZ</MenuItem>
          <MenuItem value="rhaz">RHAZ</MenuItem>
          <MenuItem value="mast">MAST</MenuItem>
          <MenuItem value="chemcam">CHEMCAM</MenuItem>
          <MenuItem value="mahli">MAHLI</MenuItem>
          <MenuItem value="mardi">MARDI</MenuItem>
          <MenuItem value="navcam">NAVCAM</MenuItem>
          <MenuItem value="pancam">PANCAM</MenuItem>
          <MenuItem value="minites">MINITES</MenuItem>
          {/* Add other camera options */}
        </Select>
      </FormControl>

      <MARSImageWithContext apiKey={apiKey} earthDate={earthDate} sol={sol}  page={page} camera={camera} />
    </div>
  )
};

export default MarsImages;

