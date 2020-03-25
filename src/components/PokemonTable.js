import React from "react";
import MUIDataTable from "mui-datatables";

const renderTypes = types => types.join(" ");

const shouldExcludePokemon = (pokemonTypes, filterTypes) => {
  const result = filterTypes.every(val => pokemonTypes.includes(val));
  return !result;
};

const getPokemonTypes = pokemon => [
  ...new Set(pokemon.map(mon => [...mon.type, ...mon.weaknesses]).flat())
];

const createPokemonTableColumns = pokemon => {
  const pokemonTypes = getPokemonTypes(pokemon);
  return [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "num",
      label: "Num",
      options: {
        filter: false,
        sort: false,
        searchable: false
      }
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: false,
        searchable: false,
        filterOptions: {
          names: pokemonTypes,
          logic: shouldExcludePokemon
        },
        customBodyRender: renderTypes
      }
    },
    {
      name: "weaknesses",
      label: "Weaknesses",
      options: {
        filter: true,
        sort: false,
        searchable: false,
        filterOptions: {
          names: pokemonTypes,
          logic: shouldExcludePokemon
        },
        customBodyRender: renderTypes
      }
    }
  ];
};

export const PokemonTable = ({ pokemon }) => {
  const columns = React.useMemo(() => {
    return createPokemonTableColumns(pokemon);
  }, [pokemon]);

  return (
    <MUIDataTable
      data={pokemon}
      columns={columns}
      options={{
        filterType: "multiselect"
      }}
    />
  );
};
