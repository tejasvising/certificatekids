const userName = document.getElementById("name");
const purposeInput=document.getElementById("purpose");
const startdateInput = document.getElementById("startdate");
const enddateInput = document.getElementById("enddate");
const pronoun=document.getElementById('pronoun');
const role=document.getElementById('role');
const year=document.getElementById('year');
const degree=document.getElementById('degree');
const description=document.getElementById('description');
const college = document.getElementById("college")
const classInput=document.getElementById("class");
const submitBtn = document.getElementById("submitBtn");
const signInput=document.getElementById("sign")
const dateInput=document.getElementById("date")
const { PDFDocument, rgb, degrees } = PDFLib;
const startdate=startdateInput.value.substring(8,10)+'-'+startdateInput.value.substring(5,7)+'-'+startdateInput.value.substring(0,4)
const enddate=enddateInput.value.substring(8,10)+'-'+enddateInput.value.substring(5,7)+'-'+enddateInput.value.substring(0,4)
const date=dateInput.value.substring(8,10)+'-'+dateInput.value.substring(5,7)+'-'+dateInput.value.substring(0,4)
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val=date;
  const val1 = capitalize(userName.value);
  const val2=year.value;
  const val3=capitalize(degree.value)
  const val4 = capitalize(college.value);
  const val5=startdate;
const val6=enddate;
const val7=capitalize(pronoun.value);
const val8=capitalize(role.value);
const val9=purposeInput.value;
const val10=description.value;

//const val3=capitalize(signInput.value)


  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val,val1,val2,val3,val4,val5,val6,val7,val8,val9,val10);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (date,name,year,degree,college,startdate,enddate,pronoun,role,purpose,description) => {
  const existingPdfBytes = await fetch("./certify.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./NunitoSans-SemiBold.ttf").then((res) =>
    res.arrayBuffer()
  );
  

  // Embed our custom font in the document
  const ChileFont = await pdfDoc.embedFont(fontBytes);
 



  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(date, {
    x: 100,
    y: 665,
    size: 10,
    font: ChileFont
    //color: rgb(0.2, 0.84, 0.67),
  });
  firstPage.drawText(name, {
    x: 205,
    y: 544,
    size: 14,
    font: ChileFont,
    
  });
  firstPage.drawText(year, {
    x: 303,
    y: 544,
    size: 14,
    font: ChileFont,
    
  });
  firstPage.drawText(degree, {
    x: 364,
    y: 544,
    size: 14,
    font: ChileFont,
    
  });
  firstPage.drawText(college, {
    x: 71,
    y: 529,
    size: 13,
    font: ChileFont,
    
  });
  firstPage.drawText(startdate, {
    x: 183,
    y: 514,
    size: 12,
    font: ChileFont,
    
  });
  firstPage.drawText(enddate, {
    x: 275,
    y: 514,
    size: 12,
    font: ChileFont,
    
  });
  firstPage.drawText(pronoun, {
    x: 75,
    y: 484.5,
    size: 14,
    font: ChileFont,
    
  });
  firstPage.drawText(role, {
    x: 180,
    y: 484.5,
    size: 13,
    font: ChileFont,
    
  });
  firstPage.drawText(purpose, {
    x: 315,
    y: 484.5,
    size: 14,
    font: ChileFont,
    fakebold:true
    //color: rgb(0.2, 0.84, 0.67),
  });
  firstPage.drawText(description, {
    x: 75,
    y: 470,
    size: 14,
    font: ChileFont
    //color: rgb(0.2, 0.84, 0.67),
  });
  
  // firstPage.drawText(signature, {
  //   x: 190,
  //   y: 135,
  //   size: 10,
  //   font: ChileFont
  //   //color: rgb(0.2, 0.84, 0.67),
  // });
 

  
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