const mongoose = require("mongoose");
const studentAppModel = require("../models/studentAppModel");
const mentorAppModel = require("../models/mentorAppModel");
const {body,validationResult} = require('express-validator');

const dbs = ['sql','nosql','graph','none']
const plats = ['aws','google_cloud','firebase','heroku','netlify','azure']
const pre_dbs = ['sql','nosql','graph','any']
const pre_plats = ['aws','google_cloud','firebase','heroku','netlify','azure','any']
/** Gneral Endpoints */
exports.filterApplications = (async (req,res)=>{
    const num_display = req.body.num_display
    const num_page = req.body.num_page
    delete req.body.num_page
    delete req.body.num_display
    const filters = req.body;
    let length = 0;
    const filteredMentors = await mentorAppModel.filter((mentor)=>{
        return mentorFilter(filters,mentor)}
    ).sort({creation_time:1})
    const filteredStudents = await studentAppModel.filter((student)=>{
        return studentFilter(student_filter,student)}
    ).sort({creation_time:1})
    length = filteredMentors.length + filteredStudents.length
    if ((num_page-1) * num_display > length || num_page<1){
        res.status(400).json({
            error: "Index of page out of range"
        })
    }
    let resAll = null;
    if (length > 0){
        // for simplicity, we compare the date value of the last index
        // if one is greater, then that one (student or mentor) will have 3/4 of the application been sent
        const tail = num_page*num_display>length?length:num_page*num_display
        //let resStudents = filteredStudents.slice
    }
    res.send({
        total:length,
        data:resAll
    });

})
/** Student Endpoints */
exports.submitStudentForm = (async (req,res)=>{
    studentAppModel.create(req.body)
    .then((id)=>{
        console.log(id);
    })
    .catch((e)=>{
        console.log(e)
    })
    res.status(201).json({
      status: 'success',
    })
})

exports.filterStudentApp = (async (req,res)=>{
    //.find(query).
    let query = buildQueryFitler(req.body);
    const filteredStudents = await studentAppModel.find(query).where('year').gte(req.body.year)
    .where('cgpa').gte(req.body.cgpa)
    .sort({creation_time:1})
    length = filteredStudents.length
    let resStudents = null;
    if ((req.body.num_page-1) * req.body.num_display > length || req.body.num_page<1){
        res.status(400).json({
            error: "Index of page out of range"
        })
    }
    if (length > 0){
        const tail = req.body.num_page*req.body.num_display>length?length:req.body.num_page*req.body.num_display;
        resStudents = filteredStudents.slice((req.body.num_page-1)*req.body.num_display,tail);
    }
    res.send({
        total:length,
        data:resStudents
    });
})
/** Mentor Endpoints */

exports.filterMentorApp = (async (req,res)=>{
    let query = buildQueryFitler(req.body);
    let length = 0;
    const filteredMentors = await mentorAppModel.filter(query)
    .where('year').gte(req.body.year)
    .where('cgpa').gte(req.body.cgpa)
    .sort({creation_time:1})
    length = filteredMentors.length
    let resMentors = null;
    if ((num_page-1) * num_display > length || num_page<1){
        res.status(400).json({
            error: "Index of page out of range"
        })
    }
    if (length > 0){
        const tail = num_page*num_display>length?length:num_page*num_display
        const resMentors = filteredMentors.slice((num_page-1)*num_display-1,tail-1)
    }
        
    res.send({
        total:length,
        data:resMentors
    })
})
/** Validators */

exports.studentAppValidator =[
        body('student_num',"Invalid Student Number").not().isEmpty().isString().isLength({min:10,max:10}),
        body("email","Invalid Email").not().isEmpty().isEmail(),
        body("cgpa","Invalid CGPA").not().isEmpty().isFloat({min:0,max:4}),
        body("year","You need to be Second year and above").not().isEmpty().isInt({min:2,max:4}),
        body("resume_path", "Please Provide Your Resume").not().isEmpty(),
        body("have_group","Please let use know if you have a group").not().isEmpty().isBoolean(),
        body("project_idea","Please let use know if you have a project idea").not().isEmpty().isBoolean(),
        body("databases","Please select at least one databases").not().isEmpty(),
        body("platforms","Please select at least one platforms").not().isEmpty(),
        (req,res,next)=>{
            let errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({'errors':errors.array()});
            }
            errors = studentDetailValidator(req.body);
            if (Object.keys(errors).length > 0){
                return res.status(400).json({'errors':[errors]});
            }
            next();
        }
];

