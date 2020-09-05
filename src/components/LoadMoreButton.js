import React from "react";
import { Button } from "@material-ui/core";

const LoadMoreButton = ({ info, fetchMore, filter }) => {
  if (filter === "character")
    return (
      <Button
        variant="contained"
        color="primary"
        style={{
          margin: "1rem auto",
          borderRadius: ".5rem",
        }}
        disabled={info.info.next === null ? true : false}
        onClick={() => {
          const { next } = info.info;
          //console.log(next);

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
        {info.info.next !== null ? (
          <>Load More Characters</>
        ) : (
          <>No more Results</>
        )}
      </Button>
    );
  if (filter === "location") {
    return (
      <Button
        variant="contained"
        color="primary"
        style={{
          margin: "1rem auto",
          borderRadius: ".5rem",
        }}
        disabled={info.info.next === null ? true : false}
        onClick={() => {
          const { next } = info.info;
          //console.log(next);

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
        {info.info.next !== null ? (
          <>Load More Locations</>
        ) : (
          <>No more Results</>
        )}
      </Button>
    );
  }
  if (filter === "episode") {
    return (
      <Button
        variant="contained"
        disabled={info.info.next === null ? true : false}
        color="primary"
        style={{
          margin: "1rem auto",
          borderRadius: ".5rem",
        }}
        onClick={() => {
          const { next } = info.info;
          //console.log(next);

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
        {info.info.next !== null ? (
          <>Load More Episodes</>
        ) : (
          <>No more Results</>
        )}
      </Button>
    );
  }
};

export default LoadMoreButton;
