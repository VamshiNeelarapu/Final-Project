import { BsSearch } from "react-icons/bs";
import React, { useState } from "react";
import "./Search.css";
import axios from "axios";

function Search({ searchHandler, setValue, value }) {
  return (
    <div className="container">
      <form onSubmit={searchHandler} id="searchForm">
        <input
          type="text"
          className="search"
          placeholder="Search for something..."
          value={value}
          onChange={(eve) => setValue(eve.target.value)}
        />
        <button
          type="submit"
          className="sr"
          onClick={(event) => {
            searchHandler(event);
          }}
        >
          <BsSearch />
        </button>
      </form>
    </div>
  );
}

export default Search;
