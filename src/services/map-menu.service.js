/* eslint-disable no-undef */
let SUCCESS_STATUS = 200;

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

let middleware = (message) => (res) => {
    let { status } = res;

    if (status !== SUCCESS_STATUS) {
        throw new Error(message);
    }

    return res;
};

export let getMaps = () =>
    fetch('/rest/v1/maps/', {
        method: 'GET',
    })
        .then(middleware('is not authorized'))
        .then((res) => res.json());

export let createMap = (label) =>
    fetch('/rest/v1/maps/', {
        headers,
        method: 'POST',
        body: JSON.stringify({
            label,
            blocks: [],
        }),
    })
        .then(middleware('is not authorized'))
        .then((res) => res.json());

export let getMapByID = (id) =>
    fetch(`/rest/v1/maps/${id}`, {
        method: 'GET',
    })
        .then(middleware('is not authorized'))
        .then((res) => res.json());

export let saveMapByID = (id, blocks) =>
    fetch(`/rest/v1/maps/${id}`, {
        headers,
        method: 'PUT',
        body: JSON.stringify({
            mapData: {
                blocks,
            },
        }),
    })
        .then(middleware('is not authorized'))
        .then((res) => res.json());

export let isUserAuthorized = () =>
    fetch('/helper/isUserAuthorized', {
        method: 'GET',
    })
        .then(middleware('is not authorized'))
        .then((res) => res.json());

export let signOff = () => 
    fetch('/helper/signOff', {
        headers,
        method: 'POST',
    })
        .then(middleware('is not authorized'));
