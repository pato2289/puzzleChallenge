import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { animateScroll as scroll } from "react-scroll";
import { Button, Container, Grid } from "@material-ui/core";
import Characters from "./components/Characters";
import InputText from "./components/InputText";
import CheckButtons from "./components/CheckButtons";
import Locations from "./components/Locations";
import Episodes from "./components/Episodes";
import Cover from "./components/Cover";
import LoadMoreButton from "./components/LoadMoreButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

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

  const onClickUp = () => {
    scroll.scrollToTop();
  };

  if (error) return <div>errors</div>;
  if (loading || !data) return <Cover />;

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <CheckButtons setValue={setValue} value={value} />
          </Grid>
          <Grid container xs={12} sm={9} style={{ paddingLeft: "1rem" }}>
            <Grid item xs={12}>
              <InputText onChange={onChange} inputValue={inputValue} />
            </Grid>
            <Grid container xs={12}>
              <Grid container xs={4} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={inputReset}
                  style={{
                    margin: "1rem auto",
                    borderRadius: ".5rem",
                  }}
                >
                  Reset
                </Button>
              </Grid>
              <Grid container xs={8} sm={6}>
                {inputValue.length >= 3 && value === "character" ? (
                  <LoadMoreButton
                    info={data.characters}
                    fetchMore={fetchMore}
                    filter={value}
                  />
                ) : value === "location" ? (
                  <LoadMoreButton
                    info={data.locations}
                    fetchMore={fetchMore}
                    filter={value}
                  />
                ) : value === "episode" ? (
                  <LoadMoreButton
                    info={data.episodes}
                    fetchMore={fetchMore}
                    filter={value}
                  />
                ) : null}
              </Grid>
            </Grid>

            <Grid container xs={12} style={{ marginTop: "1.3rem" }}>
              {inputValue.length < 3
                ? null
                : value === "character" &&
                  data.characters.results.map(
                    (character) =>
                      character.name
                        .toLowerCase()
                        .indexOf(inputValue.toLocaleLowerCase()) !== -1 && (
                        <Characters character={character} value={value} />
                      )
                  )}
              {inputValue.length < 3
                ? null
                : value === "location" &&
                  data.locations.results.map(
                    (location) =>
                      location.name
                        .toLowerCase()
                        .indexOf(inputValue.toLocaleLowerCase()) !== -1 && (
                        <Locations location={location} value={value} />
                      )
                  )}
              {inputValue.length < 3
                ? null
                : value === "episode" &&
                  data.episodes.results.map(
                    (episode) =>
                      episode.name
                        .toLowerCase()
                        .indexOf(inputValue.toLocaleLowerCase()) !== -1 && (
                        <Episodes episode={episode} value={value} />
                      )
                  )}
            </Grid>
            <Grid container xs={12} justify="center">
              <Button variant="contained" color="secondary" onClick={onClickUp}>
                <ArrowUpwardIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
