import { useEffect, useState } from "react";
import { getAllPokemon } from "../servicios/pokeService";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function RickAndMortyList() {
    const [rymdata, setRyMData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const apiURL = 'https://rickandmortyapi.com/api/character';
    const [open, setOpen] = React.useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleOpen = (id) => {
        setSelectedCharacter(id);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(apiURL);
            setRyMData(response.results);
        }
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rymdata.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(rymdata.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="personajes">
            <div className="titulo2">
                <h1>Lista de personajes Rick y Morty</h1>
            </div>
            <div className="caracteres">
                {currentItems.map((rym) => (
                    <div className="card" key={rym.id}>
                        <img
                            src={rym.image}
                            alt={rym.name}
                            className="card-img"
                            onClick={() => handleOpen(rym.id)} // Pasa el ID del personaje
                        />
                        <div className="card-body">
                            <h2 className="card-title">{rym.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(rymdata.length / itemsPerPage)}>
                    Siguiente
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedCharacter && (
                        <>
                            {rymdata
                                .filter((rym) => rym.id === selectedCharacter)
                                .map((rym) => (
                                    <div className="masInfo" key={rym.id}>
                                        Nombre: {rym.name}
                                        <br/>
                                        Estado: {rym.status}
                                        <br/>
                                        Especie: {rym.species}
                                        <br/>
                                        Genero: {rym.gender}
                                        <br/>
                                        Origen: {rym.origin.name}
                                        <br/>
                                        Locacion: {rym.location.name}
                                    </div>
                                ))}
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default RickAndMortyList;
