"use strict";

/** Handle submit of instrument form and display result. */

function handleSubmit(evt) {
    console.log("handleSubmit", evt);

    evt.preventDefault();

    const form = document.getElementById("repair-form");
    const instrument = form.instrument.value;
    const level = form.level.value;
    const service = form.service.value;
    const numPads = Number(form.pad.value);
    const numAdjs = Number(form.adjustment.value);
    const shopHours = Number(form.shopRate.value);
    const isStraubConversion = form.straubConversion.checked;
    const isEmergencyFee = form.emergencyFee.checked;
    const isHeadjointCork = form.headjointCork.checked;
    const isDonut = form.donut.checked;
    const isCaseRepair = form.caseRepair.checked;

    console.log(
        "instrument", instrument,
        "level", level,
        "service", service,
        "numPads", numPads,
        "numAdjs", numAdjs,
        "shopHours", shopHours,
        "isStraubConversion", isStraubConversion,
        "isEmergencyFee", isEmergencyFee,
        "isHeadjointCork", isHeadjointCork,
        "isDonut", isDonut,
        "isCaseRepair", isCaseRepair
    )

    let serviceCost = getServiceCost(instrument, service, level);
    let padEstimate = calculatePads(numPads, instrument, level);
    let adjEstimate = calculateAdjustments(numAdjs);
    let hoursEstimate = calculateShopHours(shopHours);
    let addOns = calculateAddOns(isStraubConversion, isEmergencyFee, isHeadjointCork, isDonut, isCaseRepair);

    displayResult(serviceCost + padEstimate + adjEstimate + hoursEstimate + addOns);
}


function calculateAddOns(straubs, emergency, hjCork, efac, caseFix) {
    console.log("calculateAddOns", straubs, emergency, hjCork, efac, caseFix)
    let total = 0;

    if (straubs) {
        total += straubConversion;
    }
    if (emergency) {
        total += emergencyFee;
    }
    if (hjCork) {
        total += headjointCork;
    }
    if (efac) {
        total += donut;
    }
    if (caseFix) {
        total += caseRepair;
    }

    return total;
}

function getCOACost(inst, lvl, type) {
    console.log("getCOACost", inst, lvl, type)
    if (inst === "flute" || inst === "piccolo") {
        inst = "flutePicc";
    }

    return coa[inst][lvl][type];
}

function getRepadCost(inst, lvl) {
    console.log("getRepadCost", inst, lvl)
    return repad[inst][lvl];
}

function getServiceCost(inst, service, lvl) {
    console.log("getServiceCost", inst, service, lvl);
    if (!inst || !service || !lvl) { return 0 }
    let cost;

    if (service === "full-coa") {
        cost = getCOACost(inst, lvl, "full")
    }

    if (service === "partial-coa") {
        cost = getCOACost(inst, lvl, "partial")
    }

    if (service === "repad") {
        cost = getRepadCost(inst, lvl);
    }

    if (service === "overhaul") {
        cost = overhaul[inst];
    }

    return cost;
}

/** Takes in the number of pads to replace, instrument, and level, and 
 * calculates pad replacement cost.
 * 
 */
function calculatePads(qty, inst, lvl) {
    console.log("calculatePads", qty, inst, lvl)
    if (!inst || !lvl) { return 0 }

    console.log("cost of one pad: ", pad[inst][lvl])
    return Number(pad[inst][lvl]) * qty;
}

function calculateAdjustments(qty) {
    console.log("calculateAdjustments", qty)
    return adjustment * qty;
}

function calculateShopHours(hours) {
    console.log("calculateShopHours", hours)
    return shopRate * hours;
}

function displayResult(total) {
    console.log("displayResult", total)

    let resultDiv = document.getElementById("results")
    resultDiv.innerHTML = 
        `<div class="my-3 alert alert-success display-6">` +
        `$${total}` +
        `</div>`
}

function disableChoices() {
    console.log("disableChoices")
    const repadButton = document.getElementById("repad")
    const piccolo = document.getElementById("piccolo")
    const low = document.getElementById("low")
    const l1 = document.getElementById("level-1")
    const l2 = document.getElementById("level-2")
    const l3 = document.getElementById("level-3")
    const ll = document.getElementById("level-low")

    if (piccolo.checked === true || low.checked === true) {
        console.log("piccolo or low checked")
        repadButton.disabled = true;
        repadButton.checked = false;
    };

    if (low.checked === true) {
        l1.disabled = true;
        l2.disabled = true;
        l3.disabled = true;
        ll.checked = true;
    }

    if (flute.checked === true || piccolo.checked === true) {
        ll.disabled = true;
        ll.checked = false;
    }
}

function enableChoices() {
    console.log("enableChoices")
    const repadButton = document.getElementById("repad")
    const flute = document.getElementById("flute")
    const piccolo = document.getElementById("piccolo")
    const low = document.getElementById("low")
    const l1 = document.getElementById("level-1")
    const l2 = document.getElementById("level-2")
    const l3 = document.getElementById("level-3")
    const ll = document.getElementById("level-low")

    if (flute.checked === true) {
        repadButton.disabled = false
    };

    if (flute.checked === true || piccolo.checked === true) {
        l1.disabled = false;
        l2.disabled = false;
        l3.disabled = false;
    }

    if (low.checked === true) {
        ll.disabled = false
    }
}


document.getElementById("repair-form").addEventListener("submit", handleSubmit);
document.getElementById("piccolo").addEventListener("click", disableChoices)
document.getElementById("piccolo").addEventListener("click", enableChoices)
document.getElementById("low").addEventListener("click", disableChoices)
document.getElementById("low").addEventListener("click", enableChoices)
document.getElementById("flute").addEventListener("click", disableChoices)
document.getElementById("flute").addEventListener("click", enableChoices)

