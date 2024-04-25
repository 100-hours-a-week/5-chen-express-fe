// 딤 처리
export const dimmed = (flag = true) => {
    const dimmedElem = document.getElementById("dimmed");
    if (flag) {
        dimmedElem.style.display = "block";
    } else {
        dimmedElem.style.display = "none";
    }
}

// 모달 켜기
export const modalOn = (modalDomElementId, referenceId = null) => {
    let modalElem = document.getElementById(modalDomElementId);
    if (referenceId != null) {
        modalElem.dataset.id = referenceId.toString();
    }
    modalElem.style.display = "flex";
    dimmed()
    document.body.style.overflow = "hidden";
}

// 모달 끄기
export const modalOff = () => {
    let modalList = document.getElementsByClassName("modal");
    for (let item of modalList) {
        delete item.dataset.id
        if (item.style.display != "none") {
            item.style.display = "none"
        }
    }
    dimmed(false)
    document.body.style.overflow = "visible";
}

document.querySelectorAll(".modal-button.cancel")
    .forEach((v, k, p) => {
        v.addEventListener("click", modalOff)
    })
