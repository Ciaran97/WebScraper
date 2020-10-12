var puppeteer = require('puppeteer');
const Excel = require('exceljs');

var pad = "000000";





async function scrapeProduct() {
   
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Branch Codes");

    worksheet.columns = [
        {header: 'Branch Code', key: 'branchcode', width: 10},
        {header: 'Swift Code', key: 'bic', width: 32}, 
        {header: 'Bank Name', key: 'bankName', width: 15,}, 
        {header: 'Branch Name', key: 'branchName', width: 15,}, 
        {header: 'Branch Address', key: 'branchAddress', width: 15,}
      ];
      

try{
 const browser = await puppeteer.launch();
    const page = await browser.newPage();
for(i = 18005; i <= 999999; i++){
//var code =
let code = "" + i;

//Padding for branch codes
var bc = pad.substring(0, pad.length - i.toString().length) + i

//Website to scrape
var url = "https://www.iban.co.za/branch-code-" + bc + ".html"



   
    await page.goto(url);


    let texts = await page.evaluate(() => {

//Set Html attribute to read here       
       const tds = Array.from(document.querySelectorAll('table tr td'))
       return tds.map(td => td.innerText)
       
    });
console.log(i);
    if(texts[1]){
        worksheet.addRow({branchcode: texts[1], bic: texts[3], bankName: texts[5], branchName: texts[7], branchAddress: texts[9]});
       
        console.log("Row added");
    }else{
            console.log("No Data");
    }

/*
    const [el] = await page.$x('//*[@id="wrap"]/div[2]/div/div[1]/table');
    const src = await el.getProperty('src');
    const srcText = await src.jsonValue();

    console.log({srcText});

    */
   
}

browser.close();
}
catch(e){
    console.log(e, "ERROR");
}
await workbook.xlsx.writeFile('export.xlsx');
}


scrapeProduct();


/*


puppeteer.launch().then(browser => browser.newPage()
.then(page => {return page.goto(url).then(function(){
    return page.content()
})})).then(html => {
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    $('//*[@id="wrap"]/div[2]/div/div[1]/h1').each(function() {
      newsHeadlines.push({
        title: $(this).text(),
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);


*/

async function exTest(){
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Branch Codes");
  
  worksheet.columns = [
    {header: 'Branch Code', key: 'branchcode', width: 10},
    {header: 'Swift Code', key: 'bic', width: 32}, 
    {header: 'Bank Name', key: 'bankName', width: 15,}, 
    {header: 'Branch Name', key: 'branchName', width: 15,}, 
    {header: 'Branch Address', key: 'branchAddress', width: 15,}
  ];
  
  worksheet.addRow({branchcode: 1, bic: 'John Doe', bankName: new Date(1970, 1, 1)});
  worksheet.addRow({branchcode: 2, bic: 'Jane Doe', bankName: new Date(1965, 1, 7)});
  
  // save under export.xlsx
  await workbook.xlsx.writeFile('export.xlsx');
  
  // load a copy of export.xlsx
  const newWorkbook = new Excel.Workbook();
  await newWorkbook.xlsx.readFile('export.xlsx');
  
  const newworksheet = newWorkbook.getWorksheet('My Sheet');
  newworksheet.addRow(
    {branchcode: 3, bic: 'New Guy', bankName: new Date(2000, 1, 1)}
  );
  
  await newWorkbook.xlsx.writeFile('export2.xlsx');
  
  console.log("File is written");
  };
  
 // exTest();