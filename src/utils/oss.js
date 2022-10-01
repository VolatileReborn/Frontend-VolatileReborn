'use strict'
import {dateFormat} from './utils.js'
const OSS = require('ali-oss');



export default {
    /**
     * 创建随机字符串
     * @param num
     * @returns {string}
     */
    randomString(num) {
        const chars = [
            '0','1','2','3','4','5','6','7','8',
            '9','a','b','c','d','e','f','g','h',
            'i','j','k','l','m','n','o','p','q',
            'r','s','t','u','v','w','x','y','z',
        ]
        let res = ''
        for(let i = 0;i<num;i++){
            var id = Math.ceil(Math.random() * 35)
            res += chars[id]
        }
        return res
    },
    /**
     * 创建OSS客户端对象
     * @returns {Promise<unknown>}
     */
    createOssClient() {
        return new Promise((resolve) => {
            const client = new OSS({
                // region: 'oss-cn-beijing', // 路径地址
                region: 'oss-cn-hangzhou', // 路径地址
                accessKeyId: 'LTAI5t5xGgmZUuZ1gH7kT9kN',
                accessKeySecret: 'EFQzq6jvBPqUmRnKKZO4VUsNRRbiS1',
                bucket: 'volatile-reborn',
                secure: true // 上传连接返回支持https
            })

            resolve(client)
        })
    },

    ossUploadFile(option) {
        const file = option.file
        const self = this
        return new Promise((resolve,reject) => {
            const date = dateFormat(new Date(),'yyyyMMdd')
            const dateTime = dateFormat(new Date(),'yyyyMMddhhmmss')
            const randomStr = self.randomString(4)
            const extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
            const fileName = 'files/' + date + '/' + dateTime + '_' + randomStr + extensionName
            // 执行上传
            self.createOssClient().then(client => {
                // 异步上传，返回数据
                resolve({
                    fileName:file.name,
                    // fileUrl:"https://se3-volatile.oss-cn-beijing.aliyuncs.com/"+fileName
                    fileUrl: "https://se3-volatile.oss-cn-hangzhou.aliyuncs.com/"+fileName

                });
                // 上传处理
                // 分片上传文件
                client
                    .put(fileName,file
                    //     ,{
                    //     progress:function (p) {
                    //         const e = {}
                    //         e.percent = Math.floor(p*100)
                    //         option.onProgress(e)
                    //     }
                    // }
                    )
                    .then(val => {
                        if(val.res.statusCode === 200){
                            option.onSuccess('上传成功')
                        }
                        else {
                            option.onError('上传失败')
                        }
                    },
                        err =>{
                        option.onError('上传失败')
                        reject(err)
                        }
                    )
            })
        })
    },

    ossGetDownloadUrl(fileName){
        // console.log(fileName)
        const self = this
        const response = {
            'content-disposition': `attachment; filename=${encodeURIComponent(fileName)}`
        }
        return new Promise(resolve => {
            self.createOssClient().then(client => {
                const url = client.signatureUrl(fileName,{response})
                resolve( {downloadURL:url})
            })
        })

    },

    ossGetReviewUrl(fileName){
        const self = this
        return new Promise(resolve => {
            self.createOssClient().then(client => {
                const url = client.signatureUrl(fileName)
                resolve({reviewURL:url})
            })
        })
    }
}