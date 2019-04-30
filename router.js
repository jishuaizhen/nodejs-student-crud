/**
 * router.js 路由模块
 * 职责：
 * 1.处理路由，根据不同的请求方法请求路径设置不同的结果
 */

// 这样不方便，express提供了更好的方式
// module.exports = function(app){
//     app.get('/students',function(req,res){
//         fs.readFile('./db.json','utf8',function(err,data){
//             if(err){
//                 return res.status(500).send('Server srror')
//             }
//             var students = JSON.parse(data).students
//             res.render('index.html',{
//                 fruits:['苹果','香蕉','橘子'],
//                 students:students
//             })
//         })
        
//     })
// }
var express = require('express')
var router = express.Router()
var Student = require('./student.js')
router.get('/students',function(req,res){
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error')
        }
        res.render('index.html',{
            fruits:['苹果','香蕉','橘子'],
            students:students
        })
    })
})
router.get('/students/new',function(req,res){
    res.render('new.html')
})
router.post('/students/new',function(req,res){
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})
/**
 * 渲染编辑学生页面
 */
router.get('/students/edit',function(req,res){
    console.log(req.query.id)
    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('server err')
        }
        // console.log(student)
        res.render('edit.html',{
            student:student
        })
    })
})

/**
 * 处理编辑学生
 */
router.post('/students/edit',function(req,res){
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server err')
        }
        res.redirect('/students')
    })
})
/**
 * 删除学生
 */
router.get('/students/delete',function(req,res){
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('server err')
        }
        res.redirect('/students')
    })
})
module.exports = router