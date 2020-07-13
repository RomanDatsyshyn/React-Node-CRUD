import React, { Component } from "react";
import GoodsDataService from "../services/goods.service";
import { Link, Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DebounceInput } from "react-debounce-input";
import Spinner from "./Spiner";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.retrieveGoods = this.retrieveGoods.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      goods: [],
      response: [],
      value: "",
      currentPage: 1,
      redirect: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.retrieveGoods(1);
  }

  retrieveGoods(page) {
    GoodsDataService.getAll(page)
      .then((response) => {
        this.setState({
          response: response.data,
          goods: response.data.results,
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeProduct(e) {
    GoodsDataService.delete(e)
      .then(() => {
        this.retrieveGoods(1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChange(e) {
    if (e.target.value.length >= 2) {
      this.setState({ value: e.target.value, loading: true });
      GoodsDataService.getByName(this.state.value)
        .then((response) => {
          this.setState({
            goods: response.data,
            loading: false,
            response: [],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { goods, loading } = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let Item;

    if (goods === null || loading) {
      Item = <Spinner />;
    } else if (goods.length > 0) {
      Item = goods.map((product, index) => (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{product.name}</td>
          <td>{product.crm_id}</td>
          <td>
            <Link
              to={`/${product.id}`}
              params={{ item: product.id }}
              class="btn btn-warning mr-1"
            >
              <i class="fas fa-edit"></i>
            </Link>
            <button
              onClick={() => {
                confirmAlert({
                  title: "Confirm to remove",
                  message: "Are you sure to do this?",
                  buttons: [
                    {
                      label: "Yes",
                      onClick: () => {
                        this.removeProduct(product.id);
                        this.retrieveGoods(1);
                      },
                    },
                    {
                      label: "No",
                      onClick: () => {},
                    },
                  ],
                });
              }}
              className="btn btn-danger"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      ));
    } else {
      Item = <h4 className="mt-2">There are no products...</h4>;
    }

    return (
      <div>
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
                  <button
                    onClick={() => {
                      this.retrieveGoods(1);
                      this.setState({ value: "" });
                    }}
                    class="btn btn-dark"
                  >
                    <i class="fas fa-list-ul"></i> List of goods
                  </button>
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
        <div class="container">
          <div class="input-group md-form form-sm form-1 pl-0 mt-3">
            <div class="input-group-prepend">
              <span
                class="input-group-text purple lighten-3 bg-dark"
                id="basic-text1"
              >
                <i class="fas fa-search text-white" aria-hidden="true"></i>
              </span>
            </div>
            <DebounceInput
              minLength={2}
              type="text"
              class="form-control my-0 py-1"
              placeholder="Tauflevin"
              debounceTimeout={400}
              value={this.state.value}
              aria-label="Search"
              onChange={this.onChange}
            />
          </div>
          <table class="table table-striped mt-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CRM ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{Item}</tbody>
          </table>
          {this.state.response.next ? (
            <button
              class="btn btn-dark mb-3"
              onClick={() => {
                this.retrieveGoods(this.state.currentPage + 1);
                this.setState({
                  currentPage: this.state.currentPage + 1,
                });
              }}
            >
              Next page →
            </button>
          ) : (
            console.log()
          )}
          {this.state.response.previous ? (
            <button
              class="btn btn-dark ml-2 mb-3"
              onClick={() => {
                this.retrieveGoods(this.state.currentPage - 1);
                this.setState({
                  currentPage: this.state.currentPage - 1,
                });
              }}
            >
              ← Previous page
            </button>
          ) : (
            console.log()
          )}
        </div>
      </div>
    );
  }
}
