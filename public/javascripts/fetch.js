// JSON파일을 object로 가져오기
export async function fetchServer(path, method = "GET", data = {}, isJson = true) {
    console.log(`fetch start : ${path}`)
    if (method === "GET" || method === "HEAD") {
        return fetch("http://localhost:8080" + path, {
            headers: {
                "Content-Type": "application/json",
            },
            method: method,
        })
    }
    if (!isJson) {
        return fetch("http://localhost:8080" + path, {
            method: method,
            body: data,
        })
    }
    return fetch("http://localhost:8080" + path, {
        headers: {
            "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(data),
    })
}

// 날짜 포맷팅
export function formatDateTime(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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