import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Container, Grid } from "@material-ui/core";
import Characters from "./components/Characters";
import InputText from "./components/InputText";
import CheckButtons from "./components/CheckButtons";
import Locations from "./components/Locations";

const RICKANDMORTY = gql`
  query($page: Int) {
    characters(page: $page) {
      info {
        pages
        next
        count
      }
      results {
        name
        gender
        species
        type
        image
      }
    }
    locations(page: $page) {
      info {
        pages
        next
        count
      }
      results {
        name
        dimension
        type
        residents {
          name
        }
      }
    }
  }
`;

function App() {
  const { data, error, loading, fetchMore } = useQuery(RICKANDMORTY, {
    variables: {
      page: 1,
    },
  });

  console.log("data: ", data);

  const [value, setValue] = React.useState("character");
  const [inputValue, setInputValue] = useState("");

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  if (error) return <div>errors</div>;
  if (loading || !data) return <div>loading</div>;

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} md={3}>
            <CheckButtons setValue={setValue} value={value} />
          </Grid>
          <Grid item xs={12} md={9} style={{ backgroundColor: "green" }}>
            <Grid item xs={12} style={{ backgroundColor: "green" }}>
              <InputText onChange={onChange} />
            </Grid>
            <Grid container xs={12} style={{ backgroundColor: "yellow" }}>
              {inputValue.length < 3 ? null : value === "character" ? (
                data.characters.results.map(
                  (character) =>
                    character.name.toLowerCase().indexOf(inputValue) !== -1 && (
                      <Characters character={character} value={value} />
                    )
                )
              ) : value === "location" ? (
                data.locations.results.map(
                  (location) =>
                    location.name.toLowerCase().indexOf(inputValue) !== -1 && (
                      <Locations location={location} value={value} />
                    )
                )
              ) : (
                <p>Select episode</p>
              )}
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const { next } = data.characters.info;

                console.log(next);

                fetchMore({
                  variables: { page: next },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    fetchMoreResult.characters.results = [
                      ...prevResult.characters.results,
                      ...fetchMoreResult.characters.results,
                    ];
                    return fetchMoreResult;
                  },
                });
              }}
            >
              {data.characters.info.next !== null ? (
                <p>Load More</p>
              ) : (
                <p>No more Results</p>
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
