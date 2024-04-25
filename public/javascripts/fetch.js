// JSON파일을 object로 가져오기
const SERVER_URL = "http://localhost:8080"

export async function fetchServer(path, method = "GET", data = {}, isJson = true) {
    console.log(`fetch start${!isJson ? '' : ' JSON'} : ${method} ${path}`);

    const requestInit = {
        method: method
    };

    if (isJson) {
        requestInit.headers = {"Content-Type": "application/json",};
        if (method !== "GET" && method !== "HEAD") {
            requestInit.body = JSON.stringify(data);
        }
    } else {
        requestInit.body = data;
    }

    return fetch(`${SERVER_URL}${path}`, requestInit);
}

// 날짜 포맷팅
export function formatDateTime(date) {
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    let day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        month = `0${day}`
    }

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

// html string -> dom element로 변환
export function fromHTML(html, trim = true) {
    html = trim ? html.trim() : html;
    if (!html) return null;

    const template = document.createElement("template");
    template.innerHTML = html;
    const result = template.content.children;

    if (result.length === 1) return result[0];
    return result;
}

// 파일 인풋 시 이미지 변경
export function displayImageOnChange(inputImage, displayImage) {
    const file = inputImage.files[0]
    const reader = new FileReader();

    reader.onloadend = () => {
        displayImage.style.backgroundImage = `url(${reader.result})`;
        displayImage.style.backgroundSize = "cover";
    }
    if (file) {
        reader.readAsDataURL(file)
    }
}