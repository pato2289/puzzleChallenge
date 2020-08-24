import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Container, Grid } from "@material-ui/core";
import Characters from "./components/Characters";
import InputCharacter from "./components/InputCharacter";
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
        status
        id
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

  const [inputName, setInputName] = useState("");

  const onChange = (e) => {
    setInputName(e.target.value);
  };

  //console.log("d

  if (error) return <div>errors</div>;
  if (loading || !data) return <div>loading</div>;

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} md={3} style={{ backgroundColor: "red" }}>
            <CheckButtons />
          </Grid>
          <Grid item xs={12} md={9} style={{ backgroundColor: "green" }}>
            <InputCharacter onChange={onChange} />
          </Grid>
          <Grid item md={3} style={{ backgroundColor: "blue" }}></Grid>
          <Grid container xs={12} md={9} style={{ backgroundColor: "yellow" }}>
            {data.characters.results.map((character) => {
              if (inputName.length < 3) return null;
              return (
                character.name.toLowerCase().indexOf(inputName) !== -1 && (
                  <Characters character={character} />
                )
              );
            })}
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
              Search on Page: {data.characters.info.next}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
