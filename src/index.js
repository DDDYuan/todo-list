import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import Todo from "./Todo";

ReactDOM.render(<Todo />, document.getElementById("root"));
registerServiceWorker();