function studentDetailValidator(req_data){
    const errors = {}
    const email_re = /^[^\s@]+@mail.utoronto.ca/;
    if (!email_re.test(req_data["email"])){
        errors["email"] = "Please use UofT email"
    }
    let db = req_data['databases'];
    let db_no_input = true;
    for (let i = 0; i < dbs.length; i++){
        if (db[dbs[i]]){
            db_no_input = false;
            break;
        }
    }
    if (db_no_input){
        errors["database"] = "Please select at least one databases";
    }
    let platforms = req_data['platforms'];
    if (!(platforms["none"] || (platforms['other'] !== ''))){
        let pre_select = platforms['pre-select'];
        if (pre_select){
            for (let i = 0; i < plats.length; i ++){
                if (pre_select[plats[i]]){
                    break;
                }
            }
        }
        errors["platforms"] = "Please select at least one platforms";
    }
    if (req_data["have_group"]){
        if (!req_data["group_members"]){
            errors["group"] = "Please enter your group members' information";
        }
    }
    if (req_data["project_idea"]){
        if (!req_data["idea_description"]){
            errors["idea"] = "Please enter your idea description";
        }
    }
    return errors;
}

exports.studentQueryValidator =[
    body("year","Invalid Year").not().isEmpty().isInt({min:2,max:4}),
    body("databases","Invalid Databases").not().isEmpty(),
    body("databases.any", "Invalid  Databases Any").not().isEmpty().isBoolean(),
    body("cloudPlat","Invalid Cloud Platform").not().isEmpty(),
    body("cloudPlat.any","Invalid  Clout Platform Any").not().isEmpty().isBoolean(),
    body("cgpa","Invalid cgpa").not().isEmpty().isFloat({min:0,max:4}),
    body("num_display","Invalid Num Display").not().isEmpty().isInt(),
    body("num_page","Invalid Num Pagee").not().isEmpty().isInt(),
    (req,res,next)=>{
        let errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()){
            return res.status(400).json({'errors':errors.array()});
        }
        errors = querySubValidator(req.body);
        console.log(errors);
        if (Object.keys(errors).length > 0){
            return res.status(400).json({'errors':[errors]});
        }
        next();
    }
];

exports.mentorQueryValidator =[
    body("year","Invalid Year").not().isEmpty().isInt({min:2,max:4}),
    body("complete_pey","Invalid Complate PEY").not().isEmpty().isBoolean(),
    body("databases","Invalid Databases").not().isEmpty(),
    body("databases.any", "Invalid  Databases Any").not().isEmpty().isBoolean(),
    body("cloudPlat","Invalid Cloud Platform").not().isEmpty(),
    body("cloudPlat.any","Invalid  Clout Platform Any").not().isEmpty().isBoolean(),
    body("cgpa","Invalid cgpa").not().isEmpty().isFloat({min:0,max:4}),
    body("num_display","Invalid Num Display").not().isEmpty().isInt(),
    body("num_page","Invalid Num Pagee").not().isEmpty().isInt(),
    (req,res,next)=>{
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({'errors':errors.array()});
        }
        errors = querySubValidator(req.body);
        if (Object.keys(errors).length > 0){
            return res.status(400).json({'errors':[errors]});
        }
        next();
    }
];

const querySubValidator= (req_data)=>{
    const errors = {};
    const dbs = req_data.databases;
    const plats = req_data.cloudPlat;
    for (let key in dbs){
        if (!(pre_dbs.includes(key) && typeof(dbs[key]) == "boolean")){
            errors['databases'] = "databases has invalid input";
            break;
        }
    }
    for (let key in plats){
        if (!(pre_plats.includes(key) && typeof(plats[key]) == "boolean")){
            errors['databases'] = "databases has invalid input";
            break;
        }
    }
    return errors;
}
/** Query Helper */

const buildQueryFitler = (req_body)=>{
    var query = {};
    if (!req_body.databases.any){
        for (let key in req_body.databases){
            if (key != "any"){
                query["databases."+key] = req_body.databases[key]
            }
            query["databases.none"] = false;
        }
    }
    if (!req_body.cloudPlat.any){
        for (let key in req_body.cloudPlat){
            if (key != 'any'){
                query['platforms.pre_select'+key] = req_body.cloudPlat.key
            }
        }
        query["platforms.none"] = false;
    }
    if (req_body['complete_pey']){
        query['complete_pey'] = req_body['complete_pey'];
    }
    console.log(query)
    return query;
}