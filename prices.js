"use strict";

const coa = {
    flutePicc: {
        1: {
            full: 295,
            partial: 195,
        },
        2: {
            full: 395,
            partial: 245,
        },
        3: {
            full: 495,
            partial: 345,
        },
    },

    low: {
        low: {
            full: 445,
            partial: 295,
        }
    },
}

const pad = {
    flute: {

        1: 40,
        2: 40,
        3: 60,

    },
    piccolo: {

        1: 40,
        2: 40,
        3: 50,

    },
    low: {
        low: 65,
    },
}

const overhaul = {
    flute: 1795,
    piccolo: 1395,
    low: 1895,
}

const repad = {
    flute: {
        1: 995,
        2: 1295,
        3: 1495,
    },
    low: {
        0: 1495,
    }
}

const straubConversion = 200;
const shopRate = 120;
const emergencyFee = 60;
const headjointCork = 50;
const adjustment = 30; // adjustment paper/material modification or replacement
const donut = 95;
const caseRepair = 30;