import React from "react";
import styled from "styled-components";

const CountryCardStyled = styled.div`
  width: 100%;
  min-height: 400px;
  height: 400px;
  margin: auto;
  border-radius: 10px;
  display: flex;
  background: #fff;
  flex-direction: column;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.041);
  margin-bottom: 20px;

  img {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px 10px 0 0;
  }

  h3,
  h2 {
    margin-left: 25px;
  }

  h3 {
    margin-bottom: 5px;
    color: hsl(200, 15%, 8%);
  }

  h2 {
    margin-bottom: 20px;
    font-size: 1.6em;
  }

  span {
    font-weight: 300;
  }
`;

const Country = ({ img, name, population, region, capital }) => {
  return (
    <CountryCardStyled>
      <img loading="lazy" src={img}></img>
      <h2>{name}</h2>
      <h3>
        Population: <span>{population}</span>
      </h3>
      <h3>
        Region <span>{region}</span>
      </h3>
      <h3>
        Capital: <span>{capital}</span>
      </h3>
    </CountryCardStyled>
  );
};

export default Country;
