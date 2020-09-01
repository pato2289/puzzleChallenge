import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import { Button, Container, Grid } from "@material-ui/core";
import Characters from "./components/Characters";
import InputText from "./components/InputText";
import CheckButtons from "./components/CheckButtons";
import Locations from "./components/Locations";
import Episodes from "./components/Episodes";
import Cover from "./components/Cover";

const RICKANDMORTY = gql`
  query($pageCharacter: Int, $pageLocation: Int, $pageEpisode: Int) {
    characters(page: $pageCharacter) {
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
    locations(page: $pageLocation) {
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
    episodes(page: $pageEpisode) {
      info {
        count
        pages
        next
      }
      results {
        name
        episode
        air_date
        characters {
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

  const inputReset = (e) => {
    e.preventDefault();
    setInputValue("");
  };

  let portada = 1;

  if (error) return <div>errors</div>;
  if (loading || !data) return <Cover />;

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <CheckButtons setValue={setValue} value={value} />
          </Grid>
          <Grid container xs={12} sm={9}>
            <Grid item xs={12} md={8}>
              <InputText onChange={onChange} inputValue={inputValue} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant="contained" color="primary" onClick={inputReset}>
                Reset
              </Button>
            </Grid>
            <Grid container xs={12}>
              {inputValue.length < 3
                ? null
                : value === "character" &&
                  data.characters.results.map(
                    (character) =>
                      character.name.toLowerCase().indexOf(inputValue) !==
                        -1 && <Characters character={character} value={value} />
                  )}
              {inputValue.length < 3
                ? null
                : value === "location" &&
                  data.locations.results.map(
                    (location) =>
                      location.name.toLowerCase().indexOf(inputValue) !==
                        -1 && <Locations location={location} value={value} />
                  )}
              {inputValue.length < 3
                ? null
                : value === "episode" &&
                  data.episodes.results.map(
                    (episode) =>
                      episode.name.toLowerCase().indexOf(inputValue) !== -1 && (
                        <Episodes episode={episode} value={value} />
                      )
                  )}
            </Grid>
            <Grid container justify="center">
              {inputValue.length >= 3 && value === "character" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const { next } = data.characters.info;
                    console.log(next);

                    fetchMore({
                      variables: {
                        pageCharacter: next,
                      },
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
                    <p>Load More Characters</p>
                  ) : (
                    <p>No more Results</p>
                  )}
                </Button>
              )}
              {inputValue.length >= 3 && value === "location" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const { next } = data.locations.info;
                    console.log(next);

                    fetchMore({
                      variables: {
                        pageLocation: next,
                      },
                      updateQuery: (prevResult, { fetchMoreResult }) => {
                        fetchMoreResult.locations.results = [
                          ...prevResult.locations.results,
                          ...fetchMoreResult.locations.results,
                        ];
                        return fetchMoreResult;
                      },
                    });
                  }}
                >
                  {data.locations.info.next !== null ? (
                    <p>Load More Locations</p>
                  ) : (
                    <p>No more Results</p>
                  )}
                </Button>
              )}
              {inputValue.length >= 3 && value === "episode" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const { next } = data.episodes.info;
                    console.log(next);

                    fetchMore({
                      variables: {
                        pageEpisode: next,
                      },
                      updateQuery: (prevResult, { fetchMoreResult }) => {
                        fetchMoreResult.episodes.results = [
                          ...prevResult.episodes.results,
                          ...fetchMoreResult.episodes.results,
                        ];
                        return fetchMoreResult;
                      },
                    });
                  }}
                >
                  {data.episodes.info.next !== null ? (
                    <p>Load More Episodes</p>
                  ) : (
                    <p>No more Results</p>
                  )}
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
