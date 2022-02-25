import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

//componets
import Pokemon from '../components/Pokemon';
import Loading from '../components/Loading';

const HomePage = () => {

    /*State*/
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    /*Funcion para obtener los pokemons*/
    const getPokemonList = useCallback(async () => {
        let pokemonArray = [];
        for (let i = 1; i < 151; i++) {
            pokemonArray.push(await getPokemonData(i));
        }
        //console.log(pokemonArray);
        setPokemons(pokemonArray);
        setLoading(false);
    },[])

    const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    useEffect(() => {
        getPokemonList();
        return () => {
            //console.log("Cleaun up useEffect []");
        }
    }, [getPokemonList])

    return (
        <>
            {loading ? (
                <Loading />
            )
                :
                (

                    <Row>
                        {pokemons.map(poke => (
                            <Col key={poke.data.id} xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Pokemon pokemon={poke.data} />
                            </Col>
                        ))}
                    </Row>

                )}
        </>
    )

};

export default HomePage