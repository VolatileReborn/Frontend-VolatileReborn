/**
 * 时间日期格式化
 * @param dateObj
 * @param format
 * @returns {*}
 */
export const dateFormat = function (dateObj,format) {
    const date = {
        'M+' : dateObj.getMonth() + 1,
        "d+" : dateObj.getDate(),
        "h+" : dateObj.getHours(),
        "m+" : dateObj.getMinutes(),
        "s+" : dateObj.getSeconds(),
        "q+" : Math.floor((dateObj.getMonth() + 3) / 3),
        "S+" : dateObj.getMilliseconds()
    }
    if(/(y+)/i.test(format)){
        format = format.replace(
            RegExp.$1,
            (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    for(const k in date) {
        if(new RegExp('(' + k + ')').test(format)){
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? date[k]
                    : ('00' + date[k]).substr(('' + date[k]).length)
            )
        }
    }
    return format
}

/**
 * 时间戳 数字格式转string y-m-d
 * @param time
 * @param cFormat
 * @returns {string|null}
 */
export const parseTime = function (time,cFormat) {
    if(arguments.length === 0 || !time){
        return null
    }
    const format = cFormat || '{y}-{m}-{d}'
    let date
    if((typeof time === 'number') && (time.toString().length === 10))
    {
        time = time * 1000
    }
    date = new Date(time)

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate()
    }
    const time_str = format.replace(/{([ymd])+}/g,(result,key) => {
        const value = formatObj[key]
        return value.toString().padStart(2,'0')
    })
    return time_str
}