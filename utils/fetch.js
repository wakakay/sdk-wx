/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/7/20      1.0     First version
 *
 */

module.exports = {
    request: function (conf, isAbsolute) {
        let key = getApp().getStorageKey().USER_TOKEN
        if (conf.header != undefined) {
            if (conf.header['Authorization'] == undefined) {
                conf.header['Authorization'] = wx.getStorageSync(key)
            }
        } else {
            conf.header = {
                // 'Authorization': wx.getStorageSync(key),
                'content-type': 'application/json' // 默认值
            }
        }
        // 如果是相对路径，则补充服务器前缀
        if (!isAbsolute) {
            conf.url = getApp().getGlobalConfig().base_url + conf.url;
        }
        wx.request(conf);
    }
}
