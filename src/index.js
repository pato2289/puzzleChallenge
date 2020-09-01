import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";

let client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
});

let WithApollo = () => (
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

ReactDOM.render(<WithApollo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
