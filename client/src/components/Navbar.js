import React, { Component } from "react";
import { Link } from "react-router-dom";

class CarItem extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item mr-2">
                <Link to={"/"} class="btn btn-dark">
                  <i class="fas fa-list-ul"></i> List of goods
                </Link>
              </li>
              <li class="nav-item active">
                <Link to={"/add"} class="btn btn-success">
                  <i class="fas fa-plus"></i> Add
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default CarItem;
