/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只关心数据，不关心业务
 */

/**
 * 获取所有学生列表
 * callback中的参数
 *  第一个参数err
 *   成功是null,失败是错误对象
 *  第二个参数是结果
 *   成功是数组，失败是undefined
 */
var fs = require('fs')
var dbPath = './db.json'
/**
 * 查询学生
 */
exports.find =function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

/** 
*通过id查学生 
*/
exports.findById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        var stu = students.find(function(item){
            return item.id === parseInt(id)
        })
        callback(null,stu)
    })
}

/**
 * 添加学生
 */
exports.save =function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        if(students[students.length - 1].id){
            student.id = students[students.length - 1].id + 1
        }else{
            student.id = 1
        }
        // student.id = 1
        
        students.push(student)
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 更新学生
 */
exports.updateById =function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)
        // 将item的符合项返回
        var stu = students.find(function(item){
            return item.id === student.id
        })
        for(var key in student){
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 删除学生
 */
exports.deleteById =function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        var detleteId = students.findIndex(function(item){
            return item.id = parseInt(id)
        })
        students.splice(detleteId,1)
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}