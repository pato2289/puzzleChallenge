import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Container, Grid } from "@material-ui/core";
import Characters from "./components/Characters";

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

  //console.log("data", data);

  const [inputName, setInputName] = useState("");

  const onChange = (e) => {
    setInputName(e.target.value);
  };

  if (error) return <div>errors</div>;
  if (loading || !data) return <div>loading</div>;

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <p>Please write the search in lowercase</p>
            <input
              type="text"
              name="inputName"
              onChange={onChange}
              placeholder="Enter a name o location"
            />
          </Grid>
          {data.characters.results.map((character) => {
            if (inputName.length < 3) return null;
            return (
              character.name.toLowerCase().indexOf(inputName) !== -1 && (
                <Characters character={character} />
              )
            );
          })}
          <Grid item xs={12}>
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
