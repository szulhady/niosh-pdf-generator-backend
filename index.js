const express = require('express')
const port = process.env.PORT || 3000
const path = require('path')
const cors = require('cors')
const ejs = require('ejs')
const pdf = require('html-pdf')
const app = express()
const fs = require('fs');
const moment =require('moment')


const connection  = require('./config/database');

app.use(cors())
// Set the view engine to ejs
app.set('view engine', 'ejs')
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

app.get('/',(req,res)=>{
  res.render(path.join(__dirname,'./index.ejs'))
})

let referenceNo
let clientCompany
let clientCompanyAddress
let clientContactNumber
let testItem
let brandModel
let lotBatchProductionNo
let quantity
let dateOfSampleReceived
app.post('/search',(req,res)=>{
  console.log(req.body.id)
  // console.log('here')
  const q = `SELECT * FROM project_register INNER JOIN sample_reg ON project_register.projectId = sample_reg.projectId WHERE project_register.projectId="${req.body.id}" `
  connection.query(q, (err,results)=>{
    if(results.length>0){
      referenceNo=results[0].projectId
      clientCompany  =results[0].companyName
      clientCompanyAddress = results[0].companyAdd
      clientContactNumber = results[0].clientContact
      testItem = results[0].testId
      brandModel = results[0].sampleBrand
      lotBatchProductionNo = results[0].sampleBatch
      quantity = results[0].totalSamples
      dateOfSampleReceived = results[0].dateReceived
      res.json({
        "referenceNo":referenceNo,
        "clientCompany":clientCompany,
        "clientCompanyAddress":clientCompanyAddress,
        "clientContactNumber":clientContactNumber,
        "testItem":testItem,
        "brandModel":brandModel,
        "lotBatchProductionNo":lotBatchProductionNo,
        "quantity":quantity,
        "dateOfSampleReceived":dateOfSampleReceived,
      })
    }else{
      res.json({
        "referenceNo":"1",
        "clientCompany":"",
        "clientCompanyAddress":"",
        "clientContactNumber":"",
        "testItem":"",
        "brandModel":"",
        "lotBatchProductionNo":"",
        "quantity":"",
        "dateOfSampleReceived":"",
      })
    }
    if(err){console.log(err)}
  })

})

app.get('/pdf2', (req,res)=>{
  res.download('index.ejs')
})

