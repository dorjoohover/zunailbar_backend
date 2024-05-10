const reader = require("xlsx");

module.exports = (body, file) => {

  var file = reader.readFile(file);

  // console.log("XLSX file: ", file);
  // console.log("XLSX BODY: ", body);

  var tab = getTab(body);

  // console.log("XLSX TAB: ", tab);

  var balance_sheet = reader.utils.sheet_to_json("Sheet1");
  var income_sheet = reader.utils.sheet_to_json(file.Sheets[tab.income]);
  var owner_sheet = reader.utils.sheet_to_json(file.Sheets[tab.owner]);
  var cashflow_sheet = reader.utils.sheet_to_json(file.Sheets[tab.cashflow]);

  

  var data = sheetMap(body, { balance: balance_sheet, income: income_sheet, owner: owner_sheet, cashflow: cashflow_sheet});

  // console.log("SHEET MAP: ", data);

  return data;  
}

const sheetMap = (body, xlsx) => {
  
  let data = {};

  var sheet = getNodes(body)

  // console.log("SHEET BODY: ", body);
  // console.log("SHEET XLSX: ", xlsx);

  xlsx.balance.map((item) => {
    switch(item.__EMPTY_1) {
      case sheet.assets:
        data.assets = item.__EMPTY_3;
        break;
      case sheet.shortterm_dept:
        data.shortterm_dept = item.__EMPTY_3;
        break;
      case sheet.longterm_dept:
        data.longterm_dept = item.__EMPTY_3;
        break;
      case sheet.total_dept:
        data.total_dept = item.__EMPTY_3;
        break;
      case sheet.total_owner:
        data.total_owner = item.__EMPTY_3;
        break;
      case sheet.total_share: 
        data.total_share = item.__EMPTY_3;
        break;
      case sheet.book_value_per_share: 
        data.book_value_per_share = item.__EMPTY_3;
        break;
      case sheet.market_value: 
        data.market_value = item.__EMPTY_3;
        break;
    }
  });

  xlsx.income.map((item) => {
    switch(item.__EMPTY_1) {
      case sheet.income: 
        data.income = item.__EMPTY_3;
        break;
      case sheet.owner_cost: 
        data.owner_cost = item.__EMPTY_3;
        break;
      case sheet.revenue_before_tax: 
        data.revenue_before_tax = item.__EMPTY_3;
        break;
      case sheet.net_profit: 
        data.net_profit = item.__EMPTY_3;
        break;
      case sheet.total_profit: 
        data.total_profit = item.__EMPTY_3;
        break;
      case sheet.finencial_cost: 
        data.finencial_cost = item.__EMPTY_3;
        break;
    }
  });

  xlsx.cashflow.map((item) => {
    switch(item.__EMPTY_1) {
      case sheet.net_cashflow: 
        data.net_cashflow = item.__EMPTY_3;
        break;
      case sheet.cash_and_cash_equivalents_jan1: 
        data.cash_and_cash_equivalents_jan1 = item.__EMPTY_3;
        break;
      case sheet.cash_and_cash_equivalents_dec31: 
        data.cash_and_cash_equivalents_dec31 = item.__EMPTY_3;
        break;
      case sheet.main_revenue:
        data.main_revenue = item.__EMPTY_3; 
      case sheet.investment_revenue: 
        data.investment_revenue = item.__EMPTY_3; 
      case sheet.finencial_revenue: 
        data.finencial_revenue = item.__EMPTY_3; 
      case sheet.all_cashflow: 
        data.all_cashflow = item.__EMPTY_3;   
    }
  });

  // console.log("XSLX: ", data);

  return data;
}


const getTab = (body) => {

  let tab = {}

  switch(body.type) {
    case 0: 
      tab = {
        balance: "balance",
        income: "income",
        owner: "owner",
        cashflow: "cashflow"
      };
      break;
    default:
      tab = {
        balance: "СБД",
        incode: "ОДТ",
        owner: "ӨӨТ",
        cashflow: "МГТ"  
      }
  } 

  // console.log("TAB: ", tab);

  return tab;
}

