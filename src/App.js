import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Container, Grid } from "@material-ui/core";
import Characters from "./components/Characters";
import InputText from "./components/InputText";
import CheckButtons from "./components/CheckButtons";

const CHARACTERS = gql`
  query getCharacters($page: Int) {
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
  }
`;

function App() {
  const { data, error, loading, fetchMore } = useQuery(CHARACTERS, {
    variables: {
      page: 1,
    },
  });

  const [value, setValue] = React.useState("Character");
  const [inputValue, setInputValue] = useState("");

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  //console.log("data", data)

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
              {data.characters.results.map((character) => {
                if (inputValue.length < 3) return null;
                if (value === "Character") {
                  return (
                    character.name.toLowerCase().indexOf(inputValue) !== -1 && (
                      <Characters character={character} />
                    )
                  );
                }
              })}
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