app.post('/pdf',(req,res)=>{
  const date = moment().format('Do MMM YYYY');

  ejs.renderFile(path.join(__dirname, './index.ejs'), {date:date,referenceNo:req.body.referenceNo,clientCompany:req.body.clientCompany,clientCompanyAddress:req.body.clientCompanyAddress,clientContactNumber:req.body.clientContactNumber,testItem:req.body.testItem,brandModel:req.body.brandModel,lotBatchProductionNo:req.body.lotBatchProductionNo,quantity:req.body.quantity,dateOfSampleReceived:req.body.dateOfSampleReceived,dateOfTestingInput:req.body.dateOfTestingInput, preparedBy:req.body.preparedBy, approvedBy:req.body.approvedBy,visualInspectionResult:req.body.visualInspectionResult, visualInspectionRemark:req.body.visualInspectionRemark, materialResult:req.body.materialResult, materialRemark:req.body.materialRemark, practicalPerformanceResult:req.body.practicalPerformanceResult, practicalPerformanceRemark:req.body.practicalPerformanceRemark, totalInwardLeakageResult:req.body.totalInwardLeakageResult,totalInwardLeakageRemark:req.body.totalInwardLeakageRemark, penetrationResult:req.body.penetrationResult, penetrationRemark:req.body.penetrationRemark, flammabilityResult:req.body.flammabilityResult, flammabilityRemark:req.body.flammabilityRemark, carbonDioxideContentResult:req.body.carbonDioxideContentResult, carbonDioxideContentRemark: req.body.carbonDioxideContentRemark, breathingResistanceResult:req.body.breathingResistanceResult, breathingResistanceRemark:req.body.breathingResistanceRemark, cloggingResult:req.body.cloggingResult, cloggingRemark:req.body.cloggingRemark, samplesNo:req.body.samplesNo, samplesBrands:req.body.samplesBrands, samplesModel:req.body.samplesModel, samplesQuantity:req.body.samplesQuantity, allProblems:req.body.allProblems, allRemark:req.body.allRemark, M11:req.body.M11, M12:req.body.M12, M21:req.body.M21, M22:req.body.M22, M31:req.body.M31, M32:req.body.M32, M41:req.body.M41, M42:req.body.M42, M51:req.body.M51, M52:req.body.M52, M61:req.body.M61, M62:req.body.M62, PP111:req.body.PP111, PP112:req.body.PP112, PP113:req.body.PP113, PP114:req.body.PP114, PP115:req.body.PP115, PP116:req.body.PP116, PP117:req.body.PP117, PP118:req.body.PP118, PP121:req.body.PP121, PP122:req.body.PP122, PP123:req.body.PP123, PP124:req.body.PP124, PP125:req.body.PP125, PP126:req.body.PP126, PP127:req.body.PP127, PP128:req.body.PP128, PP131:req.body.PP131, PP211:req.body.PP211, PP212:req.body.PP212, PP213:req.body.PP213, PP214:req.body.PP214, PP215:req.body.PP215, PP216:req.body.PP216,PP217:req.body.PP217, PP218:req.body.PP218, PP221:req.body.PP221, PP222:req.body.PP222, PP223:req.body.PP223, PP224:req.body.PP224, PP225:req.body.PP225, PP226:req.body.PP226, PP227:req.body.PP227, PP228:req.body.PP228, PP231:req.body.PP231, CSP11:req.body.CSP11, CSP12:req.body.CSP12, CSP13:req.body.CSP13, CSP14:req.body.CSP14, CSP21:req.body.CSP21, CSP22:req.body.CSP22, CSP23:req.body.CSP23, CSP24:req.body.CSP24, CSP31:req.body.CSP31, CSP32:req.body.CSP32, CSP33:req.body.CSP33, CSP34:req.body.CSP34, CSP41:req.body.CSP41, CSP42:req.body.CSP42, CSP43:req.body.CSP43, CSP44:req.body.CSP44, CSP51:req.body.CSP51, CSP52:req.body.CSP52, CSP53:req.body.CSP53, CSP54:req.body.CSP54, CSP61:req.body.CSP61,CSP62:req.body.CSP62, CSP63:req.body.CSP63, CSP64:req.body.CSP64,CSP71:req.body.CSP71,CSP72:req.body.CSP72, CSP73:req.body.CSP73, CSP74:req.body.CSP74,CSP81:req.body.CSP81,CSP82:req.body.CSP82, CSP83:req.body.CSP83, CSP84:req.body.CSP84,CSP91:req.body.CSP91,CSP92:req.body.CSP92, CSP93:req.body.CSP93, CSP94:req.body.CSP94,CSP101:req.body.CSP101,CSP102:req.body.CSP102, CSP103:req.body.CSP103, CSP104:req.body.CSP104, TIL11:req.body.TIL11, TIL12:req.body.TIL12, TIL13:req.body.TIL13, TIL14:req.body.TIL14, TIL15:req.body.TIL15, TIL16:req.body.TIL16, TIL17:req.body.TIL17, TIL18:req.body.TIL18, TIL19:req.body.TIL19, TIL110:req.body.TIL110, TIL111:req.body.TIL111, TIL21:req.body.TIL21, TIL22:req.body.TIL22, TIL23:req.body.TIL23, TIL24:req.body.TIL24, TIL25:req.body.TIL25, TIL26:req.body.TIL26, TIL27:req.body.TIL27, TIL28:req.body.TIL28, TIL29:req.body.TIL29, TIL210:req.body.TIL210, TIL211:req.body.TIL211, TIL31:req.body.TIL31, TIL32:req.body.TIL32, TIL33:req.body.TIL33, TIL34:req.body.TIL34, TIL35:req.body.TIL35, TIL36:req.body.TIL36, TIL37:req.body.TIL37, TIL38:req.body.TIL38, TIL39:req.body.TIL39, TIL310:req.body.TIL310, TIL311:req.body.TIL311, TIL41:req.body.TIL41, TIL42:req.body.TIL42, TIL43:req.body.TIL43, TIL44:req.body.TIL44, TIL45:req.body.TIL45, TIL46:req.body.TIL46, TIL47:req.body.TIL47, TIL48:req.body.TIL48, TIL49:req.body.TIL49, TIL410:req.body.TIL410, TIL411:req.body.TIL411, TIL51:req.body.TIL51, TIL52:req.body.TIL52, TIL53:req.body.TIL53, TIL54:req.body.TIL54, TIL55:req.body.TIL55, TIL56:req.body.TIL56, TIL57:req.body.TIL57, TIL58:req.body.TIL58, TIL59:req.body.TIL59, TIL510:req.body.TIL510, TIL511:req.body.TIL511, TIL61:req.body.TIL61, TIL62:req.body.TIL62, TIL63:req.body.TIL63, TIL64:req.body.TIL64, TIL65:req.body.TIL65, TIL66:req.body.TIL66, TIL67:req.body.TIL67, TIL68:req.body.TIL68, TIL69:req.body.TIL69, TIL610:req.body.TIL610, TIL611:req.body.TIL611, TIL71:req.body.TIL71, TIL72:req.body.TIL72, TIL73:req.body.TIL73, TIL74:req.body.TIL74, TIL75:req.body.TIL75, TIL76:req.body.TIL76, TIL77:req.body.TIL77, TIL78:req.body.TIL78, TIL79:req.body.TIL79, TIL710:req.body.TIL710, TIL711:req.body.TIL711, TIL81:req.body.TIL81, TIL82:req.body.TIL82, TIL83:req.body.TIL83, TIL84:req.body.TIL84, TIL85:req.body.TIL85, TIL86:req.body.TIL86, TIL87:req.body.TIL87, TIL88:req.body.TIL88, TIL89:req.body.TIL89, TIL810:req.body.TIL810, TIL811:req.body.TIL811, TIL91:req.body.TIL91, TIL92:req.body.TIL92, TIL93:req.body.TIL93, TIL94:req.body.TIL94, TIL95:req.body.TIL95, TIL96:req.body.TIL96, TIL97:req.body.TIL97, TIL98:req.body.TIL98, TIL99:req.body.TIL99, TIL910:req.body.TIL910, TIL911:req.body.TIL911, TIL101:req.body.TIL101, TIL102:req.body.TIL102, TIL103:req.body.TIL103, TIL104:req.body.TIL104, TIL105:req.body.TIL105, TIL106:req.body.TIL106, TIL107:req.body.TIL107, TIL108:req.body.TIL108, TIL109:req.body.TIL109, TIL1010:req.body.TIL1010, TIL1011:req.body.TIL1011, FDTIL11:req.body.FDTIL11, FDTIL12:req.body.FDTIL12, FDTIL13:req.body.FDTIL13, FDTIL14:req.body.FDTIL14,FDTIL21:req.body.FDTIL21, FDTIL22:req.body.FDTIL22, FDTIL23:req.body.FDTIL23, FDTIL24:req.body.FDTIL24,FDTIL31:req.body.FDTIL31, FDTIL32:req.body.FDTIL32, FDTIL33:req.body.FDTIL33, FDTIL34:req.body.FDTIL34,FDTIL41:req.body.FDTIL41, FDTIL42:req.body.FDTIL42, FDTIL43:req.body.FDTIL43, FDTIL44:req.body.FDTIL44,FDTIL51:req.body.FDTIL51, FDTIL52:req.body.FDTIL52, FDTIL53:req.body.FDTIL53, FDTIL54:req.body.FDTIL54, FDTIL61:req.body.FDTIL61, FDTIL62:req.body.FDTIL62, FDTIL63:req.body.FDTIL63, FDTIL64:req.body.FDTIL64, FDTIL71:req.body.FDTIL71, FDTIL72:req.body.FDTIL72, FDTIL73:req.body.FDTIL73, FDTIL74:req.body.FDTIL74, FDTIL81:req.body.FDTIL81, FDTIL82:req.body.FDTIL82, FDTIL83:req.body.FDTIL83, FDTIL84:req.body.FDTIL84,FDTIL91:req.body.FDTIL91, FDTIL92:req.body.FDTIL92, FDTIL93:req.body.FDTIL93, FDTIL94:req.body.FDTIL94,FDTIL101:req.body.FDTIL101, FDTIL102:req.body.FDTIL102, FDTIL103:req.body.FDTIL103, FDTIL104:req.body.FDTIL104, PT11:req.body.PT11, PT12:req.body.PT12, PT21:req.body.PT21, PT22:req.body.PT22, PT31:req.body.PT31, PT32:req.body.PT32, PT41:req.body.PT41, PT42:req.body.PT42, PT51:req.body.PT51, PT52:req.body.PT52, PT61:req.body.PT61, PT62:req.body.PT62, PT71:req.body.PT71, PT72:req.body.PT72, PT81:req.body.PT81, PT82:req.body.PT82, PT91:req.body.PT91, PT92:req.body.PT92, PT101:req.body.PT101, PT102:req.body.PT102, PT111:req.body.PT111, PT112:req.body.PT112, PT121:req.body.PT121, PT122:req.body.PT122,F1:req.body.F1,F2:req.body.F2,F3:req.body.F3,F4:req.body.F4, CO1:req.body.CO1,CO2:req.body.CO2,CO3:req.body.CO3, BRV11:req.body.BRV11, BRV12:req.body.BRV12, BRV13:req.body.BRV13, BRV14:req.body.BRV14, BRV15:req.body.BRV15, BRV16:req.body.BRV16, BRV17:req.body.BRV17, BRV21:req.body.BRV21, BRV22:req.body.BRV22, BRV23:req.body.BRV23, BRV24:req.body.BRV24, BRV25:req.body.BRV25, BRV26:req.body.BRV26, BRV27:req.body.BRV27, BRV31:req.body.BRV31, BRV32:req.body.BRV32, BRV33:req.body.BRV33, BRV34:req.body.BRV34, BRV35:req.body.BRV35, BRV36:req.body.BRV36, BRV37:req.body.BRV37, BRV41:req.body.BRV41, BRV42:req.body.BRV42, BRV43:req.body.BRV43, BRV44:req.body.BRV44, BRV45:req.body.BRV45, BRV46:req.body.BRV46, BRV47:req.body.BRV47, BRV51:req.body.BRV51, BRV52:req.body.BRV52, BRV53:req.body.BRV53, BRV54:req.body.BRV54, BRV55:req.body.BRV55, BRV56:req.body.BRV56, BRV57:req.body.BRV57, BRV61:req.body.BRV61, BRV62:req.body.BRV62, BRV63:req.body.BRV63, BRV64:req.body.BRV64, BRV65:req.body.BRV65, BRV66:req.body.BRV66, BRV67:req.body.BRV67, BRV71:req.body.BRV71, BRV72:req.body.BRV72, BRV73:req.body.BRV73, BRV74:req.body.BRV74, BRV75:req.body.BRV75, BRV76:req.body.BRV76, BRV77:req.body.BRV77, BRV81:req.body.BRV81, BRV82:req.body.BRV82, BRV83:req.body.BRV83, BRV84:req.body.BRV84, BRV85:req.body.BRV85, BRV86:req.body.BRV86, BRV87:req.body.BRV87, BRV91:req.body.BRV91, BRV92:req.body.BRV92, BRV93:req.body.BRV93, BRV94:req.body.BRV94, BRV95:req.body.BRV95, BRV96:req.body.BRV96, BRV97:req.body.BRV97, EB11:req.body.EB11,EB12:req.body.EB12,EB13:req.body.EB13,EB14:req.body.EB14,EB15:req.body.EB15,EB16:req.body.EB16,EB17:req.body.EB17,EB21:req.body.EB21,EB22:req.body.EB22,EB23:req.body.EB23,EB24:req.body.EB24,EB25:req.body.EB25,EB26:req.body.EB26,EB27:req.body.EB27, EB31:req.body.EB31,EB32:req.body.EB32,EB33:req.body.EB33,EB34:req.body.EB34,EB35:req.body.EB35,EB36:req.body.EB36,EB37:req.body.EB37, EB41:req.body.EB41,EB42:req.body.EB42,EB43:req.body.EB43,EB44:req.body.EB44,EB45:req.body.EB45,EB46:req.body.EB46,EB47:req.body.EB47, EB51:req.body.EB51,EB52:req.body.EB52,EB53:req.body.EB53,EB54:req.body.EB54,EB55:req.body.EB55,EB56:req.body.EB56,EB57:req.body.EB57, EB61:req.body.EB61,EB62:req.body.EB62,EB63:req.body.EB63,EB64:req.body.EB64,EB65:req.body.EB65,EB66:req.body.EB66,EB67:req.body.EB67, EB71:req.body.EB71,EB72:req.body.EB72,EB73:req.body.EB73,EB74:req.body.EB74,EB75:req.body.EB75,EB76:req.body.EB76,EB77:req.body.EB77, EB81:req.body.EB81,EB82:req.body.EB82,EB83:req.body.EB83,EB84:req.body.EB84,EB85:req.body.EB85,EB86:req.body.EB86,EB87:req.body.EB87, EB91:req.body.EB91,EB92:req.body.EB92,EB93:req.body.EB93,EB94:req.body.EB94,EB95:req.body.EB95,EB96:req.body.EB96,EB97:req.body.EB97, EB101:req.body.EB101,EB102:req.body.EB102,EB103:req.body.EB103,EB104:req.body.EB104,EB105:req.body.EB105,EB106:req.body.EB106,EB107:req.body.EB107, EB111:req.body.EB111,EB112:req.body.EB112,EB113:req.body.EB113,EB114:req.body.EB114,EB115:req.body.EB115,EB116:req.body.EB116,EB117:req.body.EB117, EB121:req.body.EB121,EB122:req.body.EB122,EB123:req.body.EB123,EB124:req.body.EB124,EB125:req.body.EB125,EB126:req.body.EB126,EB127:req.body.EB127, FV11:req.body.FV11,FV12:req.body.FV12, FV21:req.body.FV21,FV22:req.body.FV22, FV31:req.body.FV31,FV32:req.body.FV32, PV11:req.body.PV11,PV12:req.body.PV12, PV21:req.body.PV21,PV22:req.body.PV22, PV31:req.body.PV31,PV32:req.body.PV32, BRCV11:req.body.BRCV11, BRCV12:req.body.BRCV12,BRCV21:req.body.BRCV21, BRCV22:req.body.BRCV22, BRCV31:req.body.BRCV31, BRCV32:req.body.BRCV32, PCV11:req.body.PCV11,PCV12:req.body.PCV12, PCV21:req.body.PCV21,PCV22:req.body.PCV22, PCV31:req.body.PCV31,PCV32:req.body.PCV32}, (err,data)=>{
    if(err){
      console.log(err)
    }else{
      let options = {
        // "height": "250mm",
        // "width": "170mm",
        // "width": '280mm', 
        // "height": '396mm',
        "format":"A4",
        "orientation": "portrait", 
        "header": {
            "height": "30mm"
        },
        "footer": {
            "height": "18mm",
        },
        "border": {
          "top": "10mm",            
          "right": "15mm",
          "bottom": "10mm",
          "left": "15mm"
        },
        // "renderDelay": 5000,
      }
      let a
      pdf.create(data, options).toFile('report.pdf', (err,data)=>{
        if(err){
          res.send(err)
        }else{
          res.download('report.pdf')
        }
      })
    }
  })
})


app.listen(port,()=>{
  console.log(`Server running on port ${port}...`)
})