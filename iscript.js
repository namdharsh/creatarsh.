// script.js

async function compressImages(){

  const files = document.getElementById("imageInput").files;
  const targetKB = document.getElementById("targetSize").value;

  const output = document.getElementById("output");

  output.innerHTML = "";

  if(files.length === 0){
    alert("Select images");
    return;
  }

  for(let file of files){

    const options = {
      maxSizeMB: targetKB / 1024,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try{

      const compressedFile =
        await imageCompression(file, options);

      const url = URL.createObjectURL(compressedFile);

      const div = document.createElement("div");

      div.classList.add("result");

      div.innerHTML = `
        <p>${compressedFile.name}</p>
        <p>
          ${(compressedFile.size / 1024).toFixed(2)} KB
        </p>

        <a href="${url}"
           download="${compressedFile.name}">
           Download
        </a>
      `;

      output.appendChild(div);

    }catch(error){
      console.log(error);
    }

  }

}