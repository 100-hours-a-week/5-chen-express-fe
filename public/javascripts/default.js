console.log("DEFAULT JS")

let cssVar = getComputedStyle(document.body)
const CSS_DEEP_MAGENTA = cssVar.getPropertyValue("--deep-magenta")
const CSS_MAGENTA = cssVar.getPropertyValue("--magenta")


function dimmed(flag = true) {
    const dimmedElem = document.getElementById("dimmed");
    if (flag) {
        dimmedElem.style.display = "block";
    } else {
        dimmedElem.style.display = "none";
    }
}

function modalOn(modalElem) {
    modalElem.style.display = "flex";
    dimmed()
}

function modalOff() {
    let modalList = document.getElementsByClassName("modal");
    for (let item of modalList) {
        if (item.style.display != "none") {
            item.style.display = "none"
        }
    }
    dimmed(false)
}

document.querySelectorAll(".modal-button.cancel")
    .forEach((v, k, p) => {
        v.addEventListener("click", modalOff)
    })