// var sheet = {
//   assets: symbol !== "GOV" ? "Нийт хөрөнгийн дүн" : "НИЙТ ХӨРӨНГИЙН ДҮН", // нийт хөрөнгө
//   shortterm_dept: "Богино хугацаат өр төлбөрийн дүн", // богино хугацаат төлбөрийн дүн
//   longterm_dept: "Урт хугацаат өр төлбөрийн дүн",  // урт хугацаат төлбөрийн дүн
//   total_dept: "Өр төлбөрийн нийт дүн",  // өр төлбөрийн дүн
//   total_owner: "Эздийн өмчийн дүн", // эздийн өмчийн дүн
//   total_share: "Нийт гаргасан хувьцаа", // нийт гаргасан хувьцаа
//   income: symbol !== "GOV" ? "Үйл ажиллагааны орлого" : "Борлуулалтын орлого (цэвэр)", // ҮА орлого
//   finencial_cost: "Санхүүгийн зардал",
//   owner_cost: "Ерөнхий ба удирдлагын зардал", // ерөнхий ба удирдлагын зардал
//   revenue_before_tax: "Татвар төлөхийн өмнөх  ашиг( алдагдал)", //ТӨЦА
//   net_profit: "Тайлант үеийн цэвэр ашиг ( алдагдал)", // ЦА
//   total_profit: "Орлогын нийт дүн", // НА
//   book_value_per_share: "Нэгж хувьцааны дансны үнэ", // Нэгж хувьцааны дансны үнэ
//   net_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
//   market_value: "Зах зээлийн үнэлгээ",
//   cash_and_cash_equivalents_jan1: symbol !== "GOV" ? "МӨНГӨ, ТҮҮНТЭЙ АДИЛТГАХ ХӨРӨНГИЙН ЭХНИЙ ҮЛДЭГДЭЛ" : "Мөнгө, түүнтэй адилтгах хөрөнгийн эхний үлдэгдэл", // Нэгж хувьцааны дансны үнэ
//   cash_and_cash_equivalents_dec31: symbol !== "GOV" ? "МӨНГӨ, ТҮҮНТЭЙ АДИЛТГАХ ХӨРӨНГИЙН ЭЦСИЙН ҮЛДЭГДЭЛ" : "Мөнгө, түүнтэй адилтгах хөрөнгийн эцсийн үлдэгдэл", // Нэгж хувьцааны дансны үнэ
// }

