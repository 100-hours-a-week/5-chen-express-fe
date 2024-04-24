document.querySelectorAll(".modal-button.cancel")
    .forEach((v, k, p) => {
        v.addEventListener("click", modalOff)
    })


// 딤 처리
export function dimmed(flag = true) {
    const dimmedElem = document.getElementById("dimmed");
    if (flag) {
        dimmedElem.style.display = "block";
    } else {
        dimmedElem.style.display = "none";
    }
}

// 모달 켜기
export function modalOn(modalId, id = null) {
    let modalElem = document.getElementById(modalId);
    if (id != null) {
        modalElem.dataset.id = id.toString();
    }
    modalElem.style.display = "flex";
    dimmed()
    document.body.style.overflow = "hidden";
}

// 모달 끄기
export function modalOff() {
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