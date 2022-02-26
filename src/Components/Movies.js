import React, { Component } from "react";
import { moviearr } from "./getMovies";
import axios from "axios";
export default class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movie: [],
      currSearch: "",
      currPage: 1,
      limit: 2,
      genres: [{ _id: "abcd", name: "All genres" }],
      cgenre: "All genres",
    };
  }

  async componentDidMount() {
    let res1 = await axios.get(
      "https://backend-react-movie.herokuapp.com/movies"
    );
    let res2 = await axios.get(
      "https://backend-react-movie.herokuapp.com/genres"
    );
    let lgenres = [...this.state.genres, ...res2.data.genres];
    this.setState({
      movie: res1.data.movies,
      genres: lgenres,
    });
  }
  handleDelete = (id) => {
    let narr = this.state.movie.filter((obj) => obj._id !== id);
    this.setState({
      movie: narr,
      currSearch: "",
    });
  };

  handleChange = (e) => {
    let val = e.target.value;
    this.setState({
      currSearch: val,
    });
  };

  increase = (str) => {
    let narr = [];
    if (str == "r") {
      narr = this.state.movie.sort((a, b) => {
        return a.dailyRentalRate - b.dailyRentalRate;
      });
    } else {
      narr = this.state.movie.sort((a, b) => {
        return a.numberInStock - b.numberInStock;
      });
    }

    this.setState({
      movie: narr,
    });
  };

  decrease = (str) => {
    let narr = [];
    if (str == "r") {
      narr = this.state.movie.sort((a, b) => {
        return b.dailyRentalRate - a.dailyRentalRate;
      });
    } else {
      narr = this.state.movie.sort((a, b) => {
        return b.numberInStock - a.numberInStock;
      });
    }

    this.setState({
      movie: narr,
    });
  };

  handlePgeChnge = (pn) => {
    this.setState({
      currPage: pn,
    });
  };

  handleLimit = (e) => {
    // console.log(t.value);
    this.setState({ limit: e.target.value });
  };

  handleGenre = (gname) => {
    this.setState({
      cgenre: gname,
    });
  };

  render() {
    let filteredArr = [];

    let {
      movie: mov,
      currSearch: cs,
      currPage,
      limit,
      genres,
      cgenre,
    } = this.state;
    limit = Number(limit);
    if (cs === "") {
      filteredArr = mov;
    } else {
      filteredArr = mov.filter(function (obj) {
        cs = cs.toLowerCase();
        return obj.title.toLowerCase().includes(cs);
      });
    }
    // console.log(filteredArr);
    if (cgenre != "All genres") {
      filteredArr = filteredArr.filter((mObj) => {
        return mObj.genre.name == cgenre
      });
    }
    // console.log(filteredArr);
    let noOfPages = Math.ceil(filteredArr.length / limit);
    let pageArr = [];
    for (let i = 0; i < noOfPages; i++) {
      pageArr.push(i + 1);
    }

    let si = (currPage - 1) * limit;
    let ei = si + limit;

    filteredArr = filteredArr.slice(si, ei);

    if(filteredArr.length == 0 && currPage !=1){
      this.setState({
        currPage: 1
      })
    }


    
    return (
      <React.Fragment>
        {this.state.movie.length == 0 ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <ul className="list-group">
                    {genres.map((gObj) => {
                      return (
                        <li
                          key={gObj._id}
                          className="list-group-item list-group-item-dark"
                          onClick={() => {
                            this.handleGenre(gObj.name);
                          }}
                        >
                          {gObj.name}
                        </li>
                      );
                    })}
                  </ul>

                  <h5>Current Genre: {cgenre}</h5>
                </div>
                <div className="col-9">
                  <input
                    value={this.state.currSearch}
                    onChange={this.handleChange}
                  ></input>

                  {/* <input
                value={this.state.limit}
                onChange={this.handleLimit}
              ></input> */}

                  <select
                    name="limit"
                    onChange={this.handleLimit}
                    value={limit}
                  >
                    <option>2</option>
                    <option>4</option>
                    <option>6</option>
                  </select>

                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>

                        <th scope="col">
                          <i
                            className="fas fa-sort-up"
                            onClick={() => this.increase("s")}
                          ></i>
                          Stock
                          <i
                            className="fas fa-sort-down"
                            onClick={() => this.decrease("s")}
                          ></i>
                        </th>

                        <th scope="col">
                          <i
                            className="fas fa-sort-up"
                            onClick={() => this.increase("r")}
                          ></i>
                          Rating
                          <i
                            className="fas fa-sort-down"
                            onClick={() => this.decrease("r")}
                          ></i>
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArr.map((MovieObj) => {
                        return (
                          <tr key={MovieObj._id}>
                            <td></td>
                            <td>{MovieObj.title}</td>
                            <td>{MovieObj.genre.name}</td>
                            <td>{MovieObj.numberInStock}</td>
                            <td>{MovieObj.dailyRentalRate}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                  this.handleDelete(MovieObj._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <nav aria-label="...">
                    <ul className="pagination">
                      {pageArr.map((pn) => {
                        let classStyle =
                          pn == currPage ? "page-item active" : "page-item";
                        return (
                          <li
                            key={pn}
                            className={classStyle}
                            onClick={() => this.handlePgeChnge(pn)}
                          >
                            <span className="page-link">{pn}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