const getNodes = (body) => {

  let sheet = {};

  // console.log("GETNODES: ", body);

  switch(body.type) {
    case 0: 
      sheet = {
        assets: "НИЙТ ХӨРӨНГИЙН ДҮН", // нийт хөрөнгө
        shortterm_dept: "Бусад санхүүгийн өр төлбөрийн дүн", // богино хугацаат төлбөрийн дүн
        longterm_dept: "Нөхөн төлбөрийн нөөц сангийн дүн",  // урт хугацаат төлбөрийн дүн
        total_dept: "НИЙТ ӨР ТӨЛБӨРИЙН ДҮН",  // өр төлбөрийн дүн
        total_owner: "ЭЗДИЙН ӨМЧИЙН ДҮН", // эздийн өмчийн дүн
        total_share: "Нийт гаргасан хувьцаа", // нийт гаргасан хувьцаа
        income: "Даатгалын хураамжийн цэвэр орлого (2+3+4)", // ҮА орлого
        finencial_cost: "Даатгалын үйл ажиллагааны ашиг(алдагдал)(6-11-12+13+14)",
        owner_cost: "Ерөнхий ба удирдлагын зардал", // ерөнхий ба удирдлагын зардал
        revenue_before_tax: "Татвар төлөхийн өмнөх ашиг (алдагдал)", //ТӨЦА
        net_profit: "Тайлант үеийн цэвэр ашиг (алдагдал)", // ЦА
        total_profit: "Орлогын нийт дүн", // НА
        book_value_per_share: "Нэгж хувьцааны дансны үнэ", // Нэгж хувьцааны дансны үнэ
        net_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
        market_value: "Зах зээлийн үнэлгээ",
        cash_and_cash_equivalents_jan1: "МӨНГӨ, ТҮҮНТЭЙ АДИЛТГАХ ХӨРӨНГИЙН ЭХНИЙ ҮЛДЭГДЭЛ", // Нэгж хувьцааны дансны үнэ
        cash_and_cash_equivalents_dec31: "МӨНГӨ, ТҮҮНТЭЙ АДИЛТГАХ ХӨРӨНГИЙН ЭЦСИЙН ҮЛДЭГДЭЛ", // Нэгж хувьцааны дансны үнэ
        main_revenue: "Үндсэн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        investment_revenue: "Хөрөнгө оруулалтын үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        finencial_revenue: "Санхүүгийн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        all_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
      }
    case 1: 
      sheet = {
        assets: "Нийт хөрөнгийн дүн", // нийт хөрөнгө
        shortterm_dept: "Богино хугацаат өр төлбөрийн дүн", // богино хугацаат төлбөрийн дүн
        longterm_dept: "Урт хугацаат өр төлбөрийн дүн",  // урт хугацаат төлбөрийн дүн
        total_dept: "Өр төлбөрийн нийт дүн",  // өр төлбөрийн дүн
        total_owner: "Эздийн өмчийн дүн", // эздийн өмчийн дүн
        total_share: "Нийт гаргасан хувьцаа", // нийт гаргасан хувьцаа
        income: "Үйл ажиллагааны орлого", // ҮА орлого
        finencial_cost: "Санхүүгийн зардал",
        owner_cost: "Ерөнхий ба удирдлагын зардал", // ерөнхий ба удирдлагын зардал
        revenue_before_tax: "Татвар төлөхийн өмнөх  ашиг( алдагдал)", //ТӨЦА
        net_profit: "Тайлант үеийн цэвэр ашиг ( алдагдал)", // ЦА
        total_profit: "Орлогын нийт дүн", // НА
        book_value_per_share: "Нэгж хувьцааны дансны үнэ", // Нэгж хувьцааны дансны үнэ
        net_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
        market_value: "Зах зээлийн үнэлгээ",
        cash_and_cash_equivalents_jan1: "МӨНГӨ, ТҮҮНТЭЙ АДИЛТГАХ ХӨРӨНГИЙН ЭХНИЙ ҮЛДЭГДЭЛ", // Нэгж хувьцааны дансны үнэ
        cash_and_cash_equivalents_dec31: "МӨНГӨ, ТҮҮНТЭЙ АДИЛТГАХ ХӨРӨНГИЙН ЭЦСИЙН ҮЛДЭГДЭЛ", // Нэгж хувьцааны дансны үнэ,
        main_revenue: "Үндсэн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        investment_revenue: "Хөрөнгө оруулалтын үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        finencial_revenue: "Санхүүгийн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        all_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
      }
    case 2:
      sheet = {
        assets: "НИЙТ ХӨРӨНГИЙН ДҮН", // нийт хөрөнгө
        shortterm_dept: "Богино хугацаат өр төлбөрийн дүн", // богино хугацаат төлбөрийн дүн
        longterm_dept: "Урт хугацаат өр төлбөрийн дүн",  // урт хугацаат төлбөрийн дүн
        total_dept: "Өр төлбөрийн нийт дүн",  // өр төлбөрийн дүн
        total_owner: "Эзэмшигчдийн өмчийн дүн", // эздийн өмчийн дүн
        total_share: "Нийт гаргасан хувьцаа", // нийт гаргасан хувьцаа
        interest_income: "Хүүгийн орлого", // ҮА орлого
        interest_cost: "Хүүгийн зардал",
        pinterest_incode: "Цэвэр хүүгийн орлого  (1-2)",
        owner_cost: "Ердийн үйл ажиллагааны ашиг/алдагдал  / (9+10-11)", // ерөнхий ба удирдлагын зардал
        revenue_before_tax: "Татвар төлөхийн өмнөх ашиг/алдагдал  (12+13-14)", //ТӨЦА
        net_profit: "ЦЭВЭР ХҮҮГИЙН БУС ОРЛОГО/ЗАРДЛЫН ДҮН  (4-5)", // ЦА
        total_profit: "ЦЭВЭР АШИГ (15-16)", // НА
        book_value_per_share: "Нэгж хувьцааны дансны үнэ", // Нэгж хувьцааны дансны үнэ
        net_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
        market_value: "Зах зээлийн үнэлгээ",
        cash_and_cash_equivalents_jan1: "МӨНГӨН ХӨРӨНГИЙН ЭХНИЙ ҮЛДЭГДЭЛ",
        cash_and_cash_equivalents_dec31: "МӨНГӨН ХӨРӨНГИЙН ЭЦСИЙН ҮЛДЭГДЭЛ", // Нэгж хувьцааны дансны үнэ
        main_revenue: "Үндсэн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        investment_revenue: "Хөрөнгө оруулалтын үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        finencial_revenue: "Санхүүгийн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        all_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
      }
    case 3: 
      sheet = {
        assets: "НИЙТ ХӨРӨНГИЙН ДҮН", // нийт хөрөнгө
        shortterm_dept: "Богино хугацаат өр төлбөрийн дүн", // богино хугацаат төлбөрийн дүн
        longterm_dept: "Урт хугацаат өр төлбөрийн дүн",  // урт хугацаат төлбөрийн дүн
        total_dept: "Өр төлбөрийн нийт дүн",  // өр төлбөрийн дүн
        total_owner: "Эздийн өмчийн дүн", // эздийн өмчийн дүн
        total_share: "Нийт гаргасан хувьцаа", // нийт гаргасан хувьцаа
        income: "Үйл ажиллагааны орлого", // ҮА орлого
        finencial_cost: "Санхүүгийн түрээсийн үйлчилгээний эрсдэлийн зардал",
        owner_cost: "Ерөнхий ба удирдлагын зардал", // ерөнхий ба удирдлагын зардал
        revenue_before_tax: "Татвар төлөхийн өмнөх  ашиг( алдагдал)", //ТӨЦА
        net_profit: "Тайлант үеийн цэвэр ашиг ( алдагдал)", // ЦА
        total_profit: "Орлогын нийт дүн", // НА
        book_value_per_share: "Нэгж хувьцааны дансны үнэ", // Нэгж хувьцааны дансны үнэ
        net_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
        market_value: "Зах зээлийн үнэлгээ",
        cash_and_cash_equivalents_jan1: "Мөнгө, түүнтэй адилтгах хөрөнгийн эхний үлдэгдэл", // Нэгж хувьцааны дансны үнэ
        cash_and_cash_equivalents_dec31: "Мөнгө, түүнтэй адилтгах хөрөнгийн эцсийн үлдэгдэл", // Нэгж хувьцааны дансны үнэ
        main_revenue: "Үндсэн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        investment_revenue: "Хөрөнгө оруулалтын үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        finencial_revenue: "Санхүүгийн үйл ажиллагааны цэвэр мөнгөн гүйлгээний дүн",
        all_cashflow: "Бүх цэвэр мөнгөн гүйлгээ",
      }
  }

  return sheet;
}

// insurance = 0, broker = 1, non_bank = 2, shared = 3