import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, Container, Form, Col, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import { faSort,faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';


function TableHead({ headers, sortDataByIndex, sortIndex, repeatedIndex }) {
    return (
        <thead>
            <tr>
            
                {
                    headers ?
                        headers.map((header, index) => {
                            if (sortIndex === index) {
                                if (repeatedIndex) {
                                    return (
                                        <th style={{cursor: 'pointer'}} onClick={() => sortDataByIndex(index)}>{header} <FontAwesomeIcon icon={faSortDown} /></th>
                                    );
                                }
                                return (
                                    <th style={{cursor: 'pointer'}} onClick={() => sortDataByIndex(index)}>{header} <FontAwesomeIcon icon={faSortUp} /></th>
                                );
                            }
                            return (
                                <th style={{cursor: 'pointer'}} onClick={() => sortDataByIndex(index)}>{header} <FontAwesomeIcon icon={faSort} /></th>
                            );
                        }) : null
                }
            </tr>
        </thead>
    );
}

function TableRow({ datas }) {
    return (
        <tr>
            {
                datas ?
                    datas.map((data) => {
                        return (<td>{data}</td>);
                    }) : null
            }
        </tr>
    );
}

function TableBody({ items, entries, currentPage }) {


    function getItemOnPage() {
        let components = [];
        const counter = entries > items.length ? items.length : entries;
        for (let i = 0; i < counter; i++) {
            components.push(<TableRow datas={items[i + entries * currentPage]} />);
        }
        return components;
    }

    return (
        <tbody>
            {
                items ? getItemOnPage() : null
            }
        </tbody>
    );
}

function DataTables({ items, headers }) {

    const [itemsToShow, setItemsToShow] = useState(items);

    const [entries, setEntries] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);

    const [sortIndex, setSortIndex] = useState(null);
    const [repeatedIndex, setRepeatedIndex] = useState(false);

    useEffect(() => {
        setItemsToShow(items);
    }, [items]);

    function filterItem(searchText) {
        setCurrentPage(0);
        if (searchText !== '') {
            let newItems = [];
            items.forEach((itemDatas) => {
                for (let i = 0; i < itemDatas.length; i++) {
                    if (itemDatas[i].toString().toLowerCase().includes(searchText.toLowerCase())) {
                        newItems.push(itemDatas);
                        break
                    }
                }
            });
            setItemsToShow(newItems);
        } else {
            setItemsToShow(items);
        }
    }

    function sortDataByIndex(index) {
        setCurrentPage(0);
        let newItems = [];
        if (sortIndex === index && !repeatedIndex) {
            setRepeatedIndex(true);
            newItems = itemsToShow.sort((a, b) => {
                if (a[index] < b[index]) return 1;
                if (a[index] > b[index]) return -1;
                return 0;
            });
        } else {
            setSortIndex(index);
            setRepeatedIndex(false);
            newItems = itemsToShow.sort((a, b) => {
                if (a[index] < b[index]) return -1;
                if (a[index] > b[index]) return 1;
                return 0;
            });
        }

        setItemsToShow(newItems);
    }

    return (
        <Container>
            <Row>
                <Col md={1}>Entries</Col>
                <Col md={2}>
                    <Form.Control
                        placeholder="Entries"
                        value={entries}
                        type="number"
                        onChange={(e) => setEntries(e.target.value)}
                    />
                </Col>
                <Col md={{ span: 1, offset: 4 }}>Search</Col>
                <Col md={4}>
                    <Form.Control
                        placeholder="Search..."
                        onChange={(e) => filterItem(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Table striped border hover>
                    <TableHead
                        headers={headers}
                        sortDataByIndex={sortDataByIndex}
                        sortIndex={sortIndex}
                        repeatedIndex={repeatedIndex}
                    />
                    <TableBody
                        items={itemsToShow}
                        entries={entries}
                        currentPage={currentPage}
                    />
                </Table>
            </Row>
            <Row>
                <Col md={4}>
                    Showing {currentPage * entries + 1} to {((currentPage + 1) * entries) > items.length ? items.length : (currentPage + 1) * entries} of {items.length} entries
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={itemsToShow.length === 0 ? 1 : entries === 0 ? 1 : Math.ceil(itemsToShow.length / entries)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName={'pagination'}
                        subContainerClassName={'page-item'}
                        activeClassName={'active'}
                        forcePage={currentPage}
                    />
                </Col>
            </Row>

        </Container>
    );
}

export default DataTables;

// export default () => {

//     const headers = ["#", "Name", "Role", "Stat", "Level"];
//     const items = [
//         ["1", "Axe", "Tank", "STR", "10"],
//         ["2", "Arc Warden", "Mid", "AGI", "15"],
//         ["3", "Invoker", "Mid", "INT", "12"],
//         ["4", "Juggernaut", "Carry", "AGI", "11"],
//         ["5", "Bristleback", "Offlane", "STR", "15"],
//     ];

//     return <DataTables items={items} headers={headers} />

// }