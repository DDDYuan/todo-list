import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Todo";

ReactDOM.render(<Todo />, document.getElementById("root"));
registerServiceWorker();
