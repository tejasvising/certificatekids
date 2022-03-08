const userName = document.getElementById("name");
const purposeInput=document.getElementById("purpose");
const classInput=document.getElementById("class");
const submitBtn = document.getElementById("submitBtn");
const signInput=document.getElementById("sign")
const dateInput=document.getElementById("date")
const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);
  const val1 = capitalize(classInput.value);
const val2=purposeInput.value
//const val3=capitalize(signInput.value)
//const val4=capitalize(dateInput.value);

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val,val1,val2);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (name,classinput,purpose,date) => {
  const existingPdfBytes = await fetch("./class1to4wowcertificate.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./MochiyPopPOne-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );
  

  // Embed our custom font in the document
  const ChileFont = await pdfDoc.embedFont(fontBytes);
 



  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 280,
    y: 355,
    size: 30,
    font: ChileFont,
    color: rgb(0.36,0.41,0.71)
  });
  firstPage.drawText(classinput, {
    x: 375,
    y: 255,
    size: 30,
    font: ChileFont,
    color: rgb(0.36,0.41,0.71)
  });
  firstPage.drawText(purpose, {
    x: 305,
    y: 175,
    size: 10,
    font: ChileFont,
    color: rgb(0.36,0.41,0.71)
    //color: rgb(0.2, 0.84, 0.67),
  });
  
  // firstPage.drawText(signature, {
  //   x: 190,
  //   y: 135,
  //   size: 10,
  //   font: ChileFont
  //   //color: rgb(0.2, 0.84, 0.67),
  // });
//   firstPage.drawText(date, {
//     x: 500,
//     y: 105,
//     size: 10,
//     font: ChileFont
//     //color: rgb(0.2, 0.84, 0.67),
//   });

  
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "Certification.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();