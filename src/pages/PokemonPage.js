import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//Components
import Loader from '../components/Loading';


const PokemonPage = ({ match }) => {
    const { id } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [loading, setLoading] = useState(true);

    //funcion para obtener la información de un pokemon especifico
    const getPokemon = useCallback(async (id) => {
        const details = await getPokemonDetails(id);
        setPokemonDetails(details);
        setLoading(false)
    }, [])

    const getPokemonDetails = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        return res.data;
    }

    useEffect(() => {
        getPokemon(id);
    }, [getPokemon, id])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card
                            className="my-3 p-3 rounded text-center shadow mb-5 bg-white"
                            style={{ border: 'none' }}
                        >
                            <Link to={`/pokemon/${pokemonDetails.id}`}>
                                <Card.Img
                                    style={{ width: '15rem' }}
                                    src={pokemonDetails.sprites.front_default}
                                    variant="top"
                                >

                                </Card.Img>
                            </Link>

                            <Card.Body
                                className ={`${pokemonDetails.types[0].type.name} rounded text-white`}
                            >
                                <Link to={`/pokemon/${pokemonDetails.id}`} className='link-name'>
                                    <Card.Title as = 'div'>
                                        <strong>Poke:#{pokemonDetails.id} {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</strong> 
                                    </Card.Title>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Card className='p-3 text-center shadow mb-5 bg-dark' style={{ border: 'none'}}>
                        <Card.Body >
                            <Card.Text>
                                <Row>
                                    {
                                        pokemonDetails.types.map( t => (
                                            <Col key={t.type.name}>
                                                <div className={`${t.type.name} rounder px-4 py-1`} style={{color: 'white'}}>
                                                    {t.type.name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Img style={{width: '15rem'}} src={pokemonDetails.sprites.front_default} />
                                        <Card.Text style={{color: 'white'}}>Normal Form</Card.Text>  
                                    </Col>
                                    <Col>
                                        <Card.Img style={{width: '15rem'}} src={pokemonDetails.sprites.front_shiny} />
                                        <Card.Text style={{color: 'white'}}>Shiny Form</Card.Text>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <div 
                                            className="px-4 py-1 rounder"
                                            style={{ border: '1px solid white', color: 'white'}}
                                        >
                                            Abilities
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    {
                                        pokemonDetails.abilities.map(a => (
                                            <Col key={a.ability.name} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className="rounder px-4 py-1" style={{color: 'white'}}>
                                                    {a.ability.name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Card.Text>

                        </Card.Body>

                    </Card>
                </Row>
            )

            }
        </>
    );
};

export default PokemonPage;
