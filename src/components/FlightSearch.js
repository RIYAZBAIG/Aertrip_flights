import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, TextField, InputLabel, MenuItem, FormControl, Select, Slider } from "@mui/material";
import axios from "axios";
import "./FlightSearch.css";

const FlightSearch = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const GetApi = async () => {
    const mainresult = await axios.get(`${process.env.PUBLIC_URL}/data/flights.json`);
    setData(mainresult.data);
    setFilteredData(mainresult.data);
    console.log("Riyaz Data", mainresult.data)
  };

  useEffect(() => {
    GetApi();
  }, []);

  useEffect(() => {
    let sortedData = [...filteredData];
    switch (sortOption) {
      case "Price":
        sortedData.sort((a, b) => a.data.flights[0].results.j[0].farepr - b.data.flights[0].results.j[0].farepr);
        break;
      case "Duration":
        sortedData.sort((a, b) => a.data.flights[0].results.j[0].duration - b.data.flights[0].results.j[0].duration);
        break;
      case "Departure":
        sortedData.sort((a, b) => new Date(a.data.flights[0].results.j[0].dt) - new Date(b.data.flights[0].results.j[0].dt));
        break;
      case "Arrival":
        sortedData.sort((a, b) => new Date(a.data.flights[0].results.j[0].at) - new Date(b.data.flights[0].results.j[0].at));
        break;
      default:
        break;
    }
    setFilteredData(sortedData);
  }, [sortOption]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    filterByPrice(newValue);
  };

  const filterByPrice = (priceRange) => {
    const filtered = data.filter(item => {
      const fare = item.data.flights[0].results.j[0].farepr;
      return fare >= priceRange[0] && fare <= priceRange[1];
    });
    setFilteredData(filtered);
  };

  return (
    <div className="flight-search-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card style={{ borderBottom: "3px solid blue", boxShadow: "0px 0px 10px 0px grey" }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                  <TextField fullWidth label="From" variant="standard" />
                </Grid>
                <Grid item xs={2}>
                  <TextField fullWidth label="To" variant="standard" />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Depart" variant="standard" />
                </Grid>
                <Grid item xs={2}>
                  <button
                    style={{
                      padding: 15,
                      width: 100,
                      borderRadius: 5,
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#3DED97",
                      border: "none",
                      position: "relative",
                      right: 50
                    }}
                  >
                    Search
                  </button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
            <Select
              label="Sort"
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="Price">Price Low to high</MenuItem>
              <MenuItem value="Duration">Duration Shortest First</MenuItem>
              <MenuItem value="Departure">Depart Earliest First</MenuItem>
              <MenuItem value="Arrival">Arrival Earliest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Times</InputLabel>
            <Select
              label="Sort"
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="Price">Price Low to high</MenuItem>
              <MenuItem value="Duration">Duration Shortest First</MenuItem>
              <MenuItem value="Departure">Depart Earliest First</MenuItem>
              <MenuItem value="Arrival">Arrival Earliest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Airlines</InputLabel>
            <Select
              label="Sort"
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="Price">Price Low to high</MenuItem>
              <MenuItem value="Duration">Duration Shortest First</MenuItem>
              <MenuItem value="Departure">Depart Earliest First</MenuItem>
              <MenuItem value="Arrival">Arrival Earliest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={3}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="price-slider-label">Price Range</InputLabel>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              aria-labelledby="price-slider-label"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        {filteredData.map((item, index) => (
          <Grid item xs={10} key={index}>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[0].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[0].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[0].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[0].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[0].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[1].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[1].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[1].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[1].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[1].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[2].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[2].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[2].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[2].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[2].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[3].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[3].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[3].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[3].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[3].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[4].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[4].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[4].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[4].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[4].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[5].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[5].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[5].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[5].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[5].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[6].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[6].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[6].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[6].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[6].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[7].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[7].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[7].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[7].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[7].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[8].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[8].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[8].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[8].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[8].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[9].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[9].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[9].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[9].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[9].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[10].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[10].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[10].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[10].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[10].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[11].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[11].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[11].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[11].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[11].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[12].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[12].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[12].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[12].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[12].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[13].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[13].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[13].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[13].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[13].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[14].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[14].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[14].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[14].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[14].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[15].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[15].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[15].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[15].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[15].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[16].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[16].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[16].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[16].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[16].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[17].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[17].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[17].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[17].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[17].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>

            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[18].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[18].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[18].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[18].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[18].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[19].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[19].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[19].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[19].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[19].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[20].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[20].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[20].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[20].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[20].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[21].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[21].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[21].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[21].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[21].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[22].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[22].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[22].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[22].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[22].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[23].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[23].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[23].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[23].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[23].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[24].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[24].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[24].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[24].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[24].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[25].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[25].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[25].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[25].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[25].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[26].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[26].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[26].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[26].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[26].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>
            <Card style={{ height: 100, boxShadow: "0px 0px 5px 0px grey" }}>
              <CardContent>
                <img
                  src="./photos/indigo.jpg"
                  height={30}
                  width={30}
                  style={{ borderRadius: 3, position: "relative", right: 500 }}
                  alt=""
                />
                <span style={{ position: "relative", right: 490, bottom: 10, fontSize: 10, fontWeight: "bold" }}>
                  IndiGo
                </span>
                <span style={{ position: "relative", right: 400, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[27].dt}
                </span>
                <span style={{ position: "relative", left: -65, top: -20, fontWeight: "bold" }}>
                  {item.data.flights[0].results.j[27].at}
                </span>
                <h5 style={{ position: "relative", bottom: 40, right: 200 }}>
                  {item.data.flights[0].results.j[27].ap[0]}{" "}
                  ------------------------------------------------------------------------------{" "}
                  {item.data.flights[0].results.j[27].ap[1]}
                </h5>
                <span style={{ position: "relative", left: 380, bottom: 90, fontWeight: "bold", color: "seagreen" }}>
                  ₹.{item.data.flights[0].results.j[27].farepr}
                </span>
                <button
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    color: "blue",
                    border: "2px solid blue",
                    borderRadius: 5,
                    position: "relative",
                    bottom: 92,
                    left: 400,
                    fontWeight: "bold"
                  }}
                >
                  View Fares
                </button>
              </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FlightSearch;